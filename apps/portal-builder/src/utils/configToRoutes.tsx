/**
 * Config to Routes Transformation
 *
 * Transforms a PortalConfig into React Router RouteObject[] that can be used
 * with createMemoryRouter (preview) or createBrowserRouter (production).
 *
 * Uses React Router's `lazy` property for code-splitting - SRC components
 * are only loaded when navigating to the route.
 */

import { RouteObject } from 'react-router'
import { PortalConfig, Resource, RouteNode } from '../types'
import { ExplorePageRoute } from '@sage-bionetworks/synapse-portal-framework/components/Explore/ExploreWrapperProps'

/**
 * Build QueryWrapperPlotNavProps from a Resource and optional ExploreTabConfig
 */
function buildQueryWrapperProps(
  resource: Resource,
  rgbIndex?: number,
): Record<string, unknown> {
  const props: Record<string, unknown> = {
    sql: resource.sql,
    name: resource.name,
    rgbIndex: rgbIndex ?? resource.cardDisplay?.rgbIndex ?? 0,
    shouldDeepLink: true,
  }

  // Add column aliases if present
  if (resource.columnAliases) {
    props.columnAliases = resource.columnAliases
  }

  // Add search configuration if present
  if (resource.searchConfiguration) {
    props.searchConfiguration = resource.searchConfiguration
  }

  // Add card configuration if we have card display settings
  if (resource.cardDisplay) {
    const cardConfig: Record<string, unknown> = {
      type: resource.cardDisplay.cardType,
    }

    if (resource.cardDisplay.genericCardSchema) {
      cardConfig.genericCardSchema = resource.cardDisplay.genericCardSchema
    }
    if (resource.cardDisplay.secondaryLabelLimit != null) {
      cardConfig.secondaryLabelLimit = resource.cardDisplay.secondaryLabelLimit
    }
    if (resource.cardDisplay.titleLinkConfig) {
      cardConfig.titleLinkConfig = resource.cardDisplay.titleLinkConfig
    }
    if (resource.cardDisplay.labelLinkConfig) {
      cardConfig.labelLinkConfig = resource.cardDisplay.labelLinkConfig
    }
    if (resource.cardDisplay.ctaLinkConfig) {
      cardConfig.ctaLinkConfig = resource.cardDisplay.ctaLinkConfig
    }
    if (resource.cardDisplay.descriptionConfig) {
      cardConfig.descriptionConfig = resource.cardDisplay.descriptionConfig
    }

    props.cardConfiguration = cardConfig
  }

  // Add table configuration if we have table display settings
  if (resource.tableDisplay) {
    const tableConfig: Record<string, unknown> = {}
    if (resource.tableDisplay.showAccessColumn != null) {
      tableConfig.showAccessColumn = resource.tableDisplay.showAccessColumn
    }
    if (resource.tableDisplay.showDownloadColumn != null) {
      tableConfig.showDownloadColumn = resource.tableDisplay.showDownloadColumn
    }
    if (resource.tableDisplay.visibleColumnCount != null) {
      props.visibleColumnCount = resource.tableDisplay.visibleColumnCount
    }
    if (Object.keys(tableConfig).length > 0) {
      props.tableConfiguration = tableConfig
    }
  }

  return props
}

/**
 * Build CardContainerLogicProps from a Resource
 */
function buildCardContainerProps(
  resource: Resource,
  rgbIndex?: number,
): Record<string, unknown> {
  const props: Record<string, unknown> = {
    sql: resource.sql,
    rgbIndex: rgbIndex ?? resource.cardDisplay?.rgbIndex ?? 0,
  }

  // Add column aliases if present
  if (resource.columnAliases) {
    props.columnAliases = resource.columnAliases
  }

  // Build card configuration (required for CardContainerLogic)
  const cardConfiguration: Record<string, unknown> = {
    type: resource.cardDisplay?.cardType ?? 'GENERIC_CARD',
  }

  if (resource.cardDisplay?.genericCardSchema) {
    cardConfiguration.genericCardSchema = resource.cardDisplay.genericCardSchema
  }
  if (resource.cardDisplay?.secondaryLabelLimit != null) {
    cardConfiguration.secondaryLabelLimit =
      resource.cardDisplay.secondaryLabelLimit
  }
  if (resource.cardDisplay?.titleLinkConfig) {
    cardConfiguration.titleLinkConfig = resource.cardDisplay.titleLinkConfig
  }
  if (resource.cardDisplay?.labelLinkConfig) {
    cardConfiguration.labelLinkConfig = resource.cardDisplay.labelLinkConfig
  }

  props.cardConfiguration = cardConfiguration

  return props
}

