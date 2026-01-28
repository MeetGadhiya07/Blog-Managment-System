import { z } from 'zod';

export const blogSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  published: z.boolean().default(false),
});

export const updateBlogSchema = blogSchema.partial().extend({
  id: z.string(),
});

export const commentSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .optional()
      .or(z.literal('')),
    email: z
      .string()
      .email('Please enter a valid email')
      .optional()
      .or(z.literal('')),
    comment: z
      .string()
      .min(10, 'Comment must be at least 10 characters')
      .optional()
      .or(z.literal('')),
    rating: z.number().min(1).max(5).optional().or(z.literal(0)),
  })
  .refine(
    data => {
      return data.name && data.name.length >= 2;
    },
    {
      message: 'Name must be at least 2 characters',
      path: ['name'],
    }
  )
  .refine(
    data => {
      return data.email && z.string().email().safeParse(data.email).success;
    },
    {
      message: 'Please enter a valid email',
      path: ['email'],
    }
  )
  .refine(
    data => {
      return data.comment && data.comment.length >= 10;
    },
    {
      message: 'Comment must be at least 10 characters',
      path: ['comment'],
    }
  )
  .refine(
    data => {
      return data.rating && data.rating >= 1 && data.rating <= 5;
    },
    {
      message: 'Please select a rating',
      path: ['rating'],
    }
  );
