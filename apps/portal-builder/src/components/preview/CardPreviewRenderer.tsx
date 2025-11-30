import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CardContainerLogic from 'synapse-react-client/components/CardContainerLogic'
import * as SynapseConstants from 'synapse-react-client/utils/SynapseConstants'
import FullContextProvider from 'synapse-react-client/utils/context/FullContextProvider'
import { CardConfiguration } from '../../types'

interface CardPreviewRendererProps {
  cardConfig: CardConfiguration
}

/**
 * Renders a preview of a card configuration using real Synapse data
 */
export function CardPreviewRenderer({ cardConfig }: CardPreviewRendererProps) {
  // Map our card type to SRC card type constant
  const getCardType = (type: string) => {
    switch (type) {
      case 'GENERIC_CARD':
        return SynapseConstants.GENERIC_CARD
      case 'MEDIUM_USER_CARD':
        return SynapseConstants.MEDIUM_USER_CARD
      case 'DATASET':
        return SynapseConstants.DATASET
      case 'FUNDER':
        return SynapseConstants.FUNDER
      case 'STUDY':
      default:
        return SynapseConstants.GENERIC_CARD
    }
  }

  const cardType = getCardType(cardConfig.cardType)

  // Build the cardConfiguration prop for CardContainerLogic
  const srcCardConfiguration =
    cardType === SynapseConstants.GENERIC_CARD
      ? {
          type: cardType as typeof SynapseConstants.GENERIC_CARD,
          genericCardSchema: cardConfig.genericCardSchema
            ? {
                type: cardConfig.genericCardSchema.type || 'GENERIC_CARD',
                title: cardConfig.genericCardSchema.title,
                subTitle: cardConfig.genericCardSchema.subTitle,
                description: cardConfig.genericCardSchema.description,
                icon: cardConfig.genericCardSchema.icon,
                link: cardConfig.genericCardSchema.link,
                secondaryLabels: cardConfig.genericCardSchema.secondaryLabels,
              }
            : { type: 'GENERIC_CARD', title: 'name' },
          secondaryLabelLimit: cardConfig.secondaryLabelLimit,
        }
      : {
          type: cardType as
            | typeof SynapseConstants.FUNDER
            | typeof SynapseConstants.MEDIUM_USER_CARD,
          secondaryLabelLimit: cardConfig.secondaryLabelLimit,
        }

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.paper',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: 1,
          borderColor: 'divider',
          backgroundColor: 'grey.50',
        }}
      >
        <Typography variant="h6">{cardConfig.name}</Typography>
        {cardConfig.description && (
          <Typography variant="body2" color="text.secondary">
            {cardConfig.description}
          </Typography>
        )}
        <Typography
          variant="caption"
          color="text.secondary"
          component="div"
          mt={1}
          sx={{
            fontFamily: 'monospace',
            backgroundColor: 'grey.100',
            p: 1,
            borderRadius: 1,
          }}
        >
          {cardConfig.sql}
        </Typography>
      </Box>

      {/* Card Preview */}
      <Box
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          p: 2,
          '& .SRC-portalCard': {
            margin: 1,
          },
        }}
      >
        <FullContextProvider
          synapseContext={{
            accessToken: undefined,
            isInExperimentalMode: false,
            utcTime: false,
            withErrorBoundary: true,
          }}
        >
          <CardContainerLogic
            sql={cardConfig.sql}
            cardConfiguration={srcCardConfiguration}
          />
        </FullContextProvider>
      </Box>
    </Box>
  )
}
