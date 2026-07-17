import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Villa Piedanlo | Beachfront House in Trou aux Biches",
  description: "Stay at Villa Piedanlo, a beachfront house for up to six on one of Mauritius' best-loved beaches, with housekeeping, secure parking and shops steps away.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
