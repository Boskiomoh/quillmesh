import type { Metadata } from "next";

import CaseStudy from "@/components/case-study";

export const metadata: Metadata = {
  title: "How this site was built",
  description:
    "Quillmesh case study: Figma to Next.js and Sanity, a design system and an A/B-tested landing page, with measured fidelity.",
};

export default function CaseStudyPage() {
  return <CaseStudy />;
}
