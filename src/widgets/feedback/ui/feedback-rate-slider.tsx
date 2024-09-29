import { StarIcon } from '@heroicons/react/24/solid'
import * as Slider from '@radix-ui/react-slider'
import { clsx } from 'clsx'
import { useState } from 'react'

interface FeedbackRateSliderProps {
  disabled: boolean
  value: number
  onChange: (value: number[]) => void
}

const FeedbackRateSlider = (props: FeedbackRateSliderProps) => {
  const { disabled, value, onChange } = props

  const [isPing, setIsPing] = useState<boolean>(false)

  const onClick = () => {
    onChange([Math.min((Math.floor(value / 20) + 1) * 20, 99)])

    if (!isPing) {
      setTimeout(() => {
        setIsPing(false)
      }, 500)
    }

    setIsPing(true)
  }

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="rate" className="label cursor-pointer font-medium">
        Rate Konspekt
      </label>
      <Slider.Root
        min={0}
        max={99}
        disabled={disabled}
        value={[value]}
        onValueChange={onChange}
        className="relative flex h-16 w-full cursor-pointer touch-none select-none items-center"
      >
        <Slider.Track className="relative h-2 grow rounded-full bg-base-200">
          <Slider.Range className="absolute h-full rounded-full bg-primary" />
        </Slider.Track>
        <Slider.Thumb className="block size-6 rounded-full border border-base-200 bg-base-100 shadow-lg shadow-base-300 duration-150 ease-in hover:scale-110" />
      </Slider.Root>
      <button
        type="button"
        id="rate"
        onClick={onClick}
        disabled={disabled}
        className="btn self-center rounded-full"
      >
        <span className="relative flex size-8">
          <StarIcon
            className={clsx(
              'absolute inline-flex text-primary',
              isPing && 'animate-ping duration-500'
            )}
          />
          <StarIcon className="relative inline-flex text-primary" />
        </span>
        <span className="w-4 cursor-pointer text-xl font-medium">
          {Math.floor(value / 20) + 1}
        </span>
      </button>
    </div>
  )
}

export { FeedbackRateSlider }
