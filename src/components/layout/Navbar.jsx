import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';

/**
 * Navigation links configuration.
 * Each entry maps a display label to the corresponding section anchor id.
 */
const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

/**
 * Navbar — fixed navigation bar at the top of the viewport.
 *
 * Features:
 * - Sticky/fixed position so it stays visible while scrolling
 * - Anchor links that leverage CSS `scroll-behavior: smooth` (set in index.css)
 * - Responsive: full link list on desktop (md+), hamburger menu on mobile (<768px)
 * - All interactive elements are keyboard-navigable with focus-visible indicators
 *
 * Requirements: 1.2, 1.3, 12.5
 */
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <nav
        aria-label="Main navigation"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16"
      >
        {/* Logo / Site name */}
        <a
          href="#hero"
          className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 rounded"
          onClick={closeMenu}
        >
          Bilal Alfa Guldi
        </a>

        {/* Desktop navigation links */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger button */}
        <button
          type="button"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          {isMenuOpen ? (
            <HiX className="w-6 h-6" aria-hidden="true" />
          ) : (
            <HiMenu className="w-6 h-6" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile navigation menu */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm"
        >
          <ul className="px-4 py-3 flex flex-col gap-1" role="list">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={closeMenu}
                  className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
