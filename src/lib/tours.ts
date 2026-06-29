import { getCollection, type CollectionEntry } from 'astro:content';

export type Tour = CollectionEntry<'tours'>;

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
] as const;

const byCost = (a: Tour, b: Tour) => a.data.costInr - b.data.costInr;
const byDuration = (a: Tour, b: Tour) => a.data.duration.days - b.data.duration.days;
const published = (tour: Tour) => !tour.data.draft;

export function getCurrentMonthName(date = new Date()) {
  return monthNames[date.getMonth()];
}

export async function getAllTours(): Promise<Tour[]> {
  return ((await getCollection('tours')) as Tour[])
    .filter(published)
    .sort((a, b) => a.data.title.localeCompare(b.data.title));
}

export async function getCurrentMonthTours(limit = 6): Promise<Tour[]> {
  const currentMonth = getCurrentMonthName();

  return (await getAllTours())
    .filter((tour) => tour.data.bestMonths.includes(currentMonth))
    .sort(byCost)
    .slice(0, limit);
}

export async function getShortDurationTours(limit = 8): Promise<Tour[]> {
  return (await getAllTours())
    .filter((tour) => tour.data.duration.days <= 4)
    .sort(byDuration)
    .slice(0, limit);
}

export async function getLongDurationTours(limit = 8): Promise<Tour[]> {
  return (await getAllTours())
    .filter((tour) => tour.data.duration.days >= 5)
    .sort(byDuration)
    .slice(0, limit);
}

export async function getRelatedTours(current: Tour, limit = 3): Promise<Tour[]> {
  return (await getAllTours())
    .filter((tour) => tour.slug !== current.slug)
    .filter(
      (tour) =>
        tour.data.place === current.data.place ||
        tour.data.season === current.data.season ||
        tour.data.bestMonths.some((month) => current.data.bestMonths.includes(month))
    )
    .slice(0, limit);
}

export async function getAllPlaces(): Promise<string[]> {
  return [...new Set((await getAllTours()).map((tour) => tour.data.place))].sort();
}

export async function getAllSeasons(): Promise<string[]> {
  return [...new Set((await getAllTours()).map((tour) => tour.data.season))].sort();
}

export function getAllMonths(): string[] {
  return [...monthNames];
}

export function formatInr(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatDuration(duration: Tour['data']['duration']) {
  return `${duration.nights} ${duration.nights === 1 ? 'Night' : 'Nights'} / ${duration.days} ${duration.days === 1 ? 'Day' : 'Days'}`;
}
