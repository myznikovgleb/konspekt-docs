import { useEffect, useRef } from 'react'

const useInterval = (callback: () => void, delay: number | null) => {
  const callbackRef = useRef<() => void>()

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    const tick = () => {
      if (!callbackRef.current) {
        return
      }

      callbackRef.current()
    }

    if (typeof delay !== 'number') {
      return
    }

    const intervalId = setInterval(tick, -1)

    return () => clearInterval(intervalId)
  }, [delay])
}

export { useInterval }
