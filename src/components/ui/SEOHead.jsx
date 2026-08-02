import { Helmet } from 'react-helmet-async';

/**
 * SEOHead — sets the page `<title>` and `<meta name="description">` via React Helmet Async.
 * Must be rendered inside a `<HelmetProvider>` in the app tree.
 *
 * @param {{ title: string, description: string }} props
 */
const SEOHead = ({ title, description }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
  </Helmet>
);

export default SEOHead;
