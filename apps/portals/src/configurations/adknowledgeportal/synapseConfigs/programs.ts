import { SynapseConstants } from 'synapse-react-client'
import type { CardConfiguration } from '../../../../../../packages/synapse-react-client/src/components/CardContainerLogic'

export const programCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: {
    type: 'Program',
    title: 'Full Name',
    subTitle: 'Short Description',
    icon: 'Program',
    secondaryLabels: ['More Information'],
    imageFileHandleColumnName: 'Details Page Image',
  },
  titleLinkConfig: {
    isMarkdown: false,
    baseURL: 'Explore/Programs/DetailsPage',
    URLColumnName: 'Program',
    matchColumnName: 'Program',
  },
  secondaryLabelLimit: 4,
  labelLinkConfig: [
    {
      isMarkdown: false,
      matchColumnName: 'More Information',
      linkColumnName: 'More Information URL',
    },
  ],
}

export default programCardConfiguration
