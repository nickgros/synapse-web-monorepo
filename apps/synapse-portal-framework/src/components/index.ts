import ExploreWrapper from './Explore/ExploreWrapper'
import DetailsPage from './DetailsPage'
import TabbedSynapseObjects from './TabbedSynapseObjects'
import ConsortiaGoals from './csbc-home-page/ConsortiaGoals'
import HomePageCardContainer from './csbc-home-page/HomePageCardContainer'
import Ecosystem from './csbc-home-page/Ecosystem'
import AboutPortal from './csbc-home-page/AboutPortal'
import DevelopedBySage from './csbc-home-page/DevelopedBySage'
import NFBrowseToolsPage from './nf/NFBrowseToolsPage'
import ELBrowseToolsPage from './elportal/ELBrowseToolsPage'
import ELBetaLaunchBanner from './elportal/ELBetaLaunchBanner'
import ARKWelcomePage from './arkportal/ARKWelcomePage'
import GenieHomePageHeader from './genie/GenieHomePageHeader'
import Image from './Image'
import RedirectWithQuery from './RedirectWithQuery'
import RedirectToURL from './RedirectToURL'
import { Navigate as Redirect } from 'react-router'
import Header from './Header'
import ChallengeParticipantGoogleMap from './challengeportal/ChallengeParticipantGoogleMap'
import ChallengeDetailPageWrapper from './challengeportal/ChallengeDetailPageWrapper'
import ChallengeSubmissionWrapper from './challengeportal/ChallengeSubmissionWrapper'
import ChallengeDataDownloadWrapper from './challengeportal/ChallengeDataDownloadWrapper'
import ProjectDiscussionForum from './ProjectDiscussionForum'
import ComponentCollapse from './ComponentCollapse'
import SurveyToast from './SurveyToast'

const PortalComponents = {
  RouteControlWrapper: ExploreWrapper,
  DetailsPage,
  ConsortiaGoals,
  HomePageCardContainer,
  Ecosystem,
  AboutPortal,
  DevelopedBySage,
  Image,
  RedirectToURL,
  RedirectWithQuery,
  // Todo rename (remove probably?)
  Redirect,
  NFBrowseToolsPage,
  ELBrowseToolsPage,
  ELBetaLaunchBanner,
  ARKWelcomePage,
  GenieHomePageHeader,
  TabbedSynapseObjects,
  Header,
  ChallengeParticipantGoogleMap,
  ChallengeDetailPageWrapper,
  ProjectDiscussionForum,
  ChallengeSubmissionWrapper,
  ChallengeDataDownloadWrapper,
  SynapseComponentCollapse: ComponentCollapse,
  SurveyToast,
}

export default PortalComponents
