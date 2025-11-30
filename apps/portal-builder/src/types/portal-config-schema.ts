/**
 * Portal Configuration Schema
 *
 * This file defines the complete schema for portal configurations using Zod.
 * The schema is designed around the concept of "Resources" - data sources from
 * Synapse tables that can be displayed in various ways throughout the portal.
 *
 * Key Design Decisions:
 *
 * 1. Resources as First-Class Citizens
 *    - A Resource is defined by a Synapse SQL query
 *    - Column metadata is cached from Synapse for better editor UX
 *    - Card display configuration is attached to resources
 *
 * 2. Cached Column Metadata
 *    - Column names/types are fetched from Synapse and cached in the config
 *    - This enables autocomplete and validation in the editor
 *    - Cached data includes a timestamp for freshness tracking
 *
 * 3. Schema Versioning
 *    - The config includes a version field for future migrations
 *    - Current version is "1.0"
 *
 * 4. Zod for Validation
 *    - All schemas use Zod for runtime validation
 *    - Types are inferred from schemas for type safety
 *    - Descriptions are included for documentation/UI generation
 *
 * @module portal-config-schema
 */

import { z } from 'zod'
import { OrientationBannerNameStrings } from 'synapse-react-client/components/OrientationBanner/OrientationBanner'

// ============================================================================
// CARD LINK CONFIGURATION SCHEMAS
// These schemas define how card content can link to other pages
// ============================================================================

/**
 * Target enum for link opening behavior
 */
export const TargetEnumSchema = z
  .enum(['_self', '_blank', '_parent', '_top'])
  .describe('Where to open the link')

/**
 * Base properties shared by all CardLink configurations
 */
const CardLinkBaseSchema = z.object({
  matchColumnName: z
    .string()
    .describe('Column name whose value will be used as the display text'),
  overrideValueWithRowID: z
    .boolean()
    .optional()
    .describe(
      'If true, use the row ID as the column value instead of the actual column value',
    ),
  isMarkdown: z
    .literal(false)
    .default(false)
    .describe('Must be false for CardLink (use MarkdownLink for markdown)'),
  tooltipText: z.string().optional().describe('Optional tooltip text'),
  target: TargetEnumSchema.optional().describe('Where to open the link'),
})

/**
 * CardLink variant that uses a base URL with query parameters
 */
export const BaseURLCardLinkSchema = CardLinkBaseSchema.extend({
  baseURL: z
    .string()
    .describe('Base URL for the link (e.g., "Explore/Studies/DetailsPage")'),
  URLColumnName: z
    .string()
    .describe('Column name whose value will be used as the query parameter'),
  wrapValueWithParens: z
    .boolean()
    .optional()
    .describe('If true, wrap the value in parentheses in the URL'),
  resolveEntityName: z
    .boolean()
    .optional()
    .describe(
      'If true and the value is a synID, resolve the entity name for display',
    ),
})

/**
 * CardLink variant that overrides the link URL from a column value
 */
export const OverrideLinkURLCardLinkSchema = CardLinkBaseSchema.extend({
  overrideLinkURLColumnName: z
    .string()
    .describe('Column name whose value will be used directly as the href'),
  // Note: overrideLinkURLColumnTransform is a function and cannot be serialized to JSON
  // If this is needed, we would need to support named transform functions
})

/**
 * CardLink - configures linking behavior for card elements
 * This is a discriminated union based on whether baseURL or overrideLinkURLColumnName is present
 */
export const CardLinkSchema = z
  .union([BaseURLCardLinkSchema, OverrideLinkURLCardLinkSchema])
  .describe('Configuration for a link rendered in the card')

export type CardLinkConfig = z.infer<typeof CardLinkSchema>

/**
 * Markdown link - renders the column value as markdown
 */
export const MarkdownLinkSchema = z.object({
  isMarkdown: z.literal(true).describe('Must be true for markdown links'),
  matchColumnName: z
    .string()
    .describe('Column name whose value will be used for the markdown'),
  tooltipText: z.string().optional().describe('Optional tooltip text'),
})

/**
 * Column specified link - uses a separate column for the link URL
 * Note: Currently only works in SynapseTable, not cards
 */
export const ColumnSpecifiedLinkSchema = z.object({
  isMarkdown: z.literal(false).describe('Must be false'),
  matchColumnName: z
    .string()
    .describe('Column which should have the displayed value'),
  linkColumnName: z
    .string()
    .describe(
      'Column which has the link URL. If empty, value displays without link',
    ),
  tooltipText: z.string().optional().describe('Optional tooltip text'),
})

