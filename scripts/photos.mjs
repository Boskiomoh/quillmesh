// Run with: npx sanity exec scripts/photos.mjs --with-user-token
import { createReadStream, existsSync } from "node:fs";

import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-10-01" });

const photos = [
  {
    file: "home-hero",
    doc: "home",
    path: "hero.image",
    alt: "Blue glass curtain-wall towers seen from street level",
    credit: "Patrick Tomasso, Unsplash",
  },
  {
    file: "about-hq",
    doc: "aboutPage",
    path: "hero.image",
    alt: "A dark modern building at dusk",
    credit: "David Werbrouck, Unsplash",
  },
  {
    file: "post-infrastructure",
    doc: "post-the-future-of-digital-infrastructure-is-intentional",
    path: "cover",
    alt: "A glass office tower against a cloudy sky",
    credit: "Viktor Jakovlev, Unsplash",
  },
  {
    file: "post-workflows",
    doc: "post-the-5-workflows-every-saas-team-should-automate-first",
    path: "cover",
    alt: "Close-up of a blue circuit board",
    credit: "Umberto, Unsplash",
  },
  {
    file: "post-v2",
    doc: "post-quillmesh-v2-event-based-triggers",
    path: "cover",
    alt: "Code on a dark editor screen",
    credit: "Chris Ried, Unsplash",
  },
  {
    file: "post-zapier",
    doc: "post-zapier-vs-make-vs-quillmesh",
    path: "cover",
    alt: "Analytics charts on a laptop screen",
    credit: "Luke Chesser, Unsplash",
  },
  {
    file: "post-pms",
    doc: "post-why-pms-should-own-the-ops",
    path: "cover",
    alt: "Geometric glass roof against a pale sky",
    credit: "Coline Beulin, Unsplash",
  },
  {
    file: "post-testing",
    doc: "post-testing-playbooks-before-they-touch-production",
    path: "cover",
    alt: "A monitor showing program code",
    credit: "Ilya Pavlov, Unsplash",
  },
];

for (const photo of photos) {
  const filePath = new URL(`./photos/${photo.file}.jpg`, import.meta.url);
  if (!existsSync(filePath)) throw new Error(`Missing ${photo.file}.jpg`);
  const asset = await client.assets.upload(
    "image",
    createReadStream(filePath),
    { filename: `${photo.file}.jpg` },
  );
  await client
    .patch(photo.doc)
    .set({
      [photo.path]: {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
        alt: photo.alt,
        credit: photo.credit,
      },
    })
    .commit();
  console.log(`${photo.file} -> ${photo.doc}.${photo.path}`);
}
