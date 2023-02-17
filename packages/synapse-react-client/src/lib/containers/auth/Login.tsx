import React from 'react'
import { useState } from 'react'
import { SynapseClient } from '../../utils'
import {
  BackendDestinationEnum,
  getEndpoint,
} from '../../utils/functions/getEndpoint'
import { GoogleIcon24 } from '../../assets/GoogleIcon24'
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Link,
  TextField,
  useTheme,
} from '@mui/material'
import IconSvg from '../IconSvg'
import FullWidthAlert from '../FullWidthAlert'
import useLogin from '../../utils/hooks/useLogin'
import { SynapseClientError } from '../../utils/SynapseClientError'
import { MuiOtpInput } from 'mui-one-time-password-input'
import { TwoFactorAuthErrorResponse } from '../../utils/synapseTypes/ErrorResponse'
import { useState } from 'react'
import { SynapseClientError } from '../../utils/SynapseClientError'
import useLogin from '../../utils/hooks/useLogin'
import { TwoFactorAuthErrorResponse } from '../../utils/synapseTypes/ErrorResponse'
import TOTPForm from './TOTPForm'

export const PROVIDERS = {
  GOOGLE: 'GOOGLE_OAUTH_2_0',
  ORCID: 'ORCID',
}

type Props = {
  ssoRedirectUrl?: string
  sessionCallback: () => void // Callback is invoked after login
  registerAccountUrl?: string
  resetPasswordUrl?: string
  /* Invoked before redirecting to Google. Useful in portals where we may want to store the current URL to redirect back here. */
  onBeginOAuthSignIn?: () => void
  handleIsOnUsernameOrPasswordScreen?: React.Dispatch<
    React.SetStateAction<boolean>
  >
  showUsernameOrPassword?: boolean | undefined
  renderBackButton?: boolean
  /* optionally pass the 2FA error response to directly start the 2FA challenge */
  twoFactorAuthenticationRequired?: TwoFactorAuthErrorResponse
}

/**
 *  Demo of user session, show login screen and handling user login submission.
 *
 *  To support Google SSO in your portal, you must add your domain to the Authorized Redirect URIs
 *  for Synapse authentication.
 *  This can be done by visiting https://sagebionetworks.jira.com/servicedesk/customer/portal/9 to set up a collaboration.
 *  Synapse engineers must add your redirect URL in the Google API console found at https://console.cloud.google.com/ for this functionality to work.
 */
