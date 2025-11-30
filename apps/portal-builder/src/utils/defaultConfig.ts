import { v4 as uuidv4 } from 'uuid'
import { DetailsRouteConfig, PortalConfig, RouteNode } from '../types'

// AD Knowledge Portal Study column names
const STUDY_TABLE_COLUMN_NAMES = {
  STUDY: 'Study',
  STUDY_NAME: 'Study_Name',
  GRANT_NUMBER: 'Grant Number',
  PROGRAM: 'Program',
  ACK_CONTEXT: 'ackContext',
  ACKNOWLEDGEMENT: 'Acknowledgement',
  CITATIONS: 'Citations',
  METHODS: 'Methods',
  RELATED_STUDIES: 'Related_Studies',
  ACCESS_REQS: 'accessReqs',
  STUDY_METADATA: 'studyMetadata',
}

/**
 * Default detail page configuration modeled after AD Knowledge Portal StudyDetailsPage
 */
const defaultStudyDetailsConfig: DetailsRouteConfig = {
  resourceId: 'adkp-studies',
  sqlOperator: 'LIKE',
  showHeaderCard: true,
  doiResourceType: 'STUDY',
  tabs: [
    {
      id: 'study-details-tab',
      title: 'Study Details',
      path: 'StudyDetails',
      iconName: 'study',
      tooltip: 'Description, methods, acknowledgements and related studies',
      sections: [
        {
          id: 'StudyDescription',
          title: 'Study Description',
          config: {
            type: 'markdown-from-column',
            columnName: STUDY_TABLE_COLUMN_NAMES.STUDY,
          },
        },
        {
          id: 'Acknowledgement',
          title: 'Acknowledgement',
          config: {
            type: 'markdown-from-column',
            columnName: STUDY_TABLE_COLUMN_NAMES.ACK_CONTEXT,
          },
        },
        {
          id: 'Methods',
          title: 'Methods',
          hideTitle: true,
          config: {
            type: 'markdown-from-column',
            columnName: STUDY_TABLE_COLUMN_NAMES.METHODS,
            showEntityTitle: true,
          },
        },
        {
          id: 'RelatedStudies',
          title: 'Related Studies',
          config: {
            type: 'related-resource',
            sourceResourceId: 'adkp-studies',
            filterColumnName: STUDY_TABLE_COLUMN_NAMES.STUDY,
            sourceColumnName: STUDY_TABLE_COLUMN_NAMES.RELATED_STUDIES,
            // Display related studies as cards using the resource's cardDisplay config
            displayAs: 'cards',
          },
        },
      ],
    },
    {
      id: 'study-data-tab',
      title: 'Study Data',
      path: 'StudyData',
      iconName: 'database',
      iconClassName: 'tab-database',
      tooltip: 'All of the Data generated within this study',
      sections: [
        {
          id: 'AccessRequirements',
          title: 'Access Requirements',
          config: {
            type: 'markdown-from-column',
            columnName: STUDY_TABLE_COLUMN_NAMES.ACCESS_REQS,
          },
        },
        {
          id: 'StudyMetadata',
          title: 'Study Metadata',
          config: {
            type: 'markdown-from-column',
            columnName: STUDY_TABLE_COLUMN_NAMES.STUDY_METADATA,
          },
        },
        {
          id: 'StudyData',
          title: 'Study Data',
          config: {
            // Use related-resource with displayAs: 'table' to show data from another resource as a table
            type: 'related-resource',
            sourceResourceId: 'adkp-data-files',
            filterColumnName: 'study',
            sourceColumnName: STUDY_TABLE_COLUMN_NAMES.STUDY,
            // Display as a table using the resource's tableDisplay config
            displayAs: 'table',
            // Resolve synapse entity IDs to human-readable names
            resolveEntityName: true,
          },
        },
      ],
    },
  ],
}

/**
 * Creates a default empty portal configuration
 */
