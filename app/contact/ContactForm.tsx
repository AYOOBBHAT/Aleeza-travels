'use client';

import { useState, FormEvent } from 'react';

const WHATSAPP_NUMBER = '918899470609'; // Your WhatsApp number without + sign

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Format the message for WhatsApp
    const whatsappMessage = `*New Contact Form Submission*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone || 'Not provided'}
*Subject:* ${formData.subject}

*Message:*
${formData.message}

---
Sent from Sadasangh Holidays Website`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Open WhatsApp in a new window/tab
    window.open(whatsappUrl, '_blank');

    // Reset form after a short delay
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
          placeholder="John Doe"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
          placeholder="john@example.com"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
          placeholder="+1 (555) 123-4567"
        />
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
          placeholder="Travel Inquiry"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition resize-none"
          placeholder="Tell us about your travel plans..."
        ></textarea>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Opening WhatsApp...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-1.866-2.03-2.272-.272-.406-.47-.612-.653-.612-.183 0-.272.045-.408.149-.136.105-.588.612-.721.785-.133.174-.272.224-.497.149-.225-.075-.95-.35-1.81-1.115-.67-.597-1.123-1.333-1.255-1.558-.133-.224-.015-.345.1-.47.105-.124.225-.298.337-.448.112-.149.15-.224.225-.374.075-.149.038-.298-.037-.448-.075-.149-.653-1.576-.894-2.16-.24-.583-.487-.504-.653-.51-.166-.006-.36-.01-.555-.01-.196 0-.51.075-.765.375-.255.3-.975.975-.975 2.38 0 1.405 1.02 2.76 1.16 2.95.14.19 2.01 3.06 4.87 4.29.68.29 1.21.46 1.62.59.82.26 1.57.22 2.17.14.6-.08 1.76-.72 2.01-1.41.25-.69.25-1.28.17-1.41-.08-.13-.298-.2-.595-.35zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22.5c-5.79 0-10.5-4.71-10.5-10.5S6.21 1.5 12 1.5 22.5 6.21 22.5 12 17.79 22.5 12 22.5z"/>
            </svg>
            Send via WhatsApp
          </>
        )}
      </button>
      <p className="text-sm text-gray-500 text-center">
        Clicking &quot;Send via WhatsApp&quot; will open WhatsApp with your message pre-filled. You can review and send it directly.
      </p>
    </form>
  );
}

