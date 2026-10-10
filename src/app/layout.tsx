import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Bagus Hendrawan | AI Engineer",
  description:
    "AI engineering, data science, and full-stack development. Explore projects and learning notes by Bagus Hendrawan.",
  icons: {
    icon: "https://bagus-s3-bucket-01.s3.ap-southeast-2.amazonaws.com/portfolio/icon.png",
    shortcut: "https://bagus-s3-bucket-01.s3.ap-southeast-2.amazonaws.com/portfolio/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