/**
 * Create a lazy loader for an Explore tab (child of an Explore route)
 */
function createExploreTabLazy(
  route: RouteNode,
  config: PortalConfig,
): () => Promise<{ Component: React.ComponentType }> {
  return async () => {
    const resource = config.resources?.find(
      r => r.id === route.exploreTabConfig?.resourceId,
    )

    if (!resource) {
      // Return a placeholder component if resource not found
      return {
        Component: () => (
          <div style={{ padding: 20, color: 'red' }}>
            Resource not found: {route.exploreTabConfig?.resourceId}
          </div>
        ),
      }
    }

    const displayMode =
      route.exploreTabConfig?.displayMode ?? 'queryWrapperPlotNav'
    const rgbIndex = route.exploreTabConfig?.rgbIndex

    if (displayMode === 'cardContainerLogic') {
      // Lazy load CardContainerLogic
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { default: CardContainerLogic } = await import(
        'synapse-react-client/components/CardContainerLogic'
      )
      const props = buildCardContainerProps(resource, rgbIndex)

      return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Component: () => <CardContainerLogic {...(props as any)} />,
      }
    }

    // Default: QueryWrapperPlotNav
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { default: QueryWrapperPlotNav } = await import(
      'synapse-react-client/components/QueryWrapperPlotNav'
    )
    const props = buildQueryWrapperProps(resource, rgbIndex)

    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Component: () => <QueryWrapperPlotNav {...(props as any)} />,
    }
  }
}

/**
 * Create a lazy loader for an Explore layout (parent route with displayAs: 'explore')
 */
function createExploreLayoutLazy(
  route: RouteNode,
): () => Promise<{ Component: React.ComponentType }> {
  // Build explorePaths from children that have exploreTabConfig
  const explorePaths: ExplorePageRoute[] = (route.children ?? [])
    .filter(child => child.exploreTabConfig)
    .map(child => ({
      path: child.path,
      displayName: child.displayName,
      OrientationBannerProps: child.exploreTabConfig?.orientationBanner,
    }))

  console.log(
    'createExploreLayoutLazy called for route:',
    route.path,
    'with explorePaths:',
    explorePaths,
  )

  return async () => {
    console.log('Lazy loading ExploreWrapper for route:', route.path)
    const { default: ExploreWrapper } = await import(
      '@sage-bionetworks/synapse-portal-framework/components/Explore/ExploreWrapper'
    )
    console.log('ExploreWrapper loaded:', ExploreWrapper)

    // Create a named component to avoid reconciliation issues
    const ExploreLayoutComponent = () => (
      <ExploreWrapper explorePaths={explorePaths} />
    )
    ExploreLayoutComponent.displayName = 'ExploreLayout'

    return {
      Component: ExploreLayoutComponent,
    }
  }
}

/**
 * Dynamically import and render a component based on its type
 */
