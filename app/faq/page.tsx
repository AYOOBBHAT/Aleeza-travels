import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ - Kashmir Travel Questions | Sadasangh Holidays',
  description: 'Find answers to common questions about Kashmir travel packages, bookings, destinations, cancellation policies, and more at Sadasangh Holidays. Your trusted Kashmir travel agency.',
  keywords: [
    'Kashmir travel FAQ',
    'travel questions Kashmir',
    'Kashmir tour booking FAQ',
    'travel information Kashmir',
    'Kashmir travel policies',
    'Kashmir package questions',
    'travel agency FAQ',
    'Kashmir tour cancellation',
    'Kashmir travel booking help',
  ],
  authors: [{ name: 'Sadasangh Holidays' }],
  creator: 'Sadasangh Holidays',
  publisher: 'Sadasangh Holidays',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sadasanghholidays.com/faq',
    siteName: 'Sadasangh Holidays',
    title: 'FAQ - Kashmir Travel Questions | Sadasangh Holidays',
    description: 'Find answers to common questions about Kashmir travel packages, bookings, and destinations.',
    images: [
      {
        url: 'https://res.cloudinary.com/de7qtzp1b/image/upload/v1767162472/Chatpal-Kashmir_brown_chinar_kashmir_cfzjvf.webp',
        width: 1200,
        height: 630,
        alt: 'FAQ - Sadasangh Holidays Kashmir Travel Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ - Kashmir Travel Questions | Sadasangh Holidays',
    description: 'Find answers to common questions about Kashmir travel packages and bookings.',
    images: ['https://res.cloudinary.com/de7qtzp1b/image/upload/v1767162472/Chatpal-Kashmir_brown_chinar_kashmir_cfzjvf.webp'],
  },
  alternates: {
    canonical: 'https://sadasanghholidays.com/faq',
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

const faqs = [
  {
    question: 'How do I book a travel package?',
    answer: 'You can browse our packages online and click "Book Now" on any package that interests you. Alternatively, you can contact us directly through our contact page or phone, and our travel consultants will help you find the perfect package.',
  },
  
  {
    question: 'Can I customize a travel package?',
    answer: 'Absolutely! We specialize in creating custom travel experiences. Contact us with your preferences, budget, and travel dates, and we\'ll design a personalized itinerary just for you.',
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'Cancellation policies vary depending on the package and supplier. Generally, cancellations made 30+ days before departure may be eligible for a partial refund, while last-minute cancellations may have restrictions. We recommend travel insurance for added protection.',
  },
  
  {
    question: 'How far in advance should I book?',
    answer: 'We recommend booking at least 15 days-1 month in advance for international trips to secure the best prices and availability. However, we can also help with last-minute bookings when space is available.',
  },
  {
    question: 'Do you offer group discounts?',
    answer: 'Yes! We offer special rates for group bookings. Contact us with your group size and travel details, and we\'ll provide a customized quote with group discounts.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept various payment methods including credit cards, debit cards, bank transfers, and in some cases, payment plans. Contact us to discuss the best payment option for your booking.',
  },
  
  {
    question: 'What if I need to make changes to my booking?',
    answer: 'Changes to bookings are subject to availability and supplier policies. Contact us as soon as possible if you need to make changes, and we\'ll do our best to accommodate your request.',
  },
];

export default function FAQ() {
  // Structured Data for SEO
  const faqPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
      <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Find answers to common questions about our services, bookings, and travel packages
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-start">
                  <span className="text-blue-600 mr-3 flex-shrink-0">Q{index + 1}.</span>
                  <span>{faq.question}</span>
                </h3>
                <p className="text-gray-600 ml-8 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Still Have Questions?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Our travel experts are here to help. Contact us and we&apos;ll get back to you as soon as possible.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
    </>
  );
}

