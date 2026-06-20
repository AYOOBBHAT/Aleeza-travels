'use client';

const WHATSAPP_NUMBER = '919149792237';
const WHATSAPP_MESSAGE = 'Hello! I would like to know more about your travel packages.\n\n- Aleeza Travels';

export default function WhatsAppButton() {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16 bg-[#25D366] rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 hover:scale-110 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
      aria-label="Contact us on WhatsApp"
      type="button"
    >
      <svg
        className="w-7 h-7 md:w-8 md:h-8 text-white"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-1.866-2.03-2.272-.272-.406-.47-.612-.653-.612-.183 0-.272.045-.408.149-.136.105-.588.612-.721.785-.133.174-.272.224-.497.149-.225-.075-.95-.35-1.81-1.115-.67-.597-1.123-1.333-1.255-1.558-.133-.224-.015-.345.1-.47.105-.124.225-.298.337-.448.112-.149.15-.224.225-.374.075-.149.038-.298-.037-.448-.075-.149-.653-1.576-.894-2.16-.24-.583-.487-.504-.653-.51-.166-.006-.36-.01-.555-.01-.196 0-.51.075-.765.375-.255.3-.975.975-.975 2.38 0 1.405 1.02 2.76 1.16 2.95.14.19 2.01 3.06 4.87 4.29.68.29 1.21.46 1.62.59.82.26 1.57.22 2.17.14.6-.08 1.76-.72 2.01-1.41.25-.69.25-1.28.17-1.41-.08-.13-.298-.2-.595-.35zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22.5c-5.79 0-10.5-4.71-10.5-10.5S6.21 1.5 12 1.5 22.5 6.21 22.5 12 17.79 22.5 12 22.5z" />
      </svg>
    </button>
  );
}

