import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  trailingSlash: true,

  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },

  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
      '*.module.css': {
        loaders: ['css-loader'],
        as: '*.css',
      },
    },
    resolveAlias: {
      '@': './src',
      '@/components': './src/components',
      '@/lib': './src/lib',
      '@/types': './src/types',
      '@/app': './src/app',
      '@/public': './public',
    },
    resolveExtensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },

  experimental: {
    optimizePackageImports: ['@/components'],
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
