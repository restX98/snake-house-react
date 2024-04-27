import { siteConfig } from "@/config/site";

import { Inter } from "next/font/google";
import "./globals.css";

import { SnakeGameProvider, SnakeHouse } from "@restx98/snake-house-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <SnakeGameProvider>
          <main className="flex max-h-screen min-h-screen flex-col overflow-hidden bg-zinc-800">
            <SnakeHouse className="relative flex-auto">{children}</SnakeHouse>
          </main>
        </SnakeGameProvider>
      </body>
    </html>
  );
}
