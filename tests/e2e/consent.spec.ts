import { expect, test, type Page } from "@playwright/test";

const captureEvents = async (page: Page) => {
  const events: { event: string; label: string; path: string }[] = [];
  await page.route("**/api/events", async (route) => {
    events.push(JSON.parse(route.request().postData() ?? "{}"));
    await route.fulfill({ status: 204 });
  });
  return events;
};

test("records nothing until the visitor accepts cookies", async ({ page }) => {
  const events = await captureEvents(page);
  await page.goto("/go/automate");
  await page.getByRole("button", { name: "Essential only" }).click();
  await expect(
    page.getByRole("region", { name: "Cookie consent" }),
  ).toBeHidden();
  await page
    .getByRole("link", { name: /See how Quillmesh handles it/ })
    .click();
  await page.waitForURL(/\/lp\/automate/);
  await page.waitForTimeout(500);
  expect(events).toEqual([]);
});

test("after Accept All, CTA clicks and landing views are recorded", async ({
  page,
}) => {
  const events = await captureEvents(page);
  await page.goto("/go/automate");
  await page.getByRole("button", { name: "Accept All" }).click();
  await page
    .getByRole("link", { name: /See how Quillmesh handles it/ })
    .click();
  await page.waitForURL(/\/lp\/automate/);
  await expect
    .poll(() => events.map((item) => `${item.event}:${item.label}`))
    .toEqual(
      expect.arrayContaining([
        "cta_click:go_automate_continue",
        expect.stringMatching(/^page_view:lp_automate_[ab]$/),
      ]),
    );
});
