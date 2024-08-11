import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import './globals.css'

export const metadata: Metadata = {
  title: 'Konspekt docs',
  description: 'Konspekt docs developed by Gleb Myznikov',
}

interface LayoutProps {
  children: ReactNode
}

export default function Layout(props: LayoutProps) {
  const { children } = props

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
