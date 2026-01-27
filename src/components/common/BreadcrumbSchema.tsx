'use client';
import StructuredData from '@/components/seo/StructuredData';
import { config } from '@/config/env';
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export default function BreadcrumbSchema() {
  const pathname = usePathname();

  const breadcrumbItems = useMemo(() => {
    const baseUrl = config.NEXT_PUBLIC_APP_BASE_URL;
    return generateBreadcrumbItemsFromPath(pathname || '/', baseUrl);
  }, [pathname]);

  const schema = generateBreadcrumbSchema(breadcrumbItems);

  return <StructuredData data={schema} />;
}

// Helper function to generate breadcrumb items from pathname
function generateBreadcrumbItemsFromPath(pathname: string, baseUrl: string) {
  // Handle root path
  if (pathname === '/') {
    return [{ name: 'Home', url: `${baseUrl}/` }];
  }

  // Split path into segments
  const pathSegments = pathname.split('/').filter((segment) => segment);

  // Always start with Home
  const breadcrumbItems = [{ name: 'Home', url: `${baseUrl}/` }];

  // Build path segments
  let currentPath = '';
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`;

    // Format segment name with better logic
    let name = segment.replace(/-/g, ' ');

    // Handle special cases
    if (segment === 'homedetails') {
      name = 'Property Details';
    } else if (segment === 'edit-profile') {
      name = 'Edit Profile';
    } else if (segment === 'my-buy-box') {
      name = 'My Buy Box';
    } else if (segment === 'offers-sent') {
      name = 'Offers Sent';
    } else if (segment === 'notification-settings') {
      name = 'Notification Settings';
    } else if (segment === 'security-settings') {
      name = 'Security Settings';
    } else if (segment === 'terms-of-use') {
      name = 'Terms of Use';
    } else if (segment === 'privacy-policy') {
      name = 'Privacy Policy';
    } else if (segment === 'refund-policy') {
      name = 'Refund Policy';
    } else {
      // Capitalize words
      name = name.replace(/\b\w/g, (char) => char.toUpperCase());
    }

    breadcrumbItems.push({
      name,
      url: `${baseUrl}${currentPath}`,
    });
  });

  return breadcrumbItems;
}
