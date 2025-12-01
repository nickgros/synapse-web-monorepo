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

// AD Knowledge Portal Program column names
const PROGRAM_TABLE_COLUMN_NAMES = {
  PROGRAM: 'Program',
  GRANT_NUMBER: 'Grant Number',
}

// AD Knowledge Portal Project column names
const PROJECT_TABLE_COLUMN_NAMES = {
  PROGRAM: 'Program',
  GRANT_NUMBER: 'Grant Number',
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
 * Program detail page configuration
 */
const defaultProgramDetailsConfig: DetailsRouteConfig = {
  resourceId: 'adkp-programs',
  showHeaderCard: true,
  tabs: [
    {
      id: 'program-details-tab',
      title: 'Program Details',
      path: 'ProgramDetails',
      sections: [
        {
          id: 'Projects',
          title: 'Projects',
          config: {
            type: 'related-resource',
            sourceResourceId: 'adkp-projects',
            filterColumnName: PROJECT_TABLE_COLUMN_NAMES.PROGRAM,
            sourceColumnName: PROGRAM_TABLE_COLUMN_NAMES.PROGRAM,
            displayAs: 'cards',
          },
        },
        {
          id: 'Studies',
          title: 'Studies',
          config: {
            type: 'related-resource',
            sourceResourceId: 'adkp-studies',
            filterColumnName: STUDY_TABLE_COLUMN_NAMES.PROGRAM,
            sourceColumnName: PROGRAM_TABLE_COLUMN_NAMES.PROGRAM,
            displayAs: 'cards',
          },
        },
      ],
    },
  ],
}

/**
 * Project detail page configuration
 */
const defaultProjectDetailsConfig: DetailsRouteConfig = {
  resourceId: 'adkp-projects',
  showHeaderCard: true,
  tabs: [
    {
      id: 'project-details-tab',
      title: 'Project Details',
      path: 'ProjectDetails',
      sections: [
        {
          id: 'Studies',
          title: 'Studies',
          config: {
            type: 'related-resource',
            sourceResourceId: 'adkp-studies',
            filterColumnName: STUDY_TABLE_COLUMN_NAMES.GRANT_NUMBER,
            sourceColumnName: PROJECT_TABLE_COLUMN_NAMES.GRANT_NUMBER,
            displayAs: 'cards',
          },
        },
        {
          id: 'Publications',
          title: 'Publications',
          config: {
            type: 'related-resource',
            sourceResourceId: 'adkp-publications',
            filterColumnName: 'grant',
            sourceColumnName: PROJECT_TABLE_COLUMN_NAMES.GRANT_NUMBER,
            displayAs: 'cards',
          },
        },
        {
          id: 'ExperimentalModels',
          title: 'Experimental Models',
          config: {
            type: 'related-resource',
            sourceResourceId: 'adkp-experimental-models',
            filterColumnName: 'grant',
            sourceColumnName: PROJECT_TABLE_COLUMN_NAMES.GRANT_NUMBER,
            displayAs: 'cards',
          },
        },
        {
          id: 'ComputationalTools',
          title: 'Computational Tools',
          config: {
            type: 'related-resource',
            sourceResourceId: 'adkp-computational-tools',
            filterColumnName: 'grant',
            sourceColumnName: PROJECT_TABLE_COLUMN_NAMES.GRANT_NUMBER,
            displayAs: 'cards',
          },
        },
        {
          id: 'TargetEnablingResources',
          title: 'Target Enabling Resources',
          config: {
            type: 'related-resource',
            sourceResourceId: 'adkp-target-enabling-resources',
            filterColumnName: 'grant',
            sourceColumnName: PROJECT_TABLE_COLUMN_NAMES.GRANT_NUMBER,
            displayAs: 'cards',
          },
        },
        {
          id: 'People',
          title: 'People',
          config: {
            type: 'related-resource',
            sourceResourceId: 'adkp-people',
            filterColumnName: 'Grant Number',
            sourceColumnName: PROJECT_TABLE_COLUMN_NAMES.GRANT_NUMBER,
            displayAs: 'cards',
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
        sql: 'SELECT * FROM syn17083367 ORDER BY isFeatured DESC',
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
      {
        id: 'adkp-programs',
        name: 'AD Knowledge Portal Programs',
        description: 'Research programs funding AD research',
        sql: 'SELECT * FROM syn17024173',
        primaryKeyColumns: ['Program'],
        selectColumns: [],
        cardDisplay: {
          cardType: 'GENERIC_CARD',
          genericCardSchema: {
            type: 'Program',
            title: 'Full Name',
            subTitle: 'Short Description',
            icon: 'Program',
            secondaryLabels: ['More Information'],
          },
          secondaryLabelLimit: 4,
          titleLinkConfig: {
            isMarkdown: false,
            baseURL: 'Explore/Programs/DetailsPage',
            URLColumnName: 'Program',
            matchColumnName: 'Program',
          },
        },
      },
      {
        id: 'adkp-projects',
        name: 'AD Knowledge Portal Projects',
        description: 'Research projects and grants in AD research',
        sql: 'SELECT * FROM syn17024229 ORDER BY isFeatured DESC',
        primaryKeyColumns: ['Grant Number'],
        selectColumns: [],
        searchConfiguration: {
          searchable: [
            'Name',
            'Grant Number',
            'Program',
            'Principal Investigators',
            'Institutions',
            'Abstract',
          ],
        },
        cardDisplay: {
          cardType: 'GENERIC_CARD',
          genericCardSchema: {
            type: 'Project',
            title: 'Name',
            subTitle: 'Principal Investigators',
            description: 'Abstract',
            secondaryLabels: [
              'Institutions',
              'Program',
              'Grant Number',
              'More Information',
            ],
          },
          secondaryLabelLimit: 4,
          titleLinkConfig: {
            isMarkdown: false,
            baseURL: 'Explore/Projects/DetailsPage',
            URLColumnName: 'Grant Number',
            matchColumnName: 'Grant Number',
          },
        },
      },
      {
        id: 'adkp-publications',
        name: 'AD Knowledge Portal Publications',
        description: 'Scientific publications from AD research',
        sql: 'SELECT * FROM syn20448807',
        primaryKeyColumns: ['pubmed_id'],
        selectColumns: [],
        columnAliases: {
          pubmed_id: 'Pubmed ID',
        },
        cardDisplay: {
          cardType: 'GENERIC_CARD',
          genericCardSchema: {
            type: 'publication',
            title: 'title',
            subTitle: 'authors',
            secondaryLabels: [
              'year',
              'journal',
              'Program',
              'grant',
              'DOI',
              'pubmed_id',
            ],
          },
        },
      },
      {
        id: 'adkp-people',
        name: 'AD Knowledge Portal People',
        description: 'Researchers and contributors to AD research',
        sql: 'SELECT * FROM syn13897207',
        primaryKeyColumns: ['ownerID'],
        selectColumns: [],
        searchConfiguration: {
          searchable: [
            'firstName',
            'lastName',
            'institution',
            'Program',
            'Grant Number',
          ],
        },
        cardDisplay: {
          cardType: 'MEDIUM_USER_CARD',
        },
      },
      {
        id: 'adkp-experimental-models',
        name: 'AD Knowledge Portal Experimental Models',
        description:
          'Experimental models for AD research including mouse models and cell lines',
        sql: 'SELECT * FROM syn22219805 ORDER BY isFeatured DESC',
        primaryKeyColumns: ['name'],
        selectColumns: [],
        columnAliases: {
          mouseModelReport: 'Model Report Card',
        },
        searchConfiguration: {
          searchable: [
            'name',
            'summary',
            'modelType',
            'toolType',
            'contributor',
            'grant',
            'program',
            'backgroundStrain',
            'targetedGenes',
          ],
        },
        tableDisplay: {
          showDownloadColumn: false,
          showAccessColumn: false,
          visibleColumnCount: 10,
        },
        cardDisplay: {
          cardType: 'GENERIC_CARD',
          genericCardSchema: {
            type: 'experimental',
            title: 'name',
            description: 'summary',
            secondaryLabels: [
              'modelType',
              'alzforumInformation',
              'mouseModelReport',
              'availableData',
              'supplementaryInformation',
              'contributor',
              'grant',
              'program',
            ],
          },
          labelLinkConfig: [
            {
              isMarkdown: true,
              matchColumnName: 'alzforumInformation',
            },
            {
              isMarkdown: false,
              matchColumnName: 'availableData',
              URLColumnName: 'modelSystemName',
              baseURL: 'Explore/Data',
            },
            {
              isMarkdown: true,
              matchColumnName: 'mouseModelReport',
            },
            {
              isMarkdown: true,
              matchColumnName: 'supplementaryInformation',
            },
            {
              isMarkdown: false,
              matchColumnName: 'grant',
              URLColumnName: 'Grant Number',
              baseURL: 'Explore/Projects/DetailsPage',
            },
          ],
        },
      },
      {
        id: 'adkp-computational-tools',
        name: 'AD Knowledge Portal Computational Tools',
        description:
          'Software tools and computational resources for AD research',
        sql: 'SELECT * FROM syn20337467',
        primaryKeyColumns: ['name'],
        selectColumns: [],
        searchConfiguration: {
          searchable: [
            'contributor',
            'name',
            'grant',
            'program',
            'softwareType',
            'summary',
          ],
        },
        cardDisplay: {
          cardType: 'GENERIC_CARD',
          genericCardSchema: {
            type: 'computational',
            title: 'name',
            description: 'summary',
            subTitle: 'softwareType',
            secondaryLabels: [
              'contributor',
              'program',
              'grant',
              'documentation',
            ],
          },
          labelLinkConfig: [
            {
              isMarkdown: false,
              matchColumnName: 'grant',
              URLColumnName: 'Grant Number',
              baseURL: 'Explore/Projects/DetailsPage',
            },
          ],
        },
      },
      {
        id: 'adkp-target-enabling-resources',
        name: 'AD Knowledge Portal Target Enabling Resources',
        description: 'Target enabling resources for AD drug discovery',
        sql: 'SELECT * FROM syn26146692 WHERE `isPublic` = true',
        primaryKeyColumns: ['title'],
        selectColumns: [],
        columnAliases: {
          TEP_type: 'TEP Type',
          related_target: 'Related Target',
          contributing_center: 'Contributing Center',
        },
        searchConfiguration: {
          searchable: [
            'title',
            'category',
            'target',
            'related_target',
            'program',
            'grant',
            'contributing_center',
            'page',
            'summary',
          ],
        },
        tableDisplay: {
          showAccessColumn: false,
          showDownloadColumn: false,
          visibleColumnCount: 7,
        },
        cardDisplay: {
          cardType: 'GENERIC_CARD',
          genericCardSchema: {
            type: 'experimental',
            title: 'title',
            description: 'summary',
            subTitle: 'contributing_center',
            secondaryLabels: ['target', 'related_target', 'program', 'grant'],
          },
          labelLinkConfig: [
            {
              isMarkdown: false,
              matchColumnName: 'program',
              URLColumnName: 'Program',
              baseURL: 'Explore/Programs/DetailsPage',
            },
            {
              isMarkdown: false,
              matchColumnName: 'grant',
              URLColumnName: 'Grant Number',
              baseURL: 'Explore/Projects/DetailsPage',
            },
          ],
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
        // Explore page with nested tab routes
        id: uuidv4(),
        displayName: 'Explore',
        path: '/Explore',
        displayAs: 'explore',
        children: [
          // Explore tabs (shown in tab navigation)
          {
            id: uuidv4(),
            displayName: 'Programs',
            path: 'Programs',
            exploreTabConfig: {
              resourceId: 'adkp-programs',
              displayMode: 'queryWrapperPlotNav',
              rgbIndex: 0,
            },
          },
          {
            id: uuidv4(),
            displayName: 'Projects',
            path: 'Projects',
            exploreTabConfig: {
              resourceId: 'adkp-projects',
              displayMode: 'queryWrapperPlotNav',
              rgbIndex: 1,
            },
          },
          {
            id: uuidv4(),
            displayName: 'Studies',
            path: 'Studies',
            exploreTabConfig: {
              resourceId: 'adkp-studies',
              displayMode: 'queryWrapperPlotNav',
              rgbIndex: 2,
            },
          },
          {
            id: uuidv4(),
            displayName: 'Data',
            path: 'Data',
            exploreTabConfig: {
              resourceId: 'adkp-data-files',
              displayMode: 'queryWrapperPlotNav',
              rgbIndex: 3,
            },
          },
          {
            id: uuidv4(),
            displayName: 'Publications',
            path: 'Publications',
            exploreTabConfig: {
              resourceId: 'adkp-publications',
              displayMode: 'queryWrapperPlotNav',
              rgbIndex: 4,
            },
          },
          {
            id: uuidv4(),
            displayName: 'People',
            path: 'People',
            exploreTabConfig: {
              resourceId: 'adkp-people',
              displayMode: 'queryWrapperPlotNav',
              rgbIndex: 5,
            },
          },
          {
            id: uuidv4(),
            displayName: 'Experimental Models',
            path: 'Experimental%20Models',
            exploreTabConfig: {
              resourceId: 'adkp-experimental-models',
              displayMode: 'queryWrapperPlotNav',
              rgbIndex: 6,
            },
          },
          {
            id: uuidv4(),
            displayName: 'Computational Tools',
            path: 'Computational%20Tools',
            exploreTabConfig: {
              resourceId: 'adkp-computational-tools',
              displayMode: 'queryWrapperPlotNav',
              rgbIndex: 7,
            },
          },
          {
            id: uuidv4(),
            displayName: 'Target Enabling Resources',
            path: 'Target%20Enabling%20Resources',
            exploreTabConfig: {
              resourceId: 'adkp-target-enabling-resources',
              displayMode: 'queryWrapperPlotNav',
              rgbIndex: 8,
            },
          },
        ],
      },
      // Detail pages - siblings of /Explore, not children (no ExploreWrapper)
      {
        id: uuidv4(),
        displayName: 'Program Details',
        path: '/Explore/Programs/DetailsPage',
        showInNavbar: false,
        displayAs: 'details',
        detailsConfig: defaultProgramDetailsConfig,
      },
      {
        id: uuidv4(),
        displayName: 'Project Details',
        path: '/Explore/Projects/DetailsPage',
        showInNavbar: false,
        displayAs: 'details',
        detailsConfig: defaultProjectDetailsConfig,
      },
      {
        id: uuidv4(),
        displayName: 'Study Details',
        path: '/Explore/Studies/DetailsPage',
        showInNavbar: false,
        displayAs: 'details',
        detailsConfig: defaultStudyDetailsConfig,
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
