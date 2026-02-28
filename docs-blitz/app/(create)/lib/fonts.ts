export const FONTS = [
  {
    name: "Inter",
    value: "inter",
    font: { style: { fontFamily: "var(--font-inter), sans-serif" } },
    type: "sans",
  },
  {
    name: "Noto Sans",
    value: "noto-sans",
    font: { style: { fontFamily: "var(--font-noto-sans), sans-serif" } },
    type: "sans",
  },
  {
    name: "Nunito Sans",
    value: "nunito-sans",
    font: { style: { fontFamily: "var(--font-nunito-sans), sans-serif" } },
    type: "sans",
  },
  {
    name: "Figtree",
    value: "figtree",
    font: { style: { fontFamily: "var(--font-figtree), sans-serif" } },
    type: "sans",
  },
  {
    name: "Roboto",
    value: "roboto",
    font: { style: { fontFamily: "var(--font-roboto), sans-serif" } },
    type: "sans",
  },
  {
    name: "Raleway",
    value: "raleway",
    font: { style: { fontFamily: "var(--font-raleway), sans-serif" } },
    type: "sans",
  },
  {
    name: "DM Sans",
    value: "dm-sans",
    font: { style: { fontFamily: "var(--font-dm-sans), sans-serif" } },
    type: "sans",
  },
  {
    name: "Public Sans",
    value: "public-sans",
    font: { style: { fontFamily: "var(--font-public-sans), sans-serif" } },
    type: "sans",
  },
  {
    name: "Outfit",
    value: "outfit",
    font: { style: { fontFamily: "var(--font-outfit), sans-serif" } },
    type: "sans",
  },
  {
    name: "JetBrains Mono",
    value: "jetbrains-mono",
    font: { style: { fontFamily: "var(--font-jetbrains-mono), monospace" } },
    type: "mono",
  },
] as const

export type Font = (typeof FONTS)[number]