export function createDefaultPortalConfig(): PortalConfig {
  return {
    version: '1.0',
    metadata: {
      name: 'My Portal',
      description: 'A new Synapse data portal',
    },
    palette: {
      primary: '#395979',
      secondary: '#47337D',
    },
    headerConfig: {
      title: 'Welcome to My Portal',
      summary: 'Explore data, tools, and resources.',
      showBlur: false,
      centerText: true,
    },
    footerConfig: {},
    logoHeaderConfig: {},
    logoFooterConfig: {},
    isPortalsDropdownEnabled: true,
    // Resources define data sources and how to display them
    resources: [
      {
        id: 'adkp-studies',
        name: 'AD Knowledge Portal Studies',
        description:
          'Study data from the AD Knowledge Portal with research studies, data types, species, and other metadata',
        sql: 'SELECT * FROM syn17083367 ORDER BY isFeatured DESC LIMIT 5',
        // Primary key for linking to detail pages
        primaryKeyColumns: ['Study'],
        // Column metadata is fetched dynamically from Synapse
        selectColumns: [],
        // Map column names to human-readable display names
        columnAliases: {
          DataType_All: 'Data Types',
          Data_Contributor: 'Data Contributor',
          Study_Description: 'Study Description',
          Study_Name: 'Study Name',
          Number_of_Individuals: 'Individuals',
          'Grant Number': 'Grant',
        },
        // Search configuration for QueryWrapperPlotNav
        searchConfiguration: {
          searchable: [
            'Study_Name',
            'Study_Description',
            'DataType_All',
            'studyFocus',
            'Data_Contributor',
            'specimenType',
            'Species',
            'Grant Number',
            'Program',
          ],
        },
        cardDisplay: {
          cardType: 'GENERIC_CARD',
          genericCardSchema: {
            type: 'study',
            title: 'Study_Name',
            subTitle: 'Data_Contributor',
            // icon: 'Access_Type',
            description: 'Study_Description',
            secondaryLabels: [
              'DataType_All',
              'studyFocus',
              'Number_Of_Individuals',
              'specimenType',
              'Species',
              'Cohort_Type',
              'Study_Status',
              'Program',
              'Grant Number',
            ],
          },
          secondaryLabelLimit: 4,
          // Title links to the study detail page
          titleLinkConfig: {
            isMarkdown: false,
            baseURL: 'Explore/Studies/DetailsPage',
            URLColumnName: 'Study',
            matchColumnName: 'Study',
          },
          // Program label links to the program detail page
          labelLinkConfig: [
            {
              isMarkdown: false,
              matchColumnName: 'Program',
              URLColumnName: 'Program',
              baseURL: 'Explore/Programs/DetailsPage',
            },
          ],
        },
        // Note: Detail page configuration is now defined in the route tree, not on resources
      },
      {
        id: 'adkp-data-files',
        name: 'AD Knowledge Portal Data Files',
        description:
          'Data files from AD Knowledge Portal studies including genomic, proteomic, and imaging data',
        sql: 'SELECT * FROM syn11346063.77',
        // Primary key columns for this resource
        primaryKeyColumns: ['id'],
        selectColumns: [],
        // Table display configuration - used when displayAs: 'table' references this resource
        tableDisplay: {
          showAccessColumn: true,
          showDownloadColumn: true,
          showColumnSelection: true,
          visibleColumnCount: 7,
          availableFacets: ['study', 'dataType', 'assay', 'species', 'tissue'],
          defaultShowPlots: false,
          hideQueryCount: false,
        },
      },
    ],
    // Unified routes tree - combines navigation and page definitions
    routes: [
      {
        id: uuidv4(),
        displayName: 'Home',
        path: '/',
        displayAs: 'standard',
        // Use a custom component for the entire home page
        // This allows for maximum flexibility and gradual migration
        customComponent: 'ADKPHomePage',
      },
      {
        // Example Explore page with nested tab routes
        id: uuidv4(),
        displayName: 'Explore',
        path: '/Explore',
        displayAs: 'explore',
        children: [
          {
            id: uuidv4(),
            displayName: 'Studies',
            path: 'Studies',
            exploreTabConfig: {
              resourceId: 'adkp-studies',
              displayMode: 'queryWrapperPlotNav',
              rgbIndex: 0,
            },
            children: [
              {
                // Detail page for studies - hidden from navbar
                id: uuidv4(),
                displayName: 'Study Details',
                path: 'DetailsPage',
                showInNavbar: false,
                displayAs: 'details',
                detailsConfig: defaultStudyDetailsConfig,
              },
            ],
          },
          {
            id: uuidv4(),
            displayName: 'Data Files',
            path: 'Data',
            exploreTabConfig: {
              resourceId: 'adkp-data-files',
              displayMode: 'queryWrapperPlotNav',
              rgbIndex: 1,
            },
          },
        ],
      },
      {
        // Example external link
        id: uuidv4(),
        displayName: 'Documentation',
        path: 'https://help.synapse.org',
        linkType: 'external',
      },
    ] as RouteNode[],
  }
}
