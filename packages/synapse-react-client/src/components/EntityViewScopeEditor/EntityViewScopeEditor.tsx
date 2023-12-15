import React, { useMemo } from 'react'
import EntityHeaderTable from '../EntityHeaderTable'
import { ReferenceList } from '@sage-bionetworks/synapse-types'
import { VersionSelectionType } from '../EntityFinder/VersionSelectionType'
import { FinderScope } from '../EntityFinder/tree/EntityTree'
import { EntityTypeGroup } from '../../utils/functions/EntityTypeUtils'

export type EntityViewScopeEditorProps = {
  scopeIds: string[]
  onChange: (scopeIds: string[]) => void
}

export default function EntityViewScopeEditor(
  props: EntityViewScopeEditorProps,
) {
  const { scopeIds } = props
  const references: ReferenceList = useMemo(
    () => scopeIds.map(scope => ({ targetId: scope })),
    [scopeIds],
  )

  console.log(references)

  return (
    <EntityHeaderTable
      references={references}
      isEditable={true}
      onUpdate={newReferences => {
        console.log(newReferences.map(ref => ref.targetId))
        props.onChange(newReferences.map(ref => ref.targetId))
      }}
      removeSelectedRowsButtonText={'Remove Selected Items from View Scope'}
      objectNameCopy={'container'}
      hideTextFieldToPasteValue={true}
      entityFinderConfiguration={{
        selectMultiple: true,
        versionSelection: VersionSelectionType.DISALLOWED,
        initialScope: FinderScope.ALL_PROJECTS,
        initialContainer: 'root',
        selectableTypes: EntityTypeGroup.CONTAINER,
      }}
    />
  )
}
