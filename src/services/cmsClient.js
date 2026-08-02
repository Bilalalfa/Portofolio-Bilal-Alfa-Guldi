/**
 * CMS Client Adapter
 *
 * Abstraksi layer yang memisahkan logika CMS dari komponen.
 * Switch otomatis antara Contentful dan Sanity berdasarkan VITE_CMS_TYPE.
 *
 * Setiap fungsi di-wrap dengan try-catch dan mengembalikan [] atau null
 * jika terjadi error — tidak pernah throw — sehingga komponen dapat
 * menampilkan fallback secara graceful (Requirements: 10.3).
 */

const CMS_TYPE = import.meta.env.VITE_CMS_TYPE; // 'contentful' | 'sanity'

// ---------------------------------------------------------------------------
// Contentful helpers
// ---------------------------------------------------------------------------

/**
 * Membuat Contentful client secara lazy (dynamic import untuk code splitting).
 * @returns {Promise<import('contentful').ContentfulClientApi>}
 */
async function createContentfulClient() {
  const { createClient } = await import('contentful');
  return createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
  });
}

/**
 * Memetakan asset Contentful ke shape CMSImage.
 * @param {object} asset - Contentful asset object
 * @returns {object} CMSImage
 */
function mapContentfulImage(asset) {
  const f = asset.fields ?? {};
  const file = f.file ?? {};
  return {
    url: file.url ? `https:${file.url}` : '',
    alt: f.title ?? f.description ?? '',
    width: file.details?.image?.width ?? null,
    height: file.details?.image?.height ?? null,
  };
}

/**
 * Memetakan entry Contentful ke shape Project.
 * @param {object} entry - Contentful entry object
 * @returns {object} Project
 */
function mapContentfulProject(entry) {
  const f = entry.fields ?? {};
  return {
    slug: f.slug ?? '',
    title: f.title ?? '',
    shortDescription: f.shortDescription ?? '',
    detailedDescription: f.detailedDescription ?? null,
    techStack: f.techStack ?? [],
    tags: f.tags ?? [],
    role: f.role ?? '',
    images: (f.images ?? []).map(mapContentfulImage),
    thumbnailImage: f.thumbnailImage ? mapContentfulImage(f.thumbnailImage) : null,
    liveDemoUrl: f.liveDemoUrl ?? null,
    sourceCodeUrl: f.sourceCodeUrl ?? null,
    category: f.category ?? null,
  };
}

/**
 * Memetakan entry Contentful ke shape BlogPost.
 * @param {object} entry - Contentful entry object
 * @returns {object} BlogPost
 */
function mapContentfulBlogPost(entry) {
  const f = entry.fields ?? {};
  return {
    slug: f.slug ?? '',
    title: f.title ?? '',
    excerpt: f.excerpt ?? '',
    content: f.content ?? null,
    coverImage: f.coverImage ? mapContentfulImage(f.coverImage) : null,
    publishedDate: f.publishedDate ?? null,
    author: f.author ?? '',
  };
}

/**
 * Memetakan entry Contentful ke shape TimelineEntry.
 * @param {object} entry - Contentful entry object
 * @returns {object} TimelineEntry
 */
function mapContentfulTimelineEntry(entry) {
  const f = entry.fields ?? {};
  return {
    id: entry.sys?.id ?? '',
    type: f.type ?? 'experience',
    institutionOrCompany: f.institutionOrCompany ?? '',
    roleOrDegree: f.roleOrDegree ?? '',
    startDate: f.startDate ?? '',
    endDate: f.endDate ?? null,
    description: f.description ?? '',
  };
}

// ---------------------------------------------------------------------------
// Sanity helpers
// ---------------------------------------------------------------------------

/**
 * Membuat Sanity client secara lazy (dynamic import untuk code splitting).
 * @returns {Promise<import('@sanity/client').SanityClient>}
 */
async function createSanityClient() {
  const { createClient } = await import('@sanity/client');
  return createClient({
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
    dataset: import.meta.env.VITE_SANITY_DATASET ?? 'production',
    token: import.meta.env.VITE_SANITY_API_TOKEN,
    useCdn: true,
    apiVersion: '2024-01-01',
  });
}

