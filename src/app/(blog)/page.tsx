import { getBlogs } from '@/app/(dashboard)/blogs/actions';
import { BlogHeader, BlogList, HeroBanner, ExploreMore } from '@/components/blog';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Blogs',
  description: 'Read our latest blog posts about technology, design, and web development',
};

export const revalidate = 3600;

const page = async () => {
  const blogs = await getBlogs();
  const publishedBlogs = blogs.filter((blog) => blog.published);
  const dynamicTitle = `Our Latest Blogs`;
  return (
    <>
      <BlogHeader title={dynamicTitle} />
      <HeroBanner />
      <BlogList blogs={publishedBlogs} />
      <ExploreMore />
    </>
  );
};

export default page;
