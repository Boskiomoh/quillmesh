import type { Metadata } from "next";

import Demo from "@/components/demo";

export const metadata: Metadata = {
  title: "Request a demo",
  description:
    "A working demo-request form with validation, rate limiting and private storage. Part of the Quillmesh case study.",
};

export default function DemoPage() {
  return <Demo />;
}
