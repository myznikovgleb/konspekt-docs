import type { ChangeEventHandler } from 'react'

interface FeedbackEmailInputProps {
  disabled: boolean
  value: string
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

const FeedbackEmailInput = (props: FeedbackEmailInputProps) => {
  const { disabled, value, onChange } = props

  return (
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
        disabled={disabled}
        value={value}
        onChange={onChange}
        className="input input-bordered text-lg"
      />
    </div>
  )
}

export { FeedbackEmailInput }
