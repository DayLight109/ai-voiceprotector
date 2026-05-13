import type { Metadata } from "next";
import { Newsreader, Funnel_Sans, JetBrains_Mono, Noto_Serif_SC, Noto_Sans_SC } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const funnel = Funnel_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-funnel",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jet-mono",
  display: "swap",
});

const notoSerif = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-serif",
  display: "swap",
});

const notoSans = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "L'Affaire · Voice Guardian — AI 诈声卫士",
  description:
    "实时识别 AI 语音诈骗——来电溯源、声纹取证、话术语义，毫秒级判断，端侧推理。",
  metadataBase: new URL("https://voiceguardian.example"),
  openGraph: {
    title: "L'Affaire — Voice Guardian",
    description: "实时 AI 语音诈骗识别与阻断 · 编辑式信任控制台",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="zh-CN"
      className={`${newsreader.variable} ${funnel.variable} ${mono.variable} ${notoSerif.variable} ${notoSans.variable}`}
    >
      <body className="paper-grain bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