/**
 * Entity image - previews an entity image
 * Note: Currently only works in SynapseTable, not cards
 */
export const EntityImageSchema = z.object({
  matchColumnName: z.string().describe('Column name for the entity image'),
  isEntityImage: z.literal(true).describe('Must be true for entity images'),
})

/**
 * LabelLinkConfig - array of link configurations for secondary labels
 * Each item configures how a specific label column should be linked
 */
export const LabelLinkConfigSchema = z
  .array(
    z.union([
      CardLinkSchema,
      MarkdownLinkSchema,
      ColumnSpecifiedLinkSchema,
      EntityImageSchema,
    ]),
  )
  .describe('Configuration for linking secondary label columns')

export type LabelLinkConfigType = z.infer<typeof LabelLinkConfigSchema>

/**
 * CTACardLink - configuration for call-to-action buttons on cards
 */
export const CTACardLinkSchema = z.object({
  text: z.string().describe('Text to display on the CTA button'),
  link: z
    .string()
    .describe('Column name whose value will be used for the href'),
})

export type CTACardLinkConfig = z.infer<typeof CTACardLinkSchema>

/**
 * DescriptionConfig - configuration for description display
 */
export const DescriptionConfigSchema = z.object({
  isMarkdown: z
    .boolean()
    .optional()
    .describe('If true, render the description as markdown'),
  showFullDescriptionByDefault: z
    .boolean()
    .optional()
    .describe('If true, show full description without truncation'),
})

export type DescriptionConfigType = z.infer<typeof DescriptionConfigSchema>

// ============================================================================
// DETAILS PAGE SCHEMAS
// These schemas define the configuration for resource detail pages
// ============================================================================

/**
 * SQL operator options for filtering detail page queries
 */
export const SqlOperatorSchema = z
  .enum(['LIKE', 'EQUAL', 'IN', 'HAS'])
  .describe('SQL operator for filtering the query')

export type SqlOperator = z.infer<typeof SqlOperatorSchema>

/**
 * Section type: Markdown from column
 * Renders markdown content from a column value (e.g., entity wiki or raw markdown)
 */
export const MarkdownFromColumnSectionSchema = z.object({
  type: z.literal('markdown-from-column'),
  columnName: z
    .string()
    .describe('Column containing the markdown content or entity ID'),
  showEntityTitle: z
    .boolean()
    .optional()
    .describe('If true, show the entity name as a title'),
  isRawMarkdown: z
    .boolean()
    .optional()
    .describe(
      'If true, treat content as raw markdown instead of entity reference',
    ),
})

export type MarkdownFromColumnSection = z.infer<
  typeof MarkdownFromColumnSectionSchema
>

/**
 * Section type: Related resource cards
 * Displays cards or table from another resource filtered by a column value
 */
export const RelatedResourceSectionSchema = z.object({
  type: z.literal('related-resource'),
  sourceResourceId: z
    .string()
    .describe('ID of the resource to query for related items'),
  displayAs: z
    .enum(['cards', 'table'])
    .optional()
    .describe(
      'How to display the related resource: cards or table. Defaults to cards.',
    ),
  filterColumnName: z
    .string()
    .describe('Column in the source resource to filter by'),
  sourceColumnName: z
    .string()
    .describe('Column in the current row whose value is used as the filter'),
  sqlOperator: SqlOperatorSchema.optional().describe(
    'SQL operator for the filter (defaults to IN for cards, HAS for table)',
  ),
  resolveEntityName: z
    .boolean()
    .optional()
    .describe(
      'If true, resolve the source column value as a Synapse entity ID to get its name for filtering',
    ),
})

export type RelatedResourceSection = z.infer<
  typeof RelatedResourceSectionSchema
>

/**
 * Section type: Query wrapper (data table with optional plots)
 * Displays a QueryWrapperPlotNav for browsing related data
 */
export const QueryWrapperSectionSchema = z.object({
  type: z.literal('query-wrapper'),
  sql: z.string().describe('SQL query for the data'),
  filterColumnName: z.string().describe('Column in the query to filter by'),
  sourceColumnName: z
    .string()
    .describe('Column in the current row whose value is used as the filter'),
  sqlOperator: SqlOperatorSchema.optional().describe(
    'SQL operator for the filter (defaults to HAS)',
  ),
  tableConfiguration: z
    .object({
      showAccessColumn: z.boolean().optional(),
      showDownloadColumn: z.boolean().optional(),
    })
    .optional()
    .describe('Table display configuration'),
})

