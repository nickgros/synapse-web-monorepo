import {
  App,
  Portal,
  SurveyToast,
} from '@sage-bionetworks/synapse-portal-framework'
import React from 'react'
import footerConfig from '../config/footerConfig'
import headerConfig from '../config/headerConfig'
import logoFooterConfig from '../config/logoFooterConfig'
import logoHeaderConfig from '../config/logoHeaderConfig'
import { navbarConfig } from '../config/navbarConfig'
import palette from '../config/paletteConfig'
import '../App.scss?url'

export default function AppLayout() {
  return (
    <Portal
      portalName={import.meta.env.VITE_PORTAL_NAME}
      palette={palette}
      headerConfig={headerConfig}
      footerConfig={footerConfig}
      logoHeaderConfig={logoHeaderConfig}
      logoFooterConfig={logoFooterConfig}
      navbarConfig={navbarConfig}
    >
      <App>
        {/*<SurveyToast*/}
        {/*  localStorageKey={*/}
        {/*    'org.sagebionetworks.security.cookies.portal.nfsurvey.dismissed'*/}
        {/*  }*/}
        {/*  description="Help us improve the NF Data Portal by completing a data access survey!"*/}
        {/*  surveyURL="https://docs.google.com/forms/d/e/1FAIpQLSdSgkq66IoLHbvXNmMEjEg4nMELwM-_CaJK3rFkU9pn84gYuA/viewform"*/}
        {/*/>*/}
      </App>
    </Portal>
  )
}
