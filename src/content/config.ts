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
    season: z.enum(['Spring', 'Summer', 'Monsoon', 'Autumn', 'Winter']),
    coverImage: z.string(),
    costInr: z.number().int().positive(),
    minHeadCount: z.number().int().positive(),
    featured: z.boolean(),
    draft: z.boolean(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional()
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

export const collections = { tours, pages };
