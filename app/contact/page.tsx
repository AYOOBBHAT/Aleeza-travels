import type { Metadata } from 'next';
import ContactForm from './ContactForm';

// Structured Data for SEO
const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Us - Kashmir Travel Agency | Aleeza Travels',
  description: 'Contact Aleeza Travels - Kashmir\'s trusted travel agency. Available 24/7 for travel inquiries, custom packages, and bookings.',
  url: 'https://aleezatravels.com/contact',
  mainEntity: {
    '@type': 'TravelAgency',
    name: 'Aleeza Travels',
    telephone: '+919149792237',
    email: 'deltadawood963@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Dallake',
      addressLocality: 'Srinagar',
      addressRegion: 'Jammu and Kashmir',
      addressCountry: 'IN',
      postalCode: '190001',
    },
    openingHours: 'Mo-Su 00:00-23:59',
    areaServed: {
      '@type': 'State',
      name: 'Jammu and Kashmir',
    },
  },
};

export const metadata: Metadata = {
  title: 'Contact Us - Kashmir Travel Agency | Aleeza Travels | 24/7 Support',
  description: 'Contact Aleeza Travels - Kashmir\'s trusted travel agency. Call +919149792237, email deltadawood963@gmail.com, or visit us in Dallake, Srinagar. Available 24/7 for travel inquiries, custom Kashmir packages, and bookings.',
  keywords: [
    'contact Kashmir travel agency',
    'Aleeza Travels contact',
    'Kashmir travel agent contact',
    'Srinagar travel agency',
    'book Kashmir tour',
    'Kashmir travel inquiry',
    'travel consultation Kashmir',
    'custom Kashmir packages',
    'Kashmir travel booking',
    'Dallake Srinagar travel',
  ],
  authors: [{ name: 'Aleeza Travels' }],
  creator: 'Aleeza Travels',
  publisher: 'Aleeza Travels',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aleezatravels.com/contact',
    siteName: 'Aleeza Travels',
    title: 'Contact Us - Kashmir Travel Agency | Aleeza Travels',
    description: 'Contact Aleeza Travels - Kashmir\'s trusted travel agency. Available 24/7 for travel inquiries, custom packages, and bookings.',
    images: [
      {
        url: 'https://res.cloudinary.com/de7qtzp1b/image/upload/v1767162472/Chatpal-Kashmir_brown_chinar_kashmir_cfzjvf.webp',
        width: 1200,
        height: 630,
        alt: 'Contact Aleeza Travels - Kashmir Travel Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Kashmir Travel Agency | Aleeza Travels',
    description: 'Contact Aleeza Travels - Kashmir\'s trusted travel agency. Available 24/7 for travel inquiries and bookings.',
    images: ['https://res.cloudinary.com/de7qtzp1b/image/upload/v1767162472/Chatpal-Kashmir_brown_chinar_kashmir_cfzjvf.webp'],
  },
  alternates: {
    canonical: 'https://aleezatravels.com/contact',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const contactInfo = [
  {
    title: 'Phone',
    content: '+919149792237',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    title: 'Email',
    content: 'deltadawood963@gmail.com',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Address',
    content: 'Dallake Srinagar, Jammu and Kashmir',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Business Hours',
    content: 'Monday to Sunday: 24/7',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function Contact() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Get in touch with us. We&apos;re here to help you plan your perfect trip
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                We&apos;d love to hear from you. Whether you have a question about our packages, need help planning
                your trip, or want to customize a travel experience, our team is ready to assist you.
              </p>

              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                      <p className="text-gray-600">{info.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://wa.me/919149792237"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white hover:bg-green-600 transition-colors"
                    aria-label="WhatsApp"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-1.866-2.03-2.272-.272-.406-.47-.612-.653-.612-.183 0-.272.045-.408.149-.136.105-.588.612-.721.785-.133.174-.272.224-.497.149-.225-.075-.95-.35-1.81-1.115-.67-.597-1.123-1.333-1.255-1.558-.133-.224-.015-.345.1-.47.105-.124.225-.298.337-.448.112-.149.15-.224.225-.374.075-.149.038-.298-.037-.448-.075-.149-.653-1.576-.894-2.16-.24-.583-.487-.504-.653-.51-.166-.006-.36-.01-.555-.01-.196 0-.51.075-.765.375-.255.3-.975.975-.975 2.38 0 1.405 1.02 2.76 1.16 2.95.14.19 2.01 3.06 4.87 4.29.68.29 1.21.46 1.62.59.82.26 1.57.22 2.17.14.6-.08 1.76-.72 2.01-1.41.25-.69.25-1.28.17-1.41-.08-.13-.298-.2-.595-.35zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22.5c-5.79 0-10.5-4.71-10.5-10.5S6.21 1.5 12 1.5 22.5 6.21 22.5 12 17.79 22.5 12 22.5z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/aleezatravels.com20?igsh=d3l2M3NobDJ1dXVh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white hover:from-purple-600 hover:to-pink-600 transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}