export type QueryWrapperSection = z.infer<typeof QueryWrapperSectionSchema>

/**
 * Union of all section types
 */
export const DetailsPageSectionTypeSchema = z.discriminatedUnion('type', [
  MarkdownFromColumnSectionSchema,
  RelatedResourceSectionSchema,
  QueryWrapperSectionSchema,
])

export type DetailsPageSectionType = z.infer<
  typeof DetailsPageSectionTypeSchema
>

/**
 * Complete section definition with metadata
 */
export const DetailsPageSectionSchema = z.object({
  id: z.string().describe('Unique identifier for this section'),
  title: z
    .string()
    .optional()
    .describe('Section title (appears in side menu if present)'),
  hideTitle: z
    .boolean()
    .optional()
    .describe('If true, hide title from content but show in menu'),
  helpText: z.string().optional().describe('Help text shown with the section'),
  config: DetailsPageSectionTypeSchema.describe(
    'Section type and configuration',
  ),
})

export type DetailsPageSection = z.infer<typeof DetailsPageSectionSchema>

/**
 * Tab configuration for detail pages with multiple tabs
 */
export const DetailsPageTabSchema = z.object({
  id: z.string().describe('Unique identifier for this tab'),
  title: z.string().describe('Tab display title'),
  path: z.string().describe('URL path segment for this tab'),
  iconName: z.string().optional().describe('Icon name from SRC Icon component'),
  iconClassName: z.string().optional().describe('CSS class for the icon'),
  tooltip: z.string().optional().describe('Tooltip shown on hover'),
  hideIfColumnValueNull: z
    .string()
    .optional()
    .describe('Column name - hide tab if this column value is null'),
  sections: z
    .array(DetailsPageSectionSchema)
    .describe('Sections to display in this tab'),
})

export type DetailsPageTab = z.infer<typeof DetailsPageTabSchema>

/**
 * Complete detail page configuration for a resource
 */
export const DetailsPageConfigSchema = z.object({
  path: z
    .string()
    .describe(
      'URL path for the detail page (e.g., "Explore/Studies/DetailsPage")',
    ),
  sqlOperator: SqlOperatorSchema.optional()
    .default('LIKE')
    .describe('SQL operator for filtering by primary key'),
  showHeaderCard: z
    .boolean()
    .optional()
    .default(true)
    .describe('Whether to show the resource card as a header'),
  doiResourceType: z
    .string()
    .optional()
    .describe('Resource type for DOI generation (e.g., "STUDY")'),
  tabs: z
    .array(DetailsPageTabSchema)
    .optional()
    .describe('Optional tabs - if omitted, sections are shown directly'),
  sections: z
    .array(DetailsPageSectionSchema)
    .optional()
    .describe('Sections to display when not using tabs'),
})

export type DetailsPageConfig = z.infer<typeof DetailsPageConfigSchema>

// ============================================================================
// COLUMN METADATA SCHEMAS
// ============================================================================

/**
 * Schema for a select column as returned from Synapse
 * This is cached metadata from the query result
 */
export const SelectColumnSchema = z.object({
  name: z.string().describe('The display name of the column'),
  columnType: z.string().describe('The column type'),
  id: z.string().optional().describe('The optional ID of the select column'),
})

export type CachedSelectColumn = z.infer<typeof SelectColumnSchema>

/**
 * Schema for portal palette configuration
 */
export const PaletteConfigSchema = z.object({
  primary: z.string().describe('Primary color hex code'),
  secondary: z.string().describe('Secondary color hex code'),
  background: z.string().optional().describe('Background color hex code'),
  text: z.string().optional().describe('Text color hex code'),
})

/**
 * Schema for home page header configuration
 */
export const HeaderConfigSchema = z.object({
  title: z.string().describe('Main title displayed on the home page header'),
  summary: z.string().describe('Summary text displayed below the title'),
  showBlur: z.boolean().optional().describe('Whether to show blur effect'),
  centerText: z.boolean().optional().describe('Whether to center the text'),
})

/**
 * Schema for footer configuration
 */
