# Portal Builder

A visual configuration tool for building Synapse data portals. This application allows users to create, configure, and preview portal configurations without writing code.

## Overview

Portal Builder provides a visual interface for creating portal configurations that can be used by the `synapse-portal-framework`. It features:

- **Live Preview**: See changes in real-time as you configure your portal
- **Resource Management**: Define data sources from Synapse tables with automatic column detection
- **Card Configuration**: Configure how data is displayed as cards with field mapping
- **Responsive Preview**: Test your portal at different screen sizes (desktop, tablet, phone)
- **Import/Export**: Save and load portal configurations as JSON

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+

### Development

```bash
# From the monorepo root
pnpm install

# Start the development server
pnpm --filter portal-builder start

# Or from this directory
cd apps/portal-builder
pnpm start
```

The app will be available at `http://localhost:5173`.

### Building

```bash
pnpm --filter portal-builder build
```

## Architecture

### Directory Structure

```
src/
├── App.tsx                 # Root component with providers
├── index.tsx               # Entry point
├── components/
│   ├── editor/             # Configuration editing components
│   │   ├── ConfigEditorPanel.tsx    # Main editor with tabs
│   │   ├── GeneralSettingsEditor.tsx # Portal metadata, colors, header
│   │   ├── NavbarEditor.tsx          # Navigation configuration
│   │   ├── ResourcesEditor.tsx       # Resource/data source management
│   │   └── PagesEditor.tsx           # Page and component management
│   ├── preview/            # Preview rendering components
│   │   ├── PreviewPanel.tsx          # Preview container with device sizing
│   │   ├── IframePreview.tsx         # Iframe-based viewport isolation
│   │   ├── PortalPreviewRenderer.tsx # Full portal preview
│   │   └── ResourcePreviewRenderer.tsx # Single resource card preview
│   └── registry/           # Component registry for rendering
├── hooks/
│   └── useResourceColumns.ts  # Hook for fetching Synapse table columns
├── state/
│   ├── PortalConfigContext.tsx  # Main config state with CRUD operations
│   └── CardEditorContext.tsx    # State for active resource being edited
├── types/
│   └── portal-config-schema.ts  # Zod schemas for configuration
├── utils/
│   └── defaultConfig.ts         # Default portal configuration
└── styles/
    └── index.scss               # Global styles
```

### Key Concepts

#### Resources

A **Resource** represents a data source from Synapse, defined by:

- A SQL query (e.g., `SELECT * FROM syn12345`)
- Primary key columns (for detail page URLs and DOI generation)
- Cached column metadata (automatically fetched from Synapse)
- Card display configuration (how to render the data as cards)

```typescript
interface Resource {
  id: string
  name: string
  description?: string
  sql: string
  primaryKeyColumns: string[] // Column(s) that uniquely identify rows
  selectColumns: SelectColumn[] // Cached from Synapse
  lastColumnFetch?: string // ISO timestamp
  cardDisplay?: CardDisplayConfig
}
```

> ⚠️ **Warning**: The `primaryKeyColumns` should not be changed after a resource is published. Changing them will break all existing links to detail pages and any DOIs that have been created.

#### Card Display Configuration

Defines how resource data is rendered as cards:

- **cardType**: The card component to use (GENERIC_CARD, STUDY, DATASET, etc.)
- **genericCardSchema**: Maps table columns to card fields (title, subtitle, description, etc.)
- **secondaryLabelLimit**: Maximum number of secondary labels to display
- **titleLinkConfig**: Configuration for making the card title a link to a detail page
- **labelLinkConfig**: Array of configurations for linking secondary labels to other pages
- **ctaLinkConfig**: Configuration for a call-to-action button on the card
- **descriptionConfig**: Configuration for description display (markdown rendering, truncation)

##### Title Link Configuration

The `titleLinkConfig` property enables linking the card title to a detail page:

```typescript
interface CardLink {
  matchColumnName: string // Column whose value is used as display text
  isMarkdown: false // Must be false for links
  baseURL: string // Relative path (e.g., "Explore/Studies/DetailsPage")
  URLColumnName: string // Column value for the URL query parameter
  wrapValueWithParens?: boolean // Wrap value in parentheses
  resolveEntityName?: boolean // Resolve synID to entity name
}
```

##### Label Link Configuration

The `labelLinkConfig` property is an array that configures links for secondary label columns:

