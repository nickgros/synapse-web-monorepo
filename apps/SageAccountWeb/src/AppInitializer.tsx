import React, { useCallback, useEffect, useState } from 'react'

import { AppContextProvider } from 'AppContext'
import { Redirect, useLocation } from 'react-router-dom'
import { SynapseClient, SynapseComponents } from 'synapse-react-client'
import { SynapseContextProvider } from 'synapse-react-client/dist/utils/SynapseContext'
import { UserProfile } from 'synapse-react-client/dist/utils/synapseTypes'
import { getSearchParam } from 'URLUtils'
import useAnalytics from './useAnalytics'
import { displayToast } from 'synapse-react-client/dist/containers/ToastMessage'
import { SignedTokenInterface } from 'synapse-react-client/dist/utils/synapseTypes/SignedToken/SignedTokenInterface'
import useDetectSSOCode from 'synapse-react-client/dist/utils/hooks/useDetectSSOCode'
import { ThemeOptions } from '@mui/material'
import { useSourceApp } from 'components/SourceApp'
import { deepmerge } from '@mui/utils'
import theme from './style/theme'
import { TwoFactorAuthSSOContextProvider } from './TwoFactorAuthSSOContext'
import { TwoFactorAuthErrorResponse } from 'synapse-react-client/dist/utils/synapseTypes/ErrorResponse'
import { redirectAfterSSO } from 'synapse-react-client/dist/utils/AppUtils'
import { SessionContextProvider } from './SessionContext'

/**
 * State and helpers for managing a user session in the portal
 * @param setShowLoginDialog
 * @returns
 */
function useSession() {
  const [token, setToken] = useState<string | undefined>(undefined)
  const [touSigned, setTouSigned] = useState(true)
  const [hasCalledGetSession, setHasCalledGetSession] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | undefined>(
    undefined,
  )
  const initAnonymousUserState = useCallback(() => {
    SynapseClient.signOut().then(() => {
      // reset token and user profile
      setToken(undefined)
      setUserProfile(undefined)
      setHasCalledGetSession(true)
    })
  }, [])

  const getSession = useCallback(async () => {
    let token
    try {
      token = await SynapseClient.getAccessTokenFromCookie()
      if (!token) {
        initAnonymousUserState()
        return
      }
    } catch (e) {
      console.error('Unable to get the access token: ', e)
      initAnonymousUserState()
      return
    }
    setToken(token)
    setHasCalledGetSession(true)
    try {
      // get user profile
      const userProfile = await SynapseClient.getUserProfile(token)
      if (userProfile.profilePicureFileHandleId) {
        userProfile.clientPreSignedURL = `https://repo-prod.prod.sagebase.org/file/v1/file/${userProfile.profilePicureFileHandleId}?fileAssociateType=UserProfileAttachment&fileAssociateId=${userProfile.ownerId}&redirect=true`
      }
      setUserProfile(userProfile)
    } catch (e) {
      console.error('Error on getSession: ', e)
      if (e.reason == 'Terms of use have not been signed.') {
        setTouSigned(false)
      } else {
        // intentionally calling sign out because there token could be stale so we want
        // the stored session to be cleared out.
        SynapseClient.signOut().then(() => {
          // PORTALS-2293: if the token was invalid (caused an error), reload the app to ensure all children
          // are loading as the anonymous user
          window.location.reload()
        })
      }
    }
  }, [initAnonymousUserState])

  return {
    token,
    userProfile,
    hasCalledGetSession,
    getSession,
    touSigned,
  }
}

