import { Button, Link, Paper, Typography } from '@mui/material'
import {
  FileHandleAssociateType,
  OIDCAuthorizationRequest,
} from '@sage-bionetworks/synapse-types'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  AppUtils,
  FullWidthAlert,
  StandaloneLoginForm,
  StyledOuterContainer,
  SynapseClient,
  SynapseClientError,
  SynapseConstants,
  SynapseQueries,
  SystemUseNotification,
  UserCard,
  useSynapseContext,
} from 'synapse-react-client'
import { OAuthClientError } from './OAuthClientError'
import { StyledInnerContainer } from './StyledInnerContainer'
import { getStateParam, handleErrorRedirect } from './URLUtils'

const sendGTagEvent = (event: string) => {
  // send event to Google Analytics
  // (casting to 'any' type to get compile-time access to gtag())
  const windowAny: any = window
  const gtag = windowAny.gtag
  if (gtag) {
    gtag('event', event, {
      event_category: 'SynapseOAUTH',
    })
  }
}

function redirectToURL(redirectURL: string) {
  window.location.replace(redirectURL)
}

export function OAuth2Form() {
  const { refreshSession, twoFactorAuthSSOErrorResponse, clearSession } =
    AppUtils.useApplicationSessionContext()
  const { accessToken } = useSynapseContext()
  const isLoggedIn = Boolean(accessToken)

  const { search } = useLocation()
  const queryParams = useMemo(() => new URLSearchParams(search), [search])
  const [error, setError] = useState<
    Error | SynapseClientError | OAuthClientError
  >()
  const onError = useCallback(
    (error: Error | OAuthClientError | SynapseClientError) => {
      if (error instanceof SynapseClientError && error.status === 401) {
        // invalid token, so clear it
        clearSession()
      } else {
        handleErrorRedirect(error)
        setError(error)
      }
    },
    [clearSession],
  )

  const clientId = useMemo(() => {
    const code = queryParams.get('code')
    if (code) return // we're in the middle of a SSO, do not attempt to get OAuthClient info yet

    const clientId = queryParams.get('client_id')
    if (!clientId) {
      onError(new Error('Synapse OAuth client_id is required'))
      return
    }
    return clientId
  }, [onError, queryParams])

  const { data: oauthClientInfo, isLoading: isLoadingClientInfo } =
    SynapseQueries.useGetOAuth2Client(clientId!, {
      enabled: Boolean(clientId),
    })

  const history = useHistory()

  // In addition to fetching the current user profile, the success of this request will determine if the current access token is valid.
  const {
    data: profile,
    error: fetchProfileError,
    isLoading: isLoadingProfile,
  } = SynapseQueries.useGetCurrentUserProfile({
    enabled: isLoggedIn,
  })

  useEffect(() => {
    if (fetchProfileError) {
      onError(fetchProfileError)
    }
  }, [fetchProfileError, onError])

  if (profile?.profilePicureFileHandleId) {
    // Note: `getPortalFileHandleServletUrl` is not a web request.
    profile.clientPreSignedURL = SynapseClient.getPortalFileHandleServletUrl(
      profile.profilePicureFileHandleId,
      profile.ownerId,
      FileHandleAssociateType.UserProfileAttachment,
    )
  }

  const oidcAuthorizationRequestFromSearchParams:
    | OIDCAuthorizationRequest
    | undefined = useMemo(() => {
    const clientId = queryParams.get('client_id')
    const scope = queryParams.get('scope')
    const responseType = queryParams.get('response_type')
    const redirectUri = queryParams.get('redirect_uri')

    if (
      clientId == null ||
      scope == null ||
      responseType == null ||
      redirectUri == null
    ) {
      // We don't have the params to construct the request
      return undefined
    }

    const authRequest: OIDCAuthorizationRequest = {
      clientId: clientId,
      scope: scope,
      responseType: responseType,
      redirectUri: redirectUri,
      nonce: queryParams.get('nonce') || undefined,
    }
    const claimsString = queryParams.get('claims')
    if (claimsString) {
      authRequest.claims = JSON.parse(claimsString)
    }
    return authRequest
  }, [queryParams])

  const { data: hasUserAuthorizedOAuthClient } =
    SynapseQueries.useGetHasUserAuthorizedOAuthClient(
      oidcAuthorizationRequestFromSearchParams!,
      {
        enabled: Boolean(oidcAuthorizationRequestFromSearchParams),
      },
    )

  const { mutate: consentToRequest } = SynapseQueries.useConsentToOAuth2Request(
    {
      onSuccess: accessCode => {
        if (!accessCode || !accessCode.access_code) {
          onError(
            new Error(
              'Something went wrong - the access code is missing from the Synapse call.',
            ),
          )
          return
        }
        // done!  redirect with access code.
        const redirectUri = queryParams.get('redirect_uri')!
        redirectToURL(
          `${redirectUri}?${getStateParam()}code=${encodeURIComponent(
            accessCode.access_code,
          )}`,
        )
      },
      onError: e => {
        onError(e)
      },
    },
  )

  const onConsent = useCallback(() => {
    sendGTagEvent('UserConsented')
    if (oidcAuthorizationRequestFromSearchParams) {
      consentToRequest(oidcAuthorizationRequestFromSearchParams)
    }
  }, [consentToRequest, oidcAuthorizationRequestFromSearchParams])

  // Handle auto-consent when the user has already consented
  useEffect(() => {
    if (hasUserAuthorizedOAuthClient) {
      const prompt = queryParams.get('prompt')
      if (hasUserAuthorizedOAuthClient.granted) {
        // SWC-5285: before auto-consenting, make sure we're allowed to auto-consent.
        // Only allow if prompt is undefined or set to none.
        if (!prompt || prompt !== 'consent') {
          // auto-consent!
          onConsent()
        } //else if prompt is defined and another value ('login', 'consent', or 'select_account') then always prompt!
      } else if (prompt && prompt === 'none') {
        // granted === false and prompt === none
        onError(
          new OAuthClientError(
            'consent_required',
            'Current user has not previously granted permission, and prompt was set to none',
          ),
        )
      }
    }
  }, [hasUserAuthorizedOAuthClient, onConsent, onError, queryParams])

  const onGoBack = () => {
    // TODO: Does this work with Google signin?
    window.history.back()
  }

  const onDeny = () => {
    let redirect: string
    sendGTagEvent('UserDeniedConsent')
    if (oauthClientInfo && oauthClientInfo.client_uri) {
      redirect = oauthClientInfo.client_uri
    } else {
      redirect = queryParams.get('redirect_uri')!
    }
    redirectToURL(redirect)
  }

  const { data: oidcRequestDescription } =
    SynapseQueries.useGetOAuth2RequestDescription(
      oidcAuthorizationRequestFromSearchParams!,
      {
        enabled: Boolean(oidcAuthorizationRequestFromSearchParams),
      },
    )

  useEffect(() => {
    if (oidcRequestDescription) {
      sendGTagEvent('SynapseOAuthClientRequestDescriptionLoaded')

      // if we were able to get the oidc request description, also check for params that this web app does not support
      // sorry, we don't support JWT in the url query params today
      // https://openid.net/specs/openid-connect-core-1_0.html#JWTRequests
      const requestObject = queryParams.get('request')
      const requestUri = queryParams.get('request_uri')
      if (requestObject) {
        handleErrorRedirect(new OAuthClientError('request_not_supported'))
      }
      if (requestUri) {
        handleErrorRedirect(new OAuthClientError('request_uri_not_supported'))
      }
      // sorry, we don't support registration (yet?)
      // https://openid.net/specs/openid-connect-core-1_0.html#RegistrationParameter
      const registration = queryParams.get('registration')
      if (registration) {
        handleErrorRedirect(new OAuthClientError('registration_not_supported'))
      }
    }
  }, [oidcRequestDescription, queryParams])

  const promptForTwoFactorAuth = !!twoFactorAuthSSOErrorResponse

  const isLoading =
    !promptForTwoFactorAuth && (isLoadingProfile || isLoadingClientInfo)

  const loadingSpinner = (
    <Paper
      sx={{
        mx: 'auto',
        width: '500px',
        height: '250px',
        textAlign: 'center',
        p: 4,
      }}
    >
      <div style={{ marginTop: '50px' }}>
        <span
          style={{
            marginLeft: '10px',
            backgroundSize: '40px 40px',
            width: '40px',
            height: '40px',
          }}
          className={'spinner'}
        />
      </div>
    </Paper>
  )

  return (
    <StyledOuterContainer>
      {!error && oauthClientInfo && !oauthClientInfo.verified && (
        <FullWidthAlert
          variant="warning"
          title="This app is not verified"
          description="This app has not been verified by Sage Bionetworks yet."
          primaryButtonConfig={{
            text: 'Back to Safety',
            onClick: onGoBack,
          }}
          isGlobal={false}
        />
      )}
      {!error &&
        accessToken &&
        oauthClientInfo &&
        oauthClientInfo.verified &&
        oidcRequestDescription && (
          <StyledInnerContainer>
            <UserCard
              userProfile={profile}
              size={SynapseConstants.SMALL_USER_CARD}
            />
            <Typography
              variant="headline3"
              sx={{ paddingTop: '25px', paddingBottom: '25px' }}
            >
              <strong>{oauthClientInfo.client_name}</strong> requests
              permission:
            </Typography>
            {oidcRequestDescription && (
              <ul>
                {oidcRequestDescription.scope.map((scope, index) => {
                  return (
                    <li key={index}>
                      <Typography variant="body1">{scope}</Typography>
                    </li>
                  )
                })}
              </ul>
            )}
            <div className="margin-top-20">
              <Typography variant="body1">
                By clicking <strong>Allow</strong>, you allow this app to use
                your information in accordance with their{' '}
                <Link
                  href={oauthClientInfo.tos_uri}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  terms of service
                </Link>{' '}
                and{' '}
                <Link
                  href={oauthClientInfo.policy_uri}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  privacy policy
                </Link>
                .
              </Typography>
            </div>
            <div className="text-align-right margin-top-40">
              <Button
                variant="outlined"
                onClick={onDeny}
                sx={{ marginRight: '10px' }}
              >
                Deny
              </Button>
              <Button variant="contained" color="primary" onClick={onConsent}>
                Allow
              </Button>
            </div>
          </StyledInnerContainer>
        )}
      {isLoading && loadingSpinner}
      {(!!twoFactorAuthSSOErrorResponse ||
        (!error &&
          !accessToken &&
          oauthClientInfo &&
          oauthClientInfo.verified &&
          oidcRequestDescription)) && (
        <Paper sx={{ width: '400px', py: 8, px: 4, margin: '0 auto' }}>
          <StandaloneLoginForm
            onBeginOAuthSignIn={() => {
              // save current route (so that we can go back here after SSO)
              AppUtils.preparePostSSORedirect()
            }}
            sessionCallback={() => {
              refreshSession().then(() => {
                AppUtils.redirectAfterSSO(history)
              })
            }}
            twoFactorAuthenticationRequired={twoFactorAuthSSOErrorResponse}
          />
          <SystemUseNotification maxWidth={'325px'} />
        </Paper>
      )}
      {error && (
        <FullWidthAlert
          variant="danger"
          title={error.name || 'Error'}
          description={`${'reason' in error ? error.reason + ': ' : ''}${
            error.message
          }`}
          isGlobal={false}
        />
      )}
    </StyledOuterContainer>
  )
}
