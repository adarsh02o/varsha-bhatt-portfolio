import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Providers, ScrollProgress } from "@/components/motion";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["400", "500", "600"] });
const grotesk = Space_Grotesk({ variable: "--font-grotesk", subsets: ["latin"], weight: ["500", "700"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], weight: ["500", "700"] });

export const metadata: Metadata = {
  title: "Varsha Bhatt · QA Engineer",
  description:
    "QA Engineer with 3+ years testing web, mobile (Android/iOS) and PWA apps across fintech, e-commerce, healthcare and EV/energy.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable} ${jetbrains.variable} antialiased`}>
      <body>
        <Providers>
          <ScrollProgress />
          {children}
        </Providers>
      </body>
    </html>
  );
}
