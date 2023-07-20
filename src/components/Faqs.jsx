import Link from 'next/link'

import { Container } from '@/components/Container'
const faqs = [
  [
    {
      question: 'How do I know The Playlist will improve my performances?',
      answer:
        'Our entire platform is designed to optimize your performances by improving your setlist management. Thousands of users have already experienced the benefits. Give it a try and see for yourself!',
    },
    {
      question: 'Can I share my playlists with others?',
      answer:
        'Absolutely! With The Playlist, you can easily share your playlists over Wifi with your collaborators. Make sure everyone’s on the same page during performances.',
    },
    {
      question: 'Can I edit my playlists after I create them?',
      answer:
        'Definitely. You can always edit your playlists, add or remove tracks, and even change the order of the songs to match your performance flow.',
    },
  ],
  [
    {
      question: 'Can I use The Playlist on multiple devices?',
      answer:
        'Yes, The Playlist is accessible across multiple devices. With our Artist and Band plans, you even get access to the web app.',
    },
    {
      question: 'Is The Playlist available worldwide?',
      answer:
        'Yes, performers from all around the world are using The Playlist to manage their performances. Join them today!',
    },
    {
      question: 'Is The Playlist free?',
      answer:
        'Yes, The Playlist app is free to download and use. You can upgrade to our Artist or Band plans for additional syncronization features.',
    },
  ],
  [
    {
      question: 'Can I use The Playlist on both iOS and Android?',
      answer:
        'Absolutely, The Playlist is available for download on both the App Store and Google Play Store.',
    },
    {
      question: 'What happens to my data on The Playlist?',
      answer:
        'Your privacy is our utmost concern. Your data is stored securely and is only used to improve your experience on the app.',
    },
    {
      question: 'How can I upgrade my plan?',
      answer:
        'You can upgrade your plan at any time from the settings in the app. Choose from our Artist and Band plans for additional features.',
    },
  ],
]

export function Faqs() {
  return (
    <section
      id="faqs"
      aria-labelledby="faqs-title"
      className="border-t border-gray-200 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faqs-title"
            className="text-3xl font-medium tracking-tight text-gray-900"
          >
            Frequently asked questions
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            If you have anything else you want to ask,{' '}
            <Link
              href="mailto:info@example.com"
              className="text-gray-900 underline"
            >
              reach out to us
            </Link>
            .
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="space-y-10">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="text-lg font-semibold leading-6 text-gray-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-gray-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
