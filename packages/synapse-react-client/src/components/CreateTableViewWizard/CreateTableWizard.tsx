import React, { useCallback, useRef, useState } from 'react'
import TableNameForm from './TableNameForm'
import {
  ColumnModel,
  Entity,
  ENTITY_VIEW_TYPE_MASK_FILE,
  ENTITY_VIEW_TYPE_MASK_PROJECT,
  EntityType,
  ViewEntityType,
} from '@sage-bionetworks/synapse-types'
import TableTypeSelection from './TableTypeSelection'
import { Alert, Box, Button } from '@mui/material'
import { useCreateEntity } from '../../synapse-queries'
import { convertToConcreteEntityType } from '../../utils/functions/EntityTypeUtils'
import ViewTypeSelection from './ViewTypeSelection'
import TableColumnSchemaForm, {
  SubmitHandle,
} from '../TableColumnSchemaEditor/TableColumnSchemaForm'
import EntityViewScopeEditor from '../EntityViewScopeEditor/EntityViewScopeEditor'
import { SetOptional } from 'type-fest'
import SqlDefinedTableEditor from '../SqlDefinedTableEditor/SqlDefinedTableEditor'
import { useCreateColumnModels } from '../../synapse-queries/table/useColumnModel'
import EntityViewMaskEditor from '../EntityViewScopeEditor/EntityViewMaskEditor'
import { DialogBase } from '../DialogBase'
import {
  CreateTableViewWizardStep,
  getModalTitle,
  getPreviousStep,
  getStepAfterTypeSelection,
  isLastStep,
  maybeAddColumnIds,
  maybeAddDefiningSQL,
  maybeAddScopeIds,
  maybeAddViewTypeMask,
} from './CreateTableWizardUtils'

export type CreateTableViewWizardProps = {
  open: boolean
  parentId: string
  onCancel: () => void
  onComplete: (newEntityId: string) => void
}

/**
 * Wizard to create a Synapse table, view, dataset, or other table type.
 * @param props
 * @constructor
 */
