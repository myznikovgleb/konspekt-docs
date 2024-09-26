'use client'

import { CheckIcon } from '@heroicons/react/24/outline'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
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
})

type Feedback = z.infer<typeof FeedbackSchema>

type FeedbackFormState = 'edit' | 'pending' | 'fulfill'
type FeedbackFromError = { isError: boolean; message?: string }

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState<Feedback>({
    email: '',
    message: '',
  })
  const [state, setState] = useState<FeedbackFormState>('edit')
  const [error, setError] = useState<FeedbackFromError>({
    isError: true,
    message: 'Invalid email address',
  })

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
    <div className="card w-96 text-lg md:shadow-xl">
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
            className="input input-bordered text-lg focus:outline-none"
          />
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
            className="textarea textarea-bordered resize-none overflow-hidden text-lg focus:outline-none"
          />
        </div>
        {match(state)
          .with('edit', () => (
            <div
              className={clsx(error.isError && 'tooltip')}
              data-tip={error.message}
            >
              <button
                disabled={error.isError}
                type="submit"
                className="btn btn-primary btn-lg w-full"
              >
                <PaperAirplaneIcon className="size-6 rotate-180 stroke-[2.5]" />
                <span>Send</span>
              </button>
            </div>
          ))
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
