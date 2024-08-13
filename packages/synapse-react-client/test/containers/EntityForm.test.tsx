import { render } from '@testing-library/react'
import React from 'react'
import EntityForm, {
  EntityFormProps,
} from '../../src/components/EntityForm/EntityForm'
import { createWrapper } from '../../src/testutils/TestingLibraryUtils'
import { mockFileEntity } from '../../src/mocks/entity/mockEntity'
import { mockUserProfileData } from '../../src/mocks/user/mock_user_profile'
import SynapseClient from '../../src/synapse-client'

describe('EntityForm', () => {
  vi.spyOn(SynapseClient, 'getUserProfile').mockResolvedValue(
    mockUserProfileData,
  )
  const targetFolderId = 'syn9988882982'
  vi.spyOn(SynapseClient, 'lookupChildEntity').mockResolvedValue({
    id: targetFolderId,
  })
  vi.spyOn(SynapseClient, 'getFileResult').mockResolvedValue({
    presignedUrl: 'presigned-url',
  })
  vi.spyOn(SynapseClient, 'getFileHandleContent').mockResolvedValue('{}')
  vi.spyOn(SynapseClient, 'getEntity').mockResolvedValue(mockFileEntity)

  const parentContainerId: string = 'syn20355732'
  const formSchemaEntityId: string = 'syn20184776'
  const formUiSchemaEntityId: string = 'syn20184771'
  const initFormData: boolean = false
  const synIdCallback = vi.fn()
  const props: EntityFormProps = {
    parentContainerId,
    formSchemaEntityId,
    formUiSchemaEntityId,
    initFormData,
    synIdCallback,
  }

  it('renders Form', () => {
    const { container } = render(<EntityForm {...props} />, {
      wrapper: createWrapper(),
    })
    const form = container.querySelector('form')
    expect(form).toBeDefined()
  })
})
