import * as Dialog from '@radix-ui/react-dialog'
import * as Progress from '@radix-ui/react-progress'
import { clsx } from 'clsx'
import { useEffect, useState } from 'react'

import type { Gradient } from '../model/story-model'

interface StoryCardProps {
  heading: string
  content: string
  gradient: Gradient
  onProgress: () => void
}

const StoryCard = (props: StoryCardProps) => {
  const { heading, content, gradient, onProgress } = props

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress === 100) {
        clearInterval(timer)
        onProgress()
      }

      setProgress((prevProgress) => Math.min(prevProgress + 1, 100))
    }, 10)

    return () => clearInterval(timer)
  }, [progress, onProgress])

  return (
    <div
      className={clsx('gradient card-body h-96 text-primary-content', gradient)}
    >
      <div className="flex flex-col gap-16">
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
        <Dialog.Title className="text-3xl font-semibold">
          {heading}
        </Dialog.Title>
        <Dialog.Description className="text-xl">{content}</Dialog.Description>
      </div>
    </div>
  )
}

export { StoryCard }
