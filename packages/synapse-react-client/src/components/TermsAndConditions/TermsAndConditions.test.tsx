import React from 'react'
import TermsAndConditions from './TermsAndConditions'
import SynapseClient from '../../synapse-client'
import { SynapseContextType } from '../../context'
import { QueryResultBundle } from '@sage-bionetworks/synapse-types'
import mockSyn51718002 from '../../mocks/query/syn51718002.json'
import { createWrapper } from '../../testutils/TestingLibraryUtils'
import { render, screen, waitFor } from '@testing-library/react'

const defaultProps = {
  onFormChange: vi.fn(),
}

async function renderComponent(wrapperProps?: SynapseContextType) {
  const wrapper = render(<TermsAndConditions {...defaultProps} />, {
    wrapper: createWrapper(wrapperProps),
  })

  // The items will be loaded when this text is available
  await waitFor(() => expect(screen.getAllByRole('checkbox')).toHaveLength(8))

  return wrapper
}
describe('Terms And Conditions: basic functionality', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(SynapseClient, 'getFullQueryTableResults').mockResolvedValue(
      mockSyn51718002 as QueryResultBundle,
    )
  })

  it('renders terms and condition without crashing', async () => {
    await renderComponent()
    expect(
      screen.findByText(
        'I will adhere to the Synapse Community Standards of inclusion and respect.',
        { exact: true },
      ),
    ).toBeDefined()
  })
})
