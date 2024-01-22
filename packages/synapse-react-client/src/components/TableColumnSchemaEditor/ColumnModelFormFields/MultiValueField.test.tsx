import React from 'react'
import { getJsonSchemaItemDefinitionForColumnType } from '../TableColumnSchemaEditorUtils'
import { JSONSchema7Definition } from 'json-schema'
import MultiValueField, { MultiValueFieldProps } from './MultiValueField'
import { act, render, screen, waitFor } from '@testing-library/react'
import { createWrapper } from '../../../testutils/TestingLibraryUtils'
import { ColumnTypeEnum } from '@sage-bionetworks/synapse-types'
import JSONArrayEditorModal from '../../JSONArrayEditor/JSONArrayEditorModal'
import userEvent from '@testing-library/user-event'

const stringDefinition: JSONSchema7Definition = {
  type: 'string',
}
const integerDefinition: JSONSchema7Definition = {
  type: 'integer',
}
const floatDefinition: JSONSchema7Definition = {
  type: 'number',
}

jest.mock('../TableColumnSchemaEditorUtils', () => {
  return {
    getJsonSchemaItemDefinitionForColumnType: jest.fn(),
  }
})

jest.mock('../../JSONArrayEditor/JSONArrayEditorModal', () => {
  return {
    __esModule: true,
    default: jest
      .fn()
      .mockReturnValue(<div data-testid={'JSONArrayEditorModal'} />),
  }
})

const mockGetJsonSchemaDefinition = jest.mocked(
  getJsonSchemaItemDefinitionForColumnType,
)
const mockJsonArrayEditorModal = jest.mocked(JSONArrayEditorModal)

function renderComponent(props: MultiValueFieldProps) {
  return render(<MultiValueField {...props} />, {
    wrapper: createWrapper(),
  })
}

