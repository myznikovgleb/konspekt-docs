import { MegaphoneIcon } from '@heroicons/react/24/solid'
import * as Dialog from '@radix-ui/react-dialog'
import { clsx } from 'clsx'
import { useState } from 'react'

import { StoryCard } from './story-card'

import type { Gradient } from '../model/story-model'

interface StoryComponentProps {
  heading: string
  content: string
  gradient: Gradient
  isViewed: boolean
  view: () => void
}

const StoryComponent = (props: StoryComponentProps) => {
  const { heading, content, gradient, isViewed, view } = props

  const [open, setOpen] = useState<boolean>(false)

  const onProgress = () => {
    setOpen(false)
    view()
  }

  return (
    <div className="cursor-pointer select-none">
      <div className="flex w-20 items-center justify-center md:w-28">
        <Dialog.Root
          open={open}
          onOpenChange={(open) => {
            setOpen(open)
          }}
        >
          <Dialog.Trigger asChild>
            <button
              className={clsx(
                'gradient-border flex size-16 items-center justify-center rounded-full border-4 border-primary-content/80 hover:border-primary-content/50',
                gradient,
                isViewed && 'mono'
              )}
            >
              <div
                className={clsx(
                  'gradient flex size-14 items-center justify-center rounded-full',
                  gradient,
                  isViewed && 'mono'
                )}
              >
                <MegaphoneIcon className="size-8 text-primary-content" />
              </div>
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-base-100/50" />
            <Dialog.Content className="modal-box fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-0 focus:outline-none">
              <StoryCard
                heading={heading}
                content={content}
                gradient={gradient}
                onProgress={onProgress}
              />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  )
}

export { StoryComponent }
