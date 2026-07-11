import type { APIRoute } from 'astro';
import { getAllTours, getTourImage } from '../../lib/tours';

export const GET: APIRoute = async () => {
  const tours = await getAllTours();

  return new Response(
    JSON.stringify(
      tours.map((tour) => ({
        title: tour.data.title,
        slug: tour.slug,
        place: tour.data.place,
        duration: tour.data.duration,
        bestMonths: tour.data.bestMonths,
        season: tour.data.season,
        travelStyle: tour.data.travelStyle,
        coverImage: getTourImage(tour),
        costInr: tour.data.costInr,
        minHeadCount: tour.data.minHeadCount
      }))
    ),
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
};
