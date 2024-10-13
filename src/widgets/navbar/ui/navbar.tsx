import {
  ArrowDownCircleIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

import { StorySlider } from '@/src/entities/story'

const Navbar = () => {
  return (
    <section className="fixed top-0 z-10 flex w-full flex-col gap-1 rounded-b-md bg-base-100 px-4 py-1 shadow shadow-base-200">
      <div className="navbar hidden min-h-8 justify-between p-0 md:flex">
        <div className="w-32" />
        <Link href="/" className="btn btn-xs w-32">
          <ArrowDownCircleIcon className="size-4" />
          <span>Konspekt Docs</span>
        </Link>
        <Link href="https://konspekt.vercel.app/" className="btn btn-xs w-32">
          <ArrowTopRightOnSquareIcon className="size-4" />
          <span>Konspekt App</span>
        </Link>
      </div>
      <StorySlider />
    </section>
  )
}

export { Navbar }
