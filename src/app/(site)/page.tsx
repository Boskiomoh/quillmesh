import Home from "@/components/home";
import { cachedSanity } from "@/sanity/live";
import { homeQuery, settingsQuery } from "@/sanity/queries";

export default async function HomePage() {
  const [{ data: content }, { data: settings }] = await Promise.all([
    cachedSanity({ query: homeQuery, perspective: "published", stega: false }),
    cachedSanity({
      query: settingsQuery,
      perspective: "published",
      stega: false,
    }),
  ]);

  return <Home content={content} settings={settings} />;
}