export const FooterConfigSchema = z.object({
  contactUs: z.string().optional().describe('URL for contact us link'),
  help: z.string().optional().describe('URL for help link'),
  termsOfService: z.string().optional().describe('URL for terms of service'),
  forum: z.string().optional().describe('URL for forum link'),
  about: z.string().optional().describe('URL for about link'),
})

/**
 * Schema for logo configuration
 */
export const LogoConfigSchema = z.object({
  name: z.string().optional().describe('Portal name as plain text'),
  icon: z.string().optional().describe('URL to logo image/SVG'),
  hideLogin: z
    .boolean()
    .optional()
    .describe('Whether to hide the login button'),
})

/**
 * Schema for generic card field mapping
 * Column names are validated against the resource's cached selectColumns
 */
export const GenericCardSchemaConfig = z.object({
  title: z.string().describe('Column name for the card title'),
  type: z.string().optional().describe('Card type (e.g., STUDY, DATASET)'),
  description: z.string().optional().describe('Column name for description'),
  subTitle: z.string().optional().describe('Column name for subtitle'),
  icon: z.string().optional().describe('Column name for icon'),
  imageFileHandleColumnName: z
    .string()
    .optional()
    .describe('Column name for image file handle'),
  link: z.string().optional().describe('Column name for link'),
  includeShareButton: z
    .boolean()
    .optional()
    .describe('Whether to show share button'),
  secondaryLabels: z
    .array(z.string())
    .optional()
    .describe('Column names for secondary labels'),
  dataTypeIconNames: z
    .string()
    .optional()
    .describe('Column name for data type icons'),
})

/**
 * Schema for table display configuration
 * Defines how data from a resource should be displayed as a table (QueryWrapperPlotNav)
 */
export const TableDisplayConfigSchema = z.object({
  showAccessColumn: z
    .boolean()
    .optional()
    .describe('Show access column in table'),
  showDownloadColumn: z
    .boolean()
    .optional()
    .describe('Show download column in table'),
  showColumnSelection: z
    .boolean()
    .optional()
    .describe('Allow users to select which columns to display'),
  visibleColumnCount: z
    .number()
    .optional()
    .describe('Number of columns to show by default'),
  availableFacets: z
    .array(z.string())
    .optional()
    .describe('Column names available for facet filtering'),
  defaultShowPlots: z.boolean().optional().describe('Show plots by default'),
  hideQueryCount: z
    .boolean()
    .optional()
    .describe('Hide the query result count'),
})

export type TableDisplayConfig = z.infer<typeof TableDisplayConfigSchema>

/**
 * Schema for search configuration
 * Defines which columns are searchable in QueryWrapperPlotNav
 */
export const SearchConfigurationSchema = z.object({
  searchable: z.array(z.string()).describe('Column names that are searchable'),
})

/**
 * Schema for card display configuration
 * Defines how data from a resource should be displayed as cards
 */
export const CardDisplayConfigSchema = z.object({
  cardType: z
    .enum(['GENERIC_CARD', 'DATASET', 'STUDY', 'FUNDER', 'MEDIUM_USER_CARD'])
    .default('GENERIC_CARD')
    .describe('Card type'),
  genericCardSchema: GenericCardSchemaConfig.optional().describe(
    'Field mapping for generic cards',
  ),
  secondaryLabelLimit: z
    .number()
    .optional()
    .describe('Max number of secondary labels to show'),
  rgbIndex: z
    .number()
    .optional()
    .describe('Color index from the portal color palette'),
  // CommonCardProps link configurations
  titleLinkConfig: CardLinkSchema.optional().describe(
    'Configuration for the card title link (e.g., to a detail page)',
  ),
  labelLinkConfig: LabelLinkConfigSchema.optional().describe(
    'Configuration for linking secondary labels to other pages',
  ),
  ctaLinkConfig: CTACardLinkSchema.optional().describe(
    'Configuration for a call-to-action button on the card',
  ),
  descriptionConfig: DescriptionConfigSchema.optional().describe(
    'Configuration for description display (markdown, truncation)',
  ),
})

/**
 * Schema for a resource
 * A resource is defined by a Synapse table query and contains cached column metadata
 */
