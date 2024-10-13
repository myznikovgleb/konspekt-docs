import type { ReactNode } from 'react'

type LayoutProps = { children: ReactNode }

const Layout = (props: LayoutProps) => {
  const { children } = props

  return (
    <main className="flex w-full flex-col items-center justify-center">
      {children}
    </main>
  )
}

export { Layout }
