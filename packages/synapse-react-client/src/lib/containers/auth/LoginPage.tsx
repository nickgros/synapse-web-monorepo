import * as React from 'react'
import { Box, Stack, Typography, useTheme } from '@mui/material'
import { LeftRightPanel } from '../LeftRightPanel'
import useShowDesktop from '../../utils/hooks/useShowDesktop'
import LoginFlowBackButton from './LoginFlowBackButton'
import useLogin from '../../utils/hooks/useLogin'
import LoginForm from './LoginForm'

export type LoginPageProps = {
  ssoRedirectUrl?: string
  sessionCallback: () => void // Callback is invoked after login
}

function LoginPage(props: LoginPageProps) {
  const { ssoRedirectUrl, sessionCallback } = props
  const showDesktop = useShowDesktop(910)
  const theme = useTheme()

  const {
    step,
    onStepChange,
    submitUsernameAndPassword,
    submitOneTimePassword,
    errorMessage,
  } = useLogin(sessionCallback)

  const loginForm = (
    <Stack
      justifyContent={'center'}
      alignItems={'stretch'}
      sx={{ height: '100%', width: '325px', margin: 'auto' }}
    >
      {!showDesktop && (
        <Stack flexDirection={'row'}>
          <LoginFlowBackButton
            step={step}
            onStepChange={onStepChange}
            sx={
              {
                // position: 'relative',
                // top: '10px',
                // left: '10px',
              }
            }
          />
        </Stack>
      )}

      <Box
        sx={{
          mb: 4,
          textAlign: 'center',
          maxWidth: '90vw',
        }}
      >
        <img
          alt={'Synapse logo'}
          src={
            'https://s3.amazonaws.com/static.synapse.org/images/synapse-logo-blue.svg'
          }
        />
        {!showDesktop && (
          <Typography
            className={'panel-tagline'}
            sx={{
              textAlign: 'center',
              display: 'block',
              margin: '6px auto 0',
              font: 'normal 16px/26px Lato, sans-serif',
            }}
          >
            Organize. Get credit. Collaborate.
          </Typography>
        )}
      </Box>
      <LoginForm
        ssoRedirectUrl={ssoRedirectUrl}
        step={step}
        onStepChange={onStepChange}
        submitUsernameAndPassword={submitUsernameAndPassword}
        submitOneTimePassword={submitOneTimePassword}
        errorMessage={errorMessage}
      />
    </Stack>
  )

  if (showDesktop) {
    return (
      <LeftRightPanel
        leftContent={
          <>
            <Box sx={{ p: '60px 72px', height: '100%', position: 'relative' }}>
              <LoginFlowBackButton
                step={step}
                onStepChange={onStepChange}
                sx={{
                  position: 'absolute',
                  top: theme.spacing(2),
                  left: theme.spacing(2),
                }}
              />
              {loginForm}
            </Box>
          </>
        }
        rightContent={
          <Stack
            className={'panel-tagline'}
            justifyContent={'center'}
            alignItems={'stretch'}
            sx={{
              height: '100%',
              background:
                "url('https://s3.amazonaws.com/static.synapse.org/images/login-panel-bg.svg') no-repeat right bottom 20px",
            }}
          >
            <Box
              sx={{
                px: 4,
                pb: 10,
                color: '#1e4964',
                font: '300 24px/34px Lato, sans-serif',
              }}
            >
              <strong>Organize</strong> your digital research assets.
              <br />
              <strong>Get credit</strong> for your research.
              <br />
              <strong>Collaborate</strong> with your colleagues and the public.
            </Box>
          </Stack>
        }
      />
    )
  } else {
    return (
      <Box
        sx={{
          px: 0,
          py: 12,
          background:
            "#fff url('https://s3.amazonaws.com/static.synapse.org/images/SynapseMobileLogInFull.svg') 50% 50%",
          backgroundSize: 'contain',
        }}
      >
        {loginForm}
      </Box>
    )
  }
}
export default LoginPage
