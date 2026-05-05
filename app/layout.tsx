import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Calar — Everything looks fine. It isn't.",
  description: "Calar connects every tool you run on, builds your intelligence layer, and gives you an AI that knows your entire business.",
  openGraph: {
    title: "Calar — Everything looks fine. It isn't.",
    description: "Connect every tool. Know everything.",
    url: "https://calar.me",
    siteName: "Calar",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
