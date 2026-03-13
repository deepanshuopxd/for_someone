// ====================================================
// IMAGE & VIDEO CONFIGURATION
// ====================================================
// Add your images to: public/images/us/    → 18 photos of you both
//                    public/images/her/   → 54 photos of her
//                    public/videos/       → 2 videos of her
// ====================================================

// Generate array helper
const makeArray = (folder, count, ext = 'jpg') =>
  Array.from({ length: count }, (_, i) => ({
    src: `/images/${folder}/${i + 1}.${ext}`,
    alt: `${folder} photo ${i + 1}`,
  }))

// 18 photos of you two together
export const US_PHOTOS = makeArray('us', 18)

// 54 photos of her
export const HER_PHOTOS = makeArray('her', 54)

// 2 videos of her (put .mp4 files in public/videos/)
export const HER_VIDEOS = [
  { src: '/videos/video1.mp4', poster: '/images/her/1.jpg', title: 'Our favorite moment' },
  { src: '/videos/video2.mp4', poster: '/images/her/2.jpg', title: 'Always making me smile' },
]

// Captions for "us" photos (optional — customize these!)
export const US_CAPTIONS = [
  "The day it all began... 💕",
  "Your laugh is my favorite sound",
  "Us against the world",
  "This moment, forever",
  "Where I belong",
  "Every adventure with you",
  "My favorite person",
  "You complete my world",
  "Together is our favorite place",
  "Making memories every day",
  "Happiest with you",
  "Our little story",
  "Two hearts, one love",
  "This is everything",
  "You and me, always",
  "My sunshine on cloudy days",
  "Forever isn't long enough",
  "Best chapter of my life",
]