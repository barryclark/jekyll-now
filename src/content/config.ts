import { defineCollection, z } from "astro:content";
const postsCollection = defineCollection({
  schema: z.object({
    author: z.string(),
    date: z.string(),
    image: z.string(),
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    profilepic: z.string(),
  }),
});

export const collections = {
  posts: postsCollection,
};
