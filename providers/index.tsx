'use client'

import { ThemeProvider } from './theme-provider'
import { ToasterProvider } from './toaster-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
      <ToasterProvider />
    </ThemeProvider>
  )
}
