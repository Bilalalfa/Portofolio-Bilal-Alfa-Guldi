import { Link } from 'react-router-dom';
import SEOHead from '../components/ui/SEOHead';

/**
 * NotFoundPage — displayed for any unmatched route (404).
 * Shows a 404 message and a link back to the home page.
 */
const NotFoundPage = () => {
  return (
    <>
      <SEOHead
        title="404 Not Found — Your Name"
        description="Halaman yang Anda cari tidak ditemukan."
      />
      <main className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="text-9xl font-bold text-gray-800 dark:text-gray-100">404</h1>
        <p className="mt-4 text-2xl font-semibold text-gray-600 dark:text-gray-300">
          Page not found
        </p>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Halaman yang Anda cari tidak ditemukan atau telah dipindahkan.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
        >
          Kembali ke Beranda
        </Link>
      </main>
    </>
  );
};

export default NotFoundPage;
