import React, { useEffect } from 'react'
import { SynapseComponents, SynapseHookUtils } from 'synapse-react-client'

export type SurveyToastProps = {
  localStorageKey: string
  description: string
  surveyURL: string
  title?: string
  surveyButtonText?: string
}
const SurveyToast = (props: SurveyToastProps) => {
  const {
    localStorageKey,
    title = '',
    description,
    surveyURL,
    surveyButtonText = 'Take The Survey',
  } = props
  const [cookiePreferences] = SynapseHookUtils.useCookiePreferences()
  const [showBanner, setShowBanner] = React.useState(false)

  useEffect(() => {
    if (localStorage.getItem(localStorageKey) === null) {
      setShowBanner(true)
    }
  }, [])

  return !showBanner ? (
    <></>
  ) : (
    <SynapseComponents.FullWidthAlert
      isGlobal={true}
      onClose={() => {
        if (cookiePreferences.functionalAllowed) {
          localStorage.setItem(localStorageKey, 'true')
        }
        setShowBanner(false)
      }}
      variant={'info'}
      show={true}
      description={description}
      title={title}
      primaryButtonConfig={{
        text: surveyButtonText,
        href: surveyURL,
      }}
    />
  )
}

export default SurveyToast
