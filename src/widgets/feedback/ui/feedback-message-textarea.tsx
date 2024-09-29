import type { ChangeEventHandler } from 'react'

interface FeedbackMessageTextareaProps {
  disabled: boolean
  value: string
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

const FeedbackMessageTextarea = (props: FeedbackMessageTextareaProps) => {
  const { disabled, value, onChange } = props

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="message" className="label cursor-pointer font-medium">
        Leave a message
      </label>
      <textarea
        id="message"
        placeholder="Great docs!"
        rows={4}
        required
        disabled={disabled}
        value={value}
        onChange={onChange}
        className="textarea textarea-bordered resize-none overflow-hidden text-lg"
      />
    </div>
  )
}

export { FeedbackMessageTextarea }
