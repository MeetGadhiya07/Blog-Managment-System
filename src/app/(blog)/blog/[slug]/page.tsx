import BlogPage from '@/components/blog/blogDetail';
import StructuredData from '@/components/seo/StructuredData';
import { siteConfig } from '@/config/site';
import { getAll, getById } from '@/lib/data/blog-repository';
import { generateArticleSchema } from '@/lib/seo/structuredData';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const blogs = await getAll();
  return blogs.map(blog => ({
    slug: blog.id,
  }));
}

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getById(slug);

  if (!blog) return { title: 'Blog Not Found' };

  const url = `${siteConfig.url}/blog/${blog.id}`;

  return {
    title: blog.title,
    description: blog.description,
    ...(blog.author && { authors: [{ name: blog.author }] }),
    openGraph: {
      type: 'article',
      url,
      title: blog.title,
      description: blog.description,
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt,
      ...(blog.author && { authors: [blog.author] }),
      ...(blog.bannerImage && { images: [{ url: blog.bannerImage }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.description,
      ...(blog.bannerImage && { images: [blog.bannerImage] }),
    },
  };
}

const page = async ({ params }: BlogDetailPageProps) => {
  const { slug } = await params;
  const blog = await getById(slug);

  if (!blog) notFound();

  const articleSchema = generateArticleSchema({
    title: blog.title,
    description: blog.description,
    author: blog.author || 'Anonymous',
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt,
    image: blog.bannerImage,
    url: `${siteConfig.url}/blog/${blog.id}`,
  });

  return (
    <>
      <StructuredData data={articleSchema} />
      <BlogPage blog={blog} />
    </>
  );
};

export default page;
