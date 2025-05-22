import { ReactNode } from "react";

import type { Metadata } from "next";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Inter } from "next/font/google";

import { Providers } from "./_components";

import "./globals.css";

export const metadata: Metadata = {
  title: "Dashboard - Usuarios",
  icons: {
    icon: {
      url: "https://media.flaticon.com/dist/min/img/apple-icon-58x58.png",
      type: "image/x-icon",
    },
  },
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

interface Props {
  children: ReactNode;
}

// ⚠️ Warning: In Google Chrome I was getting a hydration error
// caused by a browser extension. If it happens to you,
// try using Incognito mode!

export default async function RootLayout({ children }: Props) {
  return (
    <html>
      <body>
        <main>
          <div className={inter.className}>
            <Providers>
              <div>{children}</div>
              <ReactQueryDevtools
                initialIsOpen={false}
                buttonPosition="bottom-right"
              />
            </Providers>
          </div>
        </main>
      </body>
    </html>
  );
}
