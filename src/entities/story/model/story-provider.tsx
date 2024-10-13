'use client'

import { createContext, useContext, useRef } from 'react'
import { useStore } from 'zustand'

import { createStoryStore } from './story-model'

import type { StoryStore } from './story-model'
import type { ReactNode } from 'react'

type StoryStoreApi = ReturnType<typeof createStoryStore>

interface StoryStoreProviderProps {
  children: ReactNode
}

const StoryStoreContext = createContext<StoryStoreApi | undefined>(undefined)

const StoryStoreProvider = ({ children }: StoryStoreProviderProps) => {
  const storeRef = useRef<StoryStoreApi>()

  if (!storeRef.current) {
    storeRef.current = createStoryStore()
  }

  return (
    <StoryStoreContext.Provider value={storeRef.current}>
      {children}
    </StoryStoreContext.Provider>
  )
}

const useStoryStore = <T,>(selector: (store: StoryStore) => T): T => {
  const storeContext = useContext(StoryStoreContext)

  if (!storeContext) {
    throw new Error(`useStoryStore must be used within StoryStoreProvider`)
  }

  return useStore(storeContext, selector)
}

export { StoryStoreProvider, useStoryStore }
