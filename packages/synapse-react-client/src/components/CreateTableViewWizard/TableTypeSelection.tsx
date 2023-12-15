import React from 'react'
import {
  ENTITY_VIEW_TYPE_MASK_PROJECT,
  EntityType,
} from '@sage-bionetworks/synapse-types'
import WizardChoiceButtonGroup from '../WizardChoiceButton/WizardChoiceButtonGroup'
import WizardChoiceButton from '../WizardChoiceButton/WizardChoiceButton'

type TableTypeSelectionProps = {
  /* Callback including the chosen type, and optional viewTypeMask if included in the choice (e.g. Project Views) */
  onTypeSelected: (type: EntityType, viewTypeMask?: number) => void
}

/**
 * React component for the first step of creating a new table or view.
 * Renders UI to provide the name and description of a table or view.
 *
 * If this is a view, the user can also select the scope of the view.
 */
export default function TableTypeSelection(props: TableTypeSelectionProps) {
  const { onTypeSelected } = props
  return (
    <WizardChoiceButtonGroup>
      <WizardChoiceButton
        title={'Table'}
        description={'Make a table'}
        onClick={() => {
          onTypeSelected(EntityType.TABLE)
        }}
      />
      <WizardChoiceButton
        title={'File or Folder View'}
        description={'Make a view'}
        onClick={() => {
          onTypeSelected(EntityType.ENTITY_VIEW)
        }}
      />
      <WizardChoiceButton
        title={'Project View'}
        description={'Make a view'}
        onClick={() => {
          onTypeSelected(EntityType.ENTITY_VIEW, ENTITY_VIEW_TYPE_MASK_PROJECT)
        }}
      />
      <WizardChoiceButton
        title={'Materialized View'}
        description={'Make a materialized view'}
        onClick={() => {
          onTypeSelected(EntityType.MATERIALIZED_VIEW)
        }}
      />
      <WizardChoiceButton
        title={'Virtual Table'}
        description={'Make a virtual table'}
        onClick={() => {
          onTypeSelected(EntityType.VIRTUAL_TABLE)
        }}
      />
    </WizardChoiceButtonGroup>
  )
}