export const ResourceSchema = z.object({
  id: z.string().describe('Unique identifier for this resource'),
  name: z.string().describe('Display name for this resource'),
  description: z.string().optional().describe('Description of this resource'),
  sql: z
    .string()
    .describe('SQL query to fetch data (e.g., SELECT * FROM syn123)'),
  // Primary key column(s) - used for detail page URLs and DOI generation
  // WARNING: Changing this after the resource is in use will break existing links and DOIs
  primaryKeyColumns: z
    .array(z.string())
    .default([])
    .describe(
      'Column name(s) that uniquely identify each row. Used for detail page URLs and DOI generation. WARNING: Do not change after the resource is published, as this will break existing links and DOIs.',
    ),
  // Cached column metadata from the query - populated by fetching from Synapse
  selectColumns: z
    .array(SelectColumnSchema)
    .default([])
    .describe('Cached select columns from the query result'),
  lastColumnFetch: z
    .string()
    .optional()
    .describe('ISO timestamp of when columns were last fetched'),
  // Column name to human-readable display name mapping
  columnAliases: z
    .record(z.string(), z.string())
    .optional()
    .describe(
      'Map column names to human-readable display names (e.g., { "Study_Name": "Study Name" })',
    ),
  // Search configuration for QueryWrapperPlotNav
  searchConfiguration: SearchConfigurationSchema.optional().describe(
    'Configuration for search functionality (searchable columns)',
  ),
  // How to display this resource as cards
  cardDisplay: CardDisplayConfigSchema.optional().describe(
    'Card display configuration',
  ),
  // How to display this resource as a table (QueryWrapperPlotNav)
  tableDisplay: TableDisplayConfigSchema.optional().describe(
    'Table display configuration for QueryWrapperPlotNav',
  ),
  // Detail page configuration
  detailsPage: DetailsPageConfigSchema.optional().describe(
    'Configuration for the resource detail page',
  ),
})

/**
 * @deprecated Use ResourceSchema instead
 * Schema for a reusable card configuration
 * Defines how data from a Synapse table should be displayed as cards
 */
export const CardConfigurationSchema = z.object({
  id: z.string().describe('Unique identifier for this card configuration'),
  name: z.string().describe('Display name for this card configuration'),
  description: z.string().optional().describe('Description of this resource'),
  sql: z
    .string()
    .describe('SQL query to fetch data (e.g., SELECT * FROM syn123)'),
  cardType: z
    .enum(['GENERIC_CARD', 'DATASET', 'STUDY', 'FUNDER', 'MEDIUM_USER_CARD'])
    .default('GENERIC_CARD')
    .describe('Card type'),
  genericCardSchema: GenericCardSchemaConfig.optional().describe(
    'Field mapping for generic cards',
  ),
  secondaryLabelLimit: z
    .number()
    .optional()
    .describe('Max number of secondary labels to show'),
  rgbIndex: z
    .number()
    .optional()
    .describe('Color index from the portal color palette'),
})

export type CardConfiguration = z.infer<typeof CardConfigurationSchema>

/**
 * Schema for SectionLayout wrapper configuration
 * When provided, the component will be wrapped in a SectionLayout
 */
export const SectionLayoutPropsSchema = z.object({
  title: z.string().optional().describe('Section title'),
  centerTitle: z.boolean().optional().describe('Whether to center the title'),
  subtitle: z.string().optional().describe('Section subtitle'),
  className: z.string().optional().describe('CSS class name for the section'),
})

export type SectionLayoutProps = z.infer<typeof SectionLayoutPropsSchema>

/**
 * Schema for component block props - will be extended per component type
 *
 * Component types:
 * - Built-in: 'QueryWrapperPlotNav', 'CardContainerLogic', 'Goals', etc.
 * - Custom: Any string that matches a registered custom component
 *
 * Custom components enable gradual migration of existing portals by allowing
 * portal-specific components to be registered and used in the config.
 */
export const ComponentBlockSchema = z.object({
  id: z.string().describe('Unique identifier for this component block'),
  componentType: z
    .string()
    .describe(
      'Type of component to render. Can be a built-in type or a custom registered component.',
    ),
  props: z.record(z.unknown()).describe('Component-specific props'),
  // Optional SectionLayout wrapper
  sectionLayout: SectionLayoutPropsSchema.optional().describe(
    'If provided, wraps the component in a SectionLayout with these props',
  ),
  // Reference to a reusable card configuration
  cardConfigurationId: z
    .string()
    .optional()
    .describe('ID of a reusable card configuration to use'),
})

// ============================================================================
// UNIFIED ROUTE CONFIGURATION SCHEMAS
// Replaces separate navbar and page configurations with a single route tree
// ============================================================================

