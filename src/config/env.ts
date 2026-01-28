const rawEnv = {
  NEXT_PUBLIC_SITE_URL:
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
  NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID:
    process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
};

export const config = rawEnv;
