import { getBlogs } from '@/app/(dashboard)/blogs/actions';
import { Blog } from '@/types';
import { BlogHeader } from '../BlogHeader';
import { BlogList } from '../BlogList';
import { HeroBanner } from '../HeroBanner';
import BlogContent from './BlogContent';

const BlogPage = async ({ blog }: { blog: Blog }) => {
  const blogs = await getBlogs();
  const publishedBlogs = blogs.filter(blog => blog.published);

  return (
    <>
      <BlogHeader title={blog?.title} />
      <HeroBanner />
      <BlogContent blog={blog} />
      <BlogList blogs={publishedBlogs} />
    </>
  );
};

export default BlogPage;
