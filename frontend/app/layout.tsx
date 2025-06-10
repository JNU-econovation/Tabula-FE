import Toast from '@/components/common/Toast/Toast';
import './globals.css';
import Header from '@/components/common/Header/Header';
import { MockInitComponent } from '@/components/MockInitComponent';
import TanStackProvider from '@/components/TanStackProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          {children}
          <Toast />
        </TanStackProvider>
      </body>
    </html>
  );
}