async function loadComponentForBlock(
  block: { id: string; componentType: string; props: Record<string, unknown> },
  config: PortalConfig,
): Promise<React.ComponentType<Record<string, unknown>>> {
  const { componentType, props } = block

  switch (componentType) {
    case 'Header': {
      const { default: Header } = await import(
        '@sage-bionetworks/synapse-portal-framework/components/Header'
      )
      return () => <Header {...props} />
    }

    case 'SectionLayout': {
      const { SectionLayout } = await import(
        '@sage-bionetworks/synapse-portal-framework/components/SectionLayout'
      )
      // SectionLayout wraps children, which should be another component
      // For now, just render the section without children
      return () => (
        <SectionLayout
          {...(props as React.ComponentProps<typeof SectionLayout>)}
        />
      )
    }

    case 'FeaturedDataTabs': {
      const { FeaturedDataTabs } = await import(
        'synapse-react-client/components/FeaturedDataTabs'
      )
      // If props has resourceId, get the SQL from the resource
      let sql = props.sql as string | undefined
      if (props.resourceId && !sql) {
        const resource = config.resources?.find(r => r.id === props.resourceId)
        if (resource) {
          sql = resource.sql
        }
      }
      return () => (
        <FeaturedDataTabs
          {...(props as React.ComponentProps<typeof FeaturedDataTabs>)}
          sql={sql ?? ''}
        />
      )
    }

    case 'Goals': {
      const { Goals } = await import('synapse-react-client/components/Goals')
      return () => <Goals {...(props as React.ComponentProps<typeof Goals>)} />
    }

    case 'Markdown': {
      const { Markdown } = await import(
        'synapse-react-client/components/Markdown/MarkdownSynapse'
      )
      return () => (
        <Markdown {...(props as React.ComponentProps<typeof Markdown>)} />
      )
    }

    case 'UserCardListRotate': {
      const { UserCardListRotate } = await import(
        'synapse-react-client/components/UserCardList/UserCardListRotate'
      )
      return () => (
        <UserCardListRotate
          {...(props as React.ComponentProps<typeof UserCardListRotate>)}
        />
      )
    }

    case 'RssFeedCards': {
      const { default: RssFeedCards } = await import(
        'synapse-react-client/components/RssFeedCards/RssFeedCards'
      )
      return () => (
        <RssFeedCards
          {...(props as React.ComponentProps<typeof RssFeedCards>)}
        />
      )
    }

    case 'QueryWrapperPlotNav': {
      const { default: QueryWrapperPlotNav } = await import(
        'synapse-react-client/components/QueryWrapperPlotNav'
      )
      // If props has resourceId, build props from the resource
      let queryProps = props
      if (props.resourceId) {
        const resource = config.resources?.find(r => r.id === props.resourceId)
        if (resource) {
          queryProps = {
            ...buildQueryWrapperProps(resource, props.rgbIndex as number),
            ...props,
          }
        }
      }
      return () => (
        <QueryWrapperPlotNav
          {...(queryProps as React.ComponentProps<typeof QueryWrapperPlotNav>)}
        />
      )
    }

    case 'CardContainerLogic': {
      const { default: CardContainerLogic } = await import(
        'synapse-react-client/components/CardContainerLogic'
      )
      // If props has resourceId, build props from the resource
      let cardProps = props
      if (props.resourceId) {
        const resource = config.resources?.find(r => r.id === props.resourceId)
        if (resource) {
          cardProps = {
            ...buildCardContainerProps(resource, props.rgbIndex as number),
            ...props,
          }
        }
      }
      return () => (
        <CardContainerLogic
          {...(cardProps as React.ComponentProps<typeof CardContainerLogic>)}
        />
      )
    }

    default:
      // Unknown component type - render a placeholder
      return () => (
        <div
          style={{
            padding: 20,
            margin: 10,
            border: '2px dashed #ccc',
            borderRadius: 8,
            backgroundColor: '#f9f9f9',
          }}
        >
          <strong>Unknown Component: {componentType}</strong>
          <pre style={{ fontSize: 12, overflow: 'auto' }}>
            {JSON.stringify(props, null, 2)}
          </pre>
        </div>
      )
  }
}

/**
 * Create a lazy loader for a standard page.
 *
 * Supports two modes:
 * 1. Custom component: If `customComponent` is set, load and render that single component
 * 2. Component blocks: Otherwise, render the array of component blocks
 *
 * Custom components enable gradual migration - entire pages (like Home) can be
 * custom components while the portal-builder manages routes and navigation.
 */
function createStandardPageLazy(
  route: RouteNode,
  config: PortalConfig,
): () => Promise<{ Component: React.ComponentType }> {
  return async () => {
    // If a custom component is specified, use it for the entire page
    if (route.customComponent) {
      const { loadComponent } = await import('../components/registry')
      const CustomComponent = await loadComponent(route.customComponent)

      if (CustomComponent) {
        return { Component: CustomComponent }
      }

      // Custom component not found - show error
      return {
        Component: () => (
          <div
            style={{
              padding: 20,
              margin: 20,
              border: '2px solid #f44336',
              borderRadius: 8,
              backgroundColor: '#ffebee',
            }}
          >
            <strong style={{ color: '#c62828' }}>
              Custom component not found: {route.customComponent}
            </strong>
            <p style={{ color: '#666', marginTop: 8 }}>
              Make sure the component is registered using{' '}
              <code>registerCustomComponent()</code> before rendering.
            </p>
          </div>
        ),
      }
    }

    // Fall back to component blocks
    const components = route.components ?? []

    if (components.length === 0) {
      // No components - render a simple placeholder
      return {
        Component: () => (
          <div style={{ padding: 20, textAlign: 'center', color: '#666' }}>
            <h2>{route.displayName}</h2>
            <p>No components configured for this page.</p>
            <p style={{ fontSize: 12 }}>
              Set a <code>customComponent</code> or add <code>components</code>{' '}
              in the route configuration.
            </p>
          </div>
        ),
      }
    }

    // Load all component renderers
    const loadedComponents = await Promise.all(
      components.map(block => loadComponentForBlock(block, config)),
    )

    // Create a page component that renders all the loaded components
    const PageComponent = () => (
      <>
        {loadedComponents.map((LoadedComponent, index) => (
          <LoadedComponent key={components[index].id} />
        ))}
      </>
    )

    return { Component: PageComponent }
  }
}

