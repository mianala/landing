'use client'
import { Fragment, useEffect, useId, useRef, useState } from 'react'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useDebouncedCallback } from 'use-debounce'
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
} from '@dnd-kit/core'

import { CSS } from '@dnd-kit/utilities'

import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'

import { useQuill } from 'react-quilljs'
// or const { useQuill } = require('react-quilljs');

import 'quill/dist/quill.snow.css' // Add css for snow theme
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme

import { AppScreen } from '@/components/AppScreen'
import { CircleBackground } from '@/components/CircleBackground'
import { Container } from '@/components/Container'
import { PhoneFrame } from '@/components/PhoneFrame'

const MotionAppScreenHeader = motion(AppScreen.Header)
const MotionAppScreenBody = motion(AppScreen.Body)

const features = [
  {
    name: 'Create Your Unique Performance Playlists',
    description:
      'Setting up your perfect performance is as easy as a tap. Adding tracks to your playlists is a breeze. Want to reorder your tracks? Simply drag and drop! ',
    icon: DeviceUserIcon,
    screen: StocksScreen,
  },
  {
    name: 'Customize Your Tracks',
    description:
      'Fill in your track details and customize your lyrics and notes as per your needs. No more hunting for tracks; add your existing songs from your repertoire directly to your playlist.',
    icon: DeviceNotificationIcon,
    screen: InviteScreen,
  },
  {
    name: 'Perform Like A Pro',
    description:
      'Navigating through your performance has never been easier. Tap on a song to start performing, swipe left for the next song, and swipe right to go back to the previous song. ',
    icon: DeviceTouchIcon,
    screen: InvestScreen,
  },
]

function DeviceUserIcon(props) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <circle cx={16} cy={16} r={16} fill="#A3A3A3" fillOpacity={0.2} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 23a3 3 0 100-6 3 3 0 000 6zm-1 2a4 4 0 00-4 4v1a2 2 0 002 2h6a2 2 0 002-2v-1a4 4 0 00-4-4h-2z"
        fill="#737373"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 4a4 4 0 014-4h14a4 4 0 014 4v24a4.002 4.002 0 01-3.01 3.877c-.535.136-.99-.325-.99-.877s.474-.98.959-1.244A2 2 0 0025 28V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9a2 2 0 00-2 2v24a2 2 0 001.041 1.756C8.525 30.02 9 30.448 9 31s-.455 1.013-.99.877A4.002 4.002 0 015 28V4z"
        fill="#A3A3A3"
      />
    </svg>
  )
}

function DeviceNotificationIcon(props) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <circle cx={16} cy={16} r={16} fill="#A3A3A3" fillOpacity={0.2} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 0a4 4 0 00-4 4v24a4 4 0 004 4h14a4 4 0 004-4V4a4 4 0 00-4-4H9zm0 2a2 2 0 00-2 2v24a2 2 0 002 2h14a2 2 0 002-2V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9z"
        fill="#A3A3A3"
      />
      <path
        d="M9 8a2 2 0 012-2h10a2 2 0 012 2v2a2 2 0 01-2 2H11a2 2 0 01-2-2V8z"
        fill="#737373"
      />
    </svg>
  )
}

function DeviceTouchIcon(props) {
  let id = useId()

  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <defs>
        <linearGradient
          id={`${id}-gradient`}
          x1={14}
          y1={14.5}
          x2={7}
          y2={17}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#737373" />
          <stop offset={1} stopColor="#D4D4D4" stopOpacity={0} />
        </linearGradient>
      </defs>
      <circle cx={16} cy={16} r={16} fill="#A3A3A3" fillOpacity={0.2} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 4a4 4 0 014-4h14a4 4 0 014 4v13h-2V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9a2 2 0 00-2 2v24a2 2 0 002 2h4v2H9a4 4 0 01-4-4V4z"
        fill="#A3A3A3"
      />
      <path
        d="M7 22c0-4.694 3.5-8 8-8"
        stroke={`url(#${id}-gradient)`}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 20l.217-5.513a1.431 1.431 0 00-2.85-.226L17.5 21.5l-1.51-1.51a2.107 2.107 0 00-2.98 0 .024.024 0 00-.005.024l3.083 9.25A4 4 0 0019.883 32H25a4 4 0 004-4v-5a3 3 0 00-3-3h-5z"
        fill="#A3A3A3"
      />
    </svg>
  )
}

