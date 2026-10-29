import { defineConfig } from "sanity";
import { structureTool, type StructureResolver } from "sanity/structure";

import { projectId } from "./src/sanity/env";
import {
  category,
  faq,
  landing,
  legal,
  plan,
  post,
  prelander,
  release,
} from "./src/sanity/schema/collections";
import { home } from "./src/sanity/schema/home";
import { event, lead, subscriber } from "./src/sanity/schema/lead";
import { aboutPage, featuresPage } from "./src/sanity/schema/pages";
import { settings } from "./src/sanity/schema/settings";

const singletons = [
  { type: "settings", title: "Site settings" },
  { type: "home", title: "Home page" },
  { type: "featuresPage", title: "Features page" },
  { type: "aboutPage", title: "About page" },
  { type: "prelander", title: "Pre-lander" },
];

const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      ...singletons.map(({ type, title }) =>
        S.listItem()
          .title(title)
          .id(type)
          .child(S.document().schemaType(type).documentId(type)),
      ),
      S.divider(),
      S.documentTypeListItem("faq").title("FAQs"),
      S.documentTypeListItem("plan").title("Pricing plans"),
      S.documentTypeListItem("post").title("Blog posts"),
      S.documentTypeListItem("category").title("Blog categories"),
      S.documentTypeListItem("release").title("Changelog"),
      S.documentTypeListItem("legal").title("Legal pages"),
      S.documentTypeListItem("landing").title("A/B landing variants"),
    ]);

export default defineConfig([
  {
    name: "content",
    title: "Quillmesh content",
    basePath: "/studio/content",
    projectId,
    dataset: "production",
    schema: {
      types: [
        settings,
        home,
        featuresPage,
        aboutPage,
        prelander,
        faq,
        plan,
        category,
        post,
        release,
        legal,
        landing,
      ],
      templates: (templates) =>
        templates.filter(
          ({ schemaType }) => !singletons.some((s) => s.type === schemaType),
        ),
    },
    document: {
      actions: (actions, { schemaType }) =>
        singletons.some((s) => s.type === schemaType)
          ? actions.filter(
              ({ action }) =>
                action &&
                ["publish", "discardChanges", "restore"].includes(action),
            )
          : actions,
    },
    plugins: [structureTool({ structure })],
  },
  {
    name: "leads",
    title: "Demo requests (private)",
    basePath: "/studio/leads",
    projectId,
    dataset: "leads",
    schema: { types: [lead, subscriber, event] },
    plugins: [structureTool()],
  },
]);
