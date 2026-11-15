/**
 * CENTRALIZED IMAGE CONFIG
 * ------------------------------------------------------------------
 * To replace placeholder art with real client photography:
 *   1. Drop the file into /public/photos/
 *   2. Set `src` below, e.g. src: "/photos/hero.jpg"
 *   3. Set `alt` to a real description.
 * While `src` is empty a designed placeholder frame is rendered.
 * `tone` controls the placeholder atmosphere only.
 */

export type PhotoSlot = {
  src?: string;
  alt: string;
  label: string;
  tone: "red" | "steel" | "dark";
  /** CSS object-position for cropping real photos */
  position?: string;
};

// Temporary Unsplash imagery for the site preview. Replace these CDN URLs
// with the studio's own images when they are ready.
const gymPhotos = [
  "https://images.unsplash.com/photo-1545612036-2872840642dc?auto=format&fit=crop&w=1800&q=82",
  "https://images.unsplash.com/photo-1778828494354-9b717d36dc99?auto=format&fit=crop&w=1800&q=82",
  "https://images.unsplash.com/photo-1659331150328-e6c822ae77b2?auto=format&fit=crop&w=1800&q=82",
  "https://images.unsplash.com/photo-1744551472900-d23f4997e1cd?auto=format&fit=crop&w=1800&q=82",
  "https://images.unsplash.com/photo-1689877020200-403d8542d95d?auto=format&fit=crop&w=1800&q=82",
];

type PhotosConfig = {
  hero: PhotoSlot;
  philosophy: PhotoSlot;
  training: Record<"strength" | "weight" | "personal" | "functional" | "cardio" | "performance", PhotoSlot>;
  facility: PhotoSlot[];
  mindset: PhotoSlot;
  community: PhotoSlot[];
};

export const photos: PhotosConfig = {
  hero: {
    src: gymPhotos[3],
    alt: "Athlete training in a dramatic industrial gym",
    label: "Hero photograph: athlete in training environment",
    tone: "red",
    position: "60% 40%",
  },
  philosophy: {
    src: gymPhotos[0],
    alt: "Close detail of a barbell under dramatic light",
    label: "Philosophy photograph: barbell detail",
    tone: "steel",
  },
  training: {
    strength: { src: gymPhotos[3], alt: "Athlete lifting weights", label: "Strength Training photo", tone: "red" },
    weight: { src: gymPhotos[2], alt: "Weight training in a gym", label: "Weight Training photo", tone: "steel" },
    personal: { src: gymPhotos[1], alt: "Personal training session", label: "Personal Training photo", tone: "dark" },
    functional: { src: gymPhotos[4], alt: "Functional fitness equipment", label: "Functional Fitness photo", tone: "steel" },
    cardio: { src: gymPhotos[1], alt: "Cardio equipment in a gym", label: "Cardio Training photo", tone: "red" },
    performance: { src: gymPhotos[3], alt: "Athlete training for performance", label: "Performance Training photo", tone: "dark" },
  },
  facility: [
    { src: gymPhotos[0], alt: "Training floor with gym equipment", label: "Facility: training floor", tone: "steel" },
    { src: gymPhotos[2], alt: "Weight station", label: "Facility: weight station", tone: "dark" },
    { src: gymPhotos[4], alt: "Modern gym interior", label: "Facility: interior", tone: "red" },
    { src: gymPhotos[1], alt: "Gym equipment detail", label: "Facility: equipment detail", tone: "steel" },
    { src: gymPhotos[0], alt: "Gym architecture and training space", label: "Facility: architecture", tone: "dark" },
    { src: gymPhotos[2], alt: "Gym lighting and atmosphere", label: "Facility: atmosphere", tone: "red" },
  ],
  mindset: {
    src: gymPhotos[3],
    alt: "Athlete focused mid-training",
    label: "Mindset photograph: athlete focus",
    tone: "dark",
  },
  community: [
    { src: gymPhotos[1], alt: "Members training together", label: "Community photo one", tone: "steel" },
    { src: gymPhotos[4], alt: "Group training session", label: "Community photo two", tone: "red" },
    { src: gymPhotos[3], alt: "Members motivating each other", label: "Community photo three", tone: "dark" },
  ],
};