const headerAnimation = {
  initial: { opacity: 0, transition: { duration: 0.3 } },
  animate: { opacity: 1, transition: { duration: 0.3, delay: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

const maxZIndex = 2147483647

const bodyVariantBackwards = {
  opacity: 0.4,
  scale: 0.8,
  zIndex: 0,
  filter: 'blur(4px)',
  zIndex: 0,
  transition: { duration: 0.4 },
}

const bodyVariantForwards = (custom) => ({
  y: '100%',
  zIndex: maxZIndex - custom.changeCount,
  transition: { duration: 0.4 },
})

const bodyAnimation = {
  initial: 'initial',
  animate: 'animate',
  exit: 'exit',
  variants: {
    initial: (custom) =>
      custom.isForwards ? bodyVariantForwards(custom) : bodyVariantBackwards,
    animate: (custom) => ({
      y: '0%',
      opacity: 1,
      scale: 1,
      zIndex: maxZIndex / 2 - custom.changeCount,
      filter: 'blur(0px)',
      transition: { duration: 0.4 },
    }),
    exit: (custom) =>
      custom.isForwards ? bodyVariantBackwards : bodyVariantForwards(custom),
  },
}

function InviteScreen({ custom, animated = false }) {
  const toolbarOptions = [['bold'], [{ color: [] }, { background: [] }]]
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: toolbarOptions,
    },
  })

  useEffect(() => {
    if (quill) {
      const delta = [
        {
          insert: 'Verse 1 (Eric):\n',
          attributes: { bold: true, background: '#1E90FF' },
        },
        {
          insert:
            "We don't know what tomorrow holds,\nBut we know who holds tomorrow.\nKnowing this we'll live above the world and all its sorrows.\nI have prayed for all my life that we would be together.\nServing Him together seems so right.\n",
        },
        {
          insert: 'Chorus (Both):\n',
          attributes: { bold: true, background: '#D8BFD8' },
        },
        {
          insert:
            "Oh, oh yes, it's true.\nHe has chosen me for you.\nTake my hand and we'll agree\nThat He has chosen you for me.\n",
        },
        {
          insert: 'Verse 2 (Sue):\n',
          attributes: { bold: true, background: '#FFC0CB' },
        },
        {
          insert:
            "Now and then I like to think about the day He saved me.\nAll the love that He bestowed and all the gifts He gave me\nWith all this I praise His name for putting us together\nHe knew we'd be together from the start.\n",
        },
        {
          insert: 'Chorus (Both):\n',
          attributes: { bold: true, background: '#D8BFD8' },
        },
        {
          insert:
            "Oh yes, it's true. He has chosen me for you\nTake my hand and we'll agree\nThat He has chosen you for me\n",
        },
        {
          insert: 'Bridge (Both):\n',
          attributes: { bold: true, background: '#D8BFD8' },
        },
        {
          insert:
            "He has saved us.\nWashed us white as snow.\nNow we're together.\nCause He has made it so.\n",
        },
        {
          insert: 'Chorus (Both):\n',
          attributes: { bold: true, background: '#D8BFD8' },
        },
        {
          insert:
            "Oh yes, it's true.\nHe has chosen me for you\nTake my hand and we'll agree\nThat He has chosen you for me.\n",
        },
      ]

      quill.setContents(delta)
    }
  }, [quill])

  return (
    <AppScreen className="w-full">
      <MotionAppScreenHeader {...(animated ? headerAnimation : {})}>
        <AppScreen.Title>💍 Wedding Eric & Sue</AppScreen.Title>
        <AppScreen.Subtitle>
          First Song:{' '}
          <span className="text-white">He has chosen you for me</span>
        </AppScreen.Subtitle>
      </MotionAppScreenHeader>
      <MotionAppScreenBody {...(animated ? { ...bodyAnimation, custom } : {})}>
        <div className="p-3">
          <div style={{ height: 450 }}>
            <div ref={quillRef} />
          </div>
        </div>
      </MotionAppScreenBody>
    </AppScreen>
  )
}

