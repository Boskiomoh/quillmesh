import { expect, test } from "@playwright/test";

test("the Resources menu opens and closes on Escape", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "Desktop navigation");
  await page.goto("/");
  const button = page.getByRole("button", { name: "Resources" });
  await button.click();
  await expect(button).toHaveAttribute("aria-expanded", "true");
  await expect(
    page
      .locator("#resources-menu")
      .getByRole("link", { name: "Design system" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(button).toHaveAttribute("aria-expanded", "false");
});

test("the phone menu opens as a dialog and closes with Escape", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name === "chromium", "Phone navigation");
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  const dialog = page.getByRole("dialog", { name: "Site menu" });
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("the pricing switch shows annual prices and keeps them in the URL", async ({
  page,
}) => {
  await page.goto("/pricing");
  await expect(page.getByText("$49", { exact: false })).toBeVisible();
  await page.getByRole("switch").click();
  await expect(page).toHaveURL(/billing=annual/);
  await expect(page.getByRole("switch")).toHaveAttribute(
    "aria-checked",
    "true",
  );
  await expect(page.getByText("$34", { exact: false })).toBeVisible();

  await page.reload();
  await expect(page.getByText("$34", { exact: false })).toBeVisible();
});

test("blog category chips filter posts", async ({ page }) => {
  await page.goto("/blog");
  await page
    .getByRole("navigation", { name: "Blog categories" })
    .getByRole("link", { name: "Culture" })
    .click();
  await expect(page).toHaveURL(/\/blog\/category\/culture$/);
  await expect(page.getByRole("heading", { level: 2 }).first()).toContainText(
    "PMs should own the ops",
  );
});
