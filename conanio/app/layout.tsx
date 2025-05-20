import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/style.css';
import '@/styles/stylev2.css';
import '@/styles/font.css';
import '@/styles/index.css';

export const metadata = {
  title: 'Conan 2.0: C and C++ Open Source Package Manager',
  description: 'Conan is an open source, decentralized and multi-platform package manager for C and C++ that allows you to create and share all your native binaries.',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
