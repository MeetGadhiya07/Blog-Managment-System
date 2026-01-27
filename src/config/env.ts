// Prepare environment variables
const rawEnv = {
  NEXT_APP_APP_NAME: process.env.NEXT_APP_APP_NAME || 'Blog',
  NEXT_PUBLIC_APP_API_URL: process.env.NEXT_PUBLIC_APP_API_URL || 'http://localhost:8000/api/v1',

  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
  NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
  NEXT_PUBLIC_TWITTER_CREATOR: process.env.NEXT_PUBLIC_TWITTER_CREATOR,
  NEXT_PUBLIC_TWITTER_SITE_ID: process.env.NEXT_PUBLIC_TWITTER_SITE_ID,
  NEXT_PUBLIC_APP_BASE_URL: process.env.NEXT_PUBLIC_APP_BASE_URL || 'XXXXXXXXXXXXXXXXXXXXX',
};

// Define static constants
const CONSTANT = {
  twitter: {
    creator: rawEnv.NEXT_PUBLIC_TWITTER_CREATOR || '@Blog',
    siteId: rawEnv.NEXT_PUBLIC_TWITTER_SITE_ID || '@Blog',
  },
};

// Export centralized config combining environment variables and constants
export const config = {
  ...rawEnv,
  CONSTANT,
};
