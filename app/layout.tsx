import { StoryStoreProvider } from '@/src/entities/story'

import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import './globals.css'

const title = 'Konspekt Docs'
const description = 'Konspekt Docs developed by Gleb Myznikov'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
}

interface LayoutProps {
  children: ReactNode
}

export default function Layout(props: LayoutProps) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <StoryStoreProvider>{children}</StoryStoreProvider>
      </body>
    </html>
  )
}
