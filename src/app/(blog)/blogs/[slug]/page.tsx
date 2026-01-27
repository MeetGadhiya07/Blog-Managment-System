import BlogPage from '@/components/blog/blogDetail';
import { getAll, getById } from '@/lib/data/blog-repository';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const blogs = await getAll();
  return blogs.map((blog) => ({
    slug: blog.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getById(slug);

  if (!blog) {
    return {
      title: 'Blog Not Found',
    };
  }

  return {
    title: blog.title,
    description: blog.description,
  };
}

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

const page = async ({ params }: BlogDetailPageProps) => {
  const { slug } = await params;
  const blog = await getById(slug);

  if (!blog) {
    notFound();
  }

  return <BlogPage blog={blog} />;
};

export default page;
