import AMPALSResearchPageLayout from '@sage-bionetworks/synapse-portal-framework/components/ampals/AMPALSResearchPageLayout'
import { Link, useParams } from 'react-router'
import { Alert } from '@mui/material'
import { AridhiaDarWizard } from 'synapse-react-client/components/Aridhia/DarWizard/AridhiaDarWizard'

/**
 * Full-page RDCA-DAP Data Access Request wizard for one dataset.
 */
function DataAccessRequest() {
  const { datasetCode } = useParams<{ datasetCode: string }>()

  return (
    <AMPALSResearchPageLayout
      headerTitle="Request Data Access"
      sidebarTitle="C-Path Data Access Request"
      sidebarContent={
        <>
          <p>
            You are currently requesting access to data hosted RDCA-DAP. You can
            directly create a Data Access Request (DAR) for the dataset you are
            interested in by clicking the link below.
          </p>
          <p>
            <a
              href={`${import.meta.env.VITE_ARIDHIA_FAIR_PORTAL_URL}/#/data/datasets/${datasetCode}`}
              target="_blank"
              rel="noopener"
            >
              Request Access on RDCA-DAP
            </a>
          </p>
        </>
      }
    >
      {datasetCode ? (
        <AridhiaDarWizard datasetCode={datasetCode} />
      ) : (
        <Alert severity="error">
          Dataset not specified. Return to{' '}
          <Link to="/Explore/Datasets">Explore Datasets</Link>.
        </Alert>
      )}
    </AMPALSResearchPageLayout>
  )
}

export default DataAccessRequest
