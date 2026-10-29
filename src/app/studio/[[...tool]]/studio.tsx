"use client";

import { NextStudio } from "next-sanity/studio";
import type { FC } from "react";

import config from "../../../../sanity.config";

const Studio: FC = () => <NextStudio config={config} />;

export default Studio;
