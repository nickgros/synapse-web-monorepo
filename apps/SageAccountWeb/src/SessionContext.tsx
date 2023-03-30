import React, { useContext } from 'react'

export type SessionContextType = {
  refreshSession: () => void
}

const SessionContext = React.createContext<SessionContextType | undefined>(
  undefined,
)

export type SessionContextProviderProps = React.PropsWithChildren<{
  context: SessionContextType
}>

export function SessionContextProvider(props: SessionContextProviderProps) {
  const { context, children } = props
  return (
    <SessionContext.Provider value={context}>
      {children}
    </SessionContext.Provider>
  )
}

export const SessionContextConsumer = SessionContext.Consumer

export function useSessionContext(): SessionContextType {
  const context = useContext(SessionContext)
  if (context === undefined) {
    throw new Error(
      'SessionContext must be used within a SessionContextProvider',
    )
  }
  return context
}
