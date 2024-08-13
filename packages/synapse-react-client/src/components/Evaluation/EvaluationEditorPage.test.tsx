import { render, screen, act } from '@testing-library/react'
import React from 'react'
import { EvaluationEditor } from './EvaluationEditor'
import {
  EvaluationEditorPage,
  EvaluationEditorPageProps,
} from './EvaluationEditorPage'
import { createWrapper } from '../../testutils/TestingLibraryUtils'

vi.mock('../../../src/components/Evaluation/EvaluationRoundEditorList', () => ({
  EvaluationRoundEditorList: vi.fn(props => (
    <div data-testid="EvaluationRoundEditorList" />
  )),
}))

vi.mock('../../../src/components/Evaluation/EvaluationEditor', () => ({
  EvaluationEditor: vi.fn(props => <div data-testid="EvaluationEditor" />),
}))

const mockEvaluationEditor = vi.mocked(EvaluationEditor)

function renderComponent(props: EvaluationEditorPageProps) {
  return render(<EvaluationEditorPage {...props} />, {
    wrapper: createWrapper(),
  })
}

describe('test EvaluationEditorPage', () => {
  let mockOnDeleteSuccess: () => void

  beforeEach(() => {
    mockOnDeleteSuccess = vi.fn()
  })

  it('Test creating new Evaluation page -- no EvaluationRoundEditorList shown', () => {
    renderComponent({
      entityId: 'syn123',
      onDeleteSuccess: mockOnDeleteSuccess,
    })

    expect(
      screen.queryByTestId('EvaluationRoundEditorList'),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('FakeEvaluationRoundEditorList'),
    ).toBeInTheDocument()

    //simulate a successful "save" (i.e. creation of Evaluation)
    const fakeEvaluationId = '123456'
    const onSaveSuccessCallback =
      mockEvaluationEditor.mock.calls[0][0].onSaveSuccess
    expect(onSaveSuccessCallback).not.toBeNull()
    act(() => {
      onSaveSuccessCallback!(fakeEvaluationId)
    })

    // now that the Evaluation has been "saved", we should be able to edit its Evaluation Rounds
    expect(
      screen.queryByTestId('EvaluationRoundEditorList'),
    ).toBeInTheDocument()
    expect(
      screen.queryByTestId('FakeEvaluationRoundEditorList'),
    ).not.toBeInTheDocument()
  })

  it('Test editing existing Evaluation page -- EvaluationRoundEditorList is shown', () => {
    renderComponent({
      evaluationId: '1122334455',
      onDeleteSuccess: mockOnDeleteSuccess,
    })

    expect(
      screen.queryByTestId('EvaluationRoundEditorList'),
    ).toBeInTheDocument()
    expect(
      screen.queryByTestId('FakeEvaluationRoundEditorList'),
    ).not.toBeInTheDocument()
  })
})
