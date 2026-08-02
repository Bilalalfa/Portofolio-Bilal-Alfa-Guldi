import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

// Lazy-loaded page components for code splitting
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));

/**
 * Minimal loading fallback shown while lazy-loaded pages are being fetched.
 */
const PageLoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <p className="text-gray-500">Memuat...</p>
  </div>
);

/**
 * App — root component that sets up providers and routing.
 *
 * Providers (outermost to innermost):
 *  1. HelmetProvider  — enables <SEOHead> (react-helmet-async) on any page
 *  2. BrowserRouter   — enables React Router hooks/components throughout the tree
 *
 * Layout:
 *  - <Navbar> is rendered above the <Routes> so it persists on all pages
 *  - <Footer> is rendered below the <Routes> so it persists on all pages
 *
 * Routes:
 *  /                → HomePage (eagerly loaded — above-the-fold content)
 *  /projects/:slug  → ProjectDetailPage (lazy-loaded)
 *  *                → NotFoundPage
 *
 * Requirements: 6.3, 7.4, 11.2
 */
function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Navbar />
        <Suspense fallback={<PageLoadingFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
