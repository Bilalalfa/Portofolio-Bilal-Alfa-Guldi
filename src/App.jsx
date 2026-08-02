import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import AIChatWidget from './components/ui/AIChatWidget';

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
        <AIChatWidget />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
