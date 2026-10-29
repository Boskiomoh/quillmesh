import type { FC } from "react";

import { cn } from "@/lib/cn";

interface EmphasisTextProps {
  text: string;
  emphasis?: string;
  className?: string;
}

const EmphasisText: FC<EmphasisTextProps> = ({ text, emphasis, className }) => {
  // Derived
  const index = emphasis ? text.indexOf(emphasis) : -1;

  if (!emphasis || index === -1) return text;

  return (
    <>
      {text.slice(0, index)}
      <em className={cn("italic", className ?? "text-brand")}>{emphasis}</em>
      {text.slice(index + emphasis.length)}
    </>
  );
};

export default EmphasisText;
