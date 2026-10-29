import { expect, test } from "@playwright/test";

const headings = {
  a: /Stop babysitting/,
  b: /Automation you can actually audit/,
};

test("assigns a variant once and keeps it on later visits", async ({
  page,
  context,
}) => {
  await page.goto("/lp/automate");
  const cookie = (await context.cookies()).find(
    (item) => item.name === "qm-variant",
  );
  expect(cookie?.value).toMatch(/^[ab]$/);
  expect(cookie?.httpOnly).toBe(true);
  await expect(page).toHaveURL(/\/lp\/automate$/);

  const variant = cookie!.value as "a" | "b";
  for (let visit = 0; visit < 3; visit++) {
    await page.goto("/lp/automate");
    await expect(page.locator("h1")).toHaveText(headings[variant]);
  }
});

test("?variant= forces a variant and saves it", async ({ page, context }) => {
  await page.goto("/lp/automate?variant=b");
  await expect(page.locator("h1")).toHaveText(headings.b);
  expect(
    (await context.cookies()).find((item) => item.name === "qm-variant")?.value,
  ).toBe("b");

  await page.goto("/lp/automate");
  await expect(page.locator("h1")).toHaveText(headings.b);
});

test("splits new visitors between both variants", async ({ browser }) => {
  const seen = new Set<string>();
  for (let visitor = 0; visitor < 16 && seen.size < 2; visitor++) {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("/lp/automate");
    seen.add(
      (await context.cookies()).find((item) => item.name === "qm-variant")!
        .value,
    );
    await context.close();
  }
  expect([...seen].sort()).toEqual(["a", "b"]);
});
