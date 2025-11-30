import { z } from 'zod'
import { registerComponent, registerCustomComponent } from './ComponentRegistry'

// Import SRC components
import CardContainerLogic from 'synapse-react-client/components/CardContainerLogic'
import Goals from 'synapse-react-client/components/Goals/Goals'
import { MarkdownSynapse } from 'synapse-react-client/components/Markdown/MarkdownSynapse'
import QueryWrapperPlotNav from 'synapse-react-client/components/QueryWrapperPlotNav'
import RssFeedCards from 'synapse-react-client/components/RssFeedCards/RssFeedCards'
import UserCardListRotate from 'synapse-react-client/components/UserCardList/UserCardListRotate'
import FeaturedDataTabs from 'synapse-react-client/components/FeaturedDataTabs/FeaturedDataTabs'
import HeaderCard from 'synapse-react-client/components/HeaderCard'
import Programs from 'synapse-react-client/components/Programs/Programs'
import Resources from 'synapse-react-client/components/Resources/Resources'
import RecentPublicationsGrid from 'synapse-react-client/components/RecentPublicationsGrid/RecentPublicationsGrid'

// Import portal framework components
import { SectionLayout } from '@sage-bionetworks/synapse-portal-framework/components/SectionLayout'

/**
 * Register all curated components for the portal builder
 */
