import { FeatureFlagKey } from './FeatureFlagKey'
import SynapseClient from '../../synapse-client'
import { SynapseTableFeatureFlagDataStore } from './SynapseTableFeatureFlagDataStore'
import { QueryResultBundle } from '@sage-bionetworks/synapse-types'

const queryResultBundleWithFlagAsTrue: QueryResultBundle = {
  concreteType: 'org.sagebionetworks.repo.model.table.QueryResultBundle',
  queryResult: {
    concreteType: 'org.sagebionetworks.repo.model.table.QueryResult',
    queryResults: {
      concreteType: 'org.sagebionetworks.repo.model.table.RowSet',
      tableId: 'syn123',
      etag: 'c1159237-de97-47d0-9903-1647ee41de57',
      headers: [
        { name: 'featureFlagKey', columnType: 'STRING', id: '208171' },
        { name: 'enabled', columnType: 'BOOLEAN', id: '208172' },
      ],
      rows: [
        {
          rowId: 1,
          versionNumber: 1,
          values: [FeatureFlagKey._TEST_FLAG_ONLY, 'true'],
        },
      ],
    },
  },
}

const queryResultBundleWithFlagAsFalse: QueryResultBundle = {
  concreteType: 'org.sagebionetworks.repo.model.table.QueryResultBundle',
  queryResult: {
    concreteType: 'org.sagebionetworks.repo.model.table.QueryResult',
    queryResults: {
      concreteType: 'org.sagebionetworks.repo.model.table.RowSet',
      tableId: 'syn123',
      etag: 'c1159237-de97-47d0-9903-1647ee41de57',
      headers: [
        { name: 'featureFlagKey', columnType: 'STRING', id: '208171' },
        { name: 'enabled', columnType: 'BOOLEAN', id: '208172' },
      ],
      rows: [
        {
          rowId: 1,
          versionNumber: 1,
          values: [FeatureFlagKey._TEST_FLAG_ONLY, 'false'],
        },
      ],
    },
  },
}

const queryResultBundleWithFlagNotPresent: QueryResultBundle = {
  concreteType: 'org.sagebionetworks.repo.model.table.QueryResultBundle',
  queryResult: {
    concreteType: 'org.sagebionetworks.repo.model.table.QueryResult',
    queryResults: {
      concreteType: 'org.sagebionetworks.repo.model.table.RowSet',
      tableId: 'syn123',
      etag: 'c1159237-de97-47d0-9903-1647ee41de57',
      headers: [
        { name: 'featureFlagKey', columnType: 'STRING', id: '208171' },
        { name: 'enabled', columnType: 'BOOLEAN', id: '208172' },
      ],
      rows: [
        {
          rowId: 1,
          versionNumber: 1,
          values: ['someOtherKey', 'false'],
        },
      ],
    },
  },
}

const queryResultBundleWithFlagValueNull: QueryResultBundle = {
  concreteType: 'org.sagebionetworks.repo.model.table.QueryResultBundle',
  queryResult: {
    concreteType: 'org.sagebionetworks.repo.model.table.QueryResult',
    queryResults: {
      concreteType: 'org.sagebionetworks.repo.model.table.RowSet',
      tableId: 'syn123',
      etag: 'c1159237-de97-47d0-9903-1647ee41de57',
      headers: [
        { name: 'featureFlagKey', columnType: 'STRING', id: '208171' },
        { name: 'enabled', columnType: 'BOOLEAN', id: '208172' },
      ],
      rows: [
        {
          rowId: 1,
          versionNumber: 1,
          values: [FeatureFlagKey._TEST_FLAG_ONLY, null],
        },
      ],
    },
  },
}

const queryResultBundleWithIncorrectColumnName: QueryResultBundle = {
  concreteType: 'org.sagebionetworks.repo.model.table.QueryResultBundle',
  queryResult: {
    concreteType: 'org.sagebionetworks.repo.model.table.QueryResult',
    queryResults: {
      concreteType: 'org.sagebionetworks.repo.model.table.RowSet',
      tableId: 'syn123',
      etag: 'c1159237-de97-47d0-9903-1647ee41de57',
      headers: [
        { name: 'wrongColumnName', columnType: 'STRING', id: '208171' },
        { name: 'enabled', columnType: 'BOOLEAN', id: '208172' },
      ],
      rows: [
        {
          rowId: 1,
          versionNumber: 1,
          values: [FeatureFlagKey._TEST_FLAG_ONLY, null],
        },
      ],
    },
  },
}

const mockGetFullTableQueryResults = jest.spyOn(
  SynapseClient,
  'getFullQueryTableResults',
)

function createDataStore() {
  return new SynapseTableFeatureFlagDataStore('syn123', 'fake token')
}

describe('SynapseTableFeatureFlagDataStore', () => {
  it('Is not writable', () => {
    const synapseTableFeatureFlagDataStore = createDataStore()
    expect(synapseTableFeatureFlagDataStore.isWritableDataStore).toBe(false)
  })
  it("Returns true if the flag is 'true' in the table", () => {
    mockGetFullTableQueryResults.mockResolvedValue(
      queryResultBundleWithFlagAsTrue,
    )
    const synapseTableFeatureFlagDataStore = createDataStore()
    expect(
      synapseTableFeatureFlagDataStore.getValue(FeatureFlagKey._TEST_FLAG_ONLY),
    ).toBe(true)
  })
  it("Returns false if the flag is 'false' in the table", () => {
    mockGetFullTableQueryResults.mockResolvedValue(
      queryResultBundleWithFlagAsFalse,
    )
    const synapseTableFeatureFlagDataStore = createDataStore()

    expect(
      synapseTableFeatureFlagDataStore.getValue(FeatureFlagKey._TEST_FLAG_ONLY),
    ).toBe(false)
  })
  it('Returns undefined if the flag cannot be found in the table', () => {
    mockGetFullTableQueryResults.mockResolvedValue(
      queryResultBundleWithFlagNotPresent,
    )
    const synapseTableFeatureFlagDataStore = createDataStore()

    expect(
      synapseTableFeatureFlagDataStore.getValue(FeatureFlagKey._TEST_FLAG_ONLY),
    ).toBe(undefined)
  })
  it('Returns undefined if the value is null in the table', () => {
    mockGetFullTableQueryResults.mockResolvedValue(
      queryResultBundleWithFlagValueNull,
    )
    const synapseTableFeatureFlagDataStore = createDataStore()

    expect(
      synapseTableFeatureFlagDataStore.getValue(FeatureFlagKey._TEST_FLAG_ONLY),
    ).toBe(undefined)
  })
  it('Returns undefined if a column cannot be found in the table', () => {
    mockGetFullTableQueryResults.mockResolvedValue(
      queryResultBundleWithIncorrectColumnName,
    )
    const synapseTableFeatureFlagDataStore = createDataStore()

    expect(
      synapseTableFeatureFlagDataStore.getValue(FeatureFlagKey._TEST_FLAG_ONLY),
    ).toBe(undefined)
  })
})
