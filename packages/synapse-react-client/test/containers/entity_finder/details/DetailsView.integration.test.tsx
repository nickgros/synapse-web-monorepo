import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Map } from 'immutable'
import React from 'react'
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils'
import { toEntityHeader } from '../../../../src/components/EntityFinder/details/configurations/ProjectListDetails'
import {
  DetailsView,
  DetailsViewProps,
} from '../../../../src/components/EntityFinder/details/view/DetailsView'
import { NO_VERSION_NUMBER } from '../../../../src/components/EntityFinder/EntityFinder'
import { EntityFinderHeader } from '../../../../src/components/EntityFinder/EntityFinderHeader'
import { VersionSelectionType } from '../../../../src/components/EntityFinder/VersionSelectionType'
import { createWrapper } from '../../../../src/testutils/TestingLibraryUtils'
import { ENTITY_ID_VERSIONS } from '../../../../src/utils/APIConstants'
import {
  BackendDestinationEnum,
  getEndpoint,
} from '../../../../src/utils/functions/getEndpoint'
import { SynapseContextType } from '../../../../src/utils/context/SynapseContext'
import {
  Direction,
  EntityHeader,
  EntityType,
  PaginatedResults,
  SortBy,
} from '@sage-bionetworks/synapse-types'
import { VersionInfo } from '@sage-bionetworks/synapse-types'
import { mockProjectHeader } from '../../../../src/mocks/entity/mockEntity'
import mockFileEntityData from '../../../../src/mocks/entity/mockFileEntity'
import { rest, server } from '../../../../src/mocks/msw/server'
import { MOCK_USER_ID } from '../../../../src/mocks/user/mock_user_profile'
import * as EntityBadgeModule from '../../../../src/components/EntityBadgeIcons/EntityBadgeIcons'

const mockEntityBadgeIcons = vi
  .spyOn(EntityBadgeModule, 'EntityBadgeIcons')
  .mockImplementation(() => <></>)

const mockFileEntityHeader = mockFileEntityData.entityHeader

// Having trouble mocking the AutoResizer in react-base-table. It just uses this under the hood:
vi.mock('react-virtualized-auto-sizer', () => ({
  default: ({ children }) => children({ height: 600, width: 1200 }),
}))

const mockToggleSelection = vi.fn()
const mockFetchNextPage = vi.fn()
const mockSetSort = vi.fn()

function generateFileHeader(id: number): EntityHeader {
  return {
    id: `syn${id}`,
    name: 'My File',
    modifiedOn: '2022-07-12T20:56:38.851Z',
    modifiedBy: MOCK_USER_ID.toString(),
    type: 'org.sagebionetworks.repo.model.FileEntity',
    versionNumber: 1,
    versionLabel: 'label',
    benefactorId: 456,
    createdOn: '',
    createdBy: '',
    isLatestVersion: true,
  }
}

const entityHeaders: EntityFinderHeader[] = [
  mockFileEntityHeader!,
  toEntityHeader(mockProjectHeader),
]

const versionResult: PaginatedResults<VersionInfo> = {
  totalNumberOfResults: 2,
  results: [
    {
      id: entityHeaders[0].id,
      versionNumber: 3,
      versionLabel: 'version 3 label',
      versionComment: 'comment 2',
      modifiedBy: 'user',
      contentSize: '100001',
      contentMd5: 'deadbeef',
      modifiedByPrincipalId: '1',
      modifiedOn: '2022-07-12T20:56:38.851Z',
      isLatestVersion: true,
    },

    {
      id: entityHeaders[0].id,
      versionNumber: 1,
      versionLabel: '1',
      versionComment: 'comment',
      modifiedBy: 'user',
      contentSize: '100000',
      contentMd5: 'abcde0123456789',
      modifiedByPrincipalId: '1',
      modifiedOn: '2022-07-11T20:56:38.851Z',
      isLatestVersion: false,
    },
  ],
}

