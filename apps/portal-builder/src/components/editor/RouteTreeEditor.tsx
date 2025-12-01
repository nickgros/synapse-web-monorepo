import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Collapse from '@mui/material/Collapse'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import ArrowUpIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownIcon from '@mui/icons-material/ArrowDownward'
import HomeIcon from '@mui/icons-material/Home'
import FolderIcon from '@mui/icons-material/Folder'
import PageIcon from '@mui/icons-material/Description'
import LinkIcon from '@mui/icons-material/Link'
import DetailsIcon from '@mui/icons-material/Article'
import ChildIcon from '@mui/icons-material/SubdirectoryArrowRight'
import PreviewIcon from '@mui/icons-material/Visibility'
import { useState, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { usePortalConfig, useResourceEditor } from '../../state'
import { RouteNode, ComponentBlock, Resource } from '../../types'
import { ComponentPicker } from './ComponentPicker'
import { ComponentBlockEditor } from './ComponentBlockEditor'
import { DetailsPageEditor } from './DetailsPageEditor'

/**
 * Build the full path for a route by combining parent paths
 */
function buildFullPath(
  routes: RouteNode[],
  targetId: string,
  currentPath = '',
): string | undefined {
  for (const route of routes) {
    const routePath = route.path.startsWith('/')
      ? route.path
      : `${currentPath}/${route.path}`
    const normalizedPath = routePath.replace(/\/+/g, '/') // Remove double slashes

    if (route.id === targetId) {
      return normalizedPath
    }

    if (route.children) {
      const found = buildFullPath(route.children, targetId, normalizedPath)
      if (found) return found
    }
  }
  return undefined
}

/**
 * RouteTreeEditor - Unified editor for portal routes
 *
 * This replaces the separate PagesEditor and NavbarEditor with a single
 * tree-based editor that handles navigation, pages, and nested routes.
 */
export function RouteTreeEditor() {
  const { config, addRoute, updateRoute, deleteRoute } = usePortalConfig()
  const { setPreviewPath } = useResourceEditor()
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(
    config.routes?.[0]?.id || null,
  )
  const [expandedRoutes, setExpandedRoutes] = useState<Set<string>>(new Set())

  // Find the selected route in the tree
  const findRoute = (
    routes: RouteNode[],
    id: string,
  ): RouteNode | undefined => {
    for (const route of routes) {
      if (route.id === id) return route
      if (route.children) {
        const found = findRoute(route.children, id)
        if (found) return found
      }
    }
    return undefined
  }

  // Find parent route ID
  const findParentId = (
    routes: RouteNode[],
    id: string,
    parentId?: string,
  ): string | undefined => {
    for (const route of routes) {
      if (route.id === id) return parentId
      if (route.children) {
        const found = findParentId(route.children, id, route.id)
        if (found !== undefined) return found
      }
    }
    return undefined
  }

  const selectedRoute = useMemo(
    () =>
      selectedRouteId
        ? findRoute(config.routes ?? [], selectedRouteId)
        : undefined,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [config.routes, selectedRouteId],
  )

  const handleAddRoute = (parentId?: string) => {
    const newRoute: RouteNode = {
      id: uuidv4(),
      displayName: 'New Route',
      path: '/new-route',
      displayAs: 'standard',
      components: [],
    }
    addRoute(newRoute, parentId)
    setSelectedRouteId(newRoute.id)
    if (parentId) {
      setExpandedRoutes(prev => {
        const arr = Array.from(prev)
        arr.push(parentId)
        return new Set(arr)
      })
    }
  }

  const toggleExpanded = (routeId: string) => {
    setExpandedRoutes(prev => {
      const next = new Set(prev)
      if (next.has(routeId)) {
        next.delete(routeId)
      } else {
        next.add(routeId)
      }
      return next
    })
  }

  const getRouteIcon = (route: RouteNode) => {
    if (route.linkType === 'external') return <LinkIcon />
    if (route.displayAs === 'details') return <DetailsIcon />
    if (route.displayAs === 'explore') return <FolderIcon />
    if (route.path === '/') return <HomeIcon />
    return <PageIcon />
  }

  const handlePreviewRoute = (route: RouteNode) => {
    // Don't preview external links
    if (route.linkType === 'external') return

    const fullPath = buildFullPath(config.routes ?? [], route.id)
    if (fullPath) {
      setPreviewPath(fullPath)
    }
  }

  const renderRouteList = (routes: RouteNode[], depth = 0) => {
    return routes.map(route => {
      const hasChildren = route.children && route.children.length > 0
      const isExpanded = expandedRoutes.has(route.id)
      const isSelected = route.id === selectedRouteId
      const isExternal = route.linkType === 'external'

      return (
        <Box key={route.id}>
          <ListItemButton
            selected={isSelected}
            onClick={() => setSelectedRouteId(route.id)}
            sx={{ pl: 2 + depth * 2 }}
          >
            {depth > 0 && (
              <ChildIcon
                sx={{ mr: 0.5, fontSize: 16, color: 'text.secondary' }}
              />
            )}
            <ListItemIcon sx={{ minWidth: 32 }}>
              {getRouteIcon(route)}
            </ListItemIcon>
            <ListItemText
              primary={route.displayName}
              secondary={route.path}
              primaryTypographyProps={{ noWrap: true, fontSize: '0.875rem' }}
              secondaryTypographyProps={{ noWrap: true, fontSize: '0.75rem' }}
            />
            {!isExternal && (
              <Tooltip title="Preview this route">
                <IconButton
                  size="small"
                  onClick={e => {
                    e.stopPropagation()
                    handlePreviewRoute(route)
                  }}
                  sx={{ mr: 0.5 }}
                >
                  <PreviewIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            {hasChildren && (
              <IconButton
                size="small"
                onClick={e => {
                  e.stopPropagation()
                  toggleExpanded(route.id)
                }}
              >
                {isExpanded ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            )}
          </ListItemButton>
          {hasChildren && (
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {renderRouteList(route.children!, depth + 1)}
              </List>
            </Collapse>
          )}
        </Box>
      )
    })
  }

  return (
    <Box sx={{ display: 'flex', gap: 2, height: '100%' }}>
      {/* Route Tree */}
      <Paper
        variant="outlined"
        sx={{ width: 280, flexShrink: 0, overflow: 'auto' }}
      >
        <Box
          sx={{
            p: 1,
            borderBottom: 1,
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="subtitle2">Routes</Typography>
          <IconButton size="small" onClick={() => handleAddRoute()}>
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
        <List dense>{renderRouteList(config.routes ?? [])}</List>
      </Paper>

      {/* Route Editor */}
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        {selectedRoute ? (
          <RouteEditor
            route={selectedRoute}
            parentId={findParentId(config.routes ?? [], selectedRoute.id)}
            onUpdate={updates => updateRoute(selectedRoute.id, updates)}
            onDelete={() => {
              deleteRoute(selectedRoute.id)
              setSelectedRouteId(config.routes?.[0]?.id || null)
            }}
            onAddChild={() => handleAddRoute(selectedRoute.id)}
          />
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Typography color="text.secondary">
              Select a route to edit or add a new one
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}

interface RouteEditorProps {
  route: RouteNode
  parentId?: string
  onUpdate: (updates: Partial<RouteNode>) => void
  onDelete: () => void
  onAddChild: () => void
}

function RouteEditor({
  route,
  parentId: _parentId,
  onUpdate,
  onDelete,
  onAddChild,
}: RouteEditorProps) {
  const {
    config,
    addComponentBlock,
    updateComponentBlock,
    deleteComponentBlock,
    moveComponentBlock,
  } = usePortalConfig()
  const [showComponentPicker, setShowComponentPicker] = useState(false)

  const isExternalLink = route.linkType === 'external'
  const displayAs = route.displayAs ?? 'standard'

  const handleAddComponent = (block: ComponentBlock) => {
    addComponentBlock(route.id, block)
    setShowComponentPicker(false)
  }

  return (
    <Box>
      {/* Route Settings */}
      <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 2,
          }}
        >
          <Typography variant="h6">Route Settings</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              size="small"
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={onAddChild}
            >
              Add Child Route
            </Button>
            <Button
              size="small"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={onDelete}
            >
              Delete
            </Button>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            label="Display Name"
            value={route.displayName}
            onChange={e => onUpdate({ displayName: e.target.value })}
            size="small"
            sx={{ flexGrow: 1 }}
            helperText="Shown in navbar and tabs"
          />
          <TextField
            label="Path"
            value={route.path}
            onChange={e => onUpdate({ path: e.target.value })}
            size="small"
            sx={{ flexGrow: 1 }}
            helperText={
              isExternalLink ? 'Full URL for external link' : 'URL path segment'
            }
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Link Type</InputLabel>
            <Select
              value={route.linkType ?? 'internal'}
              onChange={e =>
                onUpdate({
                  linkType: e.target.value,
                })
              }
              label="Link Type"
            >
              <MenuItem value="internal">Internal Page</MenuItem>
              <MenuItem value="external">External Link</MenuItem>
            </Select>
          </FormControl>

          {!isExternalLink && (
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Display As</InputLabel>
              <Select
                value={displayAs}
                onChange={e =>
                  onUpdate({
                    displayAs: e.target.value,
                  })
                }
                label="Display As"
              >
                <MenuItem value="standard">Standard Page</MenuItem>
                <MenuItem value="explore">Explore Layout</MenuItem>
                <MenuItem value="details">Details Page</MenuItem>
              </Select>
            </FormControl>
          )}

          <FormControlLabel
            control={
              <Switch
                checked={route.showInNavbar !== false}
                onChange={e => onUpdate({ showInNavbar: e.target.checked })}
              />
            }
            label="Show in Navbar"
          />
        </Box>
      </Paper>

      {/* Content Editor based on displayAs */}
      {!isExternalLink && displayAs === 'standard' && (
        <StandardRouteEditor
          route={route}
          onUpdate={onUpdate}
          onAddComponent={() => setShowComponentPicker(true)}
          onUpdateComponent={(blockId, updates) =>
            updateComponentBlock(route.id, blockId, updates)
          }
          onDeleteComponent={blockId => deleteComponentBlock(route.id, blockId)}
          onMoveComponent={(blockId, newIndex) =>
            moveComponentBlock(route.id, blockId, newIndex)
          }
        />
      )}

      {!isExternalLink && displayAs === 'explore' && (
        <ExploreRouteEditor route={route} onUpdate={onUpdate} />
      )}

      {!isExternalLink && displayAs === 'details' && (
        <DetailsRouteEditor
          route={route}
          onUpdate={onUpdate}
          resources={config.resources ?? []}
        />
      )}

      {showComponentPicker && (
        <ComponentPicker
          open={showComponentPicker}
          onClose={() => setShowComponentPicker(false)}
          onSelect={handleAddComponent}
        />
      )}
    </Box>
  )
}

interface StandardRouteEditorProps {
  route: RouteNode
  onUpdate: (updates: Partial<RouteNode>) => void
  onAddComponent: () => void
  onUpdateComponent: (blockId: string, updates: Partial<ComponentBlock>) => void
  onDeleteComponent: (blockId: string) => void
  onMoveComponent: (blockId: string, newIndex: number) => void
}

function StandardRouteEditor({
  route,
  onUpdate,
  onAddComponent,
  onUpdateComponent,
  onDeleteComponent,
  onMoveComponent,
}: StandardRouteEditorProps) {
  const components = route.components ?? []
  const hasCustomComponent = !!route.customComponent

  return (
    <>
      {/* Custom Component Section */}
      <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 1,
          }}
        >
          <Typography variant="subtitle1">Page Content</Typography>
        </Box>

        <TextField
          label="Custom Component"
          value={route.customComponent ?? ''}
          onChange={e =>
            onUpdate({
              customComponent: e.target.value || undefined,
            })
          }
          size="small"
          fullWidth
          placeholder="e.g., ADKPHomePage"
          helperText={
            hasCustomComponent
              ? 'This custom component will render the entire page. Component blocks below are ignored.'
              : 'Leave empty to use component blocks below, or enter a registered custom component name.'
          }
          sx={{ mb: 1 }}
        />

        {hasCustomComponent && (
          <Chip
            label={`Using custom component: ${route.customComponent}`}
            color="primary"
            variant="outlined"
            size="small"
          />
        )}
      </Paper>

      {/* Component Blocks Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography
          variant="h6"
          color={hasCustomComponent ? 'text.disabled' : 'text.primary'}
        >
          Component Blocks
          {hasCustomComponent && (
            <Typography
              component="span"
              variant="caption"
              sx={{ ml: 1, fontWeight: 'normal' }}
            >
              (ignored when using custom component)
            </Typography>
          )}
        </Typography>
        <Button
          size="small"
          startIcon={<AddIcon />}
          onClick={onAddComponent}
          variant="outlined"
          disabled={hasCustomComponent}
        >
          Add Component
        </Button>
      </Box>

      {components.length === 0 ? (
        <Paper
          variant="outlined"
          sx={{
            p: 4,
            textAlign: 'center',
            borderStyle: 'dashed',
          }}
        >
          <Typography color="text.secondary" gutterBottom>
            No components yet
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAddComponent}
          >
            Add Your First Component
          </Button>
        </Paper>
      ) : (
        <Box>
          {components.map((block, index) => (
            <Paper
              key={block.id}
              variant="outlined"
              sx={{ mb: 1, overflow: 'hidden' }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  p: 1,
                  borderBottom: 1,
                  borderColor: 'divider',
                  backgroundColor: 'grey.50',
                }}
              >
                <Chip label={block.componentType} size="small" />
                <Box sx={{ flexGrow: 1 }} />
                <IconButton
                  size="small"
                  disabled={index === 0}
                  onClick={() => onMoveComponent(block.id, index - 1)}
                >
                  <ArrowUpIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  disabled={index === components.length - 1}
                  onClick={() => onMoveComponent(block.id, index + 1)}
                >
                  <ArrowDownIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => onDeleteComponent(block.id)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
              <Box sx={{ p: 2 }}>
                <ComponentBlockEditor
                  block={block}
                  onUpdate={updates => onUpdateComponent(block.id, updates)}
                />
              </Box>
            </Paper>
          ))}
        </Box>
      )}
    </>
  )
}

interface ExploreRouteEditorProps {
  route: RouteNode
  onUpdate: (updates: Partial<RouteNode>) => void
}

function ExploreRouteEditor({
  route,
  onUpdate: _onUpdate,
}: ExploreRouteEditorProps) {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Explore Layout
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Child routes of this page will be displayed as tabs. Add child routes
        and configure their <code>exploreTabConfig</code> to set which resource
        each tab displays.
      </Typography>

      {route.children && route.children.length > 0 ? (
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Tabs ({route.children.length})
          </Typography>
          <List dense>
            {route.children.map(child => (
              <ListItem key={child.id}>
                <ListItemIcon>
                  <FolderIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={child.displayName}
                  secondary={
                    child.exploreTabConfig?.resourceId || 'No resource assigned'
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No child routes. Add child routes to create tabs.
        </Typography>
      )}
    </Paper>
  )
}

interface DetailsRouteEditorProps {
  route: RouteNode
  onUpdate: (updates: Partial<RouteNode>) => void
  resources: Resource[]
}

function DetailsRouteEditor({
  route,
  onUpdate,
  resources,
}: DetailsRouteEditorProps) {
  const detailsConfig = route.detailsConfig

  // Handler to update detailsConfig from DetailsPageEditor
  const handleConfigChange = (
    updates: Partial<NonNullable<typeof detailsConfig>>,
  ) => {
    onUpdate({
      detailsConfig: {
        ...detailsConfig,
        resourceId: detailsConfig?.resourceId ?? '',
        ...updates,
      },
    })
  }

  // If no config exists yet, show a resource selector to initialize
  if (!detailsConfig?.resourceId) {
    return (
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Details Page Configuration
        </Typography>

        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
          <InputLabel>Resource</InputLabel>
          <Select
            value=""
            onChange={e =>
              onUpdate({
                detailsConfig: {
                  resourceId: e.target.value,
                  showHeaderCard: true,
                  tabs: [],
                  sections: [],
                },
              })
            }
            label="Resource"
          >
            <MenuItem value="">
              <em>Select a resource to configure details page</em>
            </MenuItem>
            {resources.map(resource => (
              <MenuItem key={resource.id} value={resource.id}>
                {resource.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>
    )
  }

  return (
    <DetailsPageEditor
      config={detailsConfig}
      onChange={handleConfigChange}
      resources={resources}
    />
  )
}
