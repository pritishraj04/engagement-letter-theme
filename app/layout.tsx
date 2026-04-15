import type { Metadata } from "next";
import { Bodoni_Moda, Great_Vibes, Inter, Libre_Caslon_Display } from "next/font/google";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
});

const script = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const libreCaslon = Libre_Caslon_Display({
  variable: "--font-headline",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "You Are Invited",
  description: "A digital invitation experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${script.variable} ${inter.variable} ${libreCaslon.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-stone-100 text-stone-900 overflow-hidden">{children}</body>
    </html>
  );
}