export default function CreateTableWizard(props: CreateTableViewWizardProps) {
  const { open, parentId, onComplete, onCancel } = props
  const [step, setStep] =
    useState<CreateTableViewWizardStep>('CHOOSE_TABLE_TYPE')

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const [entityType, setEntityType] = useState<EntityType | undefined>(
    undefined,
  )

  const [scopeIds, setScopeIds] = useState<string[]>([])
  const [viewTypeMask, setViewTypeMask] = useState<number>(
    ENTITY_VIEW_TYPE_MASK_FILE,
  )
  const isProjectView = viewTypeMask === ENTITY_VIEW_TYPE_MASK_PROJECT

  const [columnModels, setColumnModels] = useState<
    SetOptional<ColumnModel, 'id'>[]
  >([])
  const columnSchemaFormRef = useRef<SubmitHandle>(null)

  const [sql, setSql] = useState('')

  const { mutateAsync: createEntity, error: createEntityError } =
    useCreateEntity()

  const { mutateAsync: createColumnModels, error: createColumnModelsError } =
    useCreateColumnModels()

  const onTableTypeSelected = useCallback(
    (entityType: EntityType, viewTypeMask?: number) => {
      setEntityType(entityType)
      if (viewTypeMask != null) {
        setViewTypeMask(viewTypeMask)
      }
      setStep(getStepAfterTypeSelection(entityType))
    },
    [],
  )

  const onViewSelected = useCallback(() => {
    setStep('CHOOSE_VIEW_TYPE')
  }, [])

  const onFinish = useCallback(async () => {
    if (!entityType) {
      console.error('entityType was not defined!')
      setStep('CHOOSE_TABLE_TYPE')
      return
    }
    // Create the column models
    let createdColumnModels: ColumnModel[] = []
    if (
      columnModels &&
      // Do not create columns if this is a SQL-defined view
      entityType !== EntityType.MATERIALIZED_VIEW &&
      entityType !== EntityType.VIRTUAL_TABLE
    ) {
      try {
        createdColumnModels = await createColumnModels(columnModels)
      } catch (e) {
        console.error('Error creating column models', e)
        return
      }
    }
    // Create the entity
    const entityToCreate: Entity = {
      name,
      description,
      parentId: parentId,
      concreteType: convertToConcreteEntityType(entityType),
    }

    maybeAddColumnIds(entityToCreate, entityType, createdColumnModels)
    maybeAddScopeIds(entityToCreate, entityType, scopeIds)
    maybeAddViewTypeMask(entityToCreate, entityType, viewTypeMask)
    maybeAddDefiningSQL(entityToCreate, entityType, sql)

    const entity = await createEntity(entityToCreate)
    onComplete(entity.id!)
  }, [
    columnModels,
    createColumnModels,
    createEntity,
    description,
    entityType,
    name,
    onComplete,
    parentId,
    scopeIds,
    sql,
    viewTypeMask,
  ])
  const onColumnSchemaSubmit = useCallback(
    (columnModels: SetOptional<ColumnModel, 'id'>[]) => {
      setColumnModels(columnModels)
      setStep('TABLE_NAME')
    },
    [],
  )

  const onColumnSchemaNextClicked = useCallback(() => {
    if (columnSchemaFormRef.current != null) {
      columnSchemaFormRef.current.submit()
    }
  }, [])

  const showBackButton = step !== 'CHOOSE_TABLE_TYPE'
  const showNextButton =
    step !== 'CHOOSE_TABLE_TYPE' && step !== 'CHOOSE_VIEW_TYPE'

  const onBackButtonClicked = useCallback(() => {
    setStep(getPreviousStep(step, entityType))
  }, [step, entityType])

  const onNextButtonClicked = useCallback(() => {
    if (step === 'TABLE_NAME' || step === 'TABLE_SQL') {
      onFinish()
    } else if (step === 'TABLE_COLUMNS') {
      onColumnSchemaNextClicked()
    } else if (
      step === 'ENTITY_VIEW_SCOPE' ||
      step === 'SUBMISSION_VIEW_SCOPE'
    ) {
      setStep('TABLE_COLUMNS')
    }
  }, [onColumnSchemaNextClicked, onFinish, step])

  return (
    <DialogBase
      open={open}
      onCancel={onCancel}
      maxWidth={'md'}
      title={getModalTitle(step, entityType)}
      content={
        <div>
          {/* TODO: Add a general transition effect */}
          {step === 'CHOOSE_TABLE_TYPE' && (
            <TableTypeSelection
              onTypeSelected={onTableTypeSelected}
              onViewSelected={onViewSelected}
            />
          )}
          {step === 'CHOOSE_VIEW_TYPE' && (
            <ViewTypeSelection onTypeSelected={onTableTypeSelected} />
          )}
          {step === 'ENTITY_VIEW_SCOPE' && (
            <>
              <EntityViewScopeEditor
                scopeIds={scopeIds}
                onChange={setScopeIds}
                isProjectView={isProjectView}
              />
              {!isProjectView && (
                <EntityViewMaskEditor
                  value={viewTypeMask}
                  onChange={setViewTypeMask}
                />
              )}
            </>
          )}

          {step === 'TABLE_COLUMNS' && entityType && (
            <TableColumnSchemaForm
              initialData={columnModels}
              entityType={entityType}
              ref={columnSchemaFormRef}
              onSubmit={onColumnSchemaSubmit}
              viewScope={
                entityType === EntityType.ENTITY_VIEW ||
                entityType === EntityType.SUBMISSION_VIEW
                  ? {
                      scope: scopeIds,
                      viewTypeMask,
                      viewEntityType: entityType as ViewEntityType,
                    }
                  : undefined
              }
            />
          )}
          {step === 'TABLE_SQL' && (
            <>
              <TableNameForm
                name={name}
                setName={setName}
                description={description}
                setDescription={setDescription}
              />
              <SqlDefinedTableEditor
                value={sql}
                onChange={e => setSql(e.target.value)}
                entityType={entityType}
              />
            </>
          )}
          {step === 'TABLE_NAME' && (
            <TableNameForm
              name={name}
              setName={setName}
              description={description}
              setDescription={setDescription}
            />
          )}
          {createEntityError && (
            <Alert sx={{ my: 2 }} severity="error">
              {createEntityError.message}
            </Alert>
          )}
          {createColumnModelsError && (
            <Alert sx={{ my: 2 }} severity="error">
              {createColumnModelsError.message}
            </Alert>
          )}
        </div>
      }
      actions={
        <Box display={'flex'} width={'100%'} gap={2.25} mt={2}>
          {showBackButton && (
            <Button variant={'outlined'} onClick={onBackButtonClicked}>
              Back
            </Button>
          )}
          <Box m={'auto'} />
          <Button variant={'outlined'} onClick={onCancel}>
            Cancel
          </Button>
          {showNextButton && (
            <Button variant={'contained'} onClick={onNextButtonClicked}>
              {isLastStep(step) ? 'Finish' : 'Next'}
            </Button>
          )}
        </Box>
      }
    />
  )
}
