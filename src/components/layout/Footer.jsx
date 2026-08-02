import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

/**
 * Social link data. Update href values to match the owner's actual profiles.
 */
const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/bilalalfaguldi/',
    icon: FaLinkedin,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Bilalalfa',
    icon: FaGithub,
  },
  {
    label: 'Email',
    href: 'mailto:bilalalfag35@gmail.com',
    icon: MdEmail,
  },
];

const currentYear = new Date().getFullYear();

/**
 * Footer — semantic <footer> with copyright notice and social media links.
 * All external links open in a new tab with proper rel attributes.
 * Focus-visible indicators are provided for keyboard accessibility.
 */
const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-slate-950 text-gray-400 border-t border-gray-800 dark:border-slate-900 py-8 px-4 transition-colors duration-300">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        {/* Copyright */}
        <p className="text-sm text-gray-400 dark:text-slate-400">
          &copy; {currentYear} Bilal Alfa Guldi. All rights reserved.
        </p>

        {/* Social media links */}
        <nav aria-label="Social media links">
          <ul className="flex items-center gap-5 list-none m-0 p-0">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => {
              const isExternal = href.startsWith('http');
              return (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    {...(isExternal
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="text-gray-400 dark:text-slate-400 hover:text-white dark:hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded"
                  >
                    <Icon className="text-2xl" aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
