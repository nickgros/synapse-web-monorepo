import { RouteObject } from 'react-router'

function convert(m: any) {
  let { clientLoader, clientAction, default: Component, ...rest } = m
  return {
    ...rest,
    loader: clientLoader,
    action: clientAction,
    Component,
  }
}

export const explorePageRoutes: RouteObject[] = [
  {
    path: 'Programs',
    lazy: () => import('@/pages/Explore/programs').then(convert),
  },
  {
    path: 'Projects',
    lazy: () => import('@/pages/Explore/projects').then(convert),
  },
  {
    path: 'Studies',
    lazy: () => import('@/pages/Explore/studies').then(convert),
  },
  {
    path: 'Data',
    lazy: () => import('@/pages/Explore/data').then(convert),
  },
  {
    path: 'Publications',
    lazy: () => import('@/pages/Explore/publications').then(convert),
  },
  {
    path: 'People',
    lazy: () => import('@/pages/Explore/people').then(convert),
  },
  {
    path: 'Experimental Models',
    lazy: () => import('@/pages/Explore/experimental_models').then(convert),
  },
  {
    path: 'Computational Tools',
    lazy: () => import('@/pages/Explore/computational_tools').then(convert),
  },
  {
    path: 'Target Enabling Resources',
    lazy: () =>
      import('@/pages/Explore/target_enabling_resources').then(convert),
  },
  {
    path: 'Results',
    lazy: () => import('@/pages/Explore/results').then(convert),
  },
]
