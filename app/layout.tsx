import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { AntdRegistry } from '@ant-design/nextjs-registry';
import ModalProvider from "@/components/ModalProvider";
import ToasterProvider from "@/components/Toaster-provider";
import CrispProvider from "@/components/CrispProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Genius",
  description: "AI Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <CrispProvider />
        <body className={inter.className}>
          <link rel="icon" href="/logo.png" sizes="any" />
          <AntdRegistry>
            <ModalProvider />
            <ToasterProvider />
            {children}
          </AntdRegistry>
        </body>
      </html>
    </ClerkProvider>
  );
}
