'use client';
import StructuredData from '@/components/seo/StructuredData';
import { siteConfig } from '@/config/site';
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export default function BreadcrumbSchema() {
  const pathname = usePathname();

  const breadcrumbItems = useMemo(() => {
    return generateBreadcrumbItemsFromPath(pathname || '/', siteConfig.url);
  }, [pathname]);

  const schema = generateBreadcrumbSchema(breadcrumbItems);

  return <StructuredData data={schema} />;
}

function generateBreadcrumbItemsFromPath(pathname: string, baseUrl: string) {
  if (pathname === '/') {
    return [{ name: 'Home', url: `${baseUrl}/` }];
  }

  const pathSegments = pathname.split('/').filter(segment => segment);
  const breadcrumbItems = [{ name: 'Home', url: `${baseUrl}/` }];

  let currentPath = '';
  pathSegments.forEach(segment => {
    currentPath += `/${segment}`;
    const name = segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
    breadcrumbItems.push({ name, url: `${baseUrl}${currentPath}` });
  });

  return breadcrumbItems;
}
