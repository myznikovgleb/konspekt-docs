import { XMarkIcon } from '@heroicons/react/24/solid'
import * as Dialog from '@radix-ui/react-dialog'
import * as Progress from '@radix-ui/react-progress'
import { useState } from 'react'

import { useInterval } from '@/src/shared/lib'

interface StoryCardProps {
  heading: string
  content: string
  onProgress: () => void
}

const StoryCard = (props: StoryCardProps) => {
  const { heading, content, onProgress } = props

  const [progress, setProgress] = useState(0)

  useInterval(
    () => {
      const nextProgress = progress + 1 / 16

      setProgress(nextProgress)

      if (nextProgress < 100) {
        return
      }

      onProgress()
    },
    progress < 100 ? 10 : null
  )

  return (
    <div className="fixed left-1/2 top-1/2 z-10 h-full w-full -translate-x-1/2 -translate-y-1/2 p-0 focus:outline-none md:h-[42rem] md:max-h-full md:w-[28rem]">
      <div className="flex h-full w-full flex-col bg-gradient-to-tr from-yellow-300 to-orange-500 p-8 text-primary-content md:rounded-md md:shadow-lg">
        <div className="flex h-1/2 w-full flex-col gap-4">
          <Progress.Root
            className="h-2 w-full overflow-hidden rounded-full bg-base-100/50"
            style={{
              transform: 'translateZ(0)',
            }}
            value={progress}
          >
            <Progress.Indicator
              className="size-full bg-base-100"
              style={{ transform: `translateX(-${100 - progress}%)` }}
            />
          </Progress.Root>
          <div className="flex w-full flex-col items-end">
            <Dialog.Close asChild>
              <button className="btn btn-circle btn-ghost bg-base-content/20 md:btn-lg md:bg-transparent">
                <XMarkIcon className="size-8 stroke-[2.5] text-base-100" />
              </button>
            </Dialog.Close>
          </div>
        </div>
        <div className="flex h-1/2 w-full flex-col items-start gap-8 whitespace-pre-line py-16">
          <Dialog.Title className="text-4xl font-semibold">
            {heading}
          </Dialog.Title>
          <Dialog.Description className="text-2xl">
            {content}
          </Dialog.Description>
        </div>
      </div>
    </div>
  )
}

export { StoryCard }
