"use client";

import { useEffect, type FC } from "react";

import { track } from "@/lib/analytics";

const PageView: FC<{ label: string }> = ({ label }) => {
  useEffect(() => {
    track("page_view", label);
  }, [label]);

  return null;
};

export default PageView;
