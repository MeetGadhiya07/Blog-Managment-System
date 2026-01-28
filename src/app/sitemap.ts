import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { getAll } from '@/lib/data/blog-repository';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await getAll();

  const blogEntries: MetadataRoute.Sitemap = blogs
    .filter(blog => blog.published)
    .map(blog => ({
      url: `${siteConfig.url}/blog/${blog.id}`,
      lastModified: new Date(blog.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...blogEntries,
  ];
}
