import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { getBaseUrl } from "@/utils/urls";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: "Onix Changelog",
    template: "%s | Onix Changelog",
  },
  description: "Últimas atualizações do Onix",
  alternates: {
    canonical: getBaseUrl(),
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className}`}>
        <div className="w-full">{children}</div>
      </body>
    </html>
  );
}