/**
 * Memetakan image reference Sanity ke shape CMSImage.
 * Mengasumsikan URL sudah di-project via GROQ query (asset->url).
 * @param {object} img - Sanity image object
 * @returns {object} CMSImage
 */
function mapSanityImage(img) {
  return {
    url: img.url ?? img.asset?.url ?? '',
    alt: img.alt ?? '',
    width: img.width ?? img.asset?.metadata?.dimensions?.width ?? null,
    height: img.height ?? img.asset?.metadata?.dimensions?.height ?? null,
  };
}

/**
 * Memetakan dokumen Sanity ke shape Project.
 * @param {object} doc - Sanity document
 * @returns {object} Project
 */
function mapSanityProject(doc) {
  return {
    slug: doc.slug?.current ?? doc.slug ?? '',
    title: doc.title ?? '',
    shortDescription: doc.shortDescription ?? '',
    detailedDescription: doc.detailedDescription ?? null,
    techStack: doc.techStack ?? [],
    tags: doc.tags ?? [],
    role: doc.role ?? '',
    images: (doc.images ?? []).map(mapSanityImage),
    thumbnailImage: doc.thumbnailImage ? mapSanityImage(doc.thumbnailImage) : null,
    liveDemoUrl: doc.liveDemoUrl ?? null,
    sourceCodeUrl: doc.sourceCodeUrl ?? null,
    category: doc.category ?? null,
  };
}

/**
 * Memetakan dokumen Sanity ke shape BlogPost.
 * @param {object} doc - Sanity document
 * @returns {object} BlogPost
 */
function mapSanityBlogPost(doc) {
  return {
    slug: doc.slug?.current ?? doc.slug ?? '',
    title: doc.title ?? '',
    excerpt: doc.excerpt ?? '',
    content: doc.content ?? null,
    coverImage: doc.coverImage ? mapSanityImage(doc.coverImage) : null,
    publishedDate: doc.publishedDate ?? null,
    author: doc.author?.name ?? doc.author ?? '',
  };
}

/**
 * Memetakan dokumen Sanity ke shape TimelineEntry.
 * @param {object} doc - Sanity document
 * @returns {object} TimelineEntry
 */
function mapSanityTimelineEntry(doc) {
  return {
    id: doc._id ?? '',
    type: doc.type ?? 'experience',
    institutionOrCompany: doc.institutionOrCompany ?? '',
    roleOrDegree: doc.roleOrDegree ?? '',
    startDate: doc.startDate ?? '',
    endDate: doc.endDate ?? null,
    description: doc.description ?? '',
  };
}

// ---------------------------------------------------------------------------
// Exported public API (Requirements: 10.1, 10.2, 10.3)
// ---------------------------------------------------------------------------

/**
 * Fetch semua proyek dari CMS.
 * @returns {Promise<object[]>} Array of Project; [] jika CMS tidak tersedia atau gagal
 */
export async function fetchProjects() {
  try {
    if (CMS_TYPE === 'contentful') {
      const client = await createContentfulClient();
      const response = await client.getEntries({ content_type: 'project' });
      return response.items.map(mapContentfulProject);
    }

    if (CMS_TYPE === 'sanity') {
      const client = await createSanityClient();
      const docs = await client.fetch(
        `*[_type == "project"]{
          slug, title, shortDescription, detailedDescription,
          techStack, tags, role, category, liveDemoUrl, sourceCodeUrl,
          "thumbnailImage": thumbnailImage{
            "url": asset->url, alt,
            "width": asset->metadata.dimensions.width,
            "height": asset->metadata.dimensions.height
          },
          "images": images[]{
            "url": asset->url, alt,
            "width": asset->metadata.dimensions.width,
            "height": asset->metadata.dimensions.height
          }
        }`
      );
      return docs.map(mapSanityProject);
    }

    // VITE_CMS_TYPE tidak diset atau tidak dikenal — kembalikan array kosong
    return [];
  } catch (error) {
    console.error('[cmsClient] fetchProjects failed:', error);
    return [];
  }
}

/**
 * Fetch satu proyek berdasarkan slug.
 * @param {string} slug
 * @returns {Promise<object|null>} Project atau null jika tidak ditemukan / gagal
 */
