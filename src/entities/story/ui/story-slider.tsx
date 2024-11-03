'use client'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import useEmblaCarousel from 'embla-carousel-react'

import { useStoryStore } from '../model'

import { StoryComponent } from './story-component'

const StorySlider = () => {
  const { ids, activeStoryId } = useStoryStore((state) => state)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    slidesToScroll: 2,
  })

  const onPrevButtonPointerDown = () => {
    if (!emblaApi) {
      return
    }

    emblaApi.scrollPrev()
  }

  const onNextButtonPointerDown = () => {
    if (!emblaApi) {
      return
    }

    emblaApi.scrollNext()
  }

  return (
    <section className="flex items-center justify-center rounded-xl bg-base-200/20">
      <div className="hidden h-20 w-20 items-center justify-center rounded-full md:flex">
        <button onPointerDown={onPrevButtonPointerDown}>
          <div className="btn btn-circle btn-lg">
            <ChevronLeftIcon className="size-8 text-base-content" />
          </div>
        </button>
      </div>
      <div className="max-w-xs overflow-hidden py-2 md:max-w-md" ref={emblaRef}>
        <div className="flex">
          {ids.map((id) => (
            <StoryComponent key={id} id={id} isOpened={id === activeStoryId} />
          ))}
        </div>
      </div>
      <div className="hidden h-20 w-20 items-center justify-center rounded-full md:flex">
        <button onPointerDown={onNextButtonPointerDown}>
          <div className="btn btn-circle btn-lg">
            <ChevronRightIcon className="size-8 text-base-content" />
          </div>
        </button>
      </div>
    </section>
  )
}

export { StorySlider }
