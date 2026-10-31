import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HACKPRENEUR — keep the idea alive",
  description: "A post-hackathon project continuation platform. Prototype with synthetic data.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
