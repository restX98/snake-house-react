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
          <main className="fixed inset-0 h-dvh w-screen">
            <SnakeHouse>{children}</SnakeHouse>
          </main>
        </SnakeGameProvider>
      </body>
    </html>
  );
}
