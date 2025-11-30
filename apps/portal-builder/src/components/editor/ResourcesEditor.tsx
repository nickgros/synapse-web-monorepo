import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PreviewIcon from '@mui/icons-material/Visibility'
import RefreshIcon from '@mui/icons-material/Refresh'
import WarningIcon from '@mui/icons-material/Warning'
import LockIcon from '@mui/icons-material/Lock'
import LinkIcon from '@mui/icons-material/Link'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Alert from '@mui/material/Alert'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useEffect, useMemo, useState } from 'react'
import {
  CardDisplayConfig,
  CardLinkConfig,
  LabelLinkConfigType,
  Resource,
} from '../../types/portal-config-schema'
import { usePortalConfig } from '../../state/PortalConfigContext'
import { useResourceEditor } from '../../state/CardEditorContext'
import {
  useResourceColumns,
  validateColumnNames,
} from '../../hooks/useResourceColumns'

const CARD_TYPES = [
  'GENERIC_CARD',
  'DATASET',
  'STUDY',
  'FUNDER',
  'MEDIUM_USER_CARD',
] as const

type CardType = (typeof CARD_TYPES)[number]

interface ColumnSelectorProps {
  label: string
  value: string
  onChange: (value: string) => void
  onBlur: () => void
  availableColumns: string[]
  isLoading?: boolean
  helperText?: string
  fullWidth?: boolean
}

/**
 * Autocomplete text field that suggests column names from the query
 */
function ColumnSelector({
  label,
  value,
  onChange,
  onBlur,
  availableColumns,
  isLoading,
  helperText,
  fullWidth = true,
}: ColumnSelectorProps) {
  const isInvalid =
    value && availableColumns.length > 0 && !availableColumns.includes(value)

  return (
    <Autocomplete
      freeSolo
      options={availableColumns}
      value={value}
      onInputChange={(_, newValue) => onChange(newValue)}
      onBlur={onBlur}
      loading={isLoading}
      size="small"
      fullWidth={fullWidth}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          helperText={helperText}
          error={Boolean(isInvalid)}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? <CircularProgress size={16} /> : null}
                {isInvalid && (
                  <Tooltip title="Column not found in query results">
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
  )
}

interface MultiColumnSelectorProps {
  label: string
  value: string[]
  onChange: (value: string[]) => void
  onBlur: () => void
  availableColumns: string[]
  isLoading?: boolean
  helperText?: string
}

/**
 * Multi-select autocomplete for secondary labels
 */
function MultiColumnSelector({
  label,
  value,
  onChange,
  onBlur,
  availableColumns,
  isLoading,
  helperText,
}: MultiColumnSelectorProps) {
  const { isValid, missingColumns } = validateColumnNames(
    value,
    availableColumns,
  )

  return (
    <Autocomplete
      multiple
      freeSolo
      options={availableColumns}
      value={value}
      onChange={(_, newValue) => onChange(newValue as string[])}
      onBlur={onBlur}
      loading={isLoading}
      size="small"
      fullWidth
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => {
          const { key, ...tagProps } = getTagProps({ index })
          const isMissing =
            availableColumns.length > 0 && !availableColumns.includes(option)
          return (
            <Chip
              key={key}
              label={option}
              size="small"
              color={isMissing ? 'warning' : 'default'}
              {...tagProps}
            />
          )
        })
      }
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          helperText={
            !isValid && availableColumns.length > 0
              ? `Missing columns: ${missingColumns.join(', ')}`
              : helperText
          }
          error={!isValid && availableColumns.length > 0}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? <CircularProgress size={16} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  )
}

interface InlineResourceEditorProps {
  resource: Resource
  isActive: boolean
}

