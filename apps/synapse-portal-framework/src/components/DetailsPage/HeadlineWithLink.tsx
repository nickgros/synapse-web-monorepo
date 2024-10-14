import { Box, Skeleton, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import { HelpPopover, IconSvg, SynapseQueries } from 'synapse-react-client'

export function HeadlineWithLinkDerivedFromEntityId(props: {
  title: string
  id: string
  helpText?: string
}) {
  const { data: entityHeader, isLoading } = SynapseQueries.useGetEntityHeader(
    props.id,
  )

  if (isLoading) {
    return <Skeleton width={300} />
  }
  return (
    <HeadlineWithLink
      {...props}
      title={`${props.title}: ${entityHeader?.name}`}
    />
  )
}

export function HeadlineWithLink(props: {
  title: string
  id: string
  helpText?: string
}) {
  const { title, id, helpText } = props
  const [showLink, setShowLink] = useState(false)
  const [copied, setCopied] = useState(false)
  return (
    <div
      onMouseOver={() => {
        setShowLink(true)
      }}
      onMouseOut={() => {
        setShowLink(false)
      }}
    >
      <Typography variant="sectionTitle" role="heading">
        {title}
        {helpText && (
          <Box sx={{ fontSize: '14px', display: 'inline-block', ml: '5px' }}>
            <HelpPopover markdownText={helpText} />
          </Box>
        )}
        <span
          style={{
            position: 'absolute',
            marginTop: '-1px',
            ...(showLink ? { display: 'inline' } : { display: 'none' }),
          }}
        >
          <Tooltip
            title={copied ? 'Copied' : 'Copy link to section'}
            placement="right"
          >
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => {
                const urlWithoutHash = window.location.href.replace(
                  window.location.hash,
                  '',
                )
                const url = `${urlWithoutHash}#${id}`
                navigator.clipboard.writeText(url).then(() => {
                  setCopied(true)
                })
              }}
            >
              <IconSvg icon="link" wrap={false} sx={{ pl: 1 }} />
            </div>
          </Tooltip>
        </span>
      </Typography>
    </div>
  )
}
