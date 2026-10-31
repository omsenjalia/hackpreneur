import type { Metadata } from "next";
import "@fontsource/instrument-sans/latin-400.css";
import "@fontsource/instrument-sans/latin-500.css";
import "@fontsource/instrument-sans/latin-600.css";
import "@fontsource/instrument-serif/latin-400.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "HACKPRENEUR — keep the idea alive",
  description: "A private, local workspace for the work that comes after demo day.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth"><body>{children}</body></html>;
}
