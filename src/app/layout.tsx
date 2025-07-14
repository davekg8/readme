import type { Metadata } from 'next';
import './globals.css';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { Navigation } from '@/components/navigation';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'ScrollScribe',
  description: 'A blog platform for authors to post and readers to enjoy book chapters.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Belleza&family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,700;1,7..72,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body antialiased')}>
        <SidebarProvider>
          <Sidebar>
            <Navigation />
          </Sidebar>
          <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
