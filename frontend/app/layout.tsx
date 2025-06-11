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

export const metadata = {
  title: "Tabula",
  description: "Tabula와 함께 백지학습으로 메타인지 능력을 향상시키세요.",
  keywords: ['tabula', '백지학습', '메타인지', 'AI 학습 플랫폼'],
  icons: {
    icon: "/favicon.png",
  },
}
