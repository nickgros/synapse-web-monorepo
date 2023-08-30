import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { SRC_SIGN_IN_CLASS } from '../../../utils/SynapseConstants'
import { CANCEL_BUTTON_TEXT } from '../../ConfirmationDialog/ConfirmationDialog'
import {
  CONFIRM_BUTTON_TEXT,
  DownloadLoginModal,
  DownloadLoginModalProps,
} from './DownloadLoginModal'

const mockCallback = jest.fn()

function createTestProps(
  overrides?: DownloadLoginModalProps,
): DownloadLoginModalProps {
  return {
    showModal: true,
    onHide: mockCallback,
    ...overrides,
  }
}

let props: DownloadLoginModalProps

function renderComponent(overrides?: DownloadLoginModalProps) {
  props = createTestProps(overrides)
  return render(<DownloadLoginModal {...props} />)
}

describe('DownloadLoginModal tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Has cancel button', async () => {
    renderComponent()
    const cancelButton = screen.getByRole('button', {
      name: CANCEL_BUTTON_TEXT,
    })

    await userEvent.click(cancelButton)

    expect(mockCallback).toHaveBeenCalledTimes(1)
  })
  it('Has sign in button', async () => {
    renderComponent()
    const signInButton = screen.getByRole('button', {
      name: CONFIRM_BUTTON_TEXT,
    })
    expect(signInButton.classList.contains(SRC_SIGN_IN_CLASS)).toBe(true)
    await userEvent.click(signInButton)

    expect(mockCallback).toHaveBeenCalledTimes(1)
  })
})
