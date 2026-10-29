import type { Metadata } from "next";

import DesignSystem from "@/components/design-system";

export const metadata: Metadata = {
  title: "Design system",
  description:
    "Tokens and components built from the Synkra Figma design system, rendered live.",
};

export default function ComponentsPage() {
  return <DesignSystem />;
}
