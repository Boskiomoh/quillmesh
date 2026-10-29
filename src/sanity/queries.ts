import { defineQuery } from "next-sanity";

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

export const homeQuery = defineQuery(`{
  "home": *[_type == "home"][0],
  "faqs": *[_type == "faq"] | order(order asc) { _id, question, answer }
}`);

export const featuresQuery = defineQuery(`{
  "page": *[_type == "featuresPage"][0],
  "featureGrid": *[_type == "home"][0].featureGrid
}`);

export const aboutQuery = defineQuery(`*[_type == "aboutPage"][0]`);

export const pricingQuery = defineQuery(`{
  "plans": *[_type == "plan"] | order(order asc),
  "faqs": *[_type == "faq"] | order(order asc) { _id, question, answer },
  "faq": *[_type == "home"][0].faq
}`);

const postCard = `_id, title, "slug": slug.current, excerpt, author, readingMinutes, publishedAt,
  "category": category->title, cover`;

export const blogQuery = defineQuery(`{
  "categories": *[_type == "category"] | order(order asc) { _id, title, "slug": slug.current },
  "posts": *[_type == "post" && (!defined($category) || category->slug.current == $category)]
    | order(isFeatured desc, publishedAt desc) { ${postCard}, isFeatured }
}`);

export const postQuery = defineQuery(`{
  "post": *[_type == "post" && slug.current == $slug][0] { ${postCard}, lede, body, tags },
  "more": *[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...5] { ${postCard} }
}`);

export const postSlugsQuery = defineQuery(
  `*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`,
);

export const releasesQuery = defineQuery(
  `*[_type == "release"] | order(releasedAt desc)`,
);

export const legalQuery = defineQuery(
  `*[_type == "legal" && slug.current == $slug][0]`,
);

export const legalSlugsQuery = defineQuery(
  `*[_type == "legal" && defined(slug.current)]{ "slug": slug.current }`,
);

export const landingQuery = defineQuery(
  `*[_type == "landing" && variant == $version][0]`,
);

export const landingExtrasQuery = defineQuery(`{
  "home": *[_type == "home"][0] { featureGrid, testimonials },
  "faqs": *[_type == "faq"] | order(order asc)[0...3] { _id, question, answer }
}`);

export const prelanderQuery = defineQuery(`*[_type == "prelander"][0]`);
