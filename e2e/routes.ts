export type CoreRoute = {
  name: string
  path: string
  navigationLabel?: string
}

export const coreRoutes: readonly CoreRoute[] = [
  { name: 'home', path: '/' },
  { name: 'work-index', path: '/case-studies', navigationLabel: 'Work' },
  { name: 'case-study', path: '/case-studies/biznetworkpro' },
  { name: 'writing-index', path: '/posts', navigationLabel: 'Writing' },
  {
    name: 'article',
    path: '/posts/laravel-starter-kits-build-automation',
  },
  { name: 'resume', path: '/resume', navigationLabel: 'Resume' },
  { name: 'contact', path: '/contact', navigationLabel: 'Contact' },
]