function Login(props: Props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const {
    ssoRedirectUrl,
    sessionCallback,
    registerAccountUrl = `${getEndpoint(
      BackendDestinationEnum.PORTAL_ENDPOINT,
    )}#!RegisterAccount:0`,
    resetPasswordUrl = `${getEndpoint(
      BackendDestinationEnum.PORTAL_ENDPOINT,
    )}#!PasswordReset:0`,
  } = props

  const {
    step,
    setStep,
    submitUsernameAndPassword,
    submitOneTimePassword,
    errorMessage,
  } = useLogin(sessionCallback, props.twoFactorAuthenticationRequired)

  const renderBackButton =
    props.renderBackButton &&
    (step === 'USERNAME_PASSWORD' || step === 'VERIFICATION_CODE')

  const { palette } = useTheme()

  /**
   * Handle user login on click
   */
  async function handleLogin(clickEvent: React.FormEvent<HTMLElement>) {
    clickEvent.preventDefault() // avoid page refresh
    await submitUsernameAndPassword(username, password)
  }

  function onGoogleSignIn(event: React.MouseEvent<HTMLButtonElement>) {
    if (props.onBeginOAuthSignIn) {
      props.onBeginOAuthSignIn()
    }

    event.preventDefault()
    const redirectUrl = ssoRedirectUrl
      ? `${ssoRedirectUrl}${PROVIDERS.GOOGLE}`
      : `${SynapseClient.getRootURL()}?provider=${PROVIDERS.GOOGLE}`
    SynapseClient.oAuthUrlRequest(PROVIDERS.GOOGLE, redirectUrl)
      .then(data => {
        // Send the user to the authorization URL
        window.location = data.authorizationUrl as unknown as Location
      })
      .catch((err: SynapseClientError) => {
        console.log('Error on oAuth url ', err)
      })
  }

  return (
    <Box
      id="loginPage"
      className="LoginComponent"
      sx={{
        width: '325px',
        p: 0,
        m: 0,
        bgColor: 'transparent',
      }}
    >
      {renderBackButton && (
        <IconButton
          type="button"
          onClick={() =>
            setStep(currentStep => {
              switch (currentStep) {
                case 'CHOOSE_AUTH_METHOD':
                  // Should never happen
                  return 'CHOOSE_AUTH_METHOD'
                case 'USERNAME_PASSWORD':
                  return 'CHOOSE_AUTH_METHOD'
                case 'VERIFICATION_CODE':
                  return 'USERNAME_PASSWORD'
                case 'RECOVERY_CODE':
                  return 'VERIFICATION_CODE'
                case 'LOGGED_IN':
                  // Should never happen
                  return 'LOGGED_IN'
              }
            })
          }
          sx={{
            p: 0,
            mb: 1,
            width: '24px',
          }}
        >
          <IconSvg icon="arrowBack" wrap={false} />
        </IconButton>
      )}
      {step == 'CHOOSE_AUTH_METHOD' && (
        <Box>
          <form>
            <Button
              fullWidth
              variant="contained"
              color="neutral"
              onClick={onGoogleSignIn}
              sx={{
                height: '50px',
                mb: '10px',
              }}
              startIcon={
                <GoogleIcon24 sx={{ width: '28px', height: '28px' }} />
              }
            >
              Sign in with Google
            </Button>
          </form>
          <Button
            fullWidth
            variant="contained"
            color="neutral"
            startIcon={
              <IconSvg icon="email" sx={{ width: '28px', height: '28px' }} />
            }
            sx={{
              height: '50px',
              mb: '10px',
            }}
            onClick={() => setStep('USERNAME_PASSWORD')}
          >
            Sign in with your email
          </Button>
        </Box>
      )}
      {step === 'USERNAME_PASSWORD' && (
        <FormControl
          fullWidth
          sx={{
            '& .MuiTextField-root': { my: 1 },
          }}
          onSubmit={e => {
            handleLogin(e)
          }}
        >
          <TextField
            required
            fullWidth
            autoComplete="username"
            label="Username or Email Address"
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            sx={{
              '.MuiInputBase-root': {
                background: palette.background.default,
              },
            }}
          />
          <TextField
            required
            fullWidth
            autoComplete="current-password"
            label="Password"
            id="current-password"
            name="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            sx={{
              '.MuiInputBase-root': {
                background: palette.background.default,
              },
            }}
          />
          <Link href={resetPasswordUrl}>Forgot password?</Link>
          <Button
            fullWidth
            type="submit"
            color="primary"
            variant="contained"
            sx={{
              height: '50px',
              mt: 4,
              mb: 2,
            }}
            onClick={e => {
              handleLogin(e)
            }}
          >
            Sign in
          </Button>
        </FormControl>
      )}
        {step === 'VERIFICATION_CODE' && (
            <TOTPForm
                onSubmit={totp => {
                    submitOneTimePassword(totp)
                }}
            />
        )}

      {(step === 'CHOOSE_AUTH_METHOD' || step === 'USERNAME_PASSWORD') && (
        <div className={'SRC-center-text'}>
          <Link href={registerAccountUrl}>
            Don&apos;t have an account? Create one now
          </Link>
        </div>
      )}
      {errorMessage && (
        <FullWidthAlert
          variant={'warning'}
          isGlobal={false}
          description={errorMessage}
        />
      )}
    </Box>
  )
}
export default Login