/**
 * Schema for orientation banner configuration
 * Displayed at the top of an Explore tab to provide context
 */
export const OrientationBannerSchema = z.object({
  name: z
    .enum(OrientationBannerNameStrings)
    .describe('Unique name for the banner (for dismissal tracking)'),
  title: z.string().describe('Banner title'),
  text: z.string().describe('Banner description text'),
  sx: z
    .record(z.unknown())
    .optional()
    .describe('Optional MUI sx props for styling'),
})

export type OrientationBanner = z.infer<typeof OrientationBannerSchema>

/**
 * Display mode for routes - determines how the route content is rendered
 * - 'standard': Renders components array
 * - 'explore': Uses ExploreWrapper layout, children become tabs with Outlet
 * - 'details': Renders a detail page for a resource
 */
export const RouteDisplayModeSchema = z
  .enum(['standard', 'explore', 'details'])
  .default('standard')
  .describe('How to render this route')

/**
 * Explore-specific configuration for routes with displayAs: 'explore'
 */
export const ExploreRouteConfigSchema = z.object({
  // Child routes inherit these defaults
  defaultRgbIndex: z
    .number()
    .optional()
    .describe('Default color index for child tabs'),
})

/**
 * Tab-specific configuration for child routes of an Explore route
 */
export const ExploreTabConfigSchema = z.object({
  resourceId: z.string().describe('ID of the resource to display in this tab'),
  displayMode: z
    .enum(['queryWrapperPlotNav', 'cardContainerLogic'])
    .optional()
    .describe(
      'How to display the resource: queryWrapperPlotNav (table with facets/plots) or cardContainerLogic (simple card grid). Defaults to queryWrapperPlotNav.',
    ),
  rgbIndex: z
    .number()
    .optional()
    .describe('Color index from the portal color palette for this tab'),
  orientationBanner: OrientationBannerSchema.optional().describe(
    'Optional orientation banner shown at the top of this tab',
  ),
})

/**
 * Details page configuration for routes with displayAs: 'details'
 */
export const DetailsRouteConfigSchema = z.object({
  resourceId: z
    .string()
    .describe('ID of the resource this details page is for'),
  sqlOperator: SqlOperatorSchema.optional().describe(
    'SQL operator for filtering by primary key. Defaults to LIKE.',
  ),
  showHeaderCard: z
    .boolean()
    .optional()
    .describe(
      'Whether to show the resource card as a header. Defaults to true.',
    ),
  doiResourceType: z
    .string()
    .optional()
    .describe('Resource type for DOI generation (e.g., "STUDY")'),
  tabs: z
    .array(DetailsPageTabSchema)
    .optional()
    .describe('Optional tabs - if omitted, sections are shown directly'),
  sections: z
    .array(DetailsPageSectionSchema)
    .optional()
    .describe('Sections to display when not using tabs'),
})

/**
 * Unified route node that handles navigation, pages, and nested routes
 *
 * This replaces the separate NavbarRoute, PageConfig, and ExploreTab schemas
 * with a single recursive tree structure.
 */
export interface RouteNode {
  // Identity
  id: string
  displayName: string
  path: string

  // Navigation visibility
  showInNavbar?: boolean // Default: true (false for detail pages, hidden pages)

  // Link type for external URLs
  linkType?: 'internal' | 'external' // Default: 'internal'
  externalUrl?: string // Required when linkType is 'external'

  // Display mode - determines rendering strategy
  displayAs?: 'standard' | 'explore' | 'details' // Default: 'standard'

  // For standard routes: either a custom component OR component blocks
  // Custom component takes precedence - it's the entire page
  customComponent?: string // Name of a registered custom component
  components?: z.infer<typeof ComponentBlockSchema>[]

  // For explore routes: configuration for the explore layout
  exploreConfig?: z.infer<typeof ExploreRouteConfigSchema>

  // For explore tab children: tab-specific configuration
  exploreTabConfig?: z.infer<typeof ExploreTabConfigSchema>

  // For details routes: detail page configuration
  detailsConfig?: z.infer<typeof DetailsRouteConfigSchema>

  // Nested routes (children)
  children?: RouteNode[]
}

/**
 * Zod schema for RouteNode (recursive)
 */