function StocksScreen({ custom, animated = false }) {
  const [songs, setSongs] = useState([
    {
      title: 'September',
      key: 'Bb',
      bpm: 126,
      order: 1,
    },
    {
      title: 'I Want You Back',
      key: 'Ab',
      bpm: 98,
      order: 2,
    },
    {
      title: 'Uptown Funk',
      key: 'Dm',
      bpm: 115,
      order: 3,
    },
    {
      title: 'Billie Jean',
      key: 'F#m',
      bpm: 117,
      order: 4,
    },
    {
      title: "Don't Stop Believin'",
      key: 'E',
      bpm: 120,
      order: 5,
    },
    {
      title: "Sweet Child O' Mine",
      key: 'D',
      bpm: 125,
      order: 6,
    },
    {
      title: "Livin' on a Prayer",
      key: 'Bbm',
      bpm: 122,
      order: 7,
    },
    {
      title: 'Bohemian Rhapsody',
      key: 'Bb',
      bpm: 72,
      order: 8,
    },
  ])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setSongs((songs) => {
        const oldIndex = songs.findIndex((song) => song.title === active.id)
        const newIndex = songs.findIndex((song) => song.title === over.id)
        return arrayMove(songs, oldIndex, newIndex)
      })
    }
  }

  return (
    <AppScreen className="w-full">
      <MotionAppScreenHeader {...(animated ? headerAnimation : {})}>
        <AppScreen.Title>🎸 Friday Jam</AppScreen.Title>
        <AppScreen.Subtitle>in 2 days</AppScreen.Subtitle>
      </MotionAppScreenHeader>
      <MotionAppScreenBody {...(animated ? { ...bodyAnimation, custom } : {})}>
        <div className="divide-y divide-gray-100">
          <DndContext
            sensors={sensors}
            items={songs}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={[...songs]
                .sort((a, b) => a.order - b.order)
                .map((song) => song.title)}
              strategy={verticalListSortingStrategy}
              describedById="DndDescribedBy"
            >
              {songs.map((song, index) => (
                <SortableItem key={song.title} id={song.title}>
                  <div className="flex items-center gap-4 px-4 py-3">
                    <div className="flex-none rounded-full">{index + 1}</div>

                    <div className="flex-none">
                      <div className="text-sm font-medium text-gray-900">
                        {song.title}
                      </div>
                      <div className="text-xs leading-5 text-cyan-500">
                        {song.key}
                      </div>
                    </div>
                  </div>
                </SortableItem>
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </MotionAppScreenBody>
    </AppScreen>
  )
}

function arrayMove(array, oldIndex, newIndex) {
  if (newIndex >= array.length) {
    let k = newIndex - array.length + 1
    while (k--) {
      array.push(undefined)
    }
  }
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0])
  return array.map((song, index) => ({
    ...song,
    order: index + 1,
  }))
}

function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.id,
    })

  const style = {
    transform: transform ? CSS.Transform.toString(transform) : undefined,
    transition,
  }
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {props.children}
    </div>
  )
}

function InvestScreen({ custom, animated = false }) {
  return (
    <AppScreen className="w-full">
      <MotionAppScreenHeader {...(animated ? headerAnimation : {})}>
        <AppScreen.Title>Autumn Leaves</AppScreen.Title>
        <AppScreen.Subtitle>
          Next song: <span className="text-white">A Train</span>
        </AppScreen.Subtitle>
      </MotionAppScreenHeader>
      <MotionAppScreenBody {...(animated ? { ...bodyAnimation, custom } : {})}>
        <div className="px-4 py-6">
          <div class="rounded  p-4">
            <p class="font-bold">The falling leaves drift by the window</p>
            <p>The autumn leaves of red and gold</p>
            <p class="mt-4">I see your lips, the summer kisses</p>
            <p>The sun-burned hands I used to hold</p>
          </div>
          <div class="mt-4 rounded  p-4">
            <p class="font-bold">Since you went away the days grow long</p>
            <p>And soon I’ll hear old winter’s song</p>
            <p class="mt-4">But I miss you most of all my darling</p>
            <p class="text-orangeRed underline">
              When autumn leaves start to fall
            </p>
          </div>
        </div>
      </MotionAppScreenBody>
    </AppScreen>
  )
}

