import { SynapseConfig } from 'types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import { peopleSql } from '../resources'

const rgbIndex = 2

const people: SynapseConfig = {
  name: 'QueryWrapperPlotNav',
  props: {
    rgbIndex,
    sql: peopleSql,
    name: 'People',
    shouldDeepLink: true,
    cardConfiguration: {
      type: SynapseConstants.MEDIUM_USER_CARD,
    },
    searchConfiguration: {
      searchable: [
        'firstName',
        'lastName',
        'institution',
        'program',
        'grantNumber',
      ],
    },
    facetsToPlot: [
      'institution',
      'grantNumber',
      // 'Program',
    ],
  },
}

export default people
