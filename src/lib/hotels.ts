import { getCollection, type CollectionEntry } from 'astro:content';

export type Hotel = CollectionEntry<'hotels'>;

export async function getFeaturedHotels(limit?: number): Promise<Hotel[]> {
  const hotels = ((await getCollection('hotels')) as Hotel[])
    .filter((hotel) => !hotel.data.draft && hotel.data.featured)
    .sort((a, b) => a.data.name.localeCompare(b.data.name));

  return typeof limit === 'number' ? hotels.slice(0, limit) : hotels;
}
