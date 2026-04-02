import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WWES DLO Rental Agreement",
  description: "Diesel Locomotive Cable rental check-out/check-in and back charge tracking",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
