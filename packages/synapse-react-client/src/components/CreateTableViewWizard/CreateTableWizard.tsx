import React, { useCallback, useMemo, useState } from 'react'
import TableNameForm from './TableNameForm'
import { ColumnModel, EntityType } from '@sage-bionetworks/synapse-types'
import TableTypeSelection from './TableTypeSelection'
import { Alert, Box, Button, Slide } from '@mui/material'
import { useCreateEntity } from '../../synapse-queries'
import { convertToConcreteEntityType } from '../../utils/functions/EntityTypeUtils'

type CreateTableViewWizardProps = {
  parentId: string
}

type CreateTableViewWizardStep =
  | 'CHOOSE_TABLE_TYPE'
  | 'TABLE_NAME'
  | 'TABLE_COLUMNS'
  | 'ENTITY_VIEW_SCOPE'
  | 'SUBMISSION_VIEW_SCOPE'
  | 'TABLE_SQL'

/**
 * Wizard to create a Synapse table, view, dataset, or other table type.
 * @param props
 * @constructor
 */
export default function CreateTableWizard(props: CreateTableViewWizardProps) {
  const [step, setStep] =
    useState<CreateTableViewWizardStep>('CHOOSE_TABLE_TYPE')

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const [entityType, setEntityType] = useState<EntityType | undefined>(
    undefined,
  )

  const [scopeIds, setScopeIds] = useState<string[]>([])
  const [viewTypeMask, setViewTypeMask] = useState<number | undefined>(
    undefined,
  )

  const [columnModels, setColumnModels] = useState<ColumnModel[]>([])

  const { mutateAsync: createEntity, error: createEntityError } =
    useCreateEntity()

  const onTableTypeSelected = useCallback(
    (entityType: EntityType, viewTypeMask?: number) => {
      setEntityType(entityType)
      setViewTypeMask(viewTypeMask)
      setStep('TABLE_NAME')
    },
    [],
  )

  const getStepAfterName = useCallback(() => {
    if (entityType === EntityType.TABLE) {
      return 'TABLE_COLUMNS'
    }
    if (entityType === EntityType.ENTITY_VIEW) {
      return 'ENTITY_VIEW_SCOPE'
    }
    if (entityType === EntityType.SUBMISSION_VIEW) {
      return 'SUBMISSION_VIEW_SCOPE'
    }
    if (
      entityType === EntityType.MATERIALIZED_VIEW ||
      entityType === EntityType.VIRTUAL_TABLE
    ) {
      return 'TABLE_SQL'
    }
  }, [entityType])

  const onTableNameComplete = useCallback(async () => {
    if (!entityType) {
      console.error('entityType was not defined!')
      setStep('CHOOSE_TABLE_TYPE')
    } else {
      // TODO: include view scope?
      // Create the table -- we must create it at this step in case the name conflicts with another in the same parent
      try {
        await createEntity({
          name,
          description,
          parentId: props.parentId,
          concreteType: convertToConcreteEntityType(entityType),
        })
        // If there's no error, go to the next step
        setStep(getStepAfterName())
      } catch (e) {
        console.error(e)
      }
    }
  }, [description, entityType, name, props.parentId])

  const showNextButton = step === 'TABLE_NAME'

  const onNextButtonClicked = useCallback(() => {
    if (step === 'TABLE_NAME') {
      onTableNameComplete()
    }
  }, [onTableNameComplete, step])

  return (
    <div>
      <Slide
        direction={'right'}
        in={step === 'CHOOSE_TABLE_TYPE'}
        mountOnEnter
        unmountOnExit
      >
        <div>
          <TableTypeSelection onTypeSelected={onTableTypeSelected} />
        </div>
      </Slide>
      <Slide
        direction={'right'}
        in={step === 'TABLE_NAME'}
        mountOnEnter
        unmountOnExit
      >
        <Box>
          <TableNameForm
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
          />
        </Box>
      </Slide>
      {createEntityError && (
        <Alert sx={{ my: 2 }} severity="error">
          {createEntityError.message}
        </Alert>
      )}

      {showNextButton && (
        <Box display={'flex'} justifyContent={'end'}>
          <Button
            variant={'contained'}
            sx={{ ml: 'auto' }}
            onClick={onNextButtonClicked}
          >
            Next
          </Button>
        </Box>
      )}
    </div>
  )
}
