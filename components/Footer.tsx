import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold text-white">Sadasangh Holidays</span>
            </div>
            <p className="text-sm mb-4 max-w-md">
              Your trusted travel partner for unforgettable journeys. We create amazing travel experiences 
              that you&apos;ll cherish forever.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://wa.me/919149792237" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400 transition-colors" 
                aria-label="WhatsApp"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-1.866-2.03-2.272-.272-.406-.47-.612-.653-.612-.183 0-.272.045-.408.149-.136.105-.588.612-.721.785-.133.174-.272.224-.497.149-.225-.075-.95-.35-1.81-1.115-.67-.597-1.123-1.333-1.255-1.558-.133-.224-.015-.345.1-.47.105-.124.225-.298.337-.448.112-.149.15-.224.225-.374.075-.149.038-.298-.037-.448-.075-.149-.653-1.576-.894-2.16-.24-.583-.487-.504-.653-.51-.166-.006-.36-.01-.555-.01-.196 0-.51.075-.765.375-.255.3-.975.975-.975 2.38 0 1.405 1.02 2.76 1.16 2.95.14.19 2.01 3.06 4.87 4.29.68.29 1.21.46 1.62.59.82.26 1.57.22 2.17.14.6-.08 1.76-.72 2.01-1.41.25-.69.25-1.28.17-1.41-.08-.13-.298-.2-.595-.35zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22.5c-5.79 0-10.5-4.71-10.5-10.5S6.21 1.5 12 1.5 22.5 6.21 22.5 12 17.79 22.5 12 22.5z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/sadasanghholidays" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400 transition-colors" 
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-blue-400 transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-blue-400 transition-colors">
                  Packages
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="hover:text-blue-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Sadasangh Holidays. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

