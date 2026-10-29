import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "display",
        "display-sm",
        "mega",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "body-xl",
        "body-lg",
        "body-md",
        "body-sm",
        "body-xs",
        "button-lg",
        "button-md",
        "button-sm",
      ],
      radius: ["control", "card", "panel", "feature"],
      shadow: ["card", "glow", "raise", "pop"],
      tracking: ["eyebrow"],
      blur: ["glow"],
    },
  },
});

export const cn = (...classes: (string | false | null | undefined)[]) =>
  twMerge(classes.filter(Boolean).join(" "));
