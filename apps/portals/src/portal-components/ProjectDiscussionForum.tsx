import * as React from 'react'
import {
  DiscussionThread,
  ForumPage,
  SynapseQueries,
  SynapseUtilityFunctions,
} from 'synapse-react-client'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, IconButton } from '@mui/material'

const ProjectDiscussionForum = () => {
  const urlSearchParams = new URLSearchParams(window.location.search)
  const entityId = urlSearchParams.get('id') ?? ''
  const threadIdSearchParamKey: string =
    SynapseUtilityFunctions.getIgnoredQueryFilterSearchParamKey(
      'threadId',
      'forum',
    )
  const threadId = urlSearchParams.get(threadIdSearchParamKey) ?? ''
  const location = useLocation()
  const navigate = useNavigate()
  const { data: forum } = SynapseQueries.useGetEntityForum(entityId)
  const updateThreadId = (threadId?: string) => {
    const searchParams = new URLSearchParams(location.search)
    if (threadId) {
      searchParams.append(threadIdSearchParamKey, threadId)
    } else {
      searchParams.delete(threadIdSearchParamKey)
    }
    navigate(
      {
        pathname: location.pathname,
        search: searchParams.toString(),
      },
      { replace: true },
    )
  }
  if (threadId) {
    return (
      <Box>
        <IconButton
          onClick={() => {
            updateThreadId()
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <DiscussionThread threadId={threadId} limit={20} />
      </Box>
    )
  } else if (forum && forum.id) {
    return (
      <ForumPage
        forumId={forum.id}
        limit={20}
        onClickLink={(threadId) => {
          updateThreadId(threadId)
        }}
      />
    )
  } else {
    return <></>
  }
}

export default ProjectDiscussionForum
