import { useState, useMemo } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Alert from '@mui/material/Alert'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import WarningIcon from '@mui/icons-material/Warning'
import { v4 as uuidv4 } from 'uuid'
import {
  DetailsRouteConfig,
  DetailsPageTab,
  DetailsPageSection,
  DetailsPageSectionType,
  Resource,
} from '../../types'

// Section type options for the dropdown
const SECTION_TYPES = [
  {
    value: 'markdown-from-column',
    label: 'Markdown from Column',
    description: 'Display markdown content from a column value',
  },
  {
    value: 'related-resource',
    label: 'Related Resource',
    description: 'Show cards or table from another resource',
  },
  {
    value: 'query-wrapper',
    label: 'Query Wrapper',
    description: 'Full data browser with facets and plots',
  },
] as const

interface DetailsPageEditorProps {
  config: DetailsRouteConfig
  onChange: (updates: Partial<DetailsRouteConfig>) => void
  resources: Resource[]
}

/**
 * Complete editor for DetailsPage configuration
 * Allows editing tabs, sections, and section configurations with validation
 */
export function DetailsPageEditor({
  config,
  onChange,
  resources,
}: DetailsPageEditorProps) {
  const [expandedTab, setExpandedTab] = useState<string | false>(
    config.tabs?.[0]?.id || false,
  )

  // Get the resource this detail page is for
  const currentResource = useMemo(
    () => resources.find(r => r.id === config.resourceId),
    [resources, config.resourceId],
  )

  // Get available columns from the current resource
  const availableColumns = useMemo(
    () => currentResource?.selectColumns?.map(c => c.name) ?? [],
    [currentResource],
  )

  // Validation: Check if referenced resources exist
  const validateResourceId = (resourceId: string): boolean => {
    return resources.some(r => r.id === resourceId)
  }

  // Validation: Check if column exists in resource
  const validateColumn = (resourceId: string, columnName: string): boolean => {
    const resource = resources.find(r => r.id === resourceId)
    if (!resource?.selectColumns?.length) return true // Can't validate if no columns cached
    return resource.selectColumns.some(c => c.name === columnName)
  }

  // Tab management
  const handleAddTab = () => {
    const newTab: DetailsPageTab = {
      id: uuidv4(),
      title: 'New Tab',
      path: 'NewTab',
      sections: [],
    }
    onChange({
      tabs: [...(config.tabs ?? []), newTab],
    })
    setExpandedTab(newTab.id)
  }

  const handleUpdateTab = (tabId: string, updates: Partial<DetailsPageTab>) => {
    onChange({
      tabs: config.tabs?.map(tab =>
        tab.id === tabId ? { ...tab, ...updates } : tab,
      ),
    })
  }

  const handleDeleteTab = (tabId: string) => {
    const newTabs = config.tabs?.filter(tab => tab.id !== tabId)
    onChange({ tabs: newTabs })
    if (expandedTab === tabId) {
      setExpandedTab(newTabs?.[0]?.id || false)
    }
  }

  const handleMoveTab = (tabId: string, direction: 'up' | 'down') => {
    if (!config.tabs) return
    const index = config.tabs.findIndex(t => t.id === tabId)
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === config.tabs.length - 1)
    ) {
      return
    }
    const newTabs = [...config.tabs]
    const newIndex = direction === 'up' ? index - 1 : index + 1
    ;[newTabs[index], newTabs[newIndex]] = [newTabs[newIndex], newTabs[index]]
    onChange({ tabs: newTabs })
  }

  // Section management within a tab
  const handleAddSection = (tabId: string) => {
    const newSection: DetailsPageSection = {
      id: uuidv4(),
      title: 'New Section',
      config: {
        type: 'markdown-from-column',
        columnName: '',
      },
    }
    onChange({
      tabs: config.tabs?.map(tab =>
        tab.id === tabId
          ? { ...tab, sections: [...tab.sections, newSection] }
          : tab,
      ),
    })
  }

  const handleUpdateSection = (
    tabId: string,
    sectionId: string,
    updates: Partial<DetailsPageSection>,
  ) => {
    onChange({
      tabs: config.tabs?.map(tab =>
        tab.id === tabId
          ? {
              ...tab,
              sections: tab.sections.map(section =>
                section.id === sectionId ? { ...section, ...updates } : section,
              ),
            }
          : tab,
      ),
    })
  }

  const handleDeleteSection = (tabId: string, sectionId: string) => {
    onChange({
      tabs: config.tabs?.map(tab =>
        tab.id === tabId
          ? {
              ...tab,
              sections: tab.sections.filter(s => s.id !== sectionId),
            }
          : tab,
      ),
    })
  }

  const handleMoveSection = (
    tabId: string,
    sectionId: string,
    direction: 'up' | 'down',
  ) => {
    onChange({
      tabs: config.tabs?.map(tab => {
        if (tab.id !== tabId) return tab
        const index = tab.sections.findIndex(s => s.id === sectionId)
        if (
          (direction === 'up' && index === 0) ||
          (direction === 'down' && index === tab.sections.length - 1)
        ) {
          return tab
        }
        const newSections = [...tab.sections]
        const newIndex = direction === 'up' ? index - 1 : index + 1
        ;[newSections[index], newSections[newIndex]] = [
          newSections[newIndex],
          newSections[index],
        ]
        return { ...tab, sections: newSections }
      }),
    })
  }

  return (
    <Box>
      {/* Header Settings */}
      <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Header Settings
        </Typography>
        <Stack spacing={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Resource</InputLabel>
            <Select
              value={config.resourceId ?? ''}
              onChange={e => onChange({ resourceId: e.target.value })}
              label="Resource"
            >
              <MenuItem value="">
                <em>Select a resource</em>
              </MenuItem>
              {resources.map(resource => (
                <MenuItem key={resource.id} value={resource.id}>
                  {resource.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <FormControlLabel
              control={
                <Switch
                  checked={config.showHeaderCard !== false}
                  onChange={e => onChange({ showHeaderCard: e.target.checked })}
                />
              }
              label="Show Header Card"
            />

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>SQL Operator</InputLabel>
              <Select
                value={config.sqlOperator ?? 'LIKE'}
                onChange={e =>
                  onChange({
                    sqlOperator: e.target
                      .value as DetailsRouteConfig['sqlOperator'],
                  })
                }
                label="SQL Operator"
              >
                <MenuItem value="LIKE">LIKE</MenuItem>
                <MenuItem value="EQUAL">EQUAL</MenuItem>
                <MenuItem value="IN">IN</MenuItem>
                <MenuItem value="HAS">HAS</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="DOI Resource Type"
              value={config.doiResourceType ?? ''}
              onChange={e =>
                onChange({ doiResourceType: e.target.value || undefined })
              }
              size="small"
              placeholder="e.g., STUDY"
              sx={{ minWidth: 150 }}
            />
          </Box>
        </Stack>
      </Paper>

      {/* Tabs Section */}
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="subtitle1">Tabs</Typography>
          <Button
            size="small"
            startIcon={<AddIcon />}
            onClick={handleAddTab}
            variant="outlined"
          >
            Add Tab
          </Button>
        </Box>

        {(!config.tabs || config.tabs.length === 0) && (
          <Alert severity="info" sx={{ mb: 2 }}>
            No tabs defined. Add tabs to organize content into sections, or add
            sections directly for a single-page layout.
          </Alert>
        )}

        {config.tabs?.map((tab, tabIndex) => (
          <Accordion
            key={tab.id}
            expanded={expandedTab === tab.id}
            onChange={(_, isExpanded) =>
              setExpandedTab(isExpanded ? tab.id : false)
            }
            sx={{ mb: 1 }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  width: '100%',
                  pr: 2,
                }}
              >
                <Typography sx={{ flexGrow: 1 }}>
                  {tab.title || 'Untitled Tab'}
                </Typography>
                <Chip
                  label={`${tab.sections.length} sections`}
                  size="small"
                  variant="outlined"
                />
                <IconButton
                  size="small"
                  onClick={e => {
                    e.stopPropagation()
                    handleMoveTab(tab.id, 'up')
                  }}
                  disabled={tabIndex === 0}
                >
                  <ArrowUpwardIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={e => {
                    e.stopPropagation()
                    handleMoveTab(tab.id, 'down')
                  }}
                  disabled={tabIndex === (config.tabs?.length ?? 0) - 1}
                >
                  <ArrowDownwardIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  onClick={e => {
                    e.stopPropagation()
                    handleDeleteTab(tab.id)
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <TabEditor
                tab={tab}
                onUpdate={updates => handleUpdateTab(tab.id, updates)}
                onAddSection={() => handleAddSection(tab.id)}
                onUpdateSection={(sectionId, updates) =>
                  handleUpdateSection(tab.id, sectionId, updates)
                }
                onDeleteSection={sectionId =>
                  handleDeleteSection(tab.id, sectionId)
                }
                onMoveSection={(sectionId, direction) =>
                  handleMoveSection(tab.id, sectionId, direction)
                }
                resources={resources}
                currentResourceColumns={availableColumns}
                validateResourceId={validateResourceId}
                validateColumn={validateColumn}
              />
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>
    </Box>
  )
}

interface TabEditorProps {
  tab: DetailsPageTab
  onUpdate: (updates: Partial<DetailsPageTab>) => void
  onAddSection: () => void
  onUpdateSection: (
    sectionId: string,
    updates: Partial<DetailsPageSection>,
  ) => void
  onDeleteSection: (sectionId: string) => void
  onMoveSection: (sectionId: string, direction: 'up' | 'down') => void
  resources: Resource[]
  currentResourceColumns: string[]
  validateResourceId: (resourceId: string) => boolean
  validateColumn: (resourceId: string, columnName: string) => boolean
}

function TabEditor({
  tab,
  onUpdate,
  onAddSection,
  onUpdateSection,
  onDeleteSection,
  onMoveSection,
  resources,
  currentResourceColumns,
  validateResourceId,
  validateColumn,
}: TabEditorProps) {
  return (
    <Stack spacing={2}>
      {/* Tab Settings */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          label="Title"
          value={tab.title}
          onChange={e => onUpdate({ title: e.target.value })}
          size="small"
          sx={{ flexGrow: 1, minWidth: 150 }}
        />
        <TextField
          label="Path"
          value={tab.path}
          onChange={e => onUpdate({ path: e.target.value })}
          size="small"
          sx={{ minWidth: 120 }}
          helperText="URL segment"
        />
        <TextField
          label="Icon Name"
          value={tab.iconName ?? ''}
          onChange={e => onUpdate({ iconName: e.target.value || undefined })}
          size="small"
          sx={{ minWidth: 120 }}
          placeholder="e.g., study"
        />
        <TextField
          label="Tooltip"
          value={tab.tooltip ?? ''}
          onChange={e => onUpdate({ tooltip: e.target.value || undefined })}
          size="small"
          sx={{ flexGrow: 1, minWidth: 200 }}
        />
      </Box>

      {/* Sections */}
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Sections
          </Typography>
          <Button size="small" startIcon={<AddIcon />} onClick={onAddSection}>
            Add Section
          </Button>
        </Box>

        {tab.sections.length === 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
            No sections. Add sections to display content in this tab.
          </Typography>
        )}

        <Stack spacing={1}>
          {tab.sections.map((section, index) => (
            <SectionEditor
              key={section.id}
              section={section}
              onUpdate={updates => onUpdateSection(section.id, updates)}
              onDelete={() => onDeleteSection(section.id)}
              onMove={direction => onMoveSection(section.id, direction)}
              isFirst={index === 0}
              isLast={index === tab.sections.length - 1}
              resources={resources}
              currentResourceColumns={currentResourceColumns}
              validateResourceId={validateResourceId}
              validateColumn={validateColumn}
            />
          ))}
        </Stack>
      </Box>
    </Stack>
  )
}

interface SectionEditorProps {
  section: DetailsPageSection
  onUpdate: (updates: Partial<DetailsPageSection>) => void
  onDelete: () => void
  onMove: (direction: 'up' | 'down') => void
  isFirst: boolean
  isLast: boolean
  resources: Resource[]
  currentResourceColumns: string[]
  validateResourceId: (resourceId: string) => boolean
  validateColumn: (resourceId: string, columnName: string) => boolean
}

function SectionEditor({
  section,
  onUpdate,
  onDelete,
  onMove,
  isFirst,
  isLast,
  resources,
  currentResourceColumns,
  validateResourceId,
  validateColumn,
}: SectionEditorProps) {
  const [expanded, setExpanded] = useState(false)

  const sectionTypeLabel =
    SECTION_TYPES.find(t => t.value === section.config.type)?.label ??
    section.config.type

  return (
    <Paper variant="outlined" sx={{ p: 1.5 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          cursor: 'pointer',
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <ExpandMoreIcon
          sx={{
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
          }}
        />
        <Typography sx={{ flexGrow: 1 }}>
          {section.title || 'Untitled Section'}
        </Typography>
        <Chip label={sectionTypeLabel} size="small" variant="outlined" />
        <IconButton
          size="small"
          onClick={e => {
            e.stopPropagation()
            onMove('up')
          }}
          disabled={isFirst}
        >
          <ArrowUpwardIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={e => {
            e.stopPropagation()
            onMove('down')
          }}
          disabled={isLast}
        >
          <ArrowDownwardIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          color="error"
          onClick={e => {
            e.stopPropagation()
            onDelete()
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>

      {expanded && (
        <Box sx={{ mt: 2, pl: 4 }}>
          <Stack spacing={2}>
            {/* Section metadata */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <TextField
                label="Title"
                value={section.title ?? ''}
                onChange={e => onUpdate({ title: e.target.value || undefined })}
                size="small"
                sx={{ flexGrow: 1, minWidth: 150 }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={section.hideTitle ?? false}
                    onChange={e => onUpdate({ hideTitle: e.target.checked })}
                  />
                }
                label="Hide Title"
              />
            </Box>

            {/* Section type selector */}
            <FormControl fullWidth size="small">
              <InputLabel>Section Type</InputLabel>
              <Select
                value={section.config.type}
                onChange={e => {
                  const newType = e.target.value
                  // Create new config with appropriate defaults
                  let newConfig: DetailsPageSectionType
                  switch (newType) {
                    case 'markdown-from-column':
                      newConfig = {
                        type: 'markdown-from-column',
                        columnName: '',
                      }
                      break
                    case 'related-resource':
                      newConfig = {
                        type: 'related-resource',
                        sourceResourceId: '',
                        filterColumnName: '',
                        sourceColumnName: '',
                        displayAs: 'cards',
                      }
                      break
                    case 'query-wrapper':
                      newConfig = {
                        type: 'query-wrapper',
                        sql: '',
                        filterColumnName: '',
                        sourceColumnName: '',
                      }
                      break
                  }
                  onUpdate({ config: newConfig })
                }}
                label="Section Type"
              >
                {SECTION_TYPES.map(type => (
                  <MenuItem key={type.value} value={type.value}>
                    <Box>
                      <Typography variant="body2">{type.label}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {type.description}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Type-specific config editor */}
            <SectionConfigEditor
              config={section.config}
              onChange={newConfig => onUpdate({ config: newConfig })}
              resources={resources}
              currentResourceColumns={currentResourceColumns}
              validateResourceId={validateResourceId}
              validateColumn={validateColumn}
            />
          </Stack>
        </Box>
      )}
    </Paper>
  )
}

interface SectionConfigEditorProps {
  config: DetailsPageSectionType
  onChange: (config: DetailsPageSectionType) => void
  resources: Resource[]
  currentResourceColumns: string[]
  validateResourceId: (resourceId: string) => boolean
  validateColumn: (resourceId: string, columnName: string) => boolean
}

function SectionConfigEditor({
  config,
  onChange,
  resources,
  currentResourceColumns,
  validateResourceId,
  validateColumn,
}: SectionConfigEditorProps) {
  switch (config.type) {
    case 'markdown-from-column':
      return (
        <MarkdownFromColumnEditor
          config={config}
          onChange={onChange}
          availableColumns={currentResourceColumns}
        />
      )
    case 'related-resource':
      return (
        <RelatedResourceEditor
          config={config}
          onChange={onChange}
          resources={resources}
          currentResourceColumns={currentResourceColumns}
          validateResourceId={validateResourceId}
          validateColumn={validateColumn}
        />
      )
    case 'query-wrapper':
      return (
        <QueryWrapperEditor
          config={config}
          onChange={onChange}
          currentResourceColumns={currentResourceColumns}
        />
      )
  }
}

interface MarkdownFromColumnEditorProps {
  config: Extract<DetailsPageSectionType, { type: 'markdown-from-column' }>
  onChange: (config: DetailsPageSectionType) => void
  availableColumns: string[]
}

function MarkdownFromColumnEditor({
  config,
  onChange,
  availableColumns,
}: MarkdownFromColumnEditorProps) {
  const isInvalidColumn =
    config.columnName &&
    availableColumns.length > 0 &&
    !availableColumns.includes(config.columnName)

  return (
    <Stack spacing={2}>
      <Autocomplete
        freeSolo
        options={availableColumns}
        value={config.columnName}
        onInputChange={(_, newValue) =>
          onChange({ ...config, columnName: newValue })
        }
        size="small"
        renderInput={params => (
          <TextField
            {...params}
            label="Column Name"
            helperText="Column containing markdown content or Synapse entity ID"
            error={Boolean(isInvalidColumn)}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isInvalidColumn && (
                    <Tooltip title="Column not found in resource">
                      <WarningIcon color="warning" fontSize="small" />
                    </Tooltip>
                  )}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />

      <Box sx={{ display: 'flex', gap: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={config.showEntityTitle ?? false}
              onChange={e =>
                onChange({ ...config, showEntityTitle: e.target.checked })
              }
            />
          }
          label="Show Entity Title"
        />
        <FormControlLabel
          control={
            <Switch
              checked={config.isRawMarkdown ?? false}
              onChange={e =>
                onChange({ ...config, isRawMarkdown: e.target.checked })
              }
            />
          }
          label="Raw Markdown (not entity reference)"
        />
      </Box>
    </Stack>
  )
}

interface RelatedResourceEditorProps {
  config: Extract<DetailsPageSectionType, { type: 'related-resource' }>
  onChange: (config: DetailsPageSectionType) => void
  resources: Resource[]
  currentResourceColumns: string[]
  validateResourceId: (resourceId: string) => boolean
  validateColumn: (resourceId: string, columnName: string) => boolean
}

function RelatedResourceEditor({
  config,
  onChange,
  resources,
  currentResourceColumns,
  validateResourceId,
  validateColumn,
}: RelatedResourceEditorProps) {
  const isInvalidResource =
    config.sourceResourceId && !validateResourceId(config.sourceResourceId)
  const sourceResource = resources.find(r => r.id === config.sourceResourceId)
  const sourceResourceColumns =
    sourceResource?.selectColumns?.map(c => c.name) ?? []

  const isInvalidFilterColumn =
    config.filterColumnName &&
    sourceResourceColumns.length > 0 &&
    !validateColumn(config.sourceResourceId, config.filterColumnName)

  const isInvalidSourceColumn =
    config.sourceColumnName &&
    currentResourceColumns.length > 0 &&
    !currentResourceColumns.includes(config.sourceColumnName)

  return (
    <Stack spacing={2}>
      <FormControl fullWidth size="small" error={Boolean(isInvalidResource)}>
        <InputLabel>Source Resource</InputLabel>
        <Select
          value={config.sourceResourceId}
          onChange={e =>
            onChange({ ...config, sourceResourceId: e.target.value })
          }
          label="Source Resource"
        >
          <MenuItem value="">
            <em>Select a resource</em>
          </MenuItem>
          {resources.map(resource => (
            <MenuItem key={resource.id} value={resource.id}>
              {resource.name}
            </MenuItem>
          ))}
        </Select>
        {isInvalidResource && (
          <Typography variant="caption" color="error">
            Resource not found
          </Typography>
        )}
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel>Display As</InputLabel>
        <Select<'cards' | 'table'>
          value={config.displayAs ?? 'cards'}
          onChange={e =>
            onChange({
              ...config,
              displayAs: e.target.value,
            })
          }
          label="Display As"
        >
          <MenuItem value="cards">Cards</MenuItem>
          <MenuItem value="table">Table</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Autocomplete
          freeSolo
          options={sourceResourceColumns}
          value={config.filterColumnName}
          onInputChange={(_, newValue) =>
            onChange({ ...config, filterColumnName: newValue })
          }
          size="small"
          sx={{ flexGrow: 1 }}
          renderInput={params => (
            <TextField
              {...params}
              label="Filter Column (in source)"
              helperText="Column in source resource to filter by"
              error={Boolean(isInvalidFilterColumn)}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isInvalidFilterColumn && (
                      <Tooltip title="Column not found in source resource">
                        <WarningIcon color="warning" fontSize="small" />
                      </Tooltip>
                    )}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />

        <Autocomplete
          freeSolo
          options={currentResourceColumns}
          value={config.sourceColumnName}
          onInputChange={(_, newValue) =>
            onChange({ ...config, sourceColumnName: newValue })
          }
          size="small"
          sx={{ flexGrow: 1 }}
          renderInput={params => (
            <TextField
              {...params}
              label="Source Column (current row)"
              helperText="Column in current row to use as filter value"
              error={Boolean(isInvalidSourceColumn)}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isInvalidSourceColumn && (
                      <Tooltip title="Column not found in current resource">
                        <WarningIcon color="warning" fontSize="small" />
                      </Tooltip>
                    )}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>SQL Operator</InputLabel>
          <Select
            value={config.sqlOperator ?? ''}
            onChange={e =>
              onChange({
                ...config,
                sqlOperator: (e.target.value || undefined) as
                  | 'LIKE'
                  | 'EQUAL'
                  | 'IN'
                  | 'HAS'
                  | undefined,
              })
            }
            label="SQL Operator"
          >
            <MenuItem value="">
              <em>Default</em>
            </MenuItem>
            <MenuItem value="LIKE">LIKE</MenuItem>
            <MenuItem value="EQUAL">EQUAL</MenuItem>
            <MenuItem value="IN">IN</MenuItem>
            <MenuItem value="HAS">HAS</MenuItem>
          </Select>
        </FormControl>

        <FormControlLabel
          control={
            <Switch
              checked={config.resolveEntityName ?? false}
              onChange={e =>
                onChange({ ...config, resolveEntityName: e.target.checked })
              }
            />
          }
          label="Resolve Entity Name"
        />
      </Box>
    </Stack>
  )
}

interface QueryWrapperEditorProps {
  config: Extract<DetailsPageSectionType, { type: 'query-wrapper' }>
  onChange: (config: DetailsPageSectionType) => void
  currentResourceColumns: string[]
}

function QueryWrapperEditor({
  config,
  onChange,
  currentResourceColumns,
}: QueryWrapperEditorProps) {
  const isInvalidSourceColumn =
    config.sourceColumnName &&
    currentResourceColumns.length > 0 &&
    !currentResourceColumns.includes(config.sourceColumnName)

  return (
    <Stack spacing={2}>
      <TextField
        label="SQL Query"
        value={config.sql}
        onChange={e => onChange({ ...config, sql: e.target.value })}
        size="small"
        fullWidth
        multiline
        rows={2}
        placeholder="SELECT * FROM syn12345"
        helperText="SQL query for the data browser"
      />

      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label="Filter Column"
          value={config.filterColumnName}
          onChange={e =>
            onChange({ ...config, filterColumnName: e.target.value })
          }
          size="small"
          sx={{ flexGrow: 1 }}
          helperText="Column in query to filter by"
        />

        <Autocomplete
          freeSolo
          options={currentResourceColumns}
          value={config.sourceColumnName}
          onInputChange={(_, newValue) =>
            onChange({ ...config, sourceColumnName: newValue })
          }
          size="small"
          sx={{ flexGrow: 1 }}
          renderInput={params => (
            <TextField
              {...params}
              label="Source Column"
              helperText="Column in current row for filter value"
              error={Boolean(isInvalidSourceColumn)}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isInvalidSourceColumn && (
                      <Tooltip title="Column not found in current resource">
                        <WarningIcon color="warning" fontSize="small" />
                      </Tooltip>
                    )}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>SQL Operator</InputLabel>
          <Select
            value={config.sqlOperator ?? ''}
            onChange={e =>
              onChange({
                ...config,
                sqlOperator: (e.target.value || undefined) as
                  | 'LIKE'
                  | 'EQUAL'
                  | 'IN'
                  | 'HAS'
                  | undefined,
              })
            }
            label="SQL Operator"
          >
            <MenuItem value="">
              <em>Default (HAS)</em>
            </MenuItem>
            <MenuItem value="LIKE">LIKE</MenuItem>
            <MenuItem value="EQUAL">EQUAL</MenuItem>
            <MenuItem value="IN">IN</MenuItem>
            <MenuItem value="HAS">HAS</MenuItem>
          </Select>
        </FormControl>

        <FormControlLabel
          control={
            <Switch
              checked={config.tableConfiguration?.showAccessColumn ?? false}
              onChange={e =>
                onChange({
                  ...config,
                  tableConfiguration: {
                    ...config.tableConfiguration,
                    showAccessColumn: e.target.checked,
                  },
                })
              }
            />
          }
          label="Show Access Column"
        />

        <FormControlLabel
          control={
            <Switch
              checked={config.tableConfiguration?.showDownloadColumn ?? false}
              onChange={e =>
                onChange({
                  ...config,
                  tableConfiguration: {
                    ...config.tableConfiguration,
                    showDownloadColumn: e.target.checked,
                  },
                })
              }
            />
          }
          label="Show Download Column"
        />
      </Box>
    </Stack>
  )
}
