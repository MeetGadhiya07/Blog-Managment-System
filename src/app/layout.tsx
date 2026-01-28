import BreadcrumbSchema from '@/components/common/BreadcrumbSchema';
import { ToastProvider } from '@/components/providers/ToastProvider';
import { config } from '@/config/env';
import { siteConfig } from '@/config/site';
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
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#2563eb',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={lato.className}>
      <body
        className={`${lato.className} bg-background antialiased`}
        suppressHydrationWarning
      >
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

        {config.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${config.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
              strategy="beforeInteractive"
            />
            <Script
              id="google-analytics"
              strategy="beforeInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${config.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
                `,
              }}
            />
          </>
        )}

        {config.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID && (
          <Script
            id="google-tag-manager"
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
