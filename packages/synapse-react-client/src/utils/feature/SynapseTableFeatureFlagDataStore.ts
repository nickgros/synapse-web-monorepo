import { FeatureFlagDataStore } from './FeatureFlagDataStore'
import { FeatureFlagKey } from './FeatureFlagKey'
import SynapseClient from '../../synapse-client'
import {
  QueryBundleRequest,
  QueryResultBundle,
} from '@sage-bionetworks/synapse-types'
import { getFieldIndex } from '../functions/queryUtils'

const FEATURE_FLAG_KEY_COLUMN_NAME = 'featureFlagKey'
const FEATURE_FLAG_VALUE_COLUMN_NAME = 'enabled'

export class SynapseTableFeatureFlagDataStore implements FeatureFlagDataStore {
  private readonly entityId: string = ''
  private queryResultBundle: QueryResultBundle | undefined = undefined

  isWritableDataStore = false

  constructor(synapseTableId: string, accessToken: string | undefined) {
    this.entityId = synapseTableId
    const queryBundleRequest: QueryBundleRequest = {
      concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
      entityId: synapseTableId,
      query: {
        sql: `SELECT * FROM ${synapseTableId}`,
      },
      partMask: 1,
    }
    SynapseClient.getFullQueryTableResults(queryBundleRequest, accessToken)
      .then(result => {
        this.queryResultBundle = result
      })
      .catch(e => {
        console.error(
          `Could not fetch entity ID: ${synapseTableId} as a SynapseTableFeatureFlagDataStore. Experimental features will be disabled unless overridden locally. Received error:`,
          e,
        )
      })
  }
  getValue(key: FeatureFlagKey): boolean | undefined {
    if (!this.queryResultBundle) {
      return undefined
    }

    const keyIndex = getFieldIndex(
      FEATURE_FLAG_KEY_COLUMN_NAME,
      this.queryResultBundle,
    )
    if (keyIndex === -1) {
      console.error(
        `Could not find column ${FEATURE_FLAG_KEY_COLUMN_NAME} in ${this.entityId}`,
      )
      return undefined
    }

    const valueIndex = getFieldIndex(
      FEATURE_FLAG_VALUE_COLUMN_NAME,
      this.queryResultBundle,
    )
    if (valueIndex === -1) {
      console.error(
        `Could not find column ${FEATURE_FLAG_VALUE_COLUMN_NAME} in ${this.entityId}`,
      )
      return undefined
    }

    const row = this.queryResultBundle.queryResult?.queryResults?.rows.find(
      row => row.values[keyIndex] === key,
    )
    if (!row) {
      console.error(`Could not find row with key ${key} in ${this.entityId}`)
      return undefined
    }

    const value = row.values[valueIndex]
    if (value == null) {
      console.error(`Could not find value for key ${key} in ${this.entityId}`)
      return undefined
    }

    if (value === 'true') {
      return true
    } else if (value === 'false') {
      return false
    } else {
      console.error(
        `Expected 'true' or 'false' for key ${key} in ${this.entityId}. Found: ${value}`,
      )
      return undefined
    }
  }

  setValue(key: FeatureFlagKey, value: boolean) {
    throw new Error(
      'Cannot write to SynapseTableFeatureFlagDataStore as it is a read-only data store',
    )
  }
}
