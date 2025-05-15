import Toast from '@/components/common/Toast/Toast';
import './globals.css';
import Header from '@/components/common/Header/Header';
import { MSWComponent } from '@/components/MSWComponent';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MSWComponent>
          <Header />
          {children}
          <Toast />
        </MSWComponent>
      </body>
    </html>
  );
}
