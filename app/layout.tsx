import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Signal or Noise | Sai Anirudh Mantha",
  description: "An independent product analytics case study exploring how listening context can improve music recommendations.",
  authors: [{ name: "Sai Anirudh Mantha" }],
  creator: "Sai Anirudh Mantha",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
