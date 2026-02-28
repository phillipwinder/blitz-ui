import {
  DM_Sans,
  Figtree,
  Geist_Mono as FontMono,
  Geist as FontSans,
  Inter,
  JetBrains_Mono,
  Noto_Sans,
  Nunito_Sans,
  Outfit,
  Public_Sans,
  Raleway,
  Roboto,
} from "next/font/google"

import { cn } from "@/lib/utils"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400"],
})

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const fontNotoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
})

const fontNunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
})

const fontFigtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
})

const fontRoboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
})

const fontRaleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
})

const fontDMSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
})

const fontPublicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
})

const fontOutfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
})

const fontJetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export const fontVariables = cn(
  fontSans.variable,
  fontMono.variable,
  fontInter.variable,
  fontNotoSans.variable,
  fontNunitoSans.variable,
  fontFigtree.variable,
  fontRoboto.variable,
  fontRaleway.variable,
  fontDMSans.variable,
  fontPublicSans.variable,
  fontOutfit.variable,
  fontJetBrainsMono.variable
)

export const designSystemFontFamilies = {
  inter: "var(--font-inter)",
  "noto-sans": "var(--font-noto-sans)",
  "nunito-sans": "var(--font-nunito-sans)",
  figtree: "var(--font-figtree)",
  roboto: "var(--font-roboto)",
  raleway: "var(--font-raleway)",
  "dm-sans": "var(--font-dm-sans)",
  "public-sans": "var(--font-public-sans)",
  outfit: "var(--font-outfit)",
  "jetbrains-mono": "var(--font-jetbrains-mono)",
} as const
