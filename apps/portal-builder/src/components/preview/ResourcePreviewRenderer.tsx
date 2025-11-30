import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CardContainerLogic from 'synapse-react-client/components/CardContainerLogic'
import * as SynapseConstants from 'synapse-react-client/utils/SynapseConstants'
import FullContextProvider from 'synapse-react-client/utils/context/FullContextProvider'
import { CardLink } from 'synapse-react-client/components/CardContainer/CardLink'
import { TargetEnum } from 'synapse-react-client/utils/html/TargetEnum'
import { LabelLinkConfig } from 'synapse-react-client/components/CardContainerLogic/CardContainerLogic'
import { CardDisplayConfig, Resource } from '../../types'

interface ResourcePreviewRendererProps {
  resource: Resource
}

/**
 * Converts our CardLinkConfig to SRC's CardLink type
 */
function toSrcCardLink(
  config: CardDisplayConfig['titleLinkConfig'],
): CardLink | undefined {
  if (!config) return undefined
  // Handle baseURL variant
  if ('baseURL' in config) {
    return {
      matchColumnName: config.matchColumnName,
      isMarkdown: false,
      baseURL: config.baseURL,
      URLColumnName: config.URLColumnName,
      wrapValueWithParens: config.wrapValueWithParens,
      resolveEntityName: config.resolveEntityName,
      tooltipText: config.tooltipText,
      target: config.target as TargetEnum | undefined,
    }
  }
  // Handle overrideLinkURL variant
  if ('overrideLinkURLColumnName' in config) {
    return {
      matchColumnName: config.matchColumnName,
      isMarkdown: false,
      overrideLinkURLColumnName: config.overrideLinkURLColumnName,
      tooltipText: config.tooltipText,
      target: config.target as TargetEnum | undefined,
    }
  }
  return undefined
}

/**
 * Converts our LabelLinkConfigType to SRC's LabelLinkConfig type
 */
function toSrcLabelLinkConfig(
  configs: CardDisplayConfig['labelLinkConfig'],
): LabelLinkConfig | undefined {
  if (!configs || configs.length === 0) return undefined
  return configs.map(config => {
    // Handle CardLink types (baseURL or overrideLinkURL)
    if ('isMarkdown' in config && config.isMarkdown === false) {
      if ('baseURL' in config) {
        return {
          matchColumnName: config.matchColumnName,
          isMarkdown: false as const,
          baseURL: config.baseURL,
          URLColumnName: config.URLColumnName,
          wrapValueWithParens: config.wrapValueWithParens,
          resolveEntityName: config.resolveEntityName,
          tooltipText: config.tooltipText,
          target: config.target,
        }
      }
      if ('overrideLinkURLColumnName' in config) {
        return {
          matchColumnName: config.matchColumnName,
          isMarkdown: false as const,
          overrideLinkURLColumnName: config.overrideLinkURLColumnName,
          tooltipText: config.tooltipText,
          target: config.target,
        }
      }
      // ColumnSpecifiedLink (linkColumnName)
      if ('linkColumnName' in config) {
        return {
          matchColumnName: config.matchColumnName,
          isMarkdown: false as const,
          linkColumnName: config.linkColumnName,
          tooltipText: config.tooltipText,
        }
      }
    }
    // Handle MarkdownLink
    if ('isMarkdown' in config && config.isMarkdown === true) {
      return {
        matchColumnName: config.matchColumnName,
        isMarkdown: true as const,
        tooltipText: config.tooltipText,
      }
    }
    // Handle EntityImage
    if ('isEntityImage' in config) {
      return {
        matchColumnName: config.matchColumnName,
        isEntityImage: true as const,
      }
    }
    // Fallback - shouldn't reach here if types are correct
    return config
  }) as LabelLinkConfig
}

/**
 * Renders a preview of a resource using real Synapse data
 */
export function ResourcePreviewRenderer({
  resource,
}: ResourcePreviewRendererProps) {
  const cardDisplay = resource.cardDisplay

  // Map our card type to SRC card type constant
  const getCardType = (type: string | undefined) => {
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

  const cardType = getCardType(cardDisplay?.cardType)

  // Convert link configurations to SRC types
  const titleLinkConfig = toSrcCardLink(cardDisplay?.titleLinkConfig)
  const labelLinkConfig = toSrcLabelLinkConfig(cardDisplay?.labelLinkConfig)

  // Build the cardConfiguration prop for CardContainerLogic
  const srcCardConfiguration =
    cardType === SynapseConstants.GENERIC_CARD
      ? {
          type: cardType as typeof SynapseConstants.GENERIC_CARD,
          genericCardSchema: cardDisplay?.genericCardSchema
            ? {
                type: cardDisplay.genericCardSchema.type || 'GENERIC_CARD',
                title: cardDisplay.genericCardSchema.title,
                subTitle: cardDisplay.genericCardSchema.subTitle,
                description: cardDisplay.genericCardSchema.description,
                icon: cardDisplay.genericCardSchema.icon,
                link: cardDisplay.genericCardSchema.link,
                secondaryLabels: cardDisplay.genericCardSchema.secondaryLabels,
              }
            : { type: 'GENERIC_CARD', title: 'name' },
          secondaryLabelLimit: cardDisplay?.secondaryLabelLimit,
          titleLinkConfig,
          labelLinkConfig,
        }
      : {
          type: cardType as
            | typeof SynapseConstants.FUNDER
            | typeof SynapseConstants.MEDIUM_USER_CARD,
          secondaryLabelLimit: cardDisplay?.secondaryLabelLimit,
          titleLinkConfig,
          labelLinkConfig,
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
        <Typography variant="h6">{resource.name}</Typography>
        {resource.description && (
          <Typography variant="body2" color="text.secondary">
            {resource.description}
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
          {resource.sql}
        </Typography>
        {resource.selectColumns && resource.selectColumns.length > 0 && (
          <Typography
            variant="caption"
            color="text.secondary"
            component="div"
            mt={0.5}
          >
            {resource.selectColumns.length} columns:{' '}
            {resource.selectColumns.map(c => c.name).join(', ')}
          </Typography>
        )}
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
            sql={resource.sql}
            cardConfiguration={srcCardConfiguration}
          />
        </FullContextProvider>
      </Box>
    </Box>
  )
}
