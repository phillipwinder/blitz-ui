export const FONTS = [
  {
    name: "Inter",
    value: "inter",
    font: { style: { fontFamily: "'Inter Variable', sans-serif" } },
    type: "sans",
  },
  {
    name: "Noto Sans",
    value: "noto-sans",
    font: { style: { fontFamily: "'Noto Sans Variable', sans-serif" } },
    type: "sans",
  },
  {
    name: "Nunito Sans",
    value: "nunito-sans",
    font: { style: { fontFamily: "'Nunito Sans Variable', sans-serif" } },
    type: "sans",
  },
  {
    name: "Figtree",
    value: "figtree",
    font: { style: { fontFamily: "'Figtree Variable', sans-serif" } },
    type: "sans",
  },
  {
    name: "Roboto",
    value: "roboto",
    font: { style: { fontFamily: "'Roboto', sans-serif" } },
    type: "sans",
  },
  {
    name: "Raleway",
    value: "raleway",
    font: { style: { fontFamily: "'Raleway', sans-serif" } },
    type: "sans",
  },
  {
    name: "DM Sans",
    value: "dm-sans",
    font: { style: { fontFamily: "'DM Sans', sans-serif" } },
    type: "sans",
  },
  {
    name: "Public Sans",
    value: "public-sans",
    font: { style: { fontFamily: "'Public Sans', sans-serif" } },
    type: "sans",
  },
  {
    name: "Outfit",
    value: "outfit",
    font: { style: { fontFamily: "'Outfit', sans-serif" } },
    type: "sans",
  },
  {
    name: "JetBrains Mono",
    value: "jetbrains-mono",
    font: { style: { fontFamily: "'JetBrains Mono Variable', monospace" } },
    type: "mono",
  },
] as const

export type Font = (typeof FONTS)[number]
