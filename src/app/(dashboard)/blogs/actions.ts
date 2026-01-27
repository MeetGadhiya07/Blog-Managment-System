'use server';

import { revalidatePath } from 'next/cache';
import * as blogRepository from '@/lib/data/blog-repository';
import { blogSchema, updateBlogSchema } from '@/lib/validations/blog';
import { CreateBlogInput, UpdateBlogInput } from '@/types/blog';

export async function createBlog(data: CreateBlogInput) {
  try {
    const validated = blogSchema.parse(data);
    const blog = await blogRepository.create(validated);
    revalidatePath('/blogs');
    return { success: true, data: blog };
  } catch (error) {
    console.error('Create blog error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create blog',
    };
  }
}

export async function updateBlog(data: UpdateBlogInput) {
  try {
    const validated = updateBlogSchema.parse(data);
    const blog = await blogRepository.update(validated);
    if (!blog) return { success: false, error: 'Blog not found' };
    revalidatePath('/blogs');
    return { success: true, data: blog };
  } catch (error) {
    console.error('Update blog error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update blog',
    };
  }
}

export async function deleteBlog(id: string) {
  try {
    const deleted = await blogRepository.deleteBlog(id);
    if (!deleted) return { success: false, error: 'Blog not found' };
    revalidatePath('/blogs');
    return { success: true };
  } catch (error) {
    console.error('Delete blog error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete blog',
    };
  }
}

export async function getBlogs() {
  try {
    return await blogRepository.getAll();
  } catch (error) {
    console.error('Get blogs error:', error);
    return [];
  }
}

export async function getBlogById(id: string) {
  try {
    return await blogRepository.getById(id);
  } catch (error) {
    console.error('Get blog error:', error);
    return null;
  }
}
