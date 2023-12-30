import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/components/Provider";
import { PrimeReactProvider } from "primereact/api";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Turkish Sign Language Educative Platform",
  description:
    "An educative platform to learn basic principles of Turkish Sign Language",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          id="theme-link"
          rel="stylesheet"
          href={`/themes/lara-light-teal/theme.css`}
        ></link>
      </head>

      <body className={inter.className}>
        <Provider>
          <PrimeReactProvider> {children}</PrimeReactProvider>
        </Provider>
      </body>
    </html>
  );
}
