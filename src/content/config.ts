import { defineCollection, z } from 'astro:content';

const tours = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    place: z.string(),
    durationDays: z.number().int().positive(),
    durationLabel: z.string(),
    bestMonths: z.array(z.string()),
    season: z.string(),
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