export const RouteNodeSchema: z.ZodType<RouteNode> = z.lazy(() =>
  z.object({
    // Identity
    id: z.string().describe('Unique identifier for this route'),
    displayName: z.string().describe('Display name (used in navbar and tabs)'),
    path: z
      .string()
      .describe('URL path segment (combined with parent paths for full URL)'),

    // Navigation visibility
    showInNavbar: z
      .boolean()
      .optional()
      .default(true)
      .describe('Whether to show this route in the navbar'),

    // Link type
    linkType: z
      .enum(['internal', 'external'])
      .optional()
      .default('internal')
      .describe('Whether this is an internal page or external link'),
    externalUrl: z
      .string()
      .optional()
      .describe('External URL (required when linkType is "external")'),

    // Display mode
    displayAs: RouteDisplayModeSchema.optional().describe(
      'How to render this route: standard (components), explore (tabbed layout), or details (resource detail page)',
    ),

    // Standard route configuration - use customComponent OR components (not both)
    customComponent: z
      .string()
      .optional()
      .describe(
        'Name of a registered custom component to render for this route. Takes precedence over components array.',
      ),
    components: z
      .array(ComponentBlockSchema)
      .optional()
      .describe(
        'Component blocks for standard routes. Ignored if customComponent is set.',
      ),

    // Explore layout configuration
    exploreConfig: ExploreRouteConfigSchema.optional().describe(
      'Configuration for explore layout routes',
    ),

    // Explore tab configuration (for children of explore routes)
    exploreTabConfig: ExploreTabConfigSchema.optional().describe(
      'Tab configuration when this route is a child of an explore route',
    ),

    // Details page configuration
    detailsConfig: DetailsRouteConfigSchema.optional().describe(
      'Configuration for detail page routes',
    ),

    // Nested routes
    children: z
      .array(RouteNodeSchema)
      .optional()
      .describe('Child routes (become tabs for explore routes)'),
  }),
)

// ============================================================================
// PORTAL CONFIGURATION SCHEMA
// ============================================================================

/**
 * Schema for complete portal configuration
 */
export const PortalConfigSchema = z.object({
  version: z.literal('1.0').describe('Config schema version'),
  metadata: z.object({
    name: z.string().describe('Portal name'),
    description: z.string().optional().describe('Portal description'),
  }),
  palette: PaletteConfigSchema,
  headerConfig: HeaderConfigSchema,
  footerConfig: FooterConfigSchema,
  logoHeaderConfig: LogoConfigSchema,
  logoFooterConfig: LogoConfigSchema,
  // Whether to show the portals dropdown in the navbar
  isPortalsDropdownEnabled: z
    .boolean()
    .default(true)
    .describe('Whether to show the portals dropdown in the navbar'),
  // Resources are Synapse table queries with cached column metadata
  resources: z
    .array(ResourceSchema)
    .default([])
    .describe('Portal resources defined by Synapse table queries'),
  // Unified route tree - replaces separate navbarConfig and pages
  routes: z
    .array(RouteNodeSchema)
    .default([])
    .describe('Portal routes defining both navigation and page content'),
})

// Export inferred types
export type PaletteConfig = z.infer<typeof PaletteConfigSchema>
export type HeaderConfig = z.infer<typeof HeaderConfigSchema>
export type FooterConfig = z.infer<typeof FooterConfigSchema>
export type LogoConfig = z.infer<typeof LogoConfigSchema>
export type GenericCardSchema = z.infer<typeof GenericCardSchemaConfig>
export type CardDisplayConfig = z.infer<typeof CardDisplayConfigSchema>
export type SearchConfiguration = z.infer<typeof SearchConfigurationSchema>
export type Resource = z.infer<typeof ResourceSchema>
export type ComponentBlock = z.infer<typeof ComponentBlockSchema>
export type ExploreRouteConfig = z.infer<typeof ExploreRouteConfigSchema>
export type ExploreTabConfig = z.infer<typeof ExploreTabConfigSchema>
export type DetailsRouteConfig = z.infer<typeof DetailsRouteConfigSchema>
export type PortalConfig = z.infer<typeof PortalConfigSchema>

// Backwards compatibility aliases (deprecated)
/** @deprecated Use RouteNode instead */
export type NavbarRoute = RouteNode
/** @deprecated Use RouteNode instead */
export type PageConfig = RouteNode
/** @deprecated Use ExploreTabConfig instead */
export type ExploreTab = ExploreTabConfig
/** @deprecated Use PortalConfig.isPortalsDropdownEnabled instead */
export interface NavbarConfig {
  routes: RouteNode[]
  isPortalsDropdownEnabled: boolean
}
