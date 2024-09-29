'use client'

import { CheckIcon } from '@heroicons/react/24/outline'
import { PaperAirplaneIcon, StarIcon } from '@heroicons/react/24/solid'
import * as Slider from '@radix-ui/react-slider'
import * as Tooltip from '@radix-ui/react-tooltip'
import axios from 'axios'
import { clsx } from 'clsx'
import { useState } from 'react'
import { match } from 'ts-pattern'
import { z, ZodError } from 'zod'

import type { ApiFeedbackResponse } from '@/src/shared/api'
import type { ChangeEventHandler, FormEventHandler } from 'react'

const FeedbackSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  message: z.string().min(1, { message: 'Empty message' }),
  rate: z.number(),
})

type Feedback = z.infer<typeof FeedbackSchema>

type FeedbackFormState = 'edit' | 'pending' | 'fulfill'
type FeedbackFromError = { isError: boolean; message?: string }

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState<Feedback>({
    email: '',
    message: '',
    rate: 50,
  })
  const [state, setState] = useState<FeedbackFormState>('edit')
  const [error, setError] = useState<FeedbackFromError>({
    isError: true,
    message: 'Invalid email address',
  })
  const [isPing, setIsPing] = useState<boolean>(false)

  const onChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = ({ target }) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [target.id]: target.value,
    }))

    try {
      FeedbackSchema.parse({ ...feedback, [target.id]: target.value })

      if (error.isError) {
        setError({ isError: false })
      }
    } catch (e) {
      if (e instanceof ZodError) {
        setError({ isError: true, message: e.issues[0].message })
      }
    }
  }

  const onValueChange = (value: number[]) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      rate: value[0],
    }))
  }

  const onClick = () => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      rate: Math.min((Math.floor(prevFeedback.rate / 20) + 1) * 20, 99),
    }))

    if (!isPing) {
      setTimeout(() => {
        setIsPing(false)
      }, 500)
    }

    setIsPing(true)
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    setState('pending')

    axios({
      method: 'post',
      url: 'api/feedback',
      params: {
        email: feedback.email,
        message: feedback.message,
      },
    }).then((response) => {
      const data = response.data as ApiFeedbackResponse

      match(data.status)
        .with('success', () => {
          setState('fulfill')
        })
        .with('fail', () => {
          setState('fulfill')
        })
    })
  }

  return (
    <div className="card w-96 text-lg md:shadow-lg md:shadow-base-300">
      <form onSubmit={onSubmit} className="card-body gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="label cursor-pointer font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="off"
            placeholder="example@mail.com"
            required
            disabled={state !== 'edit'}
            value={feedback.email}
            onChange={onChange}
            className="input input-bordered text-lg"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="rate" className="label cursor-pointer font-medium">
            Rate Konspekt
          </label>
          <Slider.Root
            min={0}
            max={99}
            disabled={state !== 'edit'}
            value={[feedback.rate]}
            onValueChange={onValueChange}
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
            disabled={state !== 'edit'}
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
              {Math.floor(feedback.rate / 20) + 1}
            </span>
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="label cursor-pointer font-medium">
            Leave a message
          </label>
          <textarea
            id="message"
            placeholder="Great docs!"
            rows={4}
            required
            disabled={state !== 'edit'}
            value={feedback.message}
            onChange={onChange}
            className="textarea textarea-bordered resize-none overflow-hidden text-lg"
          />
        </div>
        {match(state)
          .with('edit', () =>
            error.isError ? (
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <div>
                      <button
                        type="submit"
                        disabled
                        className="btn btn-primary btn-lg w-full"
                      >
                        <PaperAirplaneIcon className="size-6 rotate-180 stroke-[2.5]" />
                        <span>Send</span>
                      </button>
                    </div>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className="select-none rounded-lg bg-base-100 px-4 py-2 text-base-content/80 shadow-lg shadow-base-300"
                      sideOffset={8}
                    >
                      {error.message}
                      <Tooltip.Arrow
                        className="fill-base-100"
                        width={16}
                        height={8}
                      />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            ) : (
              <button type="submit" className="btn btn-primary btn-lg w-full">
                <PaperAirplaneIcon className="size-6 rotate-180 stroke-[2.5]" />
                <span>Send</span>
              </button>
            )
          )
          .with('pending', () => (
            <div className="btn btn-primary btn-lg">
              <span className="loading loading-spinner loading-sm" />
              <span>Sending</span>
            </div>
          ))
          .with('fulfill', () => (
            <div className="btn btn-primary btn-lg">
              <CheckIcon className="size-6 stroke-[2.5]" />
              <span>Just sent</span>
            </div>
          ))
          .exhaustive()}
      </form>
    </div>
  )
}

export { FeedbackForm }
