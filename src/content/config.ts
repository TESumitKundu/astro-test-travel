import { defineCollection, z } from 'astro:content';

const tours = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    place: z.string(),
    duration: z.object({
      days: z.number().int().positive(),
      nights: z.number().int().nonnegative()
    }),
    bestMonths: z.array(
      z.enum([
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
      ])
    ),
    season: z.array(z.enum(['Spring', 'Summer', 'Monsoon', 'Autumn', 'Winter'])),
    travelStyle: z.array(
      z.enum([
        'Mountain',
        'Forest',
        'Pilgrimage',
        'Beach',
        'Heritage',
        'Backwater',
        'Wildlife',
        'Adventure',
        'Culture',
        'Leisure'
      ])
    ).default([]),
    placesToCover: z.array(
      z.object({
        name: z.string(),
        nights: z.number().int().nonnegative()
      })
    ).default([]),
    coverImage: z.string().optional(),
    coverImageUrl: z.string().url().optional(),
    costInr: z.number().int().positive(),
    minHeadCount: z.number().int().positive(),
    featured: z.boolean(),
    draft: z.boolean(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional()
  }).refine((data) => data.coverImage || data.coverImageUrl, {
    message: 'Add either a cover image upload or a cover image URL.',
    path: ['coverImage']
  })
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional()
  })
});

const hotels = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    place: z.string(),
    startingRoomPriceInr: z.number().int().positive(),
    images: z.array(z.string()).min(1),
    website: z.string().url().optional(),
    note: z.string(),
    featured: z.boolean(),
    draft: z.boolean()
  })
});

export const collections = { tours, pages, hotels };