/**
 * Create a lazy loader for a details page
 */
function createDetailsPageLazy(
  route: RouteNode,
  config: PortalConfig,
): () => Promise<{ Component: React.ComponentType }> {
  return async () => {
    // Import the DetailPagePreview component
    const { DetailPagePreview } = await import(
      '../components/preview/DetailPagePreview'
    )

    return {
      Component: () => <DetailPagePreview config={config} />,
    }
  }
}

/**
 * Recursively transform RouteNode[] into RouteObject[]
 */
function transformRoutes(
  routes: RouteNode[],
  config: PortalConfig,
  isChild = false,
): RouteObject[] {
  return routes
    .filter(route => route.linkType !== 'external')
    .map(route => {
      // For child routes, strip leading slash to make them relative
      // React Router expects nested routes to have relative paths
      let routePath = route.path
      if (isChild && routePath.startsWith('/')) {
        routePath = routePath.slice(1)
      }

      // Build route object - index routes and path routes have different structures
      const isIndexRoute = route.path === '/'

      // Create the base route with lazy loader
      let lazyLoader:
        | (() => Promise<{ Component: React.ComponentType }>)
        | undefined

      // Determine lazy loader based on route type
      if (route.displayAs === 'explore') {
        lazyLoader = createExploreLayoutLazy(route)
      } else if (route.displayAs === 'details') {
        lazyLoader = createDetailsPageLazy(route, config)
      } else if (route.exploreTabConfig) {
        // This is a child of an Explore route
        lazyLoader = createExploreTabLazy(route, config)
      } else {
        // Standard page
        lazyLoader = createStandardPageLazy(route, config)
      }

      // Transform children recursively (children are always nested)
      const children =
        route.children && route.children.length > 0
          ? transformRoutes(route.children, config, true)
          : undefined

      // Build the appropriate route object type
      if (isIndexRoute) {
        const routeObject: RouteObject = {
          index: true,
          lazy: lazyLoader,
        }
        console.log('Created index route:', routeObject)
        return routeObject
      } else {
        const routeObject: RouteObject = {
          path: routePath,
          lazy: lazyLoader,
          children,
        }
        console.log('Created route:', {
          path: routePath,
          hasLazy: !!lazyLoader,
          childrenCount: children?.length,
        })
        return routeObject
      }
    })
}

/**
 * Options for the config to routes transformation
 */
export interface ConfigToRoutesOptions {
  /**
   * The layout component to wrap all routes
   * This should render an <Outlet /> for child routes
   */
  LayoutComponent?: React.ComponentType<{ config: PortalConfig }>
}

/**
 * Transform a PortalConfig into RouteObject[] for use with React Router
 *
 * @param config - The portal configuration
 * @param options - Optional configuration for the transformation
 * @returns RouteObject[] ready for createMemoryRouter or createBrowserRouter
 */
export function configToRouteObjects(
  config: PortalConfig,
  options: ConfigToRoutesOptions = {},
): RouteObject[] {
  const { LayoutComponent } = options

  // Transform all routes (these are children of the layout, so they need relative paths)
  const childRoutes = transformRoutes(config.routes ?? [], config, true)

  // Add catch-all route for unmatched paths (e.g., detail pages with dynamic segments)
  childRoutes.push({
    path: '*',
    lazy: async () => {
      const { DetailPagePreview } = await import(
        '../components/preview/DetailPagePreview'
      )
      return {
        Component: () => <DetailPagePreview config={config} />,
      }
    },
  })

  // If a layout component is provided, wrap all routes
  if (LayoutComponent) {
    const finalRoutes = [
      {
        path: '/',
        element: <LayoutComponent config={config} />,
        children: childRoutes,
      },
    ]

    // Debug: log the full route structure
    const debugRoutes = (routes: RouteObject[], indent = 0): void => {
      routes.forEach(r => {
        const prefix = '  '.repeat(indent)
        console.log(
          `${prefix}Route: path="${r.path ?? '(index)'}", index=${
            r.index ?? false
          }, hasLazy=${!!r.lazy}, hasElement=${!!r.element}`,
        )
        if (r.children) {
          debugRoutes(r.children, indent + 1)
        }
      })
    }
    console.log('=== Final Route Structure ===')
    debugRoutes(finalRoutes)
    console.log('=== End Route Structure ===')

    return finalRoutes
  }

  // Return routes without a layout wrapper
  return childRoutes
}
