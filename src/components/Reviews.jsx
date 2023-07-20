import { useEffect, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'

import { Container } from '@/components/Container'

const reviews = [
  {
    title: 'It really enhances performance.',
    body: 'I downloaded The Playlist today and it turned my chaotic performance into a seamless masterpiece in half an hour.',
    author: 'StageMagician',
    rating: 5,
  },
  {
    title: 'You need this app.',
    body: 'I didn’t understand managing performances before The Playlist. I still don’t know music theory, but at least my shows are amazing now.',
    author: 'CluelessButFamous',
    rating: 5,
  },
  {
    title: 'This makes it so easy.',
    body: 'The Playlist makes organizing my songs and lyrics so easy that I can’t believe it’s actually free.',
    author: 'LivingTheDream',
    rating: 5,
  },
  {
    title: 'Forget about manual organization.',
    body: 'I barely made it through my performances with paper lyrics. With The Playlist, I’m doubling my show quality every single month.',
    author: 'RockStar2023',
    rating: 5,
  },
  {
    title: 'I love it!',
    body: 'I started creating and managing my own playlists and now I get new song ideas every 5 minutes. I don’t even have time to add all of them. My first concert is being planned next week!',
    author: 'MrTunes',
    rating: 5,
  },
  {
    title: 'Too good to be true.',
    body: 'I was improving so fast with The Playlist that it felt like a scam. But I sold out my shows and the money’s really there, right in my bank account. This app is crazy!',
    author: 'PopKing99',
    rating: 5,
  },
  {
    title: 'Wish I could give 6 stars',
    body: 'This is literally the most important app you will ever download in your life. Get on this before everyone else is using it too.',
    author: 'SarahRocks',
    rating: 5,
  },
  {
    title: 'Headlined a festival.',
    body: 'Yeah, you read that right. Want to headline your own show too? Get The Playlist.',
    author: 'FolkHero',
    rating: 5,
  },
  {
    title: 'No more disorganization!',
    body: 'After 2 weeks of using The Playlist, my performances were the best they’ve ever been. Why did I even bother with other apps when The Playlist exists?',
    author: 'BluesMaster',
    rating: 5,
  },
  {
    title: 'I’m 13 and I’m rocking.',
    body: 'I love that with The Playlist’s simple interface I could sign up and start managing my performances. I had a flawless set before I even hit puberty!',
    author: 'KidProdigy',
    rating: 5,
  },
  {
    title: 'Started a band.',
    body: 'I organize all our setlists with The Playlist. Easy gigs!',
    author: 'IndieBandLeader',
    rating: 5,
  },
  {
    title: 'It’s like a superpower.',
    body: 'Every song I added to The Playlist improved my performance. It’s like playing a show but knowing exactly what song is coming next!',
    author: 'DJElectro',
    rating: 5,
  },
  {
    title: 'Quit my job.',
    body: 'I downloaded The Playlist three days ago and quit my day job today. I can’t believe no one else thought to build a music management app that works this way!',
    author: 'CountryCowboy',
    rating: 5,
  },
  {
    title: 'Don’t download this app',
    body: 'Unless you want to have the best performances ever! I am literally writing this from a tour bus.',
    author: 'HipHopIcon',
    rating: 5,
  },
]

function StarIcon(props) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function StarRating({ rating }) {
  return (
    <div className="flex">
      {[...Array(5).keys()].map((index) => (
        <StarIcon
          key={index}
          className={clsx(
            'h-5 w-5',
            rating > index ? 'fill-cyan-500' : 'fill-gray-300'
          )}
        />
      ))}
    </div>
  )
}

function Review({ title, body, author, rating, className, ...props }) {
  let animationDelay = useMemo(() => {
    let possibleAnimationDelays = ['0s', '0.1s', '0.2s', '0.3s', '0.4s', '0.5s']
    return possibleAnimationDelays[
      Math.floor(Math.random() * possibleAnimationDelays.length)
    ]
  }, [])

  return (
    <figure
      className={clsx(
        'animate-fade-in rounded-3xl bg-white p-6 opacity-0 shadow-md shadow-gray-900/5',
        className
      )}
      style={{ animationDelay }}
      {...props}
    >
      <blockquote className="text-gray-900">
        <StarRating rating={rating} />
        <p className="mt-4 text-lg font-semibold leading-6 before:content-['“'] after:content-['”']">
          {title}
        </p>
        <p className="mt-3 text-base leading-7">{body}</p>
      </blockquote>
      <figcaption className="mt-3 text-sm text-gray-600 before:content-['–_']">
        {author}
      </figcaption>
    </figure>
  )
}

function splitArray(array, numParts) {
  let result = []
  for (let i = 0; i < array.length; i++) {
    let index = i % numParts
    if (!result[index]) {
      result[index] = []
    }
    result[index].push(array[i])
  }
  return result
}

function ReviewColumn({
  className,
  reviews,
  reviewClassName = () => {},
  msPerPixel = 0,
}) {
  let columnRef = useRef()
  let [columnHeight, setColumnHeight] = useState(0)
  let duration = `${columnHeight * msPerPixel}ms`

  useEffect(() => {
    let resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current.offsetHeight)
    })

    resizeObserver.observe(columnRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div
      ref={columnRef}
      className={clsx('animate-marquee space-y-8 py-4', className)}
      style={{ '--marquee-duration': duration }}
    >
      {reviews.concat(reviews).map((review, reviewIndex) => (
        <Review
          key={reviewIndex}
          aria-hidden={reviewIndex >= reviews.length}
          className={reviewClassName(reviewIndex % reviews.length)}
          {...review}
        />
      ))}
    </div>
  )
}

function ReviewGrid() {
  let containerRef = useRef()
  let isInView = useInView(containerRef, { once: true, amount: 0.4 })
  let columns = splitArray(reviews, 3)
  columns = [columns[0], columns[1], splitArray(columns[2], 2)]

  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
    >
      {isInView && (
        <>
          <ReviewColumn
            reviews={[...columns[0], ...columns[2].flat(), ...columns[1]]}
            reviewClassName={(reviewIndex) =>
              clsx(
                reviewIndex >= columns[0].length + columns[2][0].length &&
                  'md:hidden',
                reviewIndex >= columns[0].length && 'lg:hidden'
              )
            }
            msPerPixel={10}
          />
          <ReviewColumn
            reviews={[...columns[1], ...columns[2][1]]}
            className="hidden md:block"
            reviewClassName={(reviewIndex) =>
              reviewIndex >= columns[1].length && 'lg:hidden'
            }
            msPerPixel={15}
          />
          <ReviewColumn
            reviews={columns[2].flat()}
            className="hidden lg:block"
            msPerPixel={10}
          />
        </>
      )}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-50" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-50" />
    </div>
  )
}

export function Reviews() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="pb-16 pt-20 sm:pb-24 sm:pt-32"
    >
      <Container>
        <h2
          id="reviews-title"
          className="text-3xl font-medium tracking-tight text-gray-900 sm:text-center"
        >
          Everyone is changing their life with The Playlist.
        </h2>
        <p className="mt-2 text-lg text-gray-600 sm:text-center">
          Hundreds of artists have doubled their performance efficiency in the
          last 30 days with The Playlist.
        </p>
        <ReviewGrid />
      </Container>
    </section>
  )
}
