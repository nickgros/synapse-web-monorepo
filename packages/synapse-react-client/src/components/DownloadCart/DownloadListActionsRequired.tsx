import React from 'react'
import { useGetAllDownloadListActionsRequired } from '../../synapse-queries'
import { LoadingActionRequiredCard } from './ActionRequiredCard/ActionRequiredCard'
import { Box } from '@mui/material'
import { ActionRequiredListItem } from './ActionRequiredListItem'
import useTrackCompletedActions from './useTrackCompletedActions'
import { times } from 'lodash-es'

export type DownloadListActionsRequiredProps = {
  /** Invoked when a user clicks "View Sharing Settings" for a set of files that require the Download permission*/
  onViewSharingSettingsClicked?: (benefactorId: string) => void
}

export function DownloadListActionsRequired(
  props: DownloadListActionsRequiredProps,
) {
  const { onViewSharingSettingsClicked } = props

  // This component will track all completed actions, based on which actions are omitted from the ActionsRequiredResponse as the user performs required tasks
  // For accurate tracking, we must make sure we have all data. So we will fetch all pages instead of one page at a time.
  const { data: currentActionsRequired, isLoading } =
    useGetAllDownloadListActionsRequired({
      throwOnError: true,
    })

  const allCompleteAndIncompleteActions = useTrackCompletedActions(
    currentActionsRequired || [],
  )

  return (
    <>
      <Box sx={{ pt: 5 }} display="flex" flexDirection="column" gap={3}>
        {allCompleteAndIncompleteActions.map(
          ({ actionRequiredCount: item, isComplete }, index) => {
            if (item) {
              return (
                <ActionRequiredListItem
                  key={index}
                  action={item.action}
                  count={item.count}
                  isComplete={isComplete}
                  onViewSharingSettingsClicked={onViewSharingSettingsClicked}
                />
              )
            } else return false
          },
        )}
        {isLoading && times(3).map(k => <LoadingActionRequiredCard key={k} />)}
      </Box>
    </>
  )
}