```typescript
interface LabelLinkConfig {
  matchColumnName: string // Which secondary label column to link
  baseURL: string // Relative path for the link
  URLColumnName: string // Column value for the URL parameter
  isMarkdown: false // Use false for regular links, true for markdown
}
;[]
```

Example from AD Knowledge Portal Studies:

```json
{
  "titleLinkConfig": {
    "isMarkdown": false,
    "baseURL": "Explore/Studies/DetailsPage",
    "URLColumnName": "Study",
    "matchColumnName": "Study"
  },
  "labelLinkConfig": [
    {
      "isMarkdown": false,
      "matchColumnName": "Program",
      "URLColumnName": "Program",
      "baseURL": "Explore/Programs/DetailsPage"
    }
  ]
}
```

#### Pages and Components

Pages contain ordered lists of component blocks that render different UI elements. Components can reference resources for data display.

### State Management

The app uses React Context with `use-immer` for immutable state updates:

- **PortalConfigContext**: Main configuration state with CRUD operations for all config sections
- **ResourceEditorContext**: Tracks which resource is being actively edited (for live preview)

Configuration is automatically persisted to `localStorage`.

### Preview System

The preview system uses iframes for viewport isolation:

1. **IframePreview**: Creates an isolated viewport with proper window/document contexts
2. **WindowOverrideContext**: Provides the iframe's window to MUI components for proper positioning
3. **PortalPreviewRenderer**: Renders the full portal using `synapse-portal-framework` components
4. **ResourcePreviewRenderer**: Renders a single resource as cards for focused editing

## Configuration Schema

The portal configuration is validated using Zod schemas. The main configuration includes:

```typescript
interface PortalConfig {
  version: '1.0'
  metadata: { name: string; description?: string }
  palette: { primary: string; secondary: string; ... }
  headerConfig: { title: string; summary: string; ... }
  footerConfig: { contactUs?: string; help?: string; ... }
  logoHeaderConfig: { name?: string; icon?: string; ... }
  logoFooterConfig: { ... }
  navbarConfig: { routes: NavbarRoute[]; isPortalsDropdownEnabled: boolean }
  resources: Resource[]
  pages: PageConfig[]
}
```

See `src/types/portal-config-schema.ts` for complete schema definitions.

## Key Dependencies

- **React 19**: UI framework
- **MUI 7**: Component library
- **Zod**: Schema validation
- **use-immer**: Immutable state updates
- **synapse-react-client**: Synapse components (CardContainerLogic, etc.)
- **synapse-portal-framework**: Portal framework components (Navbar, Footer, etc.)
- **@tanstack/react-query**: Server state management for Synapse API calls

## Synapse Integration

### Column Fetching

The `useResourceColumns` hook fetches column metadata from Synapse:

```typescript
const { columnNames, isLoading, error } = useResourceColumns(sql)
```

This uses `BUNDLE_MASK_QUERY_SELECT_COLUMNS` (value 4) to get the columns from the SELECT clause, enabling:

- Autocomplete for column name fields
- Validation warnings for invalid column references
- Column type information for future enhancements

### Authentication

The preview system currently runs without authentication (anonymous access). Users viewing the preview will see public data only. Future enhancements may include authentication support for previewing access-controlled data.

## Future Enhancements

Planned improvements include:

- [ ] **CLI Export**: Generate portal app files from configuration
- [ ] **Authentication**: Support logged-in preview for access-controlled data
- [ ] **More Component Types**: Support for additional portal components beyond cards
- [ ] **Theme Customization**: Visual theme editor with color palette generation
- [ ] **Undo/Redo**: History management for configuration changes
- [ ] **Validation Panel**: Comprehensive validation of configuration with actionable errors
- [ ] **Resource References**: Allow pages/components to reference resources by ID

## Contributing

### Adding New Editor Sections

1. Create a new editor component in `src/components/editor/`
2. Add state management methods to `PortalConfigContext` if needed
3. Add the section to `ConfigEditorPanel.tsx` tabs
4. Update the Zod schema in `portal-config-schema.ts` if adding new config fields

### Adding New Preview Components

1. Create a renderer component in `src/components/preview/`
2. Register it in the component registry if it should be available for pages
3. Update `PortalPreviewRenderer` or create a new preview mode

### Updating the Configuration Schema

1. Update the Zod schemas in `src/types/portal-config-schema.ts`
2. Update the default configuration in `src/utils/defaultConfig.ts`
3. Handle migration of existing localStorage configs if breaking changes are made

## License

This project is part of the Synapse Web Monorepo. See the repository root for license information.
