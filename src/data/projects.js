/**
 * Static fallback data for projects section.
 * Used when CMS is unavailable or not configured.
 *
 * Shape: Project[]
 */

export const projects = [
  {
    slug: 'nsosyal-app-creathon',
    title: 'N’Sosyal App - UI/UX & Mobile Design',
    shortDescription:
      'Perancangan antarmuka aplikasi pembelajaran interaktif berbasis mobile yang berfokus pada pengalaman pengguna yang intuitif dan menarik.',
    detailedDescription:
      'N’Sosyal Super App adalah proyek perancangan aplikasi seluler yang bertujuan untuk mempermudah siswa dan pengguna dalam mengakses fitur sosial dan pembelajaran interaktif. Proyek ini mencakup riset pengguna (user research), pembuatan wireframe, prototyping high-fidelity di Figma, serta pengujian keterpakaian (usability testing). Fokus utama aplikasi ini adalah menyajikan antarmuka visual yang modern, bersih, dan ramah pengguna.',
    techStack: ['Figma', 'UI/UX Design', 'Prototyping', 'User Research', 'Mobile App'],
    tags: ['UI/UX', 'Mobile'],
    role: 'UI/UX Designer & Lead Researcher',
    thumbnailImage: {
      url: '/nsosyal.png',
      alt: "N'Sosyal App UI Design Showcase",
    },
    images: [
      {
        url: '/nsosyal.png',
        alt: "N'Sosyal App UI Screen",
      },
    ],
    liveDemoUrl:
      'https://www.figma.com/proto/Pf7slyaFAKu0KdEd4UB8Qk/Teknofest-2025?node-id=475-7519&viewport=-2734%2C4255%2C1.92&t=NOTvu08BR3vGRdDs-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=463%3A6557&page-id=23%3A6',
    sourceCodeUrl: null,
    category: 'UI/UX Design',
  },
  {
    slug: 'greenest-mobile-app',
    title: 'Greenest Mobile App',
    shortDescription:
      'Platform pelacak aktivitas hijau berbasis web & mobile dengan grafik visualisasi data yang responsif.',
    detailedDescription:
      'Designing user experience (UX) and application interface (UI) for Greenest, a digital platform that promotes sustainable lifestyles and environmental management.',
    techStack: ['Figma', 'UI/UX Design', 'Prototyping', 'User Research', 'Mobile App'],
    tags: ['Mobile', 'UI/UX'],
    role: 'UI/UX Designer',
    thumbnailImage: {
      url: '/Greenest.png',
      alt: 'Greenest Mobile App Design Showcase',
    },
    images: [
      {
        url: '/Greenest.png',
        alt: 'Greenest Mobile App Design Showcase',
      },
    ],
    liveDemoUrl:
      'https://www.figma.com/proto/7frsAiWwK5EoZOhhaMpzAe/Greenest-Mobile-App?node-id=1-1359&viewport=434%2C680%2C0.46&t=iN4Ce0njUtPyhjAn-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=1%3A1340&page-id=0%3A1',
    sourceCodeUrl: null,
    category: 'UI/UX Design',
  },
  {
    slug: 'ppibartin-app',
    title: 'PPI Bartin Mobile App',
    shortDescription:
      'Platform pelacak aktivitas hijau berbasis web & mobile dengan grafik visualisasi data yang responsif.',
    detailedDescription:
      'Designing user experience (UX) and application interface (UI) for Greenest, a digital platform that promotes sustainable lifestyles and environmental management.',
    techStack: ['Figma', 'UI/UX Design', 'Prototyping', 'User Research', 'Mobile App'],
    tags: ['Mobile', 'UI/UX'],
    role: 'UI/UX Designer',
    thumbnailImage: {
      url: '/PPIBartin.png',
      alt: 'PPI Bartin Mobile App Design Showcase',
    },
    images: [
      {
        url: '/PPIBartin.png',
        alt: 'PPI Bartin Mobile App Design Showcase',
      },
    ],
    liveDemoUrl:
      'https://www.figma.com/proto/98qB9k4GNt48lftK1xZEjR/Website-PPI-Bartin?node-id=4-154&viewport=-127%2C1744%2C0.54&t=GILrrZjaAM8GOPGq-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=340%3A405&page-id=0%3A1',
    sourceCodeUrl: null,
    category: 'UI/UX Design',
  },
  /* {
    slug: 'ollama-vision',
    title: 'Ollama Vision (Offline AI Personal Assistant)',
    shortDescription:
      'Aplikasi asisten AI personal offline yang menyediakan akses informasi dan bantuan berbasis kecerdasan buatan tanpa memerlukan koneksi internet.',
    detailedDescription:
      'Ollama Vision is an offline AI personal assistant application designed to provide users with convenient access to information and AI-powered assistance without relying on an internet connection. The application leverages the capabilities of Ollama\'s local large language models (LLMs) to process user queries and generate intelligent responses. The interface prioritizes ease of use, quick access to core features, and a seamless user experience for daily tasks and information retrieval.',
    techStack: ['React', 'Tailwind CSS', 'Ollama API', 'JavaScript', 'Web App'],
    tags: ['AI', 'Web App'],
    role: 'UI/UX Designer',
    thumbnailImage: {
      url: '/OllamaVision.png',
      alt: 'Ollama Vision (Offline AI Personal Assistant) Design Showcase',
    },
    images: [
      {
        url: '/OllamaVision.png',
        alt: 'Ollama Vision (Offline AI Personal Assistant) Design Showcase',
      },
    ],
    liveDemoUrl:
      'https://www.figma.com/proto/98qB9k4GNt48lftK1xZEjR/Website-PPI-Bartin?node-id=4-154&viewport=-127%2C1744%2C0.54&t=GILrrZjaAM8GOPGq-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=340%3A405&page-id=0%3A1',
    sourceCodeUrl: null,
    category: 'UI/UX Design',
  }, 
  {
    slug: 'ollama-vision',
    title: 'Ollama Vision (Offline AI Personal Assistant)',
    shortDescription:
      'Aplikasi asisten AI personal offline yang menyediakan akses informasi dan bantuan berbasis kecerdasan buatan tanpa memerlukan koneksi internet.',
    detailedDescription:
      'Ollama Vision is an offline AI personal assistant application designed to provide users with convenient access to information and AI-powered assistance without relying on an internet connection. The application leverages the capabilities of Ollama\'s local large language models (LLMs) to process user queries and generate intelligent responses. The interface prioritizes ease of use, quick access to core features, and a seamless user experience for daily tasks and information retrieval.',
    techStack: ['React', 'Tailwind CSS', 'Ollama API', 'JavaScript', 'Web App'],
    tags: ['AI', 'Web App'],
    role: 'UI/UX Designer',
    thumbnailImage: {
      url: '/OllamaVision.png',
      alt: 'Ollama Vision (Offline AI Personal Assistant) Design Showcase',
    },
    images: [
      {
        url: '/OllamaVision.png',
        alt: 'Ollama Vision (Offline AI Personal Assistant) Design Showcase',
      },
    ],
    liveDemoUrl:
      'https://www.figma.com/proto/98qB9k4GNt48lftK1xZEjR/Website-PPI-Bartin?node-id=4-154&viewport=-127%2C1744%2C0.54&t=GILrrZjaAM8GOPGq-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=340%3A405&page-id=0%3A1',
    sourceCodeUrl: null,
    category: 'UI/UX Design',
  },*/
];

export default projects;