describe('RestrictedValuesField', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('interactions and calls to dependencies', async () => {
    mockGetJsonSchemaDefinition.mockReturnValue(stringDefinition)
    const onChange = jest.fn()
    renderComponent({
      columnType: ColumnTypeEnum.STRING,
      onChange,
      value: ['foo', 'bar'],
    })

    await screen.findByTestId('JSONArrayEditorModal')
    const textField = await screen.findByRole('textbox')
    expect(textField).toHaveValue('foo, bar')

    expect(mockGetJsonSchemaDefinition).toHaveBeenCalledWith(
      ColumnTypeEnum.STRING,
    )
    await waitFor(() =>
      expect(mockJsonArrayEditorModal).toHaveBeenCalledWith(
        expect.objectContaining({
          arrayItemDefinition: stringDefinition,
          value: ['foo', 'bar'],
          isShowingModal: false,
        }),
        expect.anything(),
      ),
    )

    // Click the text field and the modal will be shown
    await userEvent.click(textField)

    await waitFor(() =>
      expect(mockJsonArrayEditorModal).toHaveBeenCalledWith(
        expect.objectContaining({
          isShowingModal: true,
        }),
        expect.anything(),
      ),
    )

    // Invoke the modal's onCancel and the modal will be hidden
    act(() => {
      mockJsonArrayEditorModal.mock.lastCall![0].onCancel()
    })
    await waitFor(() =>
      expect(mockJsonArrayEditorModal).toHaveBeenCalledWith(
        expect.objectContaining({
          isShowingModal: false,
        }),
        expect.anything(),
      ),
    )

    // Show the modal one more time so we can call onChange
    await userEvent.click(textField)

    await waitFor(() =>
      expect(mockJsonArrayEditorModal).toHaveBeenCalledWith(
        expect.objectContaining({
          isShowingModal: true,
        }),
        expect.anything(),
      ),
    )

    // Invoke onConfirm. Verify the callback is called and the modal is hidden
    act(() => {
      mockJsonArrayEditorModal.mock.lastCall![0].onConfirm(['baz', 'qux'])
    })
    await waitFor(() => {
      expect(mockJsonArrayEditorModal).toHaveBeenCalledWith(
        expect.objectContaining({
          isShowingModal: false,
        }),
        expect.anything(),
      )

      expect(onChange).toHaveBeenCalledWith(['baz', 'qux'])
    })
  })
  describe('handles non-string types', () => {
    test('integer', async () => {
      mockGetJsonSchemaDefinition.mockReturnValue(integerDefinition)
      const onChange = jest.fn()
      renderComponent({
        columnType: ColumnTypeEnum.INTEGER,
        onChange,
        value: ['-1', '0', '1', '2'],
      })

      await screen.findByTestId('JSONArrayEditorModal')
      const textField = await screen.findByRole('textbox')
      expect(textField).toHaveValue('-1, 0, 1, 2')

      expect(mockGetJsonSchemaDefinition).toHaveBeenCalledWith(
        ColumnTypeEnum.INTEGER,
      )
      await waitFor(() =>
        expect(mockJsonArrayEditorModal).toHaveBeenCalledWith(
          expect.objectContaining({
            arrayItemDefinition: integerDefinition,
            value: [-1, 0, 1, 2],
            isShowingModal: false,
          }),
          expect.anything(),
        ),
      )

      // Click the text field and the modal will be shown
      await userEvent.click(textField)

      await waitFor(() =>
        expect(mockJsonArrayEditorModal).toHaveBeenCalledWith(
          expect.objectContaining({
            isShowingModal: true,
          }),
          expect.anything(),
        ),
      )

      // Invoke onConfirm with integers
      act(() => {
        mockJsonArrayEditorModal.mock.lastCall![0].onConfirm([-1, 0, 2])
      })
      await waitFor(() => {
        expect(mockJsonArrayEditorModal).toHaveBeenCalledWith(
          expect.objectContaining({
            isShowingModal: false,
          }),
          expect.anything(),
        )

        expect(onChange).toHaveBeenCalledWith(['-1', '0', '2'])
      })
    })
  })
  test('float', async () => {
    mockGetJsonSchemaDefinition.mockReturnValue(floatDefinition)
    const onChange = jest.fn()
    renderComponent({
      columnType: ColumnTypeEnum.DOUBLE,
      onChange,
      value: ['1e12', '1e-12', '0', '1.234', 'Infinity', '-Infinity', 'NaN'],
    })

    await screen.findByTestId('JSONArrayEditorModal')
    const textField = await screen.findByRole('textbox')
    expect(textField).toHaveValue(
      '1e12, 1e-12, 0, 1.234, Infinity, -Infinity, NaN',
    )

    expect(mockGetJsonSchemaDefinition).toHaveBeenCalledWith(
      ColumnTypeEnum.DOUBLE,
    )
    await waitFor(() =>
      expect(mockJsonArrayEditorModal).toHaveBeenCalledWith(
        expect.objectContaining({
          arrayItemDefinition: floatDefinition,
          value: [
            expect.closeTo(1e12),
            expect.closeTo(1e-12),
            0,
            1.234,
            'Infinity',
            '-Infinity',
            'NaN',
          ],
          isShowingModal: false,
        }),
        expect.anything(),
      ),
    )

    // Click the text field and the modal will be shown
    await userEvent.click(textField)

    await waitFor(() =>
      expect(mockJsonArrayEditorModal).toHaveBeenCalledWith(
        expect.objectContaining({
          isShowingModal: true,
        }),
        expect.anything(),
      ),
    )

    // Invoke onConfirm with integers
    act(() => {
      mockJsonArrayEditorModal.mock.lastCall![0].onConfirm([
        1e12,
        1e-12,
        0,
        1.234,
        Infinity,
        -Infinity,
        NaN,
      ])
    })
    await waitFor(() => {
      expect(mockJsonArrayEditorModal).toHaveBeenCalledWith(
        expect.objectContaining({
          isShowingModal: false,
        }),
        expect.anything(),
      )

      expect(onChange).toHaveBeenCalledWith([
        '1000000000000',
        '1e-12',
        '0',
        '1.234',
        'Infinity',
        '-Infinity',
        'NaN',
      ])
    })
  })
  test.todo('date')
})
