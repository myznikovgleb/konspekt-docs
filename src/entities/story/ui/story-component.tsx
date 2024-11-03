import {
  BoltIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MegaphoneIcon,
  RocketLaunchIcon,
  SparklesIcon,
  StarIcon,
} from '@heroicons/react/24/solid'
import * as Dialog from '@radix-ui/react-dialog'
import { clsx } from 'clsx'
import { match } from 'ts-pattern'

import { useStoryStore } from '../model'

import { StoryCard } from './story-card'

interface StoryComponentProps {
  id: string
  isOpened: boolean
}

const StoryComponent = (props: StoryComponentProps) => {
  const { id, isOpened } = props

  const { entities, play, stop, next, prev } = useStoryStore((state) => state)
  const { heading, content, icon, isViewed } = entities[id]

  const onOpenChange = (open: boolean) => {
    if (open) {
      play(id)
    } else {
      stop(id)
    }
  }

  const onProgress = () => {
    next(id)
  }

  const onNext = () => {
    next(id)
  }

  const onPrev = () => {
    prev(id)
  }

  return (
    <div className="cursor-pointer select-none">
      <div className="flex w-20 items-center justify-center md:w-28">
        <Dialog.Root open={isOpened} onOpenChange={onOpenChange}>
          <Dialog.Trigger asChild>
            <button className="rounded-full border-4 border-base-300/30 hover:border-base-300/70">
              <div
                className={clsx(
                  'size-16 rounded-full bg-gradient-to-tr from-yellow-300 to-orange-500 p-4',
                  isViewed && 'bg-base-300 bg-none'
                )}
              >
                {match(icon)
                  .with('bolt', () => (
                    <BoltIcon className="size-8 text-primary-content" />
                  ))
                  .with('megaphone', () => (
                    <MegaphoneIcon className="size-8 text-primary-content" />
                  ))
                  .with('rocket', () => (
                    <RocketLaunchIcon className="size-8 text-primary-content" />
                  ))
                  .with('star', () => (
                    <StarIcon className="size-8 text-primary-content" />
                  ))
                  .with('sparkles', () => (
                    <SparklesIcon className="size-8 text-primary-content" />
                  ))
                  .exhaustive()}
              </div>
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-base-100/50" />
            <Dialog.Content>
              <StoryCard
                heading={heading}
                content={content}
                onProgress={onProgress}
              />
              <button
                onClick={onPrev}
                className="btn btn-circle btn-ghost btn-lg fixed left-[20%] top-1/2 z-10 hidden bg-base-content/20 md:inline-flex"
              >
                <ChevronLeftIcon className="size-8 stroke-[2.5] text-base-100" />
              </button>
              <button
                onClick={onNext}
                className="btn btn-circle btn-ghost btn-lg fixed right-[20%] top-1/2 z-10 hidden bg-base-content/20 md:inline-flex"
              >
                <ChevronRightIcon className="size-8 stroke-[2.5] text-base-100" />
              </button>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  )
}

export { StoryComponent }