export function registerAllComponents(): void {
  // Register custom page components (lazy-loaded)
  registerCustomComponent({
    type: 'ADKPHomePage',
    displayName: 'ADKP Home Page',
    description:
      'Complete home page component for the AD Knowledge Portal, with featured data, resources, and news sections.',
    lazyComponent: () => import('../custom/ADKPHomePage'),
  })

  // Data Display Components
  registerComponent({
    type: 'QueryWrapperPlotNav',
    displayName: 'Data Explorer',
    description:
      'Interactive data table with filtering, search, and visualization options',
    category: 'data-display',
    component: QueryWrapperPlotNav,
    propsSchema: z.object({
      sql: z.string().describe('SQL query to fetch data'),
      name: z.string().describe('Display name for the data section'),
      rgbIndex: z.number().optional().describe('Color index for styling'),
      shouldDeepLink: z
        .boolean()
        .optional()
        .describe('Whether to save filters in URL'),
      facetsToPlot: z
        .array(z.string())
        .optional()
        .describe('Column names to show as facet charts'),
    }),
    defaultProps: {
      sql: 'SELECT * FROM syn123456',
      name: 'Data',
      shouldDeepLink: true,
    },
  })

  registerComponent({
    type: 'CardContainerLogic',
    displayName: 'Card Grid',
    description: 'Display data as a grid of cards with configurable layouts',
    category: 'data-display',
    component: CardContainerLogic,
    propsSchema: z.object({
      sql: z.string().describe('SQL query to fetch data'),
      type: z.string().describe('Card type (GENERIC_CARD, STUDY, etc.)'),
      limit: z.number().optional().describe('Maximum number of cards to show'),
    }),
    defaultProps: {
      sql: 'SELECT * FROM syn123456',
      type: 'GENERIC_CARD',
    },
  })

  registerComponent({
    type: 'Goals',
    displayName: 'Goals',
    description: 'Display a list of goals/metrics from a Synapse table',
    category: 'data-display',
    component: Goals,
    propsSchema: z.object({
      entityId: z.string().describe('Synapse entity ID containing goals data'),
    }),
    defaultProps: {
      entityId: 'syn123456',
    },
  })

  registerComponent({
    type: 'RssFeedCards',
    displayName: 'RSS Feed',
    description: 'Display content from an RSS feed as cards',
    category: 'content',
    component: RssFeedCards,
    propsSchema: z.object({
      url: z.string().describe('RSS feed URL'),
      itemsToShow: z.number().optional().describe('Number of items to display'),
      allowCategories: z
        .array(z.string())
        .optional()
        .describe('Filter by categories'),
    }),
    defaultProps: {
      url: 'https://example.com/feed.rss',
      itemsToShow: 3,
    },
  })

  registerComponent({
    type: 'UserCardListRotate',
    displayName: 'User Spotlight',
    description: 'Rotating display of user profile cards',
    category: 'user',
    component: UserCardListRotate,
    propsSchema: z.object({
      sql: z.string().describe('SQL query to fetch user data'),
      count: z.number().optional().describe('Number of users to show'),
      size: z.string().optional().describe('Card size (SMALL, MEDIUM, LARGE)'),
      useQueryResultUserData: z
        .boolean()
        .optional()
        .describe('Whether to use query result data'),
    }),
    defaultProps: {
      sql: 'SELECT * FROM syn123456',
      count: 3,
      size: 'LARGE',
      useQueryResultUserData: true,
    },
  })

  registerComponent({
    type: 'FeaturedDataTabs',
    displayName: 'Featured Data Tabs',
    description: 'Tabbed display of featured datasets',
    category: 'data-display',
    component: FeaturedDataTabs,
    propsSchema: z.object({
      sql: z.string().describe('SQL query to fetch data'),
      rgbIndex: z.number().optional().describe('Color index for styling'),
      configs: z
        .array(
          z.object({
            title: z.string(),
            icon: z.string().optional(),
          }),
        )
        .optional()
        .describe('Tab configurations'),
    }),
    defaultProps: {
      sql: 'SELECT * FROM syn123456',
    },
  })

  registerComponent({
    type: 'HeaderCard',
    displayName: 'Header Card',
    description: 'Large header card with title and description',
    category: 'content',
    component: HeaderCard,
    propsSchema: z.object({
      type: z.string().describe('Card type'),
      title: z.string().describe('Card title'),
      subTitle: z.string().optional().describe('Card subtitle'),
      description: z.string().optional().describe('Card description'),
      iconValue: z.string().optional().describe('Icon value'),
    }),
    defaultProps: {
      type: 'GENERIC_CARD',
      title: 'Header Card Title',
    },
  })

  registerComponent({
    type: 'Programs',
    displayName: 'Programs',
    description: 'Display a list of programs/initiatives',
    category: 'content',
    component: Programs,
    propsSchema: z.object({
      entityId: z
        .string()
        .describe('Synapse entity ID containing programs data'),
    }),
    defaultProps: {
      entityId: 'syn123456',
    },
  })

  registerComponent({
    type: 'Resources',
    displayName: 'Resources',
    description: 'Display a list of resources',
    category: 'content',
    component: Resources,
    propsSchema: z.object({
      entityId: z
        .string()
        .describe('Synapse entity ID containing resources data'),
    }),
    defaultProps: {
      entityId: 'syn123456',
    },
  })

  registerComponent({
    type: 'RecentPublicationsGrid',
    displayName: 'Recent Publications',
    description: 'Grid display of recent publications',
    category: 'content',
    component: RecentPublicationsGrid,
    propsSchema: z.object({
      sql: z.string().describe('SQL query to fetch publications'),
      buttonLink: z.string().optional().describe('Link for "View All" button'),
      buttonLinkText: z.string().optional().describe('"View All" button text'),
      summaryText: z.string().optional().describe('Summary text'),
    }),
    defaultProps: {
      sql: 'SELECT * FROM syn123456',
    },
  })

  // Layout Components
  registerComponent({
    type: 'SectionLayout',
    displayName: 'Section',
    description: 'Container section with optional title',
    category: 'layout',
    component: SectionLayout,
    propsSchema: z.object({
      title: z.string().optional().describe('Section title'),
      centerTitle: z.boolean().optional().describe('Whether to center title'),
      subtitle: z.string().optional().describe('Section subtitle'),
    }),
    defaultProps: {
      title: 'Section Title',
      centerTitle: true,
    },
  })

  // Content Components
  registerComponent({
    type: 'MarkdownSynapse',
    displayName: 'Markdown Content',
    description: 'Render Markdown content from a Synapse wiki',
    category: 'content',
    component: MarkdownSynapse,
    propsSchema: z.object({
      ownerId: z.string().describe('Synapse entity ID that owns the wiki'),
      wikiId: z.string().optional().describe('Specific wiki page ID'),
      loadingSkeletonRowCount: z
        .number()
        .optional()
        .describe('Number of skeleton rows while loading'),
    }),
    defaultProps: {
      ownerId: 'syn123456',
    },
  })
}
