import { CheckIcon } from '@heroicons/react/24/outline'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import * as Tooltip from '@radix-ui/react-tooltip'
import { match } from 'ts-pattern'

import type { FeedbackFormState, FeedbackFromError } from '../model'

interface FeedbackSubmitButtonProps {
  state: FeedbackFormState
  error: FeedbackFromError
}

const FeedbackSubmitButton = (props: FeedbackSubmitButtonProps) => {
  const { state, error } = props

  return match(state)
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
    .exhaustive()
}

export { FeedbackSubmitButton }
