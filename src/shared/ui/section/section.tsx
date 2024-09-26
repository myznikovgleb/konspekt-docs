import type { ReactNode } from 'react'

type SectionProps = { children: ReactNode }

const Section = (props: SectionProps) => {
  const { children } = props

  return (
    <section className="flex h-screen w-screen flex-col items-center justify-center">
      {children}
    </section>
  )
}

export { Section }
