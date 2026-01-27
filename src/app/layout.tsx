import BreadcrumbSchema from '@/components/common/BreadcrumbSchema';
import { ToastProvider } from '@/components/providers/ToastProvider';
import { config } from '@/config/env';
import { siteConfig } from '@/config/metadata';
import { Provider } from '@/lib/store/Provider';
import type { Metadata, Viewport } from 'next';
import { Lato } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const lato = Lato({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Blog Management System - Complete Blog CMS',
    template: '%s | Blog CMS',
  },
  description: siteConfig.description,
  keywords: [
    'Blog',
    'CMS',
    'Next.js',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'CRUD',
    'Rich Text Editor',
  ],
  authors: [{ name: 'Meet Gadhiya' }],
  creator: 'Blog Management System',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: 'Blog Management System - Complete Blog CMS',
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Management System - Complete Blog CMS',
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#EAEAEA',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={lato.className}>
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />

        {/* Preconnect to analytics domains for faster loading */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />

        {/* Preconnect to Google Maps for faster loading */}
        <link rel="preconnect" href="https://maps.googleapis.com" />

        {/* Additional preconnects for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${lato.className} bg-background antialiased`} suppressHydrationWarning>
        {/* Google Tag Manager (noscript) - Must be immediately after opening body tag */}
        {config.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${config.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}

        <Provider>
          <ToastProvider>{children}</ToastProvider>
          <BreadcrumbSchema />
        </Provider>

        {/* Analytics Scripts - Optimized placement and loading */}
        {/* Google Analytics - beforeInteractive for early initialization */}
        {config.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${config.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
              strategy="beforeInteractive"
            />
            <Script
              id="google-analytics-init"
              strategy="beforeInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${config.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', {
                    page_title: document.title,
                    page_location: window.location.href,
                  });
                `,
              }}
            />
          </>
        )}

        {/* Google Tag Manager - beforeInteractive for critical tracking */}
        {config.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID && (
          <Script
            id="google-tag-manager-init"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){
                  w[l] = w[l] || []; 
                  w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                  var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:''; 
                  j.async=true; 
                  j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl; 
                  f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${config.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}');
              `,
            }}
          />
        )}
      </body>
    </html>
  );
}
