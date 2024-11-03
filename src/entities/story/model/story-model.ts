import { nanoid } from 'nanoid'
import { createStore } from 'zustand'

type StoryIcon = 'bolt' | 'megaphone' | 'rocket' | 'sparkles' | 'star'

type Story = {
  id: string
  nextId: string | null
  prevId: string | null
  heading: string
  content: string
  icon: StoryIcon
  isViewed: boolean
}

type StoryState = {
  ids: string[]
  entities: { [key: string]: Story }
  activeStoryId: string | null
}

type StoryActions = {
  play: (id: string) => void
  stop: (id: string) => void
  next: (id: string) => void
  prev: (id: string) => void
}

type StoryStore = StoryState & StoryActions

const defaultInitState: StoryState = (() => {
  const stories: Story[] = [
    {
      id: nanoid(),
      nextId: null,
      prevId: null,
      heading: 'Welcome',
      content: 'Welcome to Konspekt Docs!',
      icon: 'rocket',
      isViewed: false,
    },
    {
      id: nanoid(),
      nextId: null,
      prevId: null,
      heading: 'Konspekt Docs?',
      content: 'Konspekt Docs\nis a documentation for\nKonspekt App.',
      icon: 'star',
      isViewed: false,
    },
    {
      id: nanoid(),
      nextId: null,
      prevId: null,
      heading: 'Konspekt App?',
      content:
        'Konspekt App\nis a note-taking app\nsignificantly charged with magic.',
      icon: 'sparkles',
      isViewed: false,
    },
    {
      id: nanoid(),
      nextId: null,
      prevId: null,
      heading: 'Konspekt team',
      content:
        'The Konspekt team\ncontinues to provide\nthe best user experience\nbut with Konspekt Docs now.',
      icon: 'bolt',
      isViewed: false,
    },
    {
      id: nanoid(),
      nextId: null,
      prevId: null,
      heading: 'Stay tuned',
      content: 'A lot of new things\non the way!',
      icon: 'megaphone',
      isViewed: false,
    },
  ]

  stories.forEach((story, index) => {
    if (index < stories.length - 1) {
      story.nextId = stories[index + 1].id
    }

    if (index > 0) {
      story.prevId = stories[index - 1].id
    }
  })

  const ids = stories.map(({ id }) => id)

  const entities = stories.reduce<{ [key: string]: Story }>(
    (prevValue, story) => ({ ...prevValue, [story.id]: story }),
    {}
  )

  return { ids, entities, activeStoryId: null }
})()

const createStoryStore = (initState: StoryState = defaultInitState) =>
  createStore<StoryStore>()((set) => ({
    ...initState,

    play: (id: string) =>
      set((state) => {
        return { ...state, activeStoryId: id }
      }),

    stop: (id: string) =>
      set((state) => {
        return {
          ...state,
          entities: {
            ...state.entities,
            [id]: { ...state.entities[id], isViewed: true },
          },
          activeStoryId: null,
        }
      }),

    next: (id: string) =>
      set((state) => {
        return {
          ...state,
          entities: {
            ...state.entities,
            [id]: { ...state.entities[id], isViewed: true },
          },
          activeStoryId: state.entities[id].nextId,
        }
      }),

    prev: (id: string) =>
      set((state) => {
        return {
          ...state,
          entities: {
            ...state.entities,
            [id]: { ...state.entities[id], isViewed: true },
          },
          activeStoryId: state.entities[id].prevId,
        }
      }),
  }))

export type { StoryIcon, StoryStore }

export { createStoryStore }
