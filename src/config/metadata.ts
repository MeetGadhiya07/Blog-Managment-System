export const siteConfig = {
  name: 'Blog Management System',
  description:
    'Complete Blog CMS with CRUD operations, rich text editor, image gallery, and advanced blog management features',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
} as const;
