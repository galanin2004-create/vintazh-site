import type { Metadata } from "next";
import { Manrope, Prata } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { brand, contacts } from "@/lib/brand";
import { SITE } from "@/lib/site";
import "./globals.css";
import "./components.css";

/* Две гарнитуры, больше никаких. Бренд-бук, полоса 06. */
const prata = Prata({
  weight: "400",
  subsets: ["cyrillic", "latin"],
  display: "swap",
  variable: "--font-prata",
});

const manrope = Manrope({
  weight: ["300", "400", "500", "600"],
  subsets: ["cyrillic", "latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: `${brand.full} — винтажная одежда во Владимире`,
    template: `%s · ${brand.name}`,
  },
  description: brand.formula,
  keywords: [
    "винтаж",
    "винтажная одежда",
    "Владимир",
    "галерея винтажа",
    "одежда в единственном экземпляре",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: brand.full,
    title: `${brand.full} — винтажная одежда во Владимире`,
    description: brand.formula,
  },
  icons: { icon: "/logo-source.jpg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: brand.full,
    description: brand.formula,
    telephone: contacts.phone,
    address: { "@type": "PostalAddress", addressLocality: brand.city, addressCountry: "RU" },
    sameAs: [contacts.vkHref, contacts.telegramHref],
  };

  return (
    <html lang="ru" className={`${prata.variable} ${manrope.variable}`}>
      <body>
        <a className="skip" href="#main">
          К содержанию
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      </body>
    </html>
  );
}
