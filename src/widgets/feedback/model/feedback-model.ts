import { z } from 'zod'

const FeedbackSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  message: z.string().min(1, { message: 'Empty message' }),
  rate: z.number(),
})

type Feedback = z.infer<typeof FeedbackSchema>

type FeedbackFormState = 'edit' | 'pending' | 'fulfill'
type FeedbackFromError = { isError: boolean; message?: string }

export type { Feedback, FeedbackFormState, FeedbackFromError }

export { FeedbackSchema }