function InlineResourceEditor({
  resource,
  isActive,
}: InlineResourceEditorProps) {
  const { updateResource, deleteResource, updateResourceColumns } =
    usePortalConfig()
  const { setActiveResource } = useResourceEditor()

  // Local state for editing
  const [name, setName] = useState(resource.name)
  const [description, setDescription] = useState(resource.description ?? '')
  const [sql, setSql] = useState(resource.sql)
  const [primaryKeyColumns, setPrimaryKeyColumns] = useState<string[]>(
    resource.primaryKeyColumns ?? [],
  )
  const [cardType, setCardType] = useState<CardType>(
    (resource.cardDisplay?.cardType as CardType) ?? 'GENERIC_CARD',
  )
  const [title, setTitle] = useState(
    resource.cardDisplay?.genericCardSchema?.title ?? '',
  )
  const [subTitle, setSubTitle] = useState(
    resource.cardDisplay?.genericCardSchema?.subTitle ?? '',
  )
  const [iconField, setIconField] = useState(
    resource.cardDisplay?.genericCardSchema?.icon ?? '',
  )
  const [descriptionField, setDescriptionField] = useState(
    resource.cardDisplay?.genericCardSchema?.description ?? '',
  )
  const [secondaryLabels, setSecondaryLabels] = useState<string[]>(
    resource.cardDisplay?.genericCardSchema?.secondaryLabels ?? [],
  )
  const [secondaryLabelLimit, setSecondaryLabelLimit] = useState(
    resource.cardDisplay?.secondaryLabelLimit?.toString() ?? '',
  )
  // Title link configuration state
  const [titleLinkEnabled, setTitleLinkEnabled] = useState(
    !!resource.cardDisplay?.titleLinkConfig,
  )
  const [titleLinkBaseURL, setTitleLinkBaseURL] = useState(
    (resource.cardDisplay?.titleLinkConfig &&
      'baseURL' in resource.cardDisplay.titleLinkConfig &&
      resource.cardDisplay.titleLinkConfig.baseURL) ||
      '',
  )
  const [titleLinkURLColumn, setTitleLinkURLColumn] = useState(
    (resource.cardDisplay?.titleLinkConfig &&
      'URLColumnName' in resource.cardDisplay.titleLinkConfig &&
      resource.cardDisplay.titleLinkConfig.URLColumnName) ||
      '',
  )
  const [titleLinkMatchColumn, setTitleLinkMatchColumn] = useState(
    resource.cardDisplay?.titleLinkConfig?.matchColumnName || '',
  )
  // Label link configuration state
  const [labelLinkConfigs, setLabelLinkConfigs] = useState<
    Array<{
      matchColumnName: string
      baseURL: string
      URLColumnName: string
    }>
  >(
    (resource.cardDisplay?.labelLinkConfig ?? [])
      .filter(
        (
          config,
        ): config is CardLinkConfig & {
          baseURL: string
          URLColumnName: string
        } => 'baseURL' in config && 'URLColumnName' in config,
      )
      .map(config => ({
        matchColumnName: config.matchColumnName,
        baseURL: config.baseURL,
        URLColumnName: config.URLColumnName,
      })),
  )

  // Fetch columns from Synapse for this resource's SQL
  const {
    selectColumns: fetchedColumns,
    columnNames: _availableColumnNames,
    isLoading: isLoadingColumns,
    isSuccess: columnsFetched,
    error: columnsError,
  } = useResourceColumns(sql)

  // Use cached columns if available, otherwise use fetched columns
  const effectiveColumnNames = useMemo(() => {
    if (columnsFetched && fetchedColumns.length > 0) {
      return fetchedColumns.map(c => c.name)
    }
    return resource.selectColumns?.map(c => c.name) ?? []
  }, [columnsFetched, fetchedColumns, resource.selectColumns])

  // Update cached columns when fetched
  useEffect(() => {
    if (columnsFetched && fetchedColumns.length > 0) {
      // Only update if columns have changed
      const currentColumnNames = resource.selectColumns?.map(c => c.name) ?? []
      const fetchedColumnNames = fetchedColumns.map(c => c.name)
      if (
        JSON.stringify(currentColumnNames) !==
        JSON.stringify(fetchedColumnNames)
      ) {
        updateResourceColumns(resource.id, fetchedColumns)
      }
    }
  }, [
    columnsFetched,
    fetchedColumns,
    resource.id,
    resource.selectColumns,
    updateResourceColumns,
  ])

  // Reset local state when resource changes externally
  useEffect(() => {
    setName(resource.name)
    setDescription(resource.description ?? '')
    setSql(resource.sql)
    setPrimaryKeyColumns(resource.primaryKeyColumns ?? [])
    setCardType((resource.cardDisplay?.cardType as CardType) ?? 'GENERIC_CARD')
    setTitle(resource.cardDisplay?.genericCardSchema?.title ?? '')
    setSubTitle(resource.cardDisplay?.genericCardSchema?.subTitle ?? '')
    setIconField(resource.cardDisplay?.genericCardSchema?.icon ?? '')
    setDescriptionField(
      resource.cardDisplay?.genericCardSchema?.description ?? '',
    )
    setSecondaryLabels(
      resource.cardDisplay?.genericCardSchema?.secondaryLabels ?? [],
    )
    setSecondaryLabelLimit(
      resource.cardDisplay?.secondaryLabelLimit?.toString() ?? '',
    )
    // Title link config
    setTitleLinkEnabled(!!resource.cardDisplay?.titleLinkConfig)
    setTitleLinkBaseURL(
      (resource.cardDisplay?.titleLinkConfig &&
        'baseURL' in resource.cardDisplay.titleLinkConfig &&
        resource.cardDisplay.titleLinkConfig.baseURL) ||
        '',
    )
    setTitleLinkURLColumn(
      (resource.cardDisplay?.titleLinkConfig &&
        'URLColumnName' in resource.cardDisplay.titleLinkConfig &&
        resource.cardDisplay.titleLinkConfig.URLColumnName) ||
        '',
    )
    setTitleLinkMatchColumn(
      resource.cardDisplay?.titleLinkConfig?.matchColumnName || '',
    )
    // Label link configs
    setLabelLinkConfigs(
      (resource.cardDisplay?.labelLinkConfig ?? [])
        .filter(
          (
            config,
          ): config is CardLinkConfig & {
            baseURL: string
            URLColumnName: string
          } => 'baseURL' in config && 'URLColumnName' in config,
        )
        .map(config => ({
          matchColumnName: config.matchColumnName,
          baseURL: config.baseURL,
          URLColumnName: config.URLColumnName,
        })),
    )
  }, [resource])

  // Build updated resource from current state
  const buildUpdatedResource = (): Resource => {
    // Build title link config if enabled
    const titleLinkConfig: CardLinkConfig | undefined =
      titleLinkEnabled && titleLinkBaseURL && titleLinkURLColumn
        ? {
            isMarkdown: false as const,
            baseURL: titleLinkBaseURL,
            URLColumnName: titleLinkURLColumn,
            matchColumnName: titleLinkMatchColumn || titleLinkURLColumn,
          }
        : undefined

    // Build label link configs
    const labelLinkConfig: LabelLinkConfigType | undefined =
      labelLinkConfigs.length > 0
        ? labelLinkConfigs
            .filter(c => c.matchColumnName && c.baseURL && c.URLColumnName)
            .map(c => ({
              isMarkdown: false as const,
              matchColumnName: c.matchColumnName,
              baseURL: c.baseURL,
              URLColumnName: c.URLColumnName,
            }))
        : undefined

    const cardDisplay: CardDisplayConfig | undefined =
      cardType === 'GENERIC_CARD' || cardType === 'STUDY'
        ? {
            cardType,
            genericCardSchema: {
              type: resource.cardDisplay?.genericCardSchema?.type || cardType,
              title,
              subTitle: subTitle || undefined,
              icon: iconField || undefined,
              description: descriptionField || undefined,
              secondaryLabels:
                secondaryLabels.length > 0 ? secondaryLabels : undefined,
            },
            secondaryLabelLimit: secondaryLabelLimit
              ? parseInt(secondaryLabelLimit, 10)
              : undefined,
            titleLinkConfig,
            labelLinkConfig:
              labelLinkConfig && labelLinkConfig.length > 0
                ? labelLinkConfig
                : undefined,
          }
        : { cardType }

    return {
      id: resource.id,
      name,
      description: description || undefined,
      sql,
      primaryKeyColumns,
      selectColumns: resource.selectColumns ?? [],
      lastColumnFetch: resource.lastColumnFetch,
      cardDisplay,
    }
  }

  // Update the resource and preview on any change
  const handleChange = () => {
    const updated = buildUpdatedResource()
    updateResource(resource.id, updated)
    if (isActive) {
      setActiveResource(updated)
    }
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      deleteResource(resource.id)
      setActiveResource(null)
    }
  }

  const handlePreview = () => {
    const updated = buildUpdatedResource()
    updateResource(resource.id, updated)
    setActiveResource(updated)
  }

  const handleRefreshColumns = () => {
    // Force refetch by triggering SQL change
    const currentSql = sql
    setSql('')
    setTimeout(() => setSql(currentSql), 0)
  }

  return (
    <Card
      variant="outlined"
      sx={{
        borderColor: isActive ? 'primary.main' : 'divider',
        borderWidth: isActive ? 2 : 1,
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          {/* Header with name and actions */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <TextField
              label="Resource Name"
              value={name}
              onChange={e => setName(e.target.value)}
              onBlur={handleChange}
              size="small"
              fullWidth
              sx={{ mr: 1 }}
            />
            <Stack direction="row" spacing={0.5} flexShrink={0}>
              <IconButton
                size="small"
                onClick={handlePreview}
                title="Preview"
                color={isActive ? 'primary' : 'default'}
              >
                <PreviewIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={handleDelete}
                title="Delete"
                color="error"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Box>

          {/* Description */}
          <TextField
            label="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            onBlur={handleChange}
            size="small"
            fullWidth
            multiline
            rows={2}
          />

          {/* SQL Query with column info */}
          <Box>
            <TextField
              label="SQL Query"
              value={sql}
              onChange={e => setSql(e.target.value)}
              onBlur={handleChange}
              size="small"
              fullWidth
              multiline
              rows={2}
              placeholder="SELECT * FROM syn12345"
              InputProps={{
                sx: { fontFamily: 'monospace' },
              }}
            />
            <Box display="flex" alignItems="center" mt={0.5} gap={1}>
              {isLoadingColumns && (
                <Typography variant="caption" color="text.secondary">
                  <CircularProgress size={12} sx={{ mr: 0.5 }} />
                  Loading columns...
                </Typography>
              )}
              {!isLoadingColumns && effectiveColumnNames.length > 0 && (
                <Typography variant="caption" color="text.secondary">
                  {effectiveColumnNames.length} columns available
                </Typography>
              )}
              {columnsError && (
                <Tooltip title={columnsError.message}>
                  <Typography variant="caption" color="error">
                    <WarningIcon
                      fontSize="inherit"
                      sx={{ mr: 0.5, verticalAlign: 'middle' }}
                    />
                    Failed to load columns
                  </Typography>
                </Tooltip>
              )}
              <IconButton
                size="small"
                onClick={handleRefreshColumns}
                title="Refresh columns"
                disabled={isLoadingColumns}
              >
                <RefreshIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* Primary Key Columns */}
          <Box>
            <MultiColumnSelector
              label="Primary Key Column(s)"
              value={primaryKeyColumns}
              onChange={newValue => {
                // Warn if changing existing primary key
                if (
                  resource.primaryKeyColumns &&
                  resource.primaryKeyColumns.length > 0 &&
                  JSON.stringify(newValue) !==
                    JSON.stringify(resource.primaryKeyColumns)
                ) {
                  const confirmed = window.confirm(
                    '⚠️ Warning: Changing the primary key columns will break all existing links to detail pages and any DOIs that have been created for this resource.\n\nAre you sure you want to continue?',
                  )
                  if (!confirmed) {
                    return
                  }
                }
                setPrimaryKeyColumns(newValue)
              }}
              onBlur={handleChange}
              availableColumns={effectiveColumnNames}
              isLoading={isLoadingColumns}
              helperText="Column(s) that uniquely identify each row. Used for detail page URLs."
            />
            {resource.primaryKeyColumns &&
              resource.primaryKeyColumns.length > 0 && (
                <Alert
                  severity="warning"
                  icon={<LockIcon fontSize="small" />}
                  sx={{ mt: 1 }}
                >
                  <Typography variant="caption">
                    Changing the primary key will break existing links and DOIs.
                  </Typography>
                </Alert>
              )}
          </Box>

          {/* Card Display Configuration */}
          <Accordion defaultExpanded={isActive} sx={{ boxShadow: 'none' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="body2">Card Display Settings</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                {/* Card Type and Limit */}
                <Box display="flex" gap={2}>
                  <TextField
                    select
                    label="Card Type"
                    value={cardType}
                    onChange={e => {
                      setCardType(e.target.value as CardType)
                      setTimeout(handleChange, 0)
                    }}
                    size="small"
                    sx={{ minWidth: 180 }}
                  >
                    {CARD_TYPES.map(type => (
                      <MenuItem key={type} value={type}>
                        {type.replace(/_/g, ' ')}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    label="Label Limit"
                    value={secondaryLabelLimit}
                    onChange={e => setSecondaryLabelLimit(e.target.value)}
                    onBlur={handleChange}
                    size="small"
                    type="number"
                    sx={{ width: 100 }}
                  />
                </Box>

                {/* Generic Card Schema */}
                {(cardType === 'GENERIC_CARD' || cardType === 'STUDY') && (
                  <Stack spacing={2}>
                    <Typography variant="caption" color="text.secondary">
                      Map table columns to card fields. Start typing to see
                      available columns.
                    </Typography>

                    <Box display="flex" gap={2}>
                      <ColumnSelector
                        label="Title Column"
                        value={title}
                        onChange={setTitle}
                        onBlur={handleChange}
                        availableColumns={effectiveColumnNames}
                        isLoading={isLoadingColumns}
                      />
                      <ColumnSelector
                        label="Subtitle Column"
                        value={subTitle}
                        onChange={setSubTitle}
                        onBlur={handleChange}
                        availableColumns={effectiveColumnNames}
                        isLoading={isLoadingColumns}
                      />
                    </Box>
                    <Box display="flex" gap={2}>
                      <ColumnSelector
                        label="Description Column"
                        value={descriptionField}
                        onChange={setDescriptionField}
                        onBlur={handleChange}
                        availableColumns={effectiveColumnNames}
                        isLoading={isLoadingColumns}
                      />
                      <ColumnSelector
                        label="Icon Column"
                        value={iconField}
                        onChange={setIconField}
                        onBlur={handleChange}
                        availableColumns={effectiveColumnNames}
                        isLoading={isLoadingColumns}
                      />
                    </Box>
                    <MultiColumnSelector
                      label="Secondary Labels"
                      value={secondaryLabels}
                      onChange={setSecondaryLabels}
                      onBlur={handleChange}
                      availableColumns={effectiveColumnNames}
                      isLoading={isLoadingColumns}
                      helperText="Select columns to display as secondary labels on the card"
                    />

                    <Divider sx={{ my: 1 }} />

                    {/* Title Link Configuration */}
                    <Box>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={titleLinkEnabled}
                            onChange={e => {
                              setTitleLinkEnabled(e.target.checked)
                              setTimeout(handleChange, 0)
                            }}
                            size="small"
                          />
                        }
                        label={
                          <Box display="flex" alignItems="center" gap={0.5}>
                            <LinkIcon fontSize="small" />
                            <Typography variant="body2">
                              Title links to detail page
                            </Typography>
                          </Box>
                        }
                      />
                      {titleLinkEnabled && (
                        <Stack spacing={1.5} sx={{ mt: 1, pl: 2 }}>
                          <TextField
                            label="Base URL"
                            value={titleLinkBaseURL}
                            onChange={e => setTitleLinkBaseURL(e.target.value)}
                            onBlur={handleChange}
                            size="small"
                            fullWidth
                            placeholder="Explore/Studies/DetailsPage"
                            helperText="Relative path for the detail page"
                          />
                          <Box display="flex" gap={2}>
                            <ColumnSelector
                              label="URL Column"
                              value={titleLinkURLColumn}
                              onChange={setTitleLinkURLColumn}
                              onBlur={handleChange}
                              availableColumns={effectiveColumnNames}
                              isLoading={isLoadingColumns}
                              helperText="Column value for URL param"
                            />
                            <ColumnSelector
                              label="Match Column"
                              value={titleLinkMatchColumn}
                              onChange={setTitleLinkMatchColumn}
                              onBlur={handleChange}
                              availableColumns={effectiveColumnNames}
                              isLoading={isLoadingColumns}
                              helperText="Column to match (usually same as URL)"
                            />
                          </Box>
                        </Stack>
                      )}
                    </Box>

                    {/* Label Link Configurations */}
                    <Accordion
                      sx={{
                        boxShadow: 'none',
                        border: '1px solid',
                        borderColor: 'divider',
                      }}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <LinkIcon fontSize="small" />
                          <Typography variant="body2">
                            Label Links ({labelLinkConfigs.length})
                          </Typography>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Stack spacing={2}>
                          <Typography variant="caption" color="text.secondary">
                            Configure which secondary labels should link to
                            other pages.
                          </Typography>
                          {labelLinkConfigs.map((config, index) => (
                            <Card
                              key={index}
                              variant="outlined"
                              sx={{ p: 1.5 }}
                            >
                              <Stack spacing={1.5}>
                                <Box
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems="center"
                                >
                                  <Typography
                                    variant="caption"
                                    fontWeight="bold"
                                  >
                                    Label Link {index + 1}
                                  </Typography>
                                  <IconButton
                                    size="small"
                                    onClick={() => {
                                      setLabelLinkConfigs(prev =>
                                        prev.filter((_, i) => i !== index),
                                      )
                                      setTimeout(handleChange, 0)
                                    }}
                                    color="error"
                                  >
                                    <DeleteIcon fontSize="small" />
                                  </IconButton>
                                </Box>
                                <ColumnSelector
                                  label="Match Column"
                                  value={config.matchColumnName}
                                  onChange={value => {
                                    setLabelLinkConfigs(prev =>
                                      prev.map((c, i) =>
                                        i === index
                                          ? { ...c, matchColumnName: value }
                                          : c,
                                      ),
                                    )
                                  }}
                                  onBlur={handleChange}
                                  availableColumns={effectiveColumnNames}
                                  isLoading={isLoadingColumns}
                                  helperText="Secondary label column to link"
                                />
                                <TextField
                                  label="Base URL"
                                  value={config.baseURL}
                                  onChange={e => {
                                    setLabelLinkConfigs(prev =>
                                      prev.map((c, i) =>
                                        i === index
                                          ? { ...c, baseURL: e.target.value }
                                          : c,
                                      ),
                                    )
                                  }}
                                  onBlur={handleChange}
                                  size="small"
                                  fullWidth
                                  placeholder="Explore/Programs/DetailsPage"
                                />
                                <ColumnSelector
                                  label="URL Column"
                                  value={config.URLColumnName}
                                  onChange={value => {
                                    setLabelLinkConfigs(prev =>
                                      prev.map((c, i) =>
                                        i === index
                                          ? { ...c, URLColumnName: value }
                                          : c,
                                      ),
                                    )
                                  }}
                                  onBlur={handleChange}
                                  availableColumns={effectiveColumnNames}
                                  isLoading={isLoadingColumns}
                                  helperText="Column value for URL param"
                                />
                              </Stack>
                            </Card>
                          ))}
                          <Button
                            startIcon={<AddIcon />}
                            onClick={() => {
                              setLabelLinkConfigs(prev => [
                                ...prev,
                                {
                                  matchColumnName: '',
                                  baseURL: '',
                                  URLColumnName: '',
                                },
                              ])
                            }}
                            size="small"
                            variant="outlined"
                          >
                            Add Label Link
                          </Button>
                        </Stack>
                      </AccordionDetails>
                    </Accordion>
                  </Stack>
                )}
              </Stack>
            </AccordionDetails>
          </Accordion>

          {/* Table Display Configuration */}
          <Accordion sx={{ boxShadow: 'none' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="body2">Table Display Settings</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <Typography variant="caption" color="text.secondary">
                  Configure how this resource appears when displayed as a table
                  (QueryWrapperPlotNav). Used when referencing this resource in
                  detail page sections with "Display As: Table".
                </Typography>

                <Box display="flex" gap={2} flexWrap="wrap">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={
                          resource.tableDisplay?.showAccessColumn ?? false
                        }
                        onChange={e => {
                          updateResource(resource.id, {
                            tableDisplay: {
                              ...resource.tableDisplay,
                              showAccessColumn: e.target.checked,
                            },
                          })
                        }}
                        size="small"
                      />
                    }
                    label="Show Access Column"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={
                          resource.tableDisplay?.showDownloadColumn ?? false
                        }
                        onChange={e => {
                          updateResource(resource.id, {
                            tableDisplay: {
                              ...resource.tableDisplay,
                              showDownloadColumn: e.target.checked,
                            },
                          })
                        }}
                        size="small"
                      />
                    }
                    label="Show Download Column"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={
                          resource.tableDisplay?.showColumnSelection ?? false
                        }
                        onChange={e => {
                          updateResource(resource.id, {
                            tableDisplay: {
                              ...resource.tableDisplay,
                              showColumnSelection: e.target.checked,
                            },
                          })
                        }}
                        size="small"
                      />
                    }
                    label="Show Column Selection"
                  />
                </Box>

                <Box display="flex" gap={2} flexWrap="wrap">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={
                          resource.tableDisplay?.defaultShowPlots ?? false
                        }
                        onChange={e => {
                          updateResource(resource.id, {
                            tableDisplay: {
                              ...resource.tableDisplay,
                              defaultShowPlots: e.target.checked,
                            },
                          })
                        }}
                        size="small"
                      />
                    }
                    label="Show Plots by Default"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={resource.tableDisplay?.hideQueryCount ?? false}
                        onChange={e => {
                          updateResource(resource.id, {
                            tableDisplay: {
                              ...resource.tableDisplay,
                              hideQueryCount: e.target.checked,
                            },
                          })
                        }}
                        size="small"
                      />
                    }
                    label="Hide Query Count"
                  />
                </Box>

                <TextField
                  label="Visible Column Count"
                  value={resource.tableDisplay?.visibleColumnCount ?? ''}
                  onChange={e => {
                    const value = e.target.value
                    updateResource(resource.id, {
                      tableDisplay: {
                        ...resource.tableDisplay,
                        visibleColumnCount: value
                          ? parseInt(value, 10)
                          : undefined,
                      },
                    })
                  }}
                  size="small"
                  type="number"
                  sx={{ width: 180 }}
                  helperText="Number of columns to show by default"
                />

                <MultiColumnSelector
                  label="Available Facets"
                  value={resource.tableDisplay?.availableFacets ?? []}
                  onChange={value => {
                    updateResource(resource.id, {
                      tableDisplay: {
                        ...resource.tableDisplay,
                        availableFacets: value,
                      },
                    })
                  }}
                  onBlur={() => {}}
                  availableColumns={effectiveColumnNames}
                  isLoading={isLoadingColumns}
                  helperText="Columns available for facet filtering"
                />
              </Stack>
            </AccordionDetails>
          </Accordion>

          {/* Column Aliases Configuration */}
          <Accordion sx={{ boxShadow: 'none' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="body2">
                Column Aliases
                {resource.columnAliases &&
                  Object.keys(resource.columnAliases).length > 0 && (
                    <Typography
                      component="span"
                      variant="caption"
                      color="text.secondary"
                      sx={{ ml: 1 }}
                    >
                      ({Object.keys(resource.columnAliases).length} configured)
                    </Typography>
                  )}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <Typography variant="caption" color="text.secondary">
                  Map column names to human-readable display names. These
                  aliases are used in both card and table displays.
                </Typography>

                {/* Existing aliases */}
                {Object.entries(resource.columnAliases ?? {}).map(
                  ([columnName, alias]) => (
                    <Box
                      key={columnName}
                      display="flex"
                      gap={1}
                      alignItems="center"
                    >
                      <Autocomplete
                        freeSolo
                        options={effectiveColumnNames.filter(
                          col =>
                            col === columnName ||
                            !Object.keys(resource.columnAliases ?? {}).includes(
                              col,
                            ),
                        )}
                        value={columnName}
                        onInputChange={(_, newValue) => {
                          if (newValue && newValue !== columnName) {
                            // Rename the key
                            const newAliases = { ...resource.columnAliases }
                            delete newAliases[columnName]
                            newAliases[newValue] = alias
                            updateResource(resource.id, {
                              columnAliases: newAliases,
                            })
                          }
                        }}
                        size="small"
                        sx={{ flex: 1 }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label="Column Name"
                            placeholder="Select column"
                          />
                        )}
                      />
                      <Typography variant="body2" color="text.secondary">
                        →
                      </Typography>
                      <TextField
                        label="Display Name"
                        value={alias}
                        onChange={e => {
                          updateResource(resource.id, {
                            columnAliases: {
                              ...resource.columnAliases,
                              [columnName]: e.target.value,
                            },
                          })
                        }}
                        size="small"
                        sx={{ flex: 1 }}
                        placeholder="Human-readable name"
                      />
                      <IconButton
                        size="small"
                        onClick={() => {
                          const newAliases = { ...resource.columnAliases }
                          delete newAliases[columnName]
                          updateResource(resource.id, {
                            columnAliases:
                              Object.keys(newAliases).length > 0
                                ? newAliases
                                : undefined,
                          })
                        }}
                        color="error"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ),
                )}

                {/* Add new alias button */}
                <Button
                  startIcon={<AddIcon />}
                  onClick={() => {
                    // Find a column that doesn't have an alias yet
                    const existingKeys = Object.keys(
                      resource.columnAliases ?? {},
                    )
                    const availableColumn = effectiveColumnNames.find(
                      col => !existingKeys.includes(col),
                    )
                    const newColumnName = availableColumn ?? 'column_name'
                    updateResource(resource.id, {
                      columnAliases: {
                        ...resource.columnAliases,
                        [newColumnName]: '',
                      },
                    })
                  }}
                  size="small"
                  variant="outlined"
                >
                  Add Column Alias
                </Button>
              </Stack>
            </AccordionDetails>
          </Accordion>

          {/* Detail Page Configuration */}
          <Accordion sx={{ boxShadow: 'none' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="body2">
                Detail Page
                {resource.detailsPage && (
                  <Typography
                    component="span"
                    variant="caption"
                    color="text.secondary"
                    sx={{ ml: 1 }}
                  >
                    ({resource.detailsPage.path})
                  </Typography>
                )}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
                Detail page configuration has moved to the Routes editor. Create
                a route with &quot;Display As: Details&quot; to configure a
                detail page for this resource.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Stack>
      </CardContent>
    </Card>
  )
}

export function ResourcesEditor() {
  const { config, addResource } = usePortalConfig()
  const { activeResource, setActiveResource } = useResourceEditor()

  const handleAdd = () => {
    const newResource: Resource = {
      id: crypto.randomUUID(),
      name: 'New Resource',
      sql: 'SELECT * FROM syn12345',
      primaryKeyColumns: [],
      selectColumns: [],
      cardDisplay: {
        cardType: 'GENERIC_CARD',
        genericCardSchema: {
          type: 'GENERIC_CARD',
          title: 'name',
        },
      },
    }
    addResource(newResource)
    setActiveResource(newResource)
  }

  const resources = config.resources ?? []

  return (
    <Stack spacing={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Resources</Typography>
        <Button
          startIcon={<AddIcon />}
          onClick={handleAdd}
          variant="contained"
          size="small"
        >
          Add Resource
        </Button>
      </Box>

      <Typography variant="body2" color="text.secondary">
        Resources define data from Synapse tables. Column names are
        automatically fetched from your SQL query to help configure card
        displays.
      </Typography>

      {resources.length === 0 ? (
        <Card variant="outlined">
          <CardContent>
            <Typography color="text.secondary" textAlign="center">
              No resources defined yet.
              <br />
              Click &quot;Add Resource&quot; to create one.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Stack spacing={2}>
          {resources.map(resource => (
            <InlineResourceEditor
              key={resource.id}
              resource={resource}
              isActive={activeResource?.id === resource.id}
            />
          ))}
        </Stack>
      )}
    </Stack>
  )
}

/**
 * @deprecated Use ResourcesEditor instead
 */
export { ResourcesEditor as CardConfigurationsEditor }
