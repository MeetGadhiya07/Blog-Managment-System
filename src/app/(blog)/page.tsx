import { getBlogs } from '@/app/(dashboard)/blogs/actions';
import {
  BlogHeader,
  BlogList,
  ExploreMore,
  HeroBanner,
} from '@/components/blog';
import { siteConfig } from '@/config/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
  },
};

export const revalidate = 3600;

const page = async () => {
  const blogs = await getBlogs();
  const publishedBlogs = blogs.filter(blog => blog.published);

  return (
    <>
      <BlogHeader title="Our Latest Blogs" />
      <HeroBanner />
      <BlogList blogs={publishedBlogs} />
      <ExploreMore />
    </>
  );
};

export default page;
