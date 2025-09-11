'use client';

import { GA_ID } from '@/lib/gtag';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    window.gtag?.('config', GA_ID as string, {
      page_path: pathname,
    });
  }, [pathname]);

  if (process.env.NODE_ENV !== 'production' || !GA_ID) {
    return null;
  }
  return (
    <>
      {/* GA4 라이브러리 불러오기 */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      {/* 초기화 */}
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
