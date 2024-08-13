import { render, screen, waitFor } from '@testing-library/react'
import _ from 'lodash-es'
import React from 'react'
import * as SynapseFormModule from '../../../src/components/SynapseForm/SynapseForm'
import { SynapseFormProps } from '../../../src/components/SynapseForm/SynapseForm'
import * as SynapseFormUtils from '../../../src/components/SynapseForm/SynapseFormUtils'
import SynapseFormWrapper, {
  SynapseFormWrapperProps,
  UploadToolSearchParams,
} from '../../../src/components/SynapseForm/SynapseFormWrapper'
import { createWrapper } from '../../../src/testutils/TestingLibraryUtils'
import SynapseClient from '../../../src/synapse-client'
import mockFileEntityData from '../../../src/mocks/entity/mockFileEntity'
import {
  mockFileEntityWithVersion,
  mockFormData,
  mockFormSchema as formschemaJson,
} from '../../../src/mocks/mock_drug_tool_data'
import { mockFileHandle } from '../../../src/mocks/mock_file_handle'

let onSaveCaptor: SynapseFormProps['onSave'] | undefined = undefined
let onSubmitCaptor: SynapseFormProps['onSubmit'] | undefined = undefined

const mockSynapseForm = vi
  .spyOn(SynapseFormModule, 'default')
  .mockImplementation((props: SynapseFormProps) => {
    onSaveCaptor = props.onSave
    onSubmitCaptor = props.onSubmit
    return <div data-testid="SynapseForm" />
  })

const mockFileEntity = mockFileEntityData.entity
const token: string = '123444'
const formSchemaEntityId = 'syn9988882982'
const formUiSchemaEntityId = 'syn9988882983'
const formNavSchemaEntityId = 'syn9988882984'
const formDataId = 'syn9988882985'
const formGroupId = 'syn9988882986'
const dataFileHandleId = '43157'
const searchParams: UploadToolSearchParams = {
  formGroupId,
}
const fileNamePath = 'somescreen.somefield'
const formTitle = 'my submission'
const formClass = 'someFormClass'

const renderComponent = (props: SynapseFormWrapperProps) => {
  return render(<SynapseFormWrapper {...props} />, {
    wrapper: createWrapper(),
  })
}
const props: SynapseFormWrapperProps = {
  token,
  formSchemaEntityId,
  formUiSchemaEntityId,
  formNavSchemaEntityId,
  searchParams,
  fileNamePath,
  formTitle,
  formClass,
}

