import { useEffect, useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import TableRowsIcon from '@mui/icons-material/TableRows'
import ViewModuleIcon from '@mui/icons-material/ViewModule'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CardContainerLogic from 'synapse-react-client/components/CardContainerLogic'
import StandaloneQueryWrapper from 'synapse-react-client/components/StandaloneQueryWrapper'
import * as SynapseConstants from 'synapse-react-client/utils/SynapseConstants'
import { CardLink } from 'synapse-react-client/components/CardContainer/CardLink'
import { TargetEnum } from 'synapse-react-client/utils/html/TargetEnum'
import { LabelLinkConfig } from 'synapse-react-client/components/CardContainerLogic/CardContainerLogic'
import { mergeTheme } from 'synapse-react-client/theme/mergeTheme'
import { CardDisplayConfig, Resource } from '../../types'
import { isEmpty } from 'lodash-es'

type ViewMode = 'card' | 'table'

interface ResourcePreviewRendererProps {
  resource: Resource
  palette?: { primary: string; secondary: string }
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
  palette,
}: ResourcePreviewRendererProps) {
  const cardDisplay = resource.cardDisplay
  // Check for meaningful card config - must have genericCardSchema with at least a title
  const hasCardConfig = !isEmpty(cardDisplay)

  // Default to card view if card configuration exists, otherwise table view
  const [viewMode, setViewMode] = useState<ViewMode>(
    hasCardConfig ? 'card' : 'table',
  )

  // Update view mode when resource changes (e.g., switching between resources)
  useEffect(() => {
    setViewMode(hasCardConfig ? 'card' : 'table')
  }, [resource.id, hasCardConfig])

  const handleViewModeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newMode: ViewMode | null,
  ) => {
    if (newMode !== null) {
      setViewMode(newMode)
    }
  }

  // Create theme from palette
  const theme = useMemo(
    () =>
      createTheme(
        mergeTheme({
          palette: palette
            ? {
                primary: { main: palette.primary },
                secondary: { main: palette.secondary },
              }
            : undefined,
        }),
      ),
    [palette],
  )

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
    <ThemeProvider theme={theme}>
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              mb: 1,
            }}
          >
            <Box>
              <Typography variant="h6">{resource.name}</Typography>
              {resource.description && (
                <Typography variant="body2" color="text.secondary">
                  {resource.description}
                </Typography>
              )}
            </Box>
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={handleViewModeChange}
              size="small"
              aria-label="view mode"
            >
              <ToggleButton
                value="card"
                aria-label="card view"
                disabled={!hasCardConfig}
                title={
                  hasCardConfig ? 'Card view' : 'No card configuration defined'
                }
              >
                <ViewModuleIcon fontSize="small" />
              </ToggleButton>
              <ToggleButton
                value="table"
                aria-label="table view"
                title="Table view"
              >
                <TableRowsIcon fontSize="small" />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Typography
            variant="caption"
            color="text.secondary"
            component="div"
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

        {/* Data Preview */}
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
          {viewMode === 'card' && hasCardConfig ? (
            <CardContainerLogic
              sql={resource.sql}
              cardConfiguration={srcCardConfiguration}
              columnAliases={resource.columnAliases}
            />
          ) : (
            <StandaloneQueryWrapper
              sql={resource.sql}
              columnAliases={resource.columnAliases}
              visibleColumnCount={resource.tableDisplay?.visibleColumnCount}
              showDownloadColumn={resource.tableDisplay?.showDownloadColumn}
              showAccessColumn={resource.tableDisplay?.showAccessColumn}
            />
          )}
        </Box>
      </Box>
    </ThemeProvider>
  )
}
