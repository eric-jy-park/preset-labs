export interface FilterPreset {
  id: string
  name: string
  displayName: string
  photographer: string
  previewImage: string
  filters: {
    brightness: number // 0.0 - 2.0
    contrast: number // 0.0 - 2.0
    saturate: number // 0.0 - 3.0
    sepia: number // 0.0 - 1.0
    grayscale: number // 0.0 - 1.0
    hueRotate: number // 0 - 360 degrees
  }
  description: string
  credits: number
}

export const PRESETS: FilterPreset[] = [
  {
    id: "tokyo-neon",
    name: "Tokyo Neon",
    displayName: "Tokyo Neon",
    photographer: "Jesse Caris",
    previewImage: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=600&h=800&q=80",
    filters: {
      brightness: 1.2,
      contrast: 1.5,
      saturate: 2.2,
      sepia: 0,
      grayscale: 0,
      hueRotate: 0,
    },
    description: "Ultra vibrant colors with punchy contrast and neon intensity",
    credits: 2,
  },
  {
    id: "golden-hour",
    name: "Golden Hour",
    displayName: "Golden Hour",
    photographer: "Chris Karidis",
    previewImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&h=800&q=80",
    filters: {
      brightness: 1.15,
      contrast: 1.1,
      saturate: 1.3,
      sepia: 0.4,
      grayscale: 0,
      hueRotate: 0,
    },
    description: "Warm sepia tones with lifted shadows and golden glow",
    credits: 2,
  },
  {
    id: "arctic-blue",
    name: "Arctic Blue",
    displayName: "Arctic Blue",
    photographer: "Jimmy Teoh",
    previewImage: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=600&h=800&q=80",
    filters: {
      brightness: 1.1,
      contrast: 1.5,
      saturate: 0.7,
      sepia: 0,
      grayscale: 0.15,
      hueRotate: 0,
    },
    description: "Cool desaturated tones with crisp contrast and icy feel",
    credits: 2,
  },
  {
    id: "noir",
    name: "Noir",
    displayName: "Noir",
    photographer: "Aleksandar Pasaric",
    previewImage: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=600&h=800&q=80",
    filters: {
      brightness: 0.85,
      contrast: 1.8,
      saturate: 0.5,
      sepia: 0,
      grayscale: 0.4,
      hueRotate: 0,
    },
    description: "Dramatic black and white with crushed shadows and moody atmosphere",
    credits: 2,
  },
  {
    id: "vintage-film",
    name: "Vintage Film",
    displayName: "Vintage Film",
    photographer: "Sorasak",
    previewImage: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=600&h=800&q=80",
    filters: {
      brightness: 1.05,
      contrast: 0.9,
      saturate: 0.7,
      sepia: 0.5,
      grayscale: 0,
      hueRotate: 0,
    },
    description: "Muted tones with soft contrast and peaceful, zen-like atmosphere",
    credits: 2,
  },
  {
    id: "midnight",
    name: "Midnight",
    displayName: "Midnight",
    photographer: "Luca Bravo",
    previewImage: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=600&h=800&q=80",
    filters: {
      brightness: 0.75,
      contrast: 1.8,
      saturate: 0.6,
      sepia: 0,
      grayscale: 0.3,
      hueRotate: 0,
    },
    description: "Ultra dark and moody with deep crushed blacks",
    credits: 2,
  },
  {
    id: "emerald",
    name: "Emerald",
    displayName: "Emerald",
    photographer: "Artem Beliaikin",
    previewImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&h=800&q=80",
    filters: {
      brightness: 1.15,
      contrast: 1.35,
      saturate: 2.0,
      sepia: 0,
      grayscale: 0,
      hueRotate: 0,
    },
    description: "Hyper-saturated vibrant colors with lush tropical energy",
    credits: 2,
  },
  {
    id: "frost",
    name: "Frost",
    displayName: "Frost",
    photographer: "Aditya Chinchure",
    previewImage: "https://images.unsplash.com/photo-1559511260-66a654ae982a?auto=format&fit=crop&w=600&h=800&q=80",
    filters: {
      brightness: 1.08,
      contrast: 0.8,
      saturate: 0.5,
      sepia: 0,
      grayscale: 0.3,
      hueRotate: 0,
    },
    description: "Cool faded tones with soft contrast and misty atmosphere",
    credits: 2,
  },
  {
    id: "sunset-glow",
    name: "Sunset Glow",
    displayName: "Sunset Glow",
    photographer: "Nati Melnychuk",
    previewImage: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=600&h=800&q=80",
    filters: {
      brightness: 1.2,
      contrast: 1.15,
      saturate: 1.5,
      sepia: 0.35,
      grayscale: 0,
      hueRotate: 0,
    },
    description: "Warm orange-red sunset tones with enhanced saturation",
    credits: 2,
  },
  {
    id: "monochrome",
    name: "Monochrome",
    displayName: "Monochrome",
    photographer: "Norris Niman",
    previewImage: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&h=800&q=80",
    filters: {
      brightness: 1.0,
      contrast: 1.2,
      saturate: 0,
      sepia: 0,
      grayscale: 1.0,
      hueRotate: 0,
    },
    description: "Pure black and white with enhanced contrast",
    credits: 2,
  },
  {
    id: "desert-heat",
    name: "Desert Heat",
    displayName: "Desert Heat",
    photographer: "David Rodrigo",
    previewImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&h=800&q=80",
    filters: {
      brightness: 1.25,
      contrast: 1.3,
      saturate: 1.4,
      sepia: 0.4,
      grayscale: 0,
      hueRotate: 0,
    },
    description: "Warm desert tones with golden hour glow and high saturation",
    credits: 2,
  },
  {
    id: "prague-vintage",
    name: "Prague Vintage",
    displayName: "Prague Vintage",
    photographer: "Tayla Kohler",
    previewImage: "https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=600&h=800&q=80",
    filters: {
      brightness: 1.0,
      contrast: 1.05,
      saturate: 0.7,
      sepia: 0.4,
      grayscale: 0.15,
      hueRotate: 20,
    },
    description: "Film-like vintage tones with sepia warmth and faded colors",
    credits: 2,
  },
]

// Helper function to convert filter object to CSS filter string
export function applyCSSFilters(filters: FilterPreset["filters"]): string {
  return `brightness(${filters.brightness}) contrast(${filters.contrast}) saturate(${filters.saturate}) sepia(${filters.sepia}) grayscale(${filters.grayscale}) hue-rotate(${filters.hueRotate}deg)`
}

// Get preset by ID
export function getPresetById(id: string): FilterPreset | undefined {
  return PRESETS.find((preset) => preset.id === id)
}

// Get all preset IDs
export function getAllPresetIds(): string[] {
  return PRESETS.map((preset) => preset.id)
}
