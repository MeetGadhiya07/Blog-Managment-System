import { Comment, CreateCommentInput } from '@/types/blog';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'src/lib/data/comments.json');

interface CommentData {
  [blogId: string]: Comment[];
}

const ensureDataFile = async (): Promise<void> => {
  try {
    await fs.access(DATA_FILE);
  } catch {
    const dir = path.dirname(DATA_FILE);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(DATA_FILE, '{}', 'utf-8');
  }
};

const readData = async (): Promise<CommentData> => {
  try {
    await ensureDataFile();
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    return typeof parsed === 'object' && parsed !== null ? parsed : {};
  } catch (error) {
    console.error('Error reading comments:', error);
    return {};
  }
};

const writeData = async (comments: CommentData): Promise<void> => {
  try {
    await ensureDataFile();
    await fs.writeFile(DATA_FILE, JSON.stringify(comments, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing comments:', error);
    throw error;
  }
};

export const getByBlogId = async (blogId: string): Promise<Comment[]> => {
  const data = await readData();
  return data[blogId] || [];
};

export const create = async (
  blogId: string,
  input: CreateCommentInput
): Promise<Comment> => {
  const data = await readData();
  const newComment: Comment = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  if (!data[blogId]) {
    data[blogId] = [];
  }

  data[blogId].push(newComment);
  await writeData(data);
  return newComment;
};