function usePrevious(value) {
  let ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

function FeaturesDesktop() {
  let [changeCount, setChangeCount] = useState(0)
  let [selectedIndex, setSelectedIndex] = useState(0)
  let prevIndex = usePrevious(selectedIndex)
  let isForwards = prevIndex === undefined ? true : selectedIndex > prevIndex

  let onChange = useDebouncedCallback(
    (selectedIndex) => {
      setSelectedIndex(selectedIndex)
      setChangeCount((changeCount) => changeCount + 1)
    },
    100,
    { leading: true }
  )

  return (
    <Tab.Group
      as="div"
      className="grid grid-cols-12 items-center gap-8 lg:gap-16 xl:gap-24"
      selectedIndex={selectedIndex}
      onChange={onChange}
      vertical
    >
      <Tab.List className="relative z-10 order-last col-span-6 space-y-6">
        {features.map((feature, featureIndex) => (
          <div
            key={feature.name}
            className="relative rounded-2xl transition-colors hover:bg-gray-800/30"
          >
            {featureIndex === selectedIndex && (
              <motion.div
                layoutId="activeBackground"
                className="absolute inset-0 bg-gray-800"
                initial={{ borderRadius: 16 }}
              />
            )}
            <div className="relative z-10 p-8">
              <feature.icon className="h-8 w-8" />
              <h3 className="mt-6 text-lg font-semibold text-white">
                <Tab className="text-left [&:not(:focus-visible)]:focus:outline-none">
                  <span className="absolute inset-0 rounded-2xl" />
                  {feature.name}
                </Tab>
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </Tab.List>
      <div className="relative col-span-6">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <CircleBackground color="#13B5C8" className="animate-spin-slower" />
        </div>
        <PhoneFrame className="z-10 mx-auto w-full max-w-[366px]">
          <Tab.Panels as={Fragment}>
            <AnimatePresence
              initial={false}
              custom={{ isForwards, changeCount }}
            >
              {features.map((feature, featureIndex) =>
                selectedIndex === featureIndex ? (
                  <Tab.Panel
                    static
                    key={feature.name + changeCount}
                    className="col-start-1 row-start-1 flex focus:outline-offset-[32px] [&:not(:focus-visible)]:focus:outline-none"
                  >
                    <feature.screen
                      animated
                      custom={{ isForwards, changeCount }}
                    />
                  </Tab.Panel>
                ) : null
              )}
            </AnimatePresence>
          </Tab.Panels>
        </PhoneFrame>
      </div>
    </Tab.Group>
  )
}

function FeaturesMobile() {
  let [activeIndex, setActiveIndex] = useState(0)
  let slideContainerRef = useRef()
  let slideRefs = useRef([])

  useEffect(() => {
    let observer = new window.IntersectionObserver(
      (entries) => {
        for (let entry of entries) {
          if (entry.isIntersecting) {
            setActiveIndex(slideRefs.current.indexOf(entry.target))
            break
          }
        }
      },
      {
        root: slideContainerRef.current,
        threshold: 0.6,
      }
    )

    for (let slide of slideRefs.current) {
      if (slide) {
        observer.observe(slide)
      }
    }

    return () => {
      observer.disconnect()
    }
  }, [slideContainerRef, slideRefs])

  return (
    <>
      <div
        ref={slideContainerRef}
        className="-mb-4 flex snap-x snap-mandatory -space-x-4 overflow-x-auto overscroll-x-contain scroll-smooth pb-4 [scrollbar-width:none] sm:-space-x-6 [&::-webkit-scrollbar]:hidden"
      >
        {features.map((feature, featureIndex) => (
          <div
            key={featureIndex}
            ref={(ref) => (slideRefs.current[featureIndex] = ref)}
            className="w-full flex-none snap-center px-4 sm:px-6"
          >
            <div className="relative transform overflow-hidden rounded-2xl bg-gray-800 px-5 py-6">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <CircleBackground
                  color="#13B5C8"
                  className={featureIndex % 2 === 1 ? 'rotate-180' : undefined}
                />
              </div>
              <PhoneFrame className="relative mx-auto w-full max-w-[366px]">
                <feature.screen />
              </PhoneFrame>
              <div className="absolute inset-x-0 bottom-0 bg-gray-800/95 p-6 backdrop-blur sm:p-10">
                <feature.icon className="h-8 w-8" />
                <h3 className="mt-6 text-sm font-semibold text-white sm:text-lg">
                  {feature.name}
                </h3>
                <p className="mt-2 text-sm text-gray-400">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-3">
        {features.map((_, featureIndex) => (
          <button
            type="button"
            key={featureIndex}
            className={clsx(
              'relative h-0.5 w-4 rounded-full',
              featureIndex === activeIndex ? 'bg-gray-300' : 'bg-gray-500'
            )}
            aria-label={`Go to slide ${featureIndex + 1}`}
            onClick={() => {
              slideRefs.current[featureIndex].scrollIntoView({
                block: 'nearest',
                inline: 'nearest',
              })
            }}
          >
            <span className="absolute -inset-x-1.5 -inset-y-3" />
          </button>
        ))}
      </div>
    </>
  )
}

export function PrimaryFeatures() {
  return (
    <section
      id="features"
      aria-label="Features for investing all your money"
      className="bg-gray-900 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
          <h2 className="text-3xl font-medium tracking-tight text-white">
            Create Your Unique Performance Playlists.
          </h2>
          <p className="mt-2 text-lg text-gray-400">
            From tailoring your tracks to sharing your playlists over WiFi, The
            Playlist is your one-stop destination for a seamless performance
            experience.
          </p>
        </div>
      </Container>
      <div className="mt-16 md:hidden">
        <FeaturesMobile />
      </div>
      <Container className="hidden md:mt-20 md:block">
        <FeaturesDesktop />
      </Container>
    </section>
  )
}
