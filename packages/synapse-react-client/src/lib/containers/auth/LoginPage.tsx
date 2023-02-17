import * as React from 'react'
import Login from './Login'
import IconSvg from '../IconSvg'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { LeftRightPanel } from '../LeftRightPanel'
import useShowDesktop from '../../utils/hooks/useShowDesktop'

export type LoginPageProps = {
  ssoRedirectUrl?: string
  sessionCallback: () => void // Callback is invoked after login
}

function LoginPage(props: LoginPageProps) {
  const { ssoRedirectUrl, sessionCallback } = props
  const showDesktop = useShowDesktop(910)

  const [isOnUsernameOrPasswordScreen, setIsOnUsernameOrPasswordScreen] =
    React.useState<boolean>(false)

  const loginForm = (
    <Stack
      justifyContent={'center'}
      alignItems={'stretch'}
      sx={{ height: '100%' }}
    >
      {isOnUsernameOrPasswordScreen && (
        <IconButton
          onClick={() => setIsOnUsernameOrPasswordScreen(false)}
          sx={{
            p: 0,
            width: '24px',
            position: 'absolute',
            top: '10px',
            left: '10px',
          }}
        >
          <IconSvg icon="arrowBack" wrap={false} />
        </IconButton>
      )}
      <Box
        sx={{
          textAlign: 'center',
        }}
      >
        <img
          alt={'Synapse logo'}
          src={
            'https://s3.amazonaws.com/static.synapse.org/images/synapse-logo-blue.svg'
          }
          style={{ maxWidth: '90vw' }}
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
      <Login
        ssoRedirectUrl={ssoRedirectUrl}
        sessionCallback={sessionCallback}
        renderBackButton={false}
        handleIsOnUsernameOrPasswordScreen={setIsOnUsernameOrPasswordScreen}
        showUsernameOrPassword={isOnUsernameOrPasswordScreen}
      />
    </Stack>
  )

  if (showDesktop) {
    return (
      <LeftRightPanel
        leftContent={
          <Box sx={{ p: '60px 72px', height: '100%' }}>{loginForm}</Box>
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
