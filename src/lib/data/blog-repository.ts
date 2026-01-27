import { Blog, CreateBlogInput, UpdateBlogInput } from '@/types/blog';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'src/lib/data/blogs.json');

const ensureDataFile = async (): Promise<void> => {
  try {
    await fs.access(DATA_FILE);
  } catch {
    const dir = path.dirname(DATA_FILE);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(DATA_FILE, '[]', 'utf-8');
  }
};

const readData = async (): Promise<Blog[]> => {
  try {
    await ensureDataFile();
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Error reading blogs:', error);
    return [];
  }
};

const writeData = async (blogs: Blog[]): Promise<void> => {
  try {
    await ensureDataFile();
    await fs.writeFile(DATA_FILE, JSON.stringify(blogs, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing blogs:', error);
    throw error;
  }
};

export const getAll = async (): Promise<Blog[]> => {
  return readData();
};

export const getBySlug = async (slug: string): Promise<Blog | null> => {
  const blogs = await readData();
  return blogs.find((blog) => blog.id === slug) || null;
};

export const getById = async (id: string): Promise<Blog | null> => {
  const blogs = await readData();
  return blogs.find((blog) => blog.id === id) || null;
};

export const create = async (input: CreateBlogInput): Promise<Blog> => {
  const blogs = await readData();
  const newBlog: Blog = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  blogs.push(newBlog);
  await writeData(blogs);
  return newBlog;
};

export const update = async (input: UpdateBlogInput): Promise<Blog | null> => {
  const blogs = await readData();
  const index = blogs.findIndex((blog) => blog.id === input.id);
  if (index === -1) return null;

  blogs[index] = {
    ...blogs[index],
    ...input,
    updatedAt: new Date().toISOString(),
  };
  await writeData(blogs);
  return blogs[index];
};

export const deleteBlog = async (id: string): Promise<boolean> => {
  const blogs = await readData();
  const filtered = blogs.filter((blog) => blog.id !== id);
  if (filtered.length === blogs.length) return false;
  await writeData(filtered);
  return true;
};