describe('SynapseFormWrapper', () => {
  beforeEach(() => {
    vi.spyOn(SynapseClient, 'getFileResult').mockResolvedValue(mockFileHandle)
    vi.spyOn(SynapseClient, 'getFileHandleContent').mockResolvedValue(
      JSON.stringify(formschemaJson),
    )

    vi.spyOn(SynapseClient, 'uploadFile').mockResolvedValue(mockFileEntity)
    vi.spyOn(SynapseClient, 'getEntity').mockResolvedValue(mockFileEntity)
    vi.spyOn(SynapseClient, 'createEntity').mockResolvedValue('123444')
    vi.spyOn(SynapseClient, 'getFileHandleContentFromID').mockResolvedValue(
      mockFormData,
    )

    vi.clearAllMocks()
  })

  test('gets configuration data calls should be called with correct params', async () => {
    renderComponent(props)
    await waitFor(() => {
      expect(SynapseClient.getEntity).toHaveBeenNthCalledWith(
        1,
        token,
        'syn9988882982',
        undefined,
      )
      expect(SynapseClient.getEntity).toHaveBeenNthCalledWith(
        2,
        token,
        'syn9988882983',
        undefined,
      )
      expect(SynapseClient.getEntity).toHaveBeenNthCalledWith(
        3,
        token,
        'syn9988882984',
        undefined,
      )
      expect(SynapseClient.getFileResult).toHaveBeenCalledWith(
        mockFileEntity,
        token,
        true,
        true,
      )
    })
  })

  describe('if there is no datafile (no formDataId)', () => {
    test('should make 3 calls to getFileEntityData', async () => {
      const getFileEntityData = vi.spyOn(SynapseFormUtils, 'getFileEntityData')
      const getFileHandleContentFromID = vi.spyOn(
        SynapseClient,
        'getFileHandleContentFromID',
      )

      renderComponent(props)

      await waitFor(() => {
        expect(getFileEntityData).toHaveBeenCalledTimes(3)
        expect(getFileHandleContentFromID).not.toHaveBeenCalled()
      })
    })

    test('should populate formData with metadata', async () => {
      vi.spyOn(SynapseClient, 'getEntity').mockResolvedValue(
        mockFileEntityWithVersion,
      )

      renderComponent(props)

      await waitFor(() => expect(SynapseClient.getEntity).toHaveBeenCalled())
    })
  })

  describe('if there is a datafile (formDataId)', () => {
    test('should make 4 calls to getFileEntityData', async () => {
      const _props = {
        ...props,
        ...{ searchParams: { formGroupId, formDataId, dataFileHandleId } },
      }

      const getFileEntityData = vi.spyOn(SynapseFormUtils, 'getFileEntityData')
      vi.spyOn(SynapseClient, 'getFileHandleContentFromID').mockResolvedValue(
        JSON.stringify(mockFormData),
      )

      const getFileHandleContentFromID = vi.spyOn(
        SynapseClient,
        'getFileHandleContentFromID',
      )

      renderComponent(_props)

      await waitFor(() => {
        expect(getFileEntityData).toHaveBeenCalledTimes(3)
        expect(getFileHandleContentFromID).toHaveBeenCalled()
        expect(getFileEntityData).not.toHaveBeenCalledWith(
          token,
          formSchemaEntityId,
          mockFormData.metadata.formSchemaVersion,
        )
        expect(getFileEntityData).toHaveBeenCalledWith(
          token,
          formSchemaEntityId,
          undefined,
          expect.anything(),
        )
      })
    })

    test('if the form is submitted it should pull the schemas with appropriate versions', async () => {
      const _props = {
        ...props,
        ...{
          searchParams: {
            formGroupId,
            formDataId,
            dataFileHandleId,
            submitted: true,
          },
        },
      }

      const getFileEntityData = vi.spyOn(SynapseFormUtils, 'getFileEntityData')
      vi.spyOn(SynapseClient, 'getFileHandleContentFromID').mockResolvedValue(
        JSON.stringify(mockFormData),
      )

      renderComponent(_props)

      await waitFor(() => {
        expect(getFileEntityData).toHaveBeenCalledTimes(3)
        expect(getFileEntityData).toHaveBeenCalledWith(
          token,
          formSchemaEntityId,
          mockFormData.metadata.formSchemaVersion,
          expect.anything(),
        )
        expect(getFileEntityData).not.toHaveBeenCalledWith(
          token,
          formSchemaEntityId,
          undefined,
        )
      })
    })
  })

  describe('pass params', () => {
    test('should pass parameters correctly', async () => {
      const _props = {
        ...props,
        ...{ searchParams: { formGroupId, formDataId }, isWizardMode: true },
      }
      renderComponent(_props)

      await screen.findByTestId('SynapseForm')

      expect(mockSynapseForm).toBeCalledWith(
        expect.objectContaining({
          formTitle: props.formTitle,
          isWizardMode: true,
        }),
        expect.anything(),
      )
    })

    test('should pass parameters correctly non wizard mode', async () => {
      const _props = { ...props, ...{ formTitle: 'Another Title' } }
      renderComponent(_props)

      await screen.findByTestId('SynapseForm')

      expect(mockSynapseForm).toBeCalledWith(
        expect.objectContaining({
          formTitle: 'Another Title',
          formData: expect.objectContaining({
            metadata: expect.anything(),
          }),
          isWizardMode: undefined,
        }),
        expect.anything(),
      )
    })
  })

  describe('saving data file', () => {
    test('should CREATE formData if there is not a formDataId', async () => {
      vi.spyOn(SynapseClient, 'uploadFile').mockResolvedValue({
        fileHandleId: '123',
      })

      const create = vi
        .spyOn(SynapseClient, 'createFormData')
        .mockResolvedValue(JSON.stringify(formschemaJson))

      const update = vi
        .spyOn(SynapseClient, 'updateFormData')
        .mockResolvedValue(JSON.stringify(formschemaJson))

      const formData = _.cloneDeep(formschemaJson)
      _.set(formData, props.fileNamePath, 'someName')

      renderComponent(props)

      await screen.findByTestId('SynapseForm')

      // Call under test -- call onSave
      onSaveCaptor(formData)

      await waitFor(() => {
        expect(create).toHaveBeenCalled()
        expect(update).not.toHaveBeenCalled()
      })
    })

    test('should UPDATE formData if there is formDataId', async () => {
      const _props = {
        ...props,
        ...{ searchParams: { formGroupId, formDataId } },
      }
      vi.spyOn(SynapseClient, 'uploadFile').mockResolvedValue({
        fileHandleId: '123',
      })
      const create = vi
        .spyOn(SynapseClient, 'createFormData')
        .mockResolvedValue(JSON.stringify(formschemaJson))
      const update = vi
        .spyOn(SynapseClient, 'updateFormData')
        .mockResolvedValue(JSON.stringify(formschemaJson))

      const formData = _.cloneDeep(formschemaJson)
      _.set(formData, props.fileNamePath, 'someName')

      renderComponent(_props)

      await screen.findByTestId('SynapseForm')

      // Call under test -- call onSave
      onSaveCaptor(formData)

      await waitFor(() => {
        expect(create).not.toHaveBeenCalled()
        expect(update).toHaveBeenCalled()
      })
    })
  })

  describe('submitting data file', () => {
    test('should create formData if there is not and ID', async () => {
      vi.spyOn(SynapseClient, 'uploadFile').mockResolvedValue({
        fileHandleId: '123',
      })

      const submit = vi
        .spyOn(SynapseClient, 'submitFormData')
        .mockResolvedValue(JSON.stringify(formschemaJson))

      const formData = _.cloneDeep(formschemaJson)
      _.set(formData, props.fileNamePath, 'someName')

      renderComponent(props)

      await screen.findByTestId('SynapseForm')

      // Call under test -- call onSubmit
      onSubmitCaptor(formData)

      await waitFor(() => expect(submit).toHaveBeenCalled())
    })
  })
})
