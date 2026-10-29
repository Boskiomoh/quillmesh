import { expect, test, type Page } from "@playwright/test";

const openForm = async (page: Page) => {
  await page.goto("/demo");
  await page.waitForFunction(() => {
    const form = document.querySelector("form");
    return (
      !!form && Object.keys(form).some((key) => key.startsWith("__reactProps"))
    );
  });
};

test("shows an error next to each missing field", async ({ page }) => {
  await openForm(page);
  await page.getByRole("button", { name: "Request a demo" }).click();

  await expect(
    page.getByText("Please fix the fields marked below."),
  ).toBeVisible();
  for (const label of ["Full name", "Work email", "Company", "Team size"]) {
    await expect(page.getByLabel(label)).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  }
  await expect(
    page.getByText("Enter a work email like name@company.com"),
  ).toBeVisible();
});

test("keeps typed values after a failed submit", async ({ page }) => {
  await openForm(page);
  await page.getByLabel("Full name").fill("Ada Lovelace");
  await page.getByLabel("Work email").fill("not-an-email");
  await page.getByRole("button", { name: "Request a demo" }).click();

  await expect(page.getByLabel("Work email")).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await expect(page.getByLabel("Full name")).toHaveValue("Ada Lovelace");
  await expect(page.getByLabel("Full name")).not.toHaveAttribute(
    "aria-invalid",
    "true",
  );
});

test("links each error to its field for screen readers", async ({ page }) => {
  await openForm(page);
  await page.getByRole("button", { name: "Request a demo" }).click();
  await expect(page.getByLabel("Company")).toHaveAccessibleDescription(
    "Enter your company",
  );
});
