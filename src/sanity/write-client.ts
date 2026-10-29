import "server-only";

import { createClient } from "next-sanity";

import { apiVersion, projectId } from "./env";

export const leadsClient = createClient({
  projectId,
  dataset: "leads",
  apiVersion,
  token: process.env.SANITY_LEADS_WRITE_TOKEN,
  useCdn: false,
});
