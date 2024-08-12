import React from 'react'
import { useGetAllDownloadListActionsRequired } from '../../synapse-queries'
import { LoadingActionRequiredCard } from './ActionRequiredCard/ActionRequiredCard'
import { Box } from '@mui/material'
import { ActionRequiredListItem } from './ActionRequiredListItem'
import useTrackTransientListItems from '../../utils/hooks/useTrackTransientListItems'
import { times } from 'lodash-es'

export function DownloadListActionsRequired() {
  // This component will track all completed actions, based on which actions are omitted from the ActionsRequiredResponse as the user performs required tasks
  // For accurate tracking, we must make sure we have all data. So we will fetch all pages instead of one page at a time.
  const { data: currentActionsRequired, isLoading } =
    useGetAllDownloadListActionsRequired({
      throwOnError: true,
    })

  // PORTALS-2950 - Keep a record of actions that disappear from the server response - i.e. the 'completed' actions
  const allCompleteAndIncompleteActions = useTrackTransientListItems(
    currentActionsRequired,
  )

  return (
    <>
      <Box sx={{ pt: 5 }} display="flex" flexDirection="column" gap={3}>
        {allCompleteAndIncompleteActions.map((item, index) => {
          if (item) {
            return (
              <ActionRequiredListItem
                key={index}
                action={item.action}
                count={item.count}
              />
            )
          } else return false
        })}
        {isLoading && times(3).map(k => <LoadingActionRequiredCard key={k} />)}
      </Box>
    </>
  )
}
