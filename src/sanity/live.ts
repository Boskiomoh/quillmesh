import { defineLive, type StrictDefinedFetchType } from "next-sanity/live";

import { client } from "./client";

export const { sanityFetch, SanityLive } = defineLive({
  client,
  strict: true,
  serverToken: false,
  browserToken: false,
});

export const cachedSanity: StrictDefinedFetchType = async (options) => {
  "use cache";
  return sanityFetch(options);
};
