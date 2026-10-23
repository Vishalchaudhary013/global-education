/** Campus photos used when a university has no image of its own. */
export const CAMPUS_PHOTOS = [
  "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop",
];

/**
 * Picks a stand-in photo for the card at `index`, cycling through the campus
 * photos and then the destination's city photos so neighbouring cards differ.
 */
export const fallbackPhoto = (guide, index) => {
  const pool = [
    ...CAMPUS_PHOTOS,
    ...(guide.cities || []).map((city) => city.image).filter(Boolean),
  ];
  return pool[index % pool.length];
};

/**
 * `onError` handler for card photos: swaps a broken image for the first
 * campus photo once, so a dead link never leaves an empty frame.
 */
export const handlePhotoError = (event) => {
  event.currentTarget.onerror = null;
  event.currentTarget.src = CAMPUS_PHOTOS[0];
};
