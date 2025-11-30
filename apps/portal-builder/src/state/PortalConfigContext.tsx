/**
 * Portal Configuration Context
 *
 * This context provides centralized state management for the portal configuration.
 * It uses `use-immer` for immutable state updates with a mutable API.
 *
 * Features:
 * - Automatic persistence to localStorage
 * - Schema validation on load using Zod
 * - CRUD operations for all configuration sections
 * - Memoized callbacks to prevent unnecessary re-renders
 *
 * Usage:
 * ```tsx
 * function MyComponent() {
 *   const { config, updateResource, addRoute } = usePortalConfig()
 *   // ...
 * }
 * ```
 *
 * The context provides methods for:
 * - Metadata: setMetadata
 * - Styling: setPalette, setHeaderConfig, setFooterConfig, setLogo*
 * - Navigation: setPortalsDropdownEnabled
 * - Resources: addResource, updateResource, deleteResource, getResource, updateResourceColumns
 * - Routes: addRoute, updateRoute, deleteRoute, moveRoute, getRoute, updateRouteDeep
 * - Components: addComponentBlock, updateComponentBlock, deleteComponentBlock, moveComponentBlock
 * - Import/Export: importConfig, exportConfig, resetConfig
 */
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react'
import { useImmer } from 'use-immer'
import {
  CachedSelectColumn,
  ComponentBlock,
  DetailsPageSection,
  DetailsPageTab,
  PortalConfig,
  PortalConfigSchema,
  Resource,
  RouteNode,
} from '../types'
import { createDefaultPortalConfig } from '../utils/defaultConfig'

const LOCAL_STORAGE_KEY = 'portal-builder-config'

/**
 * Load config from localStorage if available, otherwise use default
 */
function loadConfigFromStorage(): PortalConfig {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      const validated = PortalConfigSchema.parse(parsed)
      return validated
    }
  } catch (error) {
    console.warn('Failed to load config from localStorage:', error)
  }
  return createDefaultPortalConfig()
}

/**
 * Save config to localStorage
 */
function saveConfigToStorage(config: PortalConfig): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(config))
  } catch (error) {
    console.warn('Failed to save config to localStorage:', error)
  }
}

type PortalConfigContextType = {
  config: PortalConfig
  // Metadata
  setMetadata: (metadata: PortalConfig['metadata']) => void
  // Palette
  setPalette: (palette: PortalConfig['palette']) => void
  // Header
  setHeaderConfig: (headerConfig: PortalConfig['headerConfig']) => void
  // Footer
  setFooterConfig: (footerConfig: PortalConfig['footerConfig']) => void
  // Logos
  setLogoHeaderConfig: (logoConfig: PortalConfig['logoHeaderConfig']) => void
  setLogoFooterConfig: (logoConfig: PortalConfig['logoFooterConfig']) => void
  // Navigation
  setPortalsDropdownEnabled: (enabled: boolean) => void
  // Resources
  addResource: (resource: Resource) => void
  updateResource: (resourceId: string, updates: Partial<Resource>) => void
  deleteResource: (resourceId: string) => void
  getResource: (resourceId: string) => Resource | undefined
  updateResourceColumns: (
    resourceId: string,
    selectColumns: CachedSelectColumn[],
  ) => void
  // Routes (unified tree)
  addRoute: (route: RouteNode, parentId?: string) => void
  updateRoute: (routeId: string, updates: Partial<RouteNode>) => void
  deleteRoute: (routeId: string) => void
  moveRoute: (routeId: string, newIndex: number, newParentId?: string) => void
  getRoute: (routeId: string) => RouteNode | undefined
  /**
   * Update a route at any depth in the tree by its ID
   */
  updateRouteDeep: (routeId: string, updates: Partial<RouteNode>) => void
  // Component blocks (for routes with displayAs: 'standard')
  addComponentBlock: (routeId: string, block: ComponentBlock) => void
  updateComponentBlock: (
    routeId: string,
    blockId: string,
    updates: Partial<ComponentBlock>,
  ) => void
  deleteComponentBlock: (routeId: string, blockId: string) => void
  moveComponentBlock: (
    routeId: string,
    blockId: string,
    newIndex: number,
  ) => void
  // Details Page methods (for resources)
  addDetailsPageTab: (resourceId: string, tab: DetailsPageTab) => void
  updateDetailsPageTab: (
    resourceId: string,
    tabId: string,
    updates: Partial<DetailsPageTab>,
  ) => void
  deleteDetailsPageTab: (resourceId: string, tabId: string) => void
  addDetailsPageSection: (
    resourceId: string,
    section: DetailsPageSection,
    tabId?: string,
  ) => void
  updateDetailsPageSection: (
    resourceId: string,
    sectionId: string,
    updates: Partial<DetailsPageSection>,
    tabId?: string,
  ) => void
  deleteDetailsPageSection: (
    resourceId: string,
    sectionId: string,
    tabId?: string,
  ) => void
  // Import/Export
  importConfig: (config: PortalConfig) => void
  exportConfig: () => PortalConfig
  resetConfig: () => void
}

