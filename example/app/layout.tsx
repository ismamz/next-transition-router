import localFont from "next/font/local";
import { Header } from "@/components/header";
import { Debug } from "@/components/debug";
import { Providers } from "./providers";
import "./styles.css";

const primaryFont = localFont({
  variable: "--font-primary",
  preload: true,
  src: [
    {
      path: "../assets/fonts/NeueMontreal-Regular.woff2",
      weight: "normal",
      style: "normal",
    },
    {
      path: "../assets/fonts/NeueMontreal-Italic.woff2",
      weight: "normal",
      style: "italic",
    },
    {
      path: "../assets/fonts/NeueMontreal-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/NeueMontreal-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
  ],
});

export const metadata = {
  title: "Transition Router - page transitions in Next.js App Router",
  description:
    "Create animated transitions between pages using Next.js App Router and your favorite animation library.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={primaryFont.variable}>
      <body>
        <Providers>
          <Header />
          {children}
          <Debug />
        </Providers>
      </body>
    </html>
  );
}
