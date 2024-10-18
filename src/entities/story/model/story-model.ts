import { nanoid } from 'nanoid'
import { createStore } from 'zustand'

type Gradient = 'yellow-orange' | 'blue-emerald' | 'pink-indigo'

type Story = {
  id: string
  heading: string
  content: string
  gradient: Gradient
  isViewed: boolean
}

type StoryState = {
  stories: Story[]
}

type StoryActions = {
  view: (id: string) => void
}

type StoryStore = StoryState & StoryActions

const defaultInitState: StoryState = {
  stories: [
    {
      id: nanoid(),
      heading: 'Welcome',
      content: 'Welcome to Konspekt Docs!',
      gradient: 'yellow-orange',
      isViewed: false,
    },
    {
      id: nanoid(),
      heading: 'The Konspekt team',
      content:
        'The Konspekt team is happy to announce a Konspekt App and Konspekt Docs launch!',
      gradient: 'blue-emerald',
      isViewed: false,
    },
    {
      id: nanoid(),
      heading: 'Konspekt App',
      content:
        'Konspekt App is a note-taking app significantly charged with magic.',
      gradient: 'pink-indigo',
      isViewed: false,
    },
    {
      id: nanoid(),
      heading: 'What happens?',
      content:
        'Konspekt team makes stories to provide project updates in most convenient way.',
      gradient: 'yellow-orange',
      isViewed: false,
    },
    {
      id: nanoid(),
      heading: 'Stay tuned',
      content: 'A lot of new stories on the way!',
      gradient: 'blue-emerald',
      isViewed: false,
    },
  ],
}

const createStoryStore = (initState: StoryState = defaultInitState) =>
  createStore<StoryStore>()((set) => ({
    ...initState,
    view: (id: string) =>
      set((state) => {
        const stories = state.stories.map((story) => {
          if (story.id !== id) {
            return story
          }

          return {
            ...story,
            isViewed: true,
          }
        })

        return { stories }
      }),
  }))

export type { Gradient, StoryStore }

export { createStoryStore }
