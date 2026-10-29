import type { FC } from "react";

const PageFallback: FC = () => (
  <div aria-busy="true" aria-live="polite" className="min-h-dvh p-6 lg:p-16">
    <span className="sr-only">Loading…</span>
  </div>
);

export default PageFallback;
