export const siteConfig = {
  name: 'Blog Management System',
  description: 'Complete Blog CMS with CRUD operations, rich text editor, and advanced features',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  links: {
    github: 'https://github.com',
  },
};

export type SiteConfig = typeof siteConfig;
