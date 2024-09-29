import Link from 'next/link'

import { Section } from '@/src/shared/ui'

const HeroSection = () => {
  return (
    <Section>
      <div className="flex h-4/5 w-full flex-col items-center justify-center gap-32 bg-gradient-to-tr from-yellow-300 to-orange-500 md:h-2/3 md:w-4/5 md:gap-16 md:rounded-xl">
        <div className="flex w-full flex-col items-center justify-center gap-4 md:gap-8">
          <h1 className="text-4xl font-semibold text-primary-content md:text-6xl">
            Konspekt Docs
          </h1>
          <p className="text-2xl text-primary-content md:text-4xl">
            Documentation for{' '}
            <Link
              href="https://konspekt.vercel.app/"
              className="link rounded-lg hover:opacity-80"
            >
              Konspekt App
            </Link>
          </p>
        </div>
        <span className="text-8xl">📝</span>
      </div>
    </Section>
  )
}

export { HeroSection }
