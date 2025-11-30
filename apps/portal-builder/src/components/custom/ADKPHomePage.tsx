/**
 * ADKP Home Page - Example custom component
 *
 * This demonstrates how a portal can register a custom home page component
 * that will be rendered by the portal-builder when the route specifies
 * `customComponent: 'ADKPHomePage'`.
 *
 * This approach enables gradual migration:
 * - Start with existing custom components
 * - Incrementally convert sections to config-driven components
 * - Eventually fully config-driven if desired
 */

import Header from '@sage-bionetworks/synapse-portal-framework/components/Header'
import { SectionLayout } from '@sage-bionetworks/synapse-portal-framework/components/SectionLayout'
import { FeaturedDataTabs } from 'synapse-react-client/components/FeaturedDataTabs'
import { Markdown } from 'synapse-react-client/components/Markdown/MarkdownSynapse'
import RssFeedCards from 'synapse-react-client/components/RssFeedCards/RssFeedCards'

// SQL queries for this portal
const dataSql = 'SELECT * FROM syn11346063.77'

function ADKPHomePage() {
  return (
    <>
      <Header />
      <div className="home-bg-dark">
        <SectionLayout
          title="Featured Data"
          centerTitle={true}
          ContainerProps={{
            className: 'home-spacer',
          }}
        >
          <FeaturedDataTabs
            sql={dataSql}
            rgbIndex={3}
            configs={[
              {
                title: 'Human Studies',
                icon: 'PERSON',
                explorePagePath: '/Explore/Studies',
                exploreObjectType: 'Studies',
                plotsConfig: {
                  configs: [
                    {
                      title: 'The Whole Genome Sequencing Harmonization Study',
                      description:
                        'This study provides a set of harmonized WGS data generated from the three primary AMP-AD cohort studies.',
                      facetsToPlot: ['dataType', 'assay'],
                      selectFacetColumnName: 'study',
                      selectFacetColumnValue: 'WGS_Harmonization',
                      detailsPagePath:
                        '/Explore/Studies/DetailsPage?Study=syn22264775',
                      unitDescription: 'Files',
                    },
                  ],
                },
              },
            ]}
          />
        </SectionLayout>
      </div>
      <SectionLayout
        title="Related Resources"
        centerTitle={true}
        subtitle="The AD Knowledge Portal ecosystem contains a growing list of tools and resources."
        ContainerProps={{
          className: 'home-spacer',
        }}
      >
        <Markdown ownerId="syn12666371" wikiId="607139" />
      </SectionLayout>
      <SectionLayout
        title="What's New"
        centerTitle={true}
        ContainerProps={{
          className: 'home-spacer',
        }}
      >
        <RssFeedCards
          url="https://news.adknowledgeportal.org"
          itemsToShow={3}
          allowCategories={[]}
          mailChimpListName="AMP-AD quarterly newsletter"
          mailChimpUrl="https://sagebase.us7.list-manage.com/subscribe/post?u=b146de537186191a9d2110f3a&amp;id=96b614587a"
          filter={{
            value: "what's-new",
          }}
        />
      </SectionLayout>
    </>
  )
}

export default ADKPHomePage
