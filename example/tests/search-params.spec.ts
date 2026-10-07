import { expect, test, type Page } from "@playwright/test";

const browserErrors = new WeakMap<Page, string[]>();

declare global {
  interface Window {
    transitionStages: string[];
  }
}

async function observeStages(page: Page) {
  await page.evaluate(() => {
    window.transitionStages = [];
    const state = document.querySelector('[data-testid="transition-state"]')!;
    new MutationObserver(() => {
      window.transitionStages.push(state.getAttribute("data-stage")!);
    }).observe(state, { attributes: true, attributeFilter: ["data-stage"] });
  });
}

async function expectTransition(page: Page) {
  await expect
    .poll(() => page.evaluate(() => window.transitionStages))
    .toEqual(["leaving", "entering", "none"]);
  await expect(page.getByTestId("transition-state")).toHaveAttribute(
    "data-ready",
    "true",
  );
}

test.beforeEach(async ({ page }) => {
  const errors: string[] = [];
  browserErrors.set(page, errors);
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/demo");
  await page
    .getByRole("checkbox", { name: "Animate search parameter changes" })
    .uncheck();
  await page
    .getByRole("checkbox", { name: "Animate search parameter changes" })
    .check();
  await observeStages(page);
});

test.afterEach(async ({ page }) => {
  expect(browserErrors.get(page)).toEqual([]);
});

for (const [name, kind, value] of [
  ["Page 1 (Next Link)", "link", "1"],
  ["Page 2 (auto)", "link", "2"],
  ["Page 3 (custom Link)", "link", "3"],
  ["Push page 4", "button", "4"],
  ["Replace page 5", "button", "5"],
] as const) {
  test(`${name} completes a query-only transition`, async ({ page }) => {
    await page.getByRole(kind, { name, exact: true }).click();
    await expectTransition(page);
    await expect(page).toHaveURL(`/demo?page=${value}`);
    await expect(
      page.getByText(`Current: ${value}`, { exact: true }),
    ).toBeVisible();
  });

  test(`${name} skips query animations when disabled`, async ({ page }) => {
    await page
      .getByRole("checkbox", { name: "Animate search parameter changes" })
      .uncheck();
    await page.getByRole(kind, { name, exact: true }).click();
    await expect(page).toHaveURL(`/demo?page=${value}`);
    await expect(
      page.getByText(`Current: ${value}`, { exact: true }),
    ).toBeVisible();
    expect(await page.evaluate(() => window.transitionStages)).toEqual([]);
  });
}

test("equivalent query encodings do not leave the router stuck", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Search a b", exact: true }).click();
  await expectTransition(page);
  await page.evaluate(() => {
    window.transitionStages = [];
  });
  await page
    .getByRole("button", { name: "Same search with +", exact: true })
    .click();
  await expect(page).toHaveURL("/demo?q=a+b");
  await expect(page.getByTestId("transition-state")).toHaveAttribute(
    "data-stage",
    "none",
  );
  expect(await page.evaluate(() => window.transitionStages)).toEqual([]);
});

test("navigating to the current query does not animate again", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Push page 4", exact: true }).click();
  await expectTransition(page);
  await page.evaluate(() => {
    window.transitionStages = [];
  });
  await page.getByRole("button", { name: "Push page 4", exact: true }).click();
  await expect(page.getByTestId("transition-state")).toHaveAttribute(
    "data-stage",
    "none",
  );
  expect(await page.evaluate(() => window.transitionStages)).toEqual([]);
});

test("clearing query parameters completes a transition", async ({ page }) => {
  await page.getByRole("button", { name: "Push page 4", exact: true }).click();
  await expectTransition(page);
  await page.evaluate(() => {
    window.transitionStages = [];
  });
  await page
    .getByRole("button", { name: "Clear filters", exact: true })
    .click();
  await expectTransition(page);
  await expect(page).toHaveURL("/demo");
});

test("hash-only navigation remains unanimated", async ({ page }) => {
  await page
    .getByRole("link", { name: "same pathname with hash", exact: true })
    .click();
  await expect(page).toHaveURL("/demo#test");
  expect(await page.evaluate(() => window.transitionStages)).toEqual([]);
  await page.getByRole("link", { name: "top ↑ (#)", exact: true }).click();
  await expect(page).toHaveURL(/\/demo#?$/);
  expect(await page.evaluate(() => window.transitionStages)).toEqual([]);
});

test("pathname changes still animate with query transitions disabled", async ({
  page,
}) => {
  await page
    .getByRole("checkbox", { name: "Animate search parameter changes" })
    .uncheck();
  await page
    .getByRole("link", { name: "simple custom link", exact: true })
    .click();
  await expectTransition(page);
  await expect(page).toHaveURL("/");
});

test("pathname and query can change in the same transition", async ({
  page,
}) => {
  await page.getByRole("link", { name: "url object", exact: true }).click();
  await expectTransition(page);
  await expect(page).toHaveURL("/?name=test");
});

test("replace and back preserve query history without getting stuck", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Push page 4", exact: true }).click();
  await expectTransition(page);
  await page.evaluate(() => {
    window.transitionStages = [];
  });
  await page
    .getByRole("button", { name: "Replace page 5", exact: true })
    .click();
  await expectTransition(page);
  await page.evaluate(() => {
    window.transitionStages = [];
  });
  await page.getByRole("button", { name: "← back", exact: true }).click();
  await expect(page).toHaveURL("/demo");
  await expect(page.getByText("Current: 0", { exact: true })).toBeVisible();
  expect(await page.evaluate(() => window.transitionStages)).toEqual([]);
  await page.goForward();
  await expect(page).toHaveURL("/demo?page=5");
  await expect(page.getByText("Current: 5", { exact: true })).toBeVisible();
  expect(await page.evaluate(() => window.transitionStages)).toEqual([]);
  await page.evaluate(() => {
    window.transitionStages = [];
  });
  await page
    .getByRole("button", { name: "Clear filters", exact: true })
    .click();
  await expectTransition(page);
});

for (const href of [
  "/demo?page=2#test",
  "/demo?page=2&tag=a&tag=b&empty=&q=caf%C3%A9",
  "http://127.0.0.1:3100/demo?page=2",
]) {
  test(`auto navigation supports ${href}`, async ({ page }) => {
    const link = page.getByRole("link", { name: "Page 2 (auto)", exact: true });
    await link.evaluate(
      (element, value) => element.setAttribute("href", value),
      href,
    );
    await link.click();
    await expectTransition(page);
    await expect(page).toHaveURL(href);
    await expect(page.getByText("Current: 2", { exact: true })).toBeVisible();
  });
}

test("custom Link animates query changes with auto detection disabled", async ({
  page,
}) => {
  await page
    .getByRole("checkbox", { name: "Detect links automatically" })
    .uncheck();
  await page
    .getByRole("link", { name: "Page 3 (custom Link)", exact: true })
    .click();
  await expectTransition(page);
  await expect(page).toHaveURL("/demo?page=3");
  await expect(page.getByText("Current: 3", { exact: true })).toBeVisible();
});
