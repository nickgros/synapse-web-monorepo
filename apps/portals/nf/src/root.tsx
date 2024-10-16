import React from 'react'
import {
  Scripts,
  Outlet,
  ScrollRestoration,
  LinksFunction,
  Meta,
  Links,
  MetaFunction,
} from 'react-router'
import styles from './App.scss?url'
import favicon from '/favicon.svg?url'
// KaTeX CSS is not included in the SRC style bundle since it includes many large font files.
import katexStyles from 'katex/dist/katex.css?url'
export const links: LinksFunction = () => {
  return [
    {
      rel: 'shortcut icon',
      href: favicon,
    },
    {
      rel: 'stylesheet',
      href: styles,
    },
    {
      rel: 'stylesheet',
      href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
      integrity:
        'sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'stylesheet',
      href: katexStyles,
    },
  ]
}

export const meta: MetaFunction = () => [
  {
    charSet: 'utf-8',
  },
]

export default function Root() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