export async function fetchProjectBySlug(slug) {
  try {
    if (CMS_TYPE === 'contentful') {
      const client = await createContentfulClient();
      const response = await client.getEntries({
        content_type: 'project',
        'fields.slug': slug,
        limit: 1,
      });
      if (!response.items.length) return null;
      return mapContentfulProject(response.items[0]);
    }

    if (CMS_TYPE === 'sanity') {
      const client = await createSanityClient();
      const doc = await client.fetch(
        `*[_type == "project" && slug.current == $slug][0]{
          slug, title, shortDescription, detailedDescription,
          techStack, tags, role, category, liveDemoUrl, sourceCodeUrl,
          "thumbnailImage": thumbnailImage{
            "url": asset->url, alt,
            "width": asset->metadata.dimensions.width,
            "height": asset->metadata.dimensions.height
          },
          "images": images[]{
            "url": asset->url, alt,
            "width": asset->metadata.dimensions.width,
            "height": asset->metadata.dimensions.height
          }
        }`,
        { slug }
      );
      if (!doc) return null;
      return mapSanityProject(doc);
    }

    return null;
  } catch (error) {
    console.error('[cmsClient] fetchProjectBySlug failed:', error);
    return null;
  }
}

/**
 * Fetch semua blog posts dari CMS.
 * @returns {Promise<object[]>} Array of BlogPost; [] jika CMS tidak tersedia atau gagal
 */
export async function fetchBlogPosts() {
  try {
    if (CMS_TYPE === 'contentful') {
      const client = await createContentfulClient();
      const response = await client.getEntries({ content_type: 'blogPost' });
      return response.items.map(mapContentfulBlogPost);
    }

    if (CMS_TYPE === 'sanity') {
      const client = await createSanityClient();
      const docs = await client.fetch(
        `*[_type == "blogPost"]{
          slug, title, excerpt, content, publishedDate,
          "author": author->name,
          "coverImage": coverImage{
            "url": asset->url, alt,
            "width": asset->metadata.dimensions.width,
            "height": asset->metadata.dimensions.height
          }
        }`
      );
      return docs.map(mapSanityBlogPost);
    }

    return [];
  } catch (error) {
    console.error('[cmsClient] fetchBlogPosts failed:', error);
    return [];
  }
}

/**
 * Fetch satu blog post berdasarkan slug.
 * @param {string} slug
 * @returns {Promise<object|null>} BlogPost atau null jika tidak ditemukan / gagal
 */
export async function fetchBlogPostBySlug(slug) {
  try {
    if (CMS_TYPE === 'contentful') {
      const client = await createContentfulClient();
      const response = await client.getEntries({
        content_type: 'blogPost',
        'fields.slug': slug,
        limit: 1,
      });
      if (!response.items.length) return null;
      return mapContentfulBlogPost(response.items[0]);
    }

    if (CMS_TYPE === 'sanity') {
      const client = await createSanityClient();
      const doc = await client.fetch(
        `*[_type == "blogPost" && slug.current == $slug][0]{
          slug, title, excerpt, content, publishedDate,
          "author": author->name,
          "coverImage": coverImage{
            "url": asset->url, alt,
            "width": asset->metadata.dimensions.width,
            "height": asset->metadata.dimensions.height
          }
        }`,
        { slug }
      );
      if (!doc) return null;
      return mapSanityBlogPost(doc);
    }

    return null;
  } catch (error) {
    console.error('[cmsClient] fetchBlogPostBySlug failed:', error);
    return null;
  }
}

/**
 * Fetch semua timeline entries dari CMS.
 * @returns {Promise<object[]>} Array of TimelineEntry; [] jika CMS tidak tersedia atau gagal
 */
export async function fetchTimelineEntries() {
  try {
    if (CMS_TYPE === 'contentful') {
      const client = await createContentfulClient();
      const response = await client.getEntries({ content_type: 'timelineEntry' });
      return response.items.map(mapContentfulTimelineEntry);
    }

    if (CMS_TYPE === 'sanity') {
      const client = await createSanityClient();
      const docs = await client.fetch(
        `*[_type == "timelineEntry"]{
          _id, type, institutionOrCompany, roleOrDegree,
          startDate, endDate, description
        }`
      );
      return docs.map(mapSanityTimelineEntry);
    }

    return [];
  } catch (error) {
    console.error('[cmsClient] fetchTimelineEntries failed:', error);
    return [];
  }
}
