import { expect, test } from "@playwright/test";

const pixelScript = "https://connect.facebook.net/en_US/fbevents.js";

test("Meta Pixel initializes and queues one PageView per document", async ({ page }) => {
  // Stub Meta's script so the check cannot send test visits to the live pixel.
  await page.route(pixelScript, (route) => route.fulfill({ contentType: "application/javascript", body: "" }));
  const errors: string[] = [];
  let loads = 0;
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("request", (request) => { if (request.url() === pixelScript) loads++; });
  await page.goto("/?webgl=off");
  const queuedCalls = () => page.evaluate(() => {
    const pixelWindow = window as unknown as { fbq?: { queue: IArguments[] } };
    return pixelWindow.fbq?.queue.map((call) => Array.from(call));
  });
  await expect.poll(queuedCalls).toEqual([["init", "1681669726675187"], ["track", "PageView"]]);
  await expect(page.locator("head #meta-pixel")).toHaveCount(1);
  await expect(page.locator(".hero")).toHaveAttribute("data-stage", "exploration");
  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Sponsors", exact: true }).click();
  await expect(page).toHaveURL(/#sponsors$/);
  expect(await queuedCalls()).toEqual([["init", "1681669726675187"], ["track", "PageView"]]);
  expect(loads).toBe(1);
  expect(errors).toEqual([]);
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("Meta Pixel sends the image PageView fallback", async ({ page }) => {
    await page.route("https://www.facebook.com/tr?**", (route) => route.fulfill({
      contentType: "image/gif",
      body: Buffer.from("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", "base64"),
    }));
    const imageRequest = page.waitForRequest((request) => request.url().startsWith("https://www.facebook.com/tr?"));
    await page.goto("/");
    const url = new URL((await imageRequest).url());
    expect(url.searchParams.get("id")).toBe("1681669726675187");
    expect(url.searchParams.get("ev")).toBe("PageView");
    expect(url.searchParams.get("noscript")).toBe("1");
    await expect(page.locator('noscript img[src*="facebook.com/tr"]')).toHaveCount(1);
  });
});
