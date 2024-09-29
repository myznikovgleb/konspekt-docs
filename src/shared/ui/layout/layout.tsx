import type { ReactNode } from 'react'

type LayoutProps = { children: ReactNode }

const Layout = (props: LayoutProps) => {
  const { children } = props

  return (
    <main className="flex w-screen flex-col items-center justify-center overflow-x-hidden">
      {children}
    </main>
  )
}

export { Layout }
