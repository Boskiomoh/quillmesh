import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/features",
  "/about",
  "/pricing",
  "/blog",
  "/blog/the-future-of-digital-infrastructure-is-intentional",
  "/blog/category/scalability",
  "/blog/page/2",
  "/changelog",
  "/demo",
  "/components",
  "/legal/privacy",
  "/lp/automate",
  "/go/automate",
  "/case-study",
];

for (const route of routes) {
  test(`${route} loads with one h1, no axe violations and no sideways scroll`, async ({
    page,
  }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);

    const results = await new AxeBuilder({ page }).analyze();
    expect(
      results.violations.map(
        (violation) => `${violation.id}: ${violation.nodes.length}`,
      ),
    ).toEqual([]);

    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(overflow).toBe(0);
  });
}

test("an unknown post shows the not-found page and is kept out of search", async ({
  page,
}) => {
  await page.goto("/blog/no-such-post");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    /Page not found/,
  );
  await expect(
    page.locator('meta[name="robots"][content*="noindex"]').first(),
  ).toBeAttached();
});

test("an unknown path returns 404", async ({ page }) => {
  const response = await page.goto("/no-such-page");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    /Page not found/,
  );
});