const FILE_INDEX = 0
const PROJECT_INDEX = 1

const mockSetCurrentContainer = vi.fn()

const defaultProps: DetailsViewProps = {
  versionSelection: VersionSelectionType.TRACKED,
  selectColumnType: 'none',
  visibleTypes: Object.values(EntityType),
  selected: Map(),
  selectableTypes: Object.values(EntityType),
  toggleSelection: mockToggleSelection,
  entities: entityHeaders,
  isLoading: false,
  hasNextPage: false,
  fetchNextPage: mockFetchNextPage,
  isFetchingNextPage: false,
  sort: undefined,
  setSort: mockSetSort,
  noResultsPlaceholder: <></>,
  enableSelectAll: true,
  setCurrentContainer: mockSetCurrentContainer,
}

function renderComponent(
  propOverrides?: Partial<DetailsViewProps>,
  wrapperProps?: SynapseContextType,
) {
  return render(<DetailsView {...defaultProps} {...propOverrides} />, {
    wrapper: createWrapper(wrapperProps),
  })
}

describe('DetailsView tests', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.restoreHandlers())
  afterAll(() => server.close())

  beforeEach(() => {
    vi.clearAllMocks()

    server.use(
      rest.get(
        `${getEndpoint(
          BackendDestinationEnum.REPO_ENDPOINT,
        )}${ENTITY_ID_VERSIONS(entityHeaders[0].id)}`,
        async (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(versionResult))
        },
      ),
    )

    mockAllIsIntersecting(false)
  })

  describe('Renders entities', () => {
    it('Renders a row for each entity', async () => {
      // In addition to each entity getting a row, the table header will also be found
      const NON_ENTITY_ROW_COUNT = 1

      renderComponent()

      await waitFor(() =>
        expect(screen.getAllByRole('row').length).toBe(
          entityHeaders.length + NON_ENTITY_ROW_COUNT,
        ),
      )
    })

    describe('Determines correct row appearance', () => {
      it('Creates a row with the default appearance', async () => {
        renderComponent({
          selected: Map(),
          visibleTypes: Object.values(EntityType),
          selectableTypes: Object.values(EntityType),
        })

        const rows = await screen.findAllByRole('row')

        // Nothing is selected
        expect(
          screen.queryByRole('row', { selected: true }),
        ).not.toBeInTheDocument()

        // Nothing is disabled
        expect(rows[FILE_INDEX]).not.toBeDisabled()
        expect(rows[PROJECT_INDEX]).not.toBeDisabled()
      })

      it('Creates a row with the selected appearance', async () => {
        renderComponent({
          selected: Map<string, number>([
            [entityHeaders[0].id, NO_VERSION_NUMBER],
          ]),
          visibleTypes: Object.values(EntityType),
          selectableTypes: Object.values(EntityType),
        })

        const rows = await screen.findAllByRole('row')
        // One row is selected -- the file
        expect(rows[FILE_INDEX]).toHaveAttribute('aria-selected', 'true')
        expect(rows[PROJECT_INDEX]).toHaveAttribute('aria-selected', 'false')

        // Nothing is disabled
        expect(rows[FILE_INDEX]).toHaveAttribute('aria-disabled', 'false')
        expect(rows[PROJECT_INDEX]).toHaveAttribute('aria-disabled', 'false')
      })

      it('Creates a row with the disabled appearance', async () => {
        renderComponent({
          selected: Map(),
          visibleTypes: Object.values(EntityType),
          selectableTypes: [EntityType.PROJECT], // !
        })

        const rows = await screen.findAllByRole('row')

        // Nothing is selected
        expect(
          screen.queryByRole('row', { selected: true }),
        ).not.toBeInTheDocument()

        // One row is disabled (the file)
        expect(rows[FILE_INDEX]).toHaveAttribute('aria-disabled', 'true')
        expect(rows[PROJECT_INDEX]).toHaveAttribute('aria-disabled', 'false')
      })
    })
  })

  it('will fetch the next page when reaching the end of the table', async () => {
    // We can't simulate scrolling very well in JSDOM, so we'll render the table with 50 rows and verify that the next page isn't fetched
    // Then we'll render the table with just 2 rows and verify that the page is fetched right away
    const manyEntities = []
    for (let i = 0; i < 50; i++) {
      manyEntities.push(generateFileHeader(i))
    }
    renderComponent({
      isLoading: false,
      hasNextPage: true,
      isFetchingNextPage: false,
      entities: manyEntities,
    })

    expect(mockFetchNextPage).not.toHaveBeenCalled()

    const fewEntities = []
    for (let i = 0; i < 2; i++) {
      fewEntities.push(generateFileHeader(i))
    }

    renderComponent({
      isLoading: false,
      hasNextPage: true,
      isFetchingNextPage: false,
      entities: fewEntities,
    })

    await waitFor(() => expect(mockFetchNextPage).toHaveBeenCalled())
  })

  describe('Conditionally hiding columns', () => {
    it('shows both the selected and version columns', async () => {
      renderComponent({
        selectColumnType: 'checkbox',
        versionSelection: VersionSelectionType.REQUIRED,
      })

      expect((await screen.findAllByRole('columnheader')).length).toBe(9)
    })
    it('hides the selected column', async () => {
      renderComponent({
        selectColumnType: 'none',
        versionSelection: VersionSelectionType.REQUIRED,
      })

      expect((await screen.findAllByRole('columnheader')).length).toBe(8)
    })
    it('hides the version column', async () => {
      renderComponent({
        selectColumnType: 'checkbox',
        versionSelection: VersionSelectionType.DISALLOWED,
      })

      expect((await screen.findAllByRole('columnheader')).length).toBe(8)
    })
  })

  describe('Sort functionality', () => {
    it('requests to sort descending on new SortBy', async () => {
      renderComponent({
        sort: { sortBy: SortBy.CREATED_ON, sortDirection: Direction.ASC },
        setSort: mockSetSort,
      })

      await userEvent.click(screen.getAllByRole('button')[0])

      expect(mockSetSort).toBeCalledWith(SortBy.NAME, Direction.ASC)
    })

    it('toggles from descending to ascending on same SortBy', async () => {
      renderComponent({
        sort: { sortBy: SortBy.CREATED_ON, sortDirection: Direction.ASC },
        setSort: mockSetSort,
      })

      await userEvent.click(screen.getAllByRole('button')[2])

      expect(mockSetSort).toBeCalledWith(SortBy.CREATED_ON, Direction.DESC)
    })

    it('toggles from ascending to descending on same SortBy', async () => {
      renderComponent({
        sort: { sortBy: SortBy.MODIFIED_ON, sortDirection: Direction.DESC },
        setSort: mockSetSort,
      })

      await userEvent.click(screen.getAllByRole('button')[3])

      expect(mockSetSort).toBeCalledWith(SortBy.MODIFIED_ON, Direction.ASC)
    })
  })

  describe('select all tests', () => {
    it('Select All checkbox will render checked', async () => {
      renderComponent({
        enableSelectAll: true,
        selectAllIsChecked: true,
        hasNextPage: false,

        selectColumnType: 'checkbox',
      })
      await screen.findByRole('checkbox', { checked: true })
    })
    it('Select All checkbox will render unchecked', async () => {
      renderComponent({
        enableSelectAll: true,
        selectAllIsChecked: false,
        hasNextPage: false,
        selectColumnType: 'checkbox',
      })
      // Two entities plus select all, all unchecked
      expect(
        await screen.findAllByRole('checkbox', { checked: false }),
      ).toHaveLength(3)
    })

    it('Select All checkbox will render disabled if there are no selectable entities', async () => {
      renderComponent({
        enableSelectAll: true,
        selectAllIsChecked: false,
        entities: [],
        hasNextPage: false,
        selectColumnType: 'checkbox',
      })
      await screen.findByRole('checkbox', { checked: false })
      expect(await screen.findByRole('checkbox')).toBeDisabled()
    })

    it('Clicking select all toggles selection for all entities when none are selected', async () => {
      renderComponent({
        enableSelectAll: true,
        selectAllIsChecked: false,
        hasNextPage: false,
        selectColumnType: 'checkbox',
      })

      const selectAll = await screen.findByTestId('Select All')
      expect(mockToggleSelection).not.toHaveBeenCalled()
      await userEvent.click(selectAll)
      await waitFor(() =>
        expect(mockToggleSelection).toHaveBeenCalledWith([
          { targetId: entityHeaders[0].id, targetVersionNumber: undefined },
          { targetId: entityHeaders[1].id, targetVersionNumber: undefined },
        ]),
      )
    })

    it('Clicking select all toggles selection with version when versionSelection is REQUIRED', async () => {
      renderComponent({
        enableSelectAll: true,
        selectAllIsChecked: false,
        hasNextPage: false,
        versionSelection: VersionSelectionType.REQUIRED,
        selectColumnType: 'checkbox',
      })

      const selectAll = await screen.findByTestId('Select All')
      expect(mockToggleSelection).not.toHaveBeenCalled()
      await userEvent.click(selectAll)
      await waitFor(() =>
        expect(mockToggleSelection).toHaveBeenCalledWith([
          {
            targetId: entityHeaders[0].id,
            targetVersionNumber: entityHeaders[0].versionNumber,
          },
          // Project is versionless, so should still have undefined version number
          { targetId: entityHeaders[1].id, targetVersionNumber: undefined },
        ]),
      )
    })

    it('Clicking select all toggles selection for all entities when some are selected', async () => {
      renderComponent({
        enableSelectAll: true,
        selectAllIsChecked: false,
        selected: Map([[entityHeaders[0].id, NO_VERSION_NUMBER]]),
        hasNextPage: false,
        selectColumnType: 'checkbox',
      })

      const selectAll = await screen.findByTestId('Select All')
      expect(mockToggleSelection).not.toHaveBeenCalled()
      await userEvent.click(selectAll)
      // Only the project is toggled because the file is already selected
      await waitFor(() =>
        expect(mockToggleSelection).toHaveBeenCalledWith([
          { targetId: entityHeaders[1].id, targetVersionNumber: undefined },
        ]),
      )
    })

    it('Clicking select all toggles selection for all entities when all are selected (deselection)', async () => {
      renderComponent({
        enableSelectAll: true,
        selectAllIsChecked: true, // !
        selected: Map([
          [entityHeaders[0].id, NO_VERSION_NUMBER],
          [entityHeaders[1].id, NO_VERSION_NUMBER],
        ]),
        hasNextPage: false,
        selectColumnType: 'checkbox',
      })

      const selectAll = await screen.findByTestId('Select All')
      expect(mockToggleSelection).not.toHaveBeenCalled()
      await userEvent.click(selectAll)
      // Both items are unselected and should be deselected, so they are both toggled
      await waitFor(() =>
        expect(mockToggleSelection).toHaveBeenCalledWith([
          {
            targetId: entityHeaders[0].id,
            targetVersionNumber: undefined,
          },

          { targetId: entityHeaders[1].id, targetVersionNumber: undefined },
        ]),
      )
    })

    it('Select all does not toggle disabled entities', async () => {
      renderComponent({
        enableSelectAll: true,
        selectAllIsChecked: false,
        selectableTypes: [EntityType.FILE],
        visibleTypes: [EntityType.FILE, EntityType.PROJECT],
        hasNextPage: false,
        selectColumnType: 'checkbox',
      })

      const selectAll = await screen.findByTestId('Select All')
      expect(mockToggleSelection).not.toHaveBeenCalled()
      await userEvent.click(selectAll)
      // Only the file is toggled because the project is unselectable
      await waitFor(() =>
        expect(mockToggleSelection).toHaveBeenCalledWith([
          {
            targetId: entityHeaders[0].id,
            targetVersionNumber: undefined,
          },
        ]),
      )
    })
    it('Select all does not toggle hidden entities', async () => {
      renderComponent({
        enableSelectAll: true,
        selectAllIsChecked: false,
        selectableTypes: [EntityType.FILE, EntityType.PROJECT],
        visibleTypes: [EntityType.FILE],
        hasNextPage: false,
        selectColumnType: 'checkbox',
      })

      const selectAll = await screen.findByTestId('Select All')
      expect(mockToggleSelection).not.toHaveBeenCalled()
      await userEvent.click(selectAll)
      // Only the file is toggled because the project is hidden
      await waitFor(() =>
        expect(mockToggleSelection).toHaveBeenCalledWith([
          {
            targetId: entityHeaders[0].id,
            targetVersionNumber: undefined,
          },
        ]),
      )
    })
  })

  describe('row level tests', () => {
    it('toggles selection on click', async () => {
      renderComponent()

      const rows = await screen.findAllByRole('row')
      await userEvent.click(rows[FILE_INDEX])

      expect(mockToggleSelection).toBeCalledWith({
        targetId: entityHeaders[0].id,
        targetVersionNumber: undefined,
      })
    })

    it('toggles selection with version when versionSelection is REQUIRED', async () => {
      renderComponent({
        versionSelection: VersionSelectionType.REQUIRED,
      })

      const rows = await screen.findAllByRole('row')
      await userEvent.click(rows[FILE_INDEX])

      expect(mockToggleSelection).toBeCalledWith({
        targetId: entityHeaders[0].id,
        targetVersionNumber: entityHeaders[0].versionNumber,
      })
    })

    it('versionSelection is REQUIRED does not affect toggle for non-versionable entities', async () => {
      renderComponent({
        versionSelection: VersionSelectionType.REQUIRED,
      })

      // Click the project--projects don't have versions
      const rows = await screen.findAllByRole('row')
      await userEvent.click(rows[PROJECT_INDEX])

      expect(mockToggleSelection).toBeCalledWith({
        targetId: entityHeaders[1].id,
        targetVersionNumber: undefined,
      })
    })

    it('does not toggle when clicked if disabled', async () => {
      renderComponent({
        selectableTypes: [EntityType.PROJECT],
        visibleTypes: [EntityType.PROJECT, EntityType.FILE],
      })

      // Per props, File is a disabled type
      const rows = await screen.findAllByRole('row')
      await userEvent.click(rows[FILE_INDEX])

      expect(mockToggleSelection).not.toBeCalled()
    })

    it('renders a link to update the currentContainer for container entities', async () => {
      renderComponent({
        selectableTypes: [EntityType.PROJECT, EntityType.FILE],
        visibleTypes: [EntityType.PROJECT, EntityType.FILE],
      })

      // One link to navigate to the project should be visible (you can't navigate inside of a folder)
      const linkToProject = await screen.findByRole('link', {
        name: entityHeaders[PROJECT_INDEX].name,
      })
      expect(screen.queryAllByRole('link')).toHaveLength(1)

      await userEvent.click(linkToProject)

      // Navigating should not toggle selection
      expect(mockToggleSelection).not.toBeCalled()

      // Setting the container should have occurred with the project ID
      expect(mockSetCurrentContainer).toHaveBeenCalledTimes(1)
      expect(mockSetCurrentContainer).toHaveBeenCalledWith(
        entityHeaders[PROJECT_INDEX].id,
      )
    })

    it('does not render a link to update the currentContainer when setCurrentContainer is undefined', () => {
      // For example, when we are searching, we have no "currentContainer" to update
      renderComponent({
        selectableTypes: [EntityType.PROJECT, EntityType.FILE],
        visibleTypes: [EntityType.PROJECT, EntityType.FILE],
        setCurrentContainer: undefined,
      })

      // No links should be rendered because navigation is not possible
      expect(screen.queryByRole('link')).not.toBeInTheDocument()
    })

    describe('renders the correct checkbox state', () => {
      it('rendered checkbox is checked if selected', async () => {
        renderComponent({
          selected: Map([[entityHeaders[0].id, NO_VERSION_NUMBER]]),
          selectColumnType: 'checkbox',
        })

        expect((await screen.findAllByRole('checkbox'))[0]).toHaveAttribute(
          'checked',
        )
      })

      it('no checkbox button is created for a disabled row', async () => {
        renderComponent({
          enableSelectAll: false,
          hasNextPage: false,
          selectableTypes: [EntityType.FILE],
          selectColumnType: 'checkbox',
        })
        // The project is disabled, so it won't have a checkbox
        expect(await screen.findAllByRole('checkbox')).toHaveLength(1)
      })
    })

    describe('version selection', () => {
      it('displays the versions when selected', async () => {
        mockAllIsIntersecting(true)

        renderComponent({
          selectableTypes: [EntityType.FILE],
          visibleTypes: [EntityType.FILE],
          selected: Map([[entityHeaders[0].id, NO_VERSION_NUMBER]]),
        })

        await screen.findByRole('listbox')

        // We should have two versions and 'Always Latest Version' as options
        expect((await screen.findAllByRole('option')).length).toBe(3)
      })

      it('Always Latest Version text appears when versionSelection is TRACKED', async () => {
        mockAllIsIntersecting(true)

        renderComponent({
          selectableTypes: [EntityType.FILE],
          visibleTypes: [EntityType.FILE],
          selected: Map([[entityHeaders[0].id, NO_VERSION_NUMBER]]),
          versionSelection: VersionSelectionType.TRACKED,
        })

        await screen.findByText('Always Latest Version')
      })

      it('Always Latest Version text does not appear when versionSelection is UNTRACKED', async () => {
        mockAllIsIntersecting(true)

        renderComponent({
          selectableTypes: [EntityType.FILE],
          visibleTypes: [EntityType.FILE],
          selected: Map([[entityHeaders[0].id, NO_VERSION_NUMBER]]),
          versionSelection: VersionSelectionType.UNTRACKED,
        })

        expect(
          screen.queryByText('Always Latest Version'),
        ).not.toBeInTheDocument()
      })

      it('does not display Always Latest Version if versionSelection is REQUIRED', async () => {
        mockAllIsIntersecting(true)

        renderComponent({
          selectableTypes: [EntityType.FILE],
          visibleTypes: [EntityType.FILE],
          selected: Map([[entityHeaders[0].id, NO_VERSION_NUMBER]]),
          versionSelection: VersionSelectionType.REQUIRED,
        })

        await screen.findByRole('listbox')

        // We should have two versions
        expect(screen.getAllByRole('option').length).toBe(2)
      })

      it('calls toggle selection when a version is picked', async () => {
        mockAllIsIntersecting(true)

        renderComponent({
          selectableTypes: [EntityType.FILE],
          visibleTypes: [EntityType.FILE],
          selected: Map<string, number>([
            [entityHeaders[0].id, NO_VERSION_NUMBER],
          ]),
        })
        const versionSelectBox = await screen.findByRole('listbox')

        // There are two versions, plus "Always Latest"
        const options = await screen.findAllByRole('option')
        expect(options.length).toBe(3)

        // Select 'always latest'
        await userEvent.selectOptions(versionSelectBox, '-1')
        expect(mockToggleSelection).toBeCalledWith({
          targetId: entityHeaders[0].id,
          targetVersionNumber: undefined,
        })

        // Select v1
        await userEvent.selectOptions(
          versionSelectBox,
          versionResult.results[0].versionNumber.toString(),
        )
        expect(mockToggleSelection).toBeCalledWith({
          targetId: entityHeaders[0].id,
          targetVersionNumber: versionResult.results[0].versionNumber,
        })

        // Select v2
        await userEvent.selectOptions(
          versionSelectBox,
          versionResult.results[1].versionNumber.toString(),
        )
        expect(mockToggleSelection).toBeCalledWith({
          targetId: entityHeaders[0].id,
          targetVersionNumber: versionResult.results[1].versionNumber,
        })
      })

      it('automatically selects "Always Latest" if none selected', async () => {
        mockAllIsIntersecting(true)

        renderComponent({
          selectableTypes: [EntityType.FILE],
          visibleTypes: [EntityType.FILE],
          selected: Map([[entityHeaders[0].id, NO_VERSION_NUMBER]]),
        })
        expect(await screen.findByRole('listbox')).toBeDefined()

        expect(
          (screen.getAllByRole('option')[0] as HTMLOptionElement).selected,
        ).toBe(true)
        expect(
          (screen.getAllByRole('option')[1] as HTMLOptionElement).selected,
        ).toBe(false)
        expect(
          (screen.getAllByRole('option')[2] as HTMLOptionElement).selected,
        ).toBe(false)

        // The version number passed to renderers (such as the EntityBadgeIcons) should be undefined
        await waitFor(() =>
          expect(mockEntityBadgeIcons).toHaveBeenLastCalledWith(
            expect.objectContaining({
              entityId: entityHeaders[0].id,
              versionNumber: undefined,
            }),
            expect.anything(),
          ),
        )
      })

      it('selects the correct version if one is selected', async () => {
        mockAllIsIntersecting(true)

        renderComponent({
          selectableTypes: [EntityType.FILE],
          visibleTypes: [EntityType.FILE],
          selected: Map([
            [entityHeaders[0].id, versionResult.results[1].versionNumber],
          ]),
        })
        expect(await screen.findByRole('listbox')).toBeDefined()

        expect(
          (screen.getAllByRole('option')[0] as HTMLOptionElement).selected,
        ).toBe(false)
        expect(
          (screen.getAllByRole('option')[1] as HTMLOptionElement).selected,
        ).toBe(false)
        expect(
          (screen.getAllByRole('option')[2] as HTMLOptionElement).selected,
        ).toBe(true)

        // The version number passed to renderers (such as the EntityBadgeIcons) should be the selected version
        await waitFor(() =>
          expect(mockEntityBadgeIcons).toHaveBeenLastCalledWith(
            expect.objectContaining({
              entityId: entityHeaders[0].id,
              versionNumber: versionResult.results[1].versionNumber,
            }),
            expect.anything(),
          ),
        )
      })

      it('automatically selects the first version if versionSelection is REQUIRED', async () => {
        mockAllIsIntersecting(true)

        renderComponent({
          selectableTypes: [EntityType.FILE],
          visibleTypes: [EntityType.FILE],
          selected: Map([[entityHeaders[0].id, NO_VERSION_NUMBER]]),
          versionSelection: VersionSelectionType.REQUIRED,
        })
        expect(await screen.findByRole('listbox')).toBeDefined()

        // Always Latest Version is not an option
        expect(screen.getAllByRole('option').length).toBe(2)

        expect(
          (screen.getAllByRole('option')[0] as HTMLOptionElement).selected,
        ).toBe(true)
        expect(
          (screen.getAllByRole('option')[1] as HTMLOptionElement).selected,
        ).toBe(false)

        expect(mockToggleSelection).toBeCalledWith({
          targetId: entityHeaders[0].id,
          targetVersionNumber: versionResult.results[0].versionNumber,
        })

        // The version number passed to renderers (such as the EntityBadgeIcons) should be the automatically selected version
        await waitFor(() =>
          expect(mockEntityBadgeIcons).toHaveBeenLastCalledWith(
            expect.objectContaining({
              entityId: entityHeaders[0].id,
              versionNumber: versionResult.results[0].versionNumber,
            }),
            expect.anything(),
          ),
        )
      })
    })
  })
})
