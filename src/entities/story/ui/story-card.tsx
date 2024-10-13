import { MegaphoneIcon } from '@heroicons/react/24/solid'
import * as Dialog from '@radix-ui/react-dialog'
import { clsx } from 'clsx'

import type { Gradient } from '../model/story-model'

interface StoryCardProps {
  heading: string
  content: string
  gradient: Gradient
}

const StoryCard = (props: StoryCardProps) => {
  const { heading, content, gradient } = props

  return (
    <div className="cursor-pointer select-none">
      <div className="flex w-20 items-center justify-center md:w-28">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button
              className={clsx(
                'gradient-border flex size-16 items-center justify-center rounded-full border-4 border-primary-content/80 hover:border-primary-content/50',
                gradient
              )}
            >
              <div
                className={clsx(
                  'gradient flex size-14 items-center justify-center rounded-full',
                  gradient
                )}
              >
                <MegaphoneIcon className="size-8 text-primary-content" />
              </div>
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-base-100/50" />
            <Dialog.Content className="modal-box fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-0 focus:outline-none">
              <div
                className={clsx(
                  'gradient card-body h-96 text-primary-content',
                  gradient
                )}
              >
                <div className="flex flex-col gap-16">
                  <progress className="progress w-full" />
                  <Dialog.Title className="text-3xl font-semibold">
                    {heading}
                  </Dialog.Title>
                  <Dialog.Description className="text-xl">
                    {content}
                  </Dialog.Description>
                </div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  )
}

export { StoryCard }