const PortalConfigContext = createContext<PortalConfigContextType | undefined>(
  undefined,
)

export function PortalConfigProvider({ children }: PropsWithChildren) {
  const [config, updateConfig] = useImmer<PortalConfig>(loadConfigFromStorage)

  // Auto-save to localStorage when config changes
  useEffect(() => {
    saveConfigToStorage(config)
  }, [config])

  const setMetadata = useCallback(
    (metadata: PortalConfig['metadata']) => {
      updateConfig(draft => {
        draft.metadata = metadata
      })
    },
    [updateConfig],
  )

  const setPalette = useCallback(
    (palette: PortalConfig['palette']) => {
      updateConfig(draft => {
        draft.palette = palette
      })
    },
    [updateConfig],
  )

  const setHeaderConfig = useCallback(
    (headerConfig: PortalConfig['headerConfig']) => {
      updateConfig(draft => {
        draft.headerConfig = headerConfig
      })
    },
    [updateConfig],
  )

  const setFooterConfig = useCallback(
    (footerConfig: PortalConfig['footerConfig']) => {
      updateConfig(draft => {
        draft.footerConfig = footerConfig
      })
    },
    [updateConfig],
  )

  const setLogoHeaderConfig = useCallback(
    (logoConfig: PortalConfig['logoHeaderConfig']) => {
      updateConfig(draft => {
        draft.logoHeaderConfig = logoConfig
      })
    },
    [updateConfig],
  )

  const setLogoFooterConfig = useCallback(
    (logoConfig: PortalConfig['logoFooterConfig']) => {
      updateConfig(draft => {
        draft.logoFooterConfig = logoConfig
      })
    },
    [updateConfig],
  )

  const setPortalsDropdownEnabled = useCallback(
    (enabled: boolean) => {
      updateConfig(draft => {
        draft.isPortalsDropdownEnabled = enabled
      })
    },
    [updateConfig],
  )

  // Helper to find a route by ID in the tree
  const findRouteInTree = (
    routes: RouteNode[],
    routeId: string,
  ): RouteNode | undefined => {
    for (const route of routes) {
      if (route.id === routeId) return route
      if (route.children) {
        const found = findRouteInTree(route.children, routeId)
        if (found) return found
      }
    }
    return undefined
  }

  // Helper to find parent route of a given route
  const findParentRoute = (
    routes: RouteNode[],
    routeId: string,
    parent?: RouteNode,
  ): RouteNode | undefined => {
    for (const route of routes) {
      if (route.id === routeId) return parent
      if (route.children) {
        const found = findParentRoute(route.children, routeId, route)
        if (found) return found
      }
    }
    return undefined
  }

  // Route methods
  const addRoute = useCallback(
    (route: RouteNode, parentId?: string) => {
      updateConfig(draft => {
        if (!draft.routes) {
          draft.routes = []
        }
        if (parentId) {
          const parent = findRouteInTree(draft.routes, parentId)
          if (parent) {
            if (!parent.children) {
              parent.children = []
            }
            parent.children.push(route)
          }
        } else {
          draft.routes.push(route)
        }
      })
    },
    [updateConfig],
  )

  const updateRoute = useCallback(
    (routeId: string, updates: Partial<RouteNode>) => {
      updateConfig(draft => {
        if (!draft.routes) return
        // First check top-level routes
        const topIndex = draft.routes.findIndex(r => r.id === routeId)
        if (topIndex !== -1) {
          Object.assign(draft.routes[topIndex], updates)
          return
        }
        // Otherwise search in tree
        const route = findRouteInTree(draft.routes, routeId)
        if (route) {
          Object.assign(route, updates)
        }
      })
    },
    [updateConfig],
  )

  const updateRouteDeep = useCallback(
    (routeId: string, updates: Partial<RouteNode>) => {
      updateConfig(draft => {
        if (!draft.routes) return
        const route = findRouteInTree(draft.routes, routeId)
        if (route) {
          Object.assign(route, updates)
        }
      })
    },
    [updateConfig],
  )

  const deleteRoute = useCallback(
    (routeId: string) => {
      updateConfig(draft => {
        if (!draft.routes) return

        // Helper to recursively delete from children
        const deleteFromChildren = (routes: RouteNode[]): boolean => {
          const index = routes.findIndex(r => r.id === routeId)
          if (index !== -1) {
            routes.splice(index, 1)
            return true
          }
          for (const route of routes) {
            if (route.children && deleteFromChildren(route.children)) {
              return true
            }
          }
          return false
        }

        deleteFromChildren(draft.routes)
      })
    },
    [updateConfig],
  )

  const moveRoute = useCallback(
    (routeId: string, newIndex: number, newParentId?: string) => {
      updateConfig(draft => {
        if (!draft.routes) return

        // Find and remove the route from its current position
        let movedRoute: RouteNode | undefined

        const removeRoute = (routes: RouteNode[]): boolean => {
          const index = routes.findIndex(r => r.id === routeId)
          if (index !== -1) {
            movedRoute = routes.splice(index, 1)[0]
            return true
          }
          for (const route of routes) {
            if (route.children && removeRoute(route.children)) {
              return true
            }
          }
          return false
        }

        removeRoute(draft.routes)

        if (!movedRoute) return

        // Add to new position
        if (newParentId) {
          const parent = findRouteInTree(draft.routes, newParentId)
          if (parent) {
            if (!parent.children) {
              parent.children = []
            }
            parent.children.splice(newIndex, 0, movedRoute)
          }
        } else {
          draft.routes.splice(newIndex, 0, movedRoute)
        }
      })
    },
    [updateConfig],
  )

  const getRoute = useCallback(
    (routeId: string): RouteNode | undefined => {
      return findRouteInTree(config.routes ?? [], routeId)
    },
    [config.routes],
  )

  // Resource methods
  const addResource = useCallback(
    (resource: Resource) => {
      updateConfig(draft => {
        if (!draft.resources) {
          draft.resources = []
        }
        draft.resources.push(resource)
      })
    },
    [updateConfig],
  )

  const updateResource = useCallback(
    (resourceId: string, updates: Partial<Resource>) => {
      updateConfig(draft => {
        if (!draft.resources) return
        const index = draft.resources.findIndex(r => r.id === resourceId)
        if (index !== -1) {
          Object.assign(draft.resources[index], updates)
        }
      })
    },
    [updateConfig],
  )

  const deleteResource = useCallback(
    (resourceId: string) => {
      updateConfig(draft => {
        if (!draft.resources) return
        draft.resources = draft.resources.filter(r => r.id !== resourceId)
      })
    },
    [updateConfig],
  )

  const getResource = useCallback(
    (resourceId: string): Resource | undefined => {
      return config.resources?.find(r => r.id === resourceId)
    },
    [config.resources],
  )

  const updateResourceColumns = useCallback(
    (resourceId: string, selectColumns: CachedSelectColumn[]) => {
      updateConfig(draft => {
        if (!draft.resources) return
        const index = draft.resources.findIndex(r => r.id === resourceId)
        if (index !== -1) {
          draft.resources[index].selectColumns = selectColumns
          draft.resources[index].lastColumnFetch = new Date().toISOString()
        }
      })
    },
    [updateConfig],
  )

  // Component block methods (for routes with displayAs: 'standard')
  const addComponentBlock = useCallback(
    (routeId: string, block: ComponentBlock) => {
      updateConfig(draft => {
        if (!draft.routes) return
        const route = findRouteInTree(draft.routes, routeId)
        if (route) {
          if (!route.components) {
            route.components = []
          }
          route.components.push(block)
        }
      })
    },
    [updateConfig],
  )

  const updateComponentBlock = useCallback(
    (routeId: string, blockId: string, updates: Partial<ComponentBlock>) => {
      updateConfig(draft => {
        if (!draft.routes) return
        const route = findRouteInTree(draft.routes, routeId)
        if (route?.components) {
          const index = route.components.findIndex(c => c.id === blockId)
          if (index !== -1) {
            route.components[index] = { ...route.components[index], ...updates }
          }
        }
      })
    },
    [updateConfig],
  )

  const deleteComponentBlock = useCallback(
    (routeId: string, blockId: string) => {
      updateConfig(draft => {
        if (!draft.routes) return
        const route = findRouteInTree(draft.routes, routeId)
        if (route?.components) {
          route.components = route.components.filter(c => c.id !== blockId)
        }
      })
    },
    [updateConfig],
  )

  const moveComponentBlock = useCallback(
    (routeId: string, blockId: string, newIndex: number) => {
      updateConfig(draft => {
        if (!draft.routes) return
        const route = findRouteInTree(draft.routes, routeId)
        if (route?.components) {
          const currentIndex = route.components.findIndex(c => c.id === blockId)
          if (currentIndex !== -1 && currentIndex !== newIndex) {
            const [block] = route.components.splice(currentIndex, 1)
            route.components.splice(newIndex, 0, block)
          }
        }
      })
    },
    [updateConfig],
  )

  // Details Page methods (for routes with displayAs: 'details')
  const addDetailsPageTab = useCallback(
    (resourceId: string, tab: DetailsPageTab) => {
      updateConfig(draft => {
        if (!draft.resources) return
        const resource = draft.resources.find(r => r.id === resourceId)
        if (resource?.detailsPage) {
          if (!resource.detailsPage.tabs) {
            resource.detailsPage.tabs = []
          }
          resource.detailsPage.tabs.push(tab)
        }
      })
    },
    [updateConfig],
  )

  const updateDetailsPageTab = useCallback(
    (resourceId: string, tabId: string, updates: Partial<DetailsPageTab>) => {
      updateConfig(draft => {
        if (!draft.resources) return
        const resource = draft.resources.find(r => r.id === resourceId)
        if (resource?.detailsPage?.tabs) {
          const tabIndex = resource.detailsPage.tabs.findIndex(
            t => t.id === tabId,
          )
          if (tabIndex !== -1) {
            Object.assign(resource.detailsPage.tabs[tabIndex], updates)
          }
        }
      })
    },
    [updateConfig],
  )

  const deleteDetailsPageTab = useCallback(
    (resourceId: string, tabId: string) => {
      updateConfig(draft => {
        if (!draft.resources) return
        const resource = draft.resources.find(r => r.id === resourceId)
        if (resource?.detailsPage?.tabs) {
          resource.detailsPage.tabs = resource.detailsPage.tabs.filter(
            t => t.id !== tabId,
          )
        }
      })
    },
    [updateConfig],
  )

  const addDetailsPageSection = useCallback(
    (resourceId: string, section: DetailsPageSection, tabId?: string) => {
      updateConfig(draft => {
        if (!draft.resources) return
        const resource = draft.resources.find(r => r.id === resourceId)
        if (!resource?.detailsPage) return

        if (tabId) {
          // Add to a specific tab
          const tab = resource.detailsPage.tabs?.find(t => t.id === tabId)
          if (tab) {
            tab.sections.push(section)
          }
        } else {
          // Add to top-level sections
          if (!resource.detailsPage.sections) {
            resource.detailsPage.sections = []
          }
          resource.detailsPage.sections.push(section)
        }
      })
    },
    [updateConfig],
  )

  const updateDetailsPageSection = useCallback(
    (
      resourceId: string,
      sectionId: string,
      updates: Partial<DetailsPageSection>,
      tabId?: string,
    ) => {
      updateConfig(draft => {
        if (!draft.resources) return
        const resource = draft.resources.find(r => r.id === resourceId)
        if (!resource?.detailsPage) return

        let sections: DetailsPageSection[] | undefined
        if (tabId) {
          const tab = resource.detailsPage.tabs?.find(t => t.id === tabId)
          sections = tab?.sections
        } else {
          sections = resource.detailsPage.sections
        }

        if (sections) {
          const sectionIndex = sections.findIndex(s => s.id === sectionId)
          if (sectionIndex !== -1) {
            Object.assign(sections[sectionIndex], updates)
          }
        }
      })
    },
    [updateConfig],
  )

  const deleteDetailsPageSection = useCallback(
    (resourceId: string, sectionId: string, tabId?: string) => {
      updateConfig(draft => {
        if (!draft.resources) return
        const resource = draft.resources.find(r => r.id === resourceId)
        if (!resource?.detailsPage) return

        if (tabId) {
          const tab = resource.detailsPage.tabs?.find(t => t.id === tabId)
          if (tab) {
            tab.sections = tab.sections.filter(s => s.id !== sectionId)
          }
        } else if (resource.detailsPage.sections) {
          resource.detailsPage.sections = resource.detailsPage.sections.filter(
            s => s.id !== sectionId,
          )
        }
      })
    },
    [updateConfig],
  )

  const importConfig = useCallback(
    (newConfig: PortalConfig) => {
      updateConfig(() => newConfig)
    },
    [updateConfig],
  )

  const exportConfig = useCallback(() => {
    return config
  }, [config])

  const resetConfig = useCallback(() => {
    updateConfig(() => createDefaultPortalConfig())
  }, [updateConfig])

  const value = useMemo<PortalConfigContextType>(
    () => ({
      config,
      setMetadata,
      setPalette,
      setHeaderConfig,
      setFooterConfig,
      setLogoHeaderConfig,
      setLogoFooterConfig,
      setPortalsDropdownEnabled,
      addResource,
      updateResource,
      deleteResource,
      getResource,
      updateResourceColumns,
      addRoute,
      updateRoute,
      updateRouteDeep,
      deleteRoute,
      moveRoute,
      getRoute,
      addComponentBlock,
      updateComponentBlock,
      deleteComponentBlock,
      moveComponentBlock,
      addDetailsPageTab,
      updateDetailsPageTab,
      deleteDetailsPageTab,
      addDetailsPageSection,
      updateDetailsPageSection,
      deleteDetailsPageSection,
      importConfig,
      exportConfig,
      resetConfig,
    }),
    [
      config,
      setMetadata,
      setPalette,
      setHeaderConfig,
      setFooterConfig,
      setLogoHeaderConfig,
      setLogoFooterConfig,
      setPortalsDropdownEnabled,
      addResource,
      updateResource,
      deleteResource,
      getResource,
      updateResourceColumns,
      addRoute,
      updateRoute,
      updateRouteDeep,
      deleteRoute,
      moveRoute,
      getRoute,
      addComponentBlock,
      updateComponentBlock,
      deleteComponentBlock,
      moveComponentBlock,
      addDetailsPageTab,
      updateDetailsPageTab,
      deleteDetailsPageTab,
      addDetailsPageSection,
      updateDetailsPageSection,
      deleteDetailsPageSection,
      importConfig,
      exportConfig,
      resetConfig,
    ],
  )

  return (
    <PortalConfigContext.Provider value={value}>
      {children}
    </PortalConfigContext.Provider>
  )
}

export function usePortalConfig(): PortalConfigContextType {
  const context = useContext(PortalConfigContext)
  if (!context) {
    throw new Error(
      'usePortalConfig must be used within a PortalConfigProvider',
    )
  }
  return context
}
