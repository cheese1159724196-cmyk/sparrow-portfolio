
/**
 * ASSET ARCHITECTURE
 * Using jsDelivr for global CDN acceleration
 * Format: https://cdn.jsdelivr.net/gh/{user}/{repo}@{branch}/{path}
 */

export const CDN_BASE = 'https://cdn.jsdelivr.net/gh/cheese1159724196-cmyk/sparrow-portfolio@main';
export const GITHUB_IMAGE_BASE = `${CDN_BASE}/images`;
export const GITHUB_VIDEO_BASE = `${CDN_BASE}/videos`;

// Helper to generate padded video filenames
const getPaddedVideoUrl = (index: number) => {
  const num = index.toString().padStart(3, '0');
  return `${GITHUB_VIDEO_BASE}/video${num}.mp4`;
};

// Helper to generate Optimized Unsplash URLs
export const getUnsplashUrl = (url: string, width: number = 2000, quality: number = 80, blur: number = 0): string => {
  if (!url || !url.includes('images.unsplash.com')) return url;
  try {
    const urlObj = new URL(url);
    urlObj.searchParams.set('w', width.toString());
    urlObj.searchParams.set('q', quality.toString());
    urlObj.searchParams.set('auto', 'format');
    urlObj.searchParams.set('fit', 'crop');
    if (blur > 0) {
      urlObj.searchParams.set('blur', blur.toString());
    } else {
      urlObj.searchParams.delete('blur');
    }
    return urlObj.toString();
  } catch {
    return url;
  }
};

export const GLOBAL_ASSETS = {
  // Directly providing the requested video link formatted for CDN
  HERO_VIDEO: `${GITHUB_VIDEO_BASE}/video001.mp4`,
  HERO_POSTER: `${GITHUB_IMAGE_BASE}/project1.png`, 
};

export const PROJECTS = [
  {
    id: '01',
    title: '永恒曲线：911 GTS AIGC 探索',
    category: 'AIGC / Automotive',
    client: 'Self-Initiated Project',
    year: '2025',
    tagline: 'Where precision engineering meets digital hallucination.',
    coverImage: `${GITHUB_IMAGE_BASE}/project2.png`, 
    videoPreview: getPaddedVideoUrl(1),
    fullVideo: getPaddedVideoUrl(1),
    description: 'An experimental study pushing the boundaries of automotive visualization. Using custom-trained LoRA models and generative workflows, we reimagined the iconic silhouette of the 911 GTS through a lens of liquid metal and kinetic light.',
    credits: [
      { role: 'Creative Director', name: 'Sparrow' },
      { role: 'AI Specialist', name: 'System 01' },
      { role: 'Sound Design', name: 'Hz Lab' }
    ]
  },
  {
    id: '02',
    title: 'Neon Pulse',
    category: 'Motion Design / Brand Identity',
    year: '2023',
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
    videoPreview: getPaddedVideoUrl(2),
    fullVideo: getPaddedVideoUrl(2),
    description: 'Capturing the electric energy of nocturnal cityscapes through synchronized light and sound architecture.',
    credits: [
      { role: 'Lead Motion', name: 'Jane Doe' },
      { role: 'Lighting', name: 'Neon Lab' }
    ]
  },
  {
    id: '03',
    title: 'Minimalist Void',
    category: 'CGI Art / Abstract',
    year: '2024',
    coverImage: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2076&auto=format&fit=crop',
    videoPreview: getPaddedVideoUrl(3),
    fullVideo: getPaddedVideoUrl(3),
    description: 'A study of negative space and architectural tension, where silence is as loud as sound.',
    credits: [
      { role: 'Concept', name: 'Sparrow Visuals' },
      { role: 'CGI Artist', name: 'Marcus Kai' }
    ]
  },
  {
    id: '04',
    title: 'Velocity X',
    category: 'Commercial / VFX',
    year: '2023',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop',
    videoPreview: getPaddedVideoUrl(4),
    fullVideo: getPaddedVideoUrl(4),
    description: 'High-speed cinematography blended with procedural particle effects for a global automotive campaign.',
    credits: [
      { role: 'Director', name: 'Li Wei' },
      { role: 'VFX Supervisor', name: 'Sparrow Team' }
    ]
  },
  {
    id: '05',
    title: 'Organic Core',
    category: 'Bio-Digital Art',
    year: '2024',
    coverImage: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?q=80&w=2037&auto=format&fit=crop',
    videoPreview: getPaddedVideoUrl(5),
    fullVideo: getPaddedVideoUrl(5),
    description: 'Investigating the microscopic textures of biological life through high-fidelity digital modeling.',
    credits: [
      { role: 'Lead Artist', name: 'Sparrow' }
    ]
  },
  {
    id: '06',
    title: 'Cyber Kinetic',
    category: 'Robotics / Motion',
    year: '2023',
    coverImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2070&auto=format&fit=crop',
    videoPreview: getPaddedVideoUrl(6),
    fullVideo: getPaddedVideoUrl(6),
    description: 'Mechanical precision meets artistic fluid motion in this study of kinetic sculptures.',
    credits: [
      { role: 'Concept', name: 'Visual Lab' }
    ]
  },
  {
    id: '07',
    title: 'Luminous Path',
    category: 'Experiential / Light',
    year: '2024',
    coverImage: 'https://images.unsplash.com/photo-1514306191717-452ec28c7f42?q=80&w=2070&auto=format&fit=crop',
    videoPreview: getPaddedVideoUrl(7),
    fullVideo: getPaddedVideoUrl(7),
    description: 'A sensory journey through shifting light and shadow, exploring the limits of human perception.',
    credits: [
      { role: 'Installation', name: 'Sparrow Visuals' }
    ]
  },
  {
    id: '08',
    title: 'Fluid Geometry',
    category: 'Mathematical Art',
    year: '2023',
    coverImage: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1974&auto=format&fit=crop',
    videoPreview: getPaddedVideoUrl(8),
    fullVideo: getPaddedVideoUrl(8),
    description: 'Complex mathematical algorithms translated into beautiful, flowing visual structures.',
    credits: [
      { role: 'Developer', name: 'Code & Art' }
    ]
  },
  {
    id: '09',
    title: 'Future Heritage',
    category: '3D Archviz / Culture',
    year: '2024',
    coverImage: 'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?q=80&w=2155&auto=format&fit=crop',
    videoPreview: getPaddedVideoUrl(9),
    fullVideo: getPaddedVideoUrl(9),
    description: 'Reimagining traditional cultural symbols through the lens of futuristic architecture.',
    credits: [
      { role: 'Art Direction', name: 'Sparrow' }
    ]
  }
];
