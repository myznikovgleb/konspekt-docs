'use client'

import axios from 'axios'
import { useState } from 'react'
import { match } from 'ts-pattern'
import { ZodError } from 'zod'

import { Section } from '@/src/shared/ui'

import { FeedbackSchema } from '../model'

import { FeedbackEmailInput } from './feedback-email-input'
import { FeedbackMessageTextarea } from './feedback-message-textarea'
import { FeedbackRateSlider } from './feedback-rate-slider'
import { FeedbackSubmitButton } from './feedback-submit-button'

import type { Feedback, FeedbackFormState, FeedbackFromError } from '../model'
import type { ApiFeedbackResponse } from '@/src/shared/api'
import type { ChangeEventHandler, FormEventHandler } from 'react'

const FeedbackSection = () => {
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

  const onChangeEvent: ChangeEventHandler<
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

  const onChangeValue = (value: number[]) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      rate: value[0],
    }))
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
    <Section>
      <div className="card w-full text-lg md:max-w-md md:shadow-lg md:shadow-base-300">
        <form onSubmit={onSubmit} className="card-body gap-6">
          <FeedbackEmailInput
            disabled={state !== 'edit'}
            value={feedback.email}
            onChange={onChangeEvent}
          />
          <FeedbackRateSlider
            disabled={state !== 'edit'}
            value={feedback.rate}
            onChange={onChangeValue}
          />
          <FeedbackMessageTextarea
            disabled={state !== 'edit'}
            value={feedback.message}
            onChange={onChangeEvent}
          />
          <FeedbackSubmitButton state={state} error={error} />
        </form>
      </div>
    </Section>
  )
}

export { FeedbackSection }