function AppInitializer(props: { children?: React.ReactNode }) {
  const [isFramed, setIsFramed] = useState(false)
  const [appId, setAppId] = useState<string>()
  const [redirectURL, setRedirectURL] = useState<string>()
  const [themeOptions, setThemeOptions] = useState<ThemeOptions>()
  const [twoFactorAuthError, setTwoFactorAuthError] =
    useState<TwoFactorAuthErrorResponse>()
  const { token, getSession, hasCalledGetSession, touSigned } = useSession()
  const [signedToken, setSignedToken] = useState<
    SignedTokenInterface | undefined
  >()
  useEffect(() => {
    // SWC-6294: on mount, detect and attempt a client-side framebuster (mitigation only, easily bypassed by attacker)
    if (window.top && window.top !== window) {
      // If not sandboxed, make sure not to show any portal content (in case they block window unload via onbeforeunload)
      setIsFramed(true)
      // If sandboxed, this call will cause an uncaught js exception and portal will not load.
      window.top.location = window.location
    }
  }, [])

  useEffect(() => {
    const searchParamAppId = getSearchParam('appId')
    const localStorageAppId = localStorage.getItem('sourceAppId')
    if (searchParamAppId) {
      localStorage.setItem('sourceAppId', searchParamAppId)
      setAppId(searchParamAppId)
    } else if (localStorageAppId) {
      setAppId(localStorageAppId)
    } else {
      // fallback to Sage Bionetworks
      localStorage.setItem('sourceAppId', 'SAGE')
      setAppId('SAGE')
    }
  }, [])

  const sourceApp = useSourceApp(appId)

  useEffect(() => {
    if (sourceApp?.palette) {
      setThemeOptions(deepmerge(theme, { palette: sourceApp.palette }))
    }
  }, [sourceApp?.appId])

  useEffect(() => {
    const searchParamSignedToken = getSearchParam('signedToken')
    const localStorageSignedToken = localStorage.getItem('signedToken')
    if (searchParamSignedToken) {
      localStorage.setItem('signedToken', searchParamSignedToken)
      const searchParamToken = JSON.parse(
        SynapseComponents.hex2ascii(searchParamSignedToken),
      ) as SignedTokenInterface
      setSignedToken(searchParamToken)
    } else if (localStorageSignedToken) {
      const localStorageParamToken = JSON.parse(
        SynapseComponents.hex2ascii(localStorageSignedToken),
      ) as SignedTokenInterface
      setSignedToken(localStorageParamToken)
    }
  }, [])

  useEffect(() => {
    const searchParamRedirectURL = getSearchParam('redirectURL')
    const localStorageRedirectURL = localStorage.getItem('sourceAppRedirectURL')
    if (searchParamRedirectURL) {
      const hostName = new URL(searchParamRedirectURL).hostname
      if (hostName.toLowerCase().endsWith('.synapse.org')) {
        localStorage.setItem('sourceAppRedirectURL', searchParamRedirectURL)
        setRedirectURL(searchParamRedirectURL)
      } else {
        console.error(
          `Invalid redirectURL (${searchParamRedirectURL}) - Must be a subdomain of .synapse.org`,
        )
      }
    } else if (localStorageRedirectURL) {
      setRedirectURL(localStorageRedirectURL)
    } else {
      // fallback to Synapse.org
      setRedirectURL('https://www.synapse.org/#!Profile:v/projects/all')
    }
  }, [appId])

  /** Call getSession on mount */
  useEffect(() => {
    getSession()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useAnalytics()

  useDetectSSOCode({
    onSignInComplete: () => {
      // go back to original route after successful SSO login
      redirectAfterSSO()
    },
    registerAccountUrl: '/register1',
    onError: error => {
      displayToast(error as string, 'danger')
    },
    onTwoFactorAuthRequired: error => setTwoFactorAuthError(error),
  })

  const location = useLocation()
  if (!hasCalledGetSession) {
    // Don't render anything until the session has been established
    // Otherwise we may end up reloading components and making duplicate requests
    return <></>
  }

  return (
    <AppContextProvider
      appContext={{
        appId,
        redirectURL,
        signedToken,
      }}
    >
      <SessionContextProvider context={{ refreshSession: getSession }}>
        <TwoFactorAuthSSOContextProvider
          context={{ twoFactorAuthErrorResponse: twoFactorAuthError }}
        >
          <SynapseContextProvider
            synapseContext={{
              accessToken: token,
              isInExperimentalMode: SynapseClient.isInSynapseExperimentalMode(),
              utcTime: SynapseClient.getUseUtcTimeFromCookie(),
              downloadCartPageUrl: '',
            }}
            theme={themeOptions}
          >
            {!touSigned &&
              location.pathname != '/authenticated/signTermsOfUse' && (
                <Redirect to="/authenticated/signTermsOfUse" />
              )}
            {!isFramed && props.children}
          </SynapseContextProvider>
        </TwoFactorAuthSSOContextProvider>
      </SessionContextProvider>
    </AppContextProvider>
  )
}

export default AppInitializer
