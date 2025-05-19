import Toast from '@/components/common/Toast/Toast';
import './globals.css';
import Header from '@/components/common/Header/Header';
import { MockInitComponent } from '@/components/MockInitComponent';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MockInitComponent>
          <Header />
          {children}
          <Toast />
        </MockInitComponent>
      </body>
    </html>
  );
}
