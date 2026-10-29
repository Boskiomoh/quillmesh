import type { FC, ReactNode } from "react";

import Badge from "@/components/ui/badge";
import EmphasisText from "@/components/ui/emphasis-text";

interface SectionIntroProps {
  title: ReactNode;
  badge?: string;
  badgeIcon?: ReactNode;
  intro?: string;
}

const SectionIntro: FC<SectionIntroProps> = ({
  title,
  badge,
  badgeIcon,
  intro,
}) => (
  <div className="flex flex-col gap-10 lg:flex-row lg:items-end">
    <div className="flex flex-col gap-2 lg:w-128">
      <h2 className="font-serif text-h4 font-medium lg:text-h2 lg:font-medium">
        {title}
      </h2>
      <span aria-hidden className="h-1 w-32 bg-brand" />
    </div>
    <div className="flex flex-1 flex-col gap-3">
      {badge && <Badge icon={badgeIcon}>{badge}</Badge>}
      {intro && (
        <p className="text-body-sm text-body lg:text-body-md">
          <EmphasisText
            text={intro}
            emphasis="Quillmesh"
            className="font-bold text-ink"
          />
        </p>
      )}
    </div>
  </div>
);

export default SectionIntro;
