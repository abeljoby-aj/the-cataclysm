import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // Browser QA must not add synthetic visits to the live Meta Pixel.
  await page.route("https://connect.facebook.net/**", (route) => route.fulfill({ contentType: "application/javascript", body: "" }));
});

test("cash and sponsor rewards are clear, logos load, and layouts fit", async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/?webgl=off");
  await expect(page.locator("#top")).toHaveAttribute("data-stage", "exploration");
  await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName("THE CATACLYSM");
  await expect(page.locator(".hero-reward-callout")).toHaveCount(0);
  await expect(page.locator("#top")).not.toContainText("New sponsor rewards");
  await expect(page.locator(".hero-main-sponsor")).toHaveCount(0);
  await page.screenshot({ path: testInfo.outputPath("hero.png") });

  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Prizes", exact: true }).click();
  await expect(page).toHaveURL(/#prize$/);
  const prizes = page.locator("#prize");
  await expect(prizes.getByRole("heading", { level: 2 })).toBeInViewport();
  await expect(prizes.locator(".reward-cash")).toContainText("₹30,000");
  await expect(prizes.locator(".reward-sponsored")).toContainText("₹60K–₹70K");
  await expect(prizes.locator(".reward-sponsored")).toContainText("Estimated value");
  await expect(prizes.locator(".podium-rewards li")).toHaveText([
    /1st-place team.*3 months.*team’s top scorer/,
    /2nd-place team.*2 months.*team’s top scorer/,
    /3rd-place team.*1 month.*team’s top scorer/,
  ]);
  await expect(prizes.locator(".winner-rewards")).toContainText("One subscription per team, awarded to that team’s highest-scoring member");
  await expect(prizes.locator(".winner-vouchers")).toContainText("One free exam voucher per team member");
  await expect(prizes.locator(".winner-vouchers")).toContainText("12 TC-VAPT vouchers total, shared across the top 3 teams");
  await expect(prizes.locator(".participant-rewards")).toContainText("For all registered participants");
  await expect(prizes.locator(".participant-discount")).toHaveText("66% off");
  await expect(prizes).not.toContainText(/CyberDefenders|ThunderCipher/);
  await prizes.screenshot({ path: testInfo.outputPath("prizes.png"), style: ".nav, .skip-link { visibility: hidden !important; }" });

  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Sponsors", exact: true }).click();
  await expect(page).toHaveURL(/#sponsors$/);
  const sponsors = page.locator("#sponsors");
  const mainSponsor = sponsors.locator(".main-cash-sponsor");
  await expect(mainSponsor).toContainText("Main cash sponsor");
  await expect(mainSponsor).toContainText("Supporting the cash prize pool.");
  await expect(mainSponsor).toContainText("AMT is a global software engineering company specialising in custom product development, AI and cloud solutions.");
  const amtLogo = mainSponsor.getByRole("img", { name: /AMT logo/ });
  await expect.poll(() => amtLogo.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  await expect(sponsors.locator(".sponsor-description")).toHaveCount(0);
  await expect(sponsors).not.toContainText(/vouchers|subscription|66%/);
  await expect(sponsors.getByRole("heading", { level: 2 })).toBeInViewport();
  for (const name of ["CyberDefenders", "ThunderCipher"]) {
    const logo = sponsors.getByRole("img", { name: `${name} logo` });
    await logo.scrollIntoViewIfNeeded();
    await expect(logo).toBeVisible();
    await expect.poll(() => logo.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  }
  await sponsors.screenshot({ path: testInfo.outputPath("sponsors.png"), style: ".nav, .skip-link { visibility: hidden !important; }" });

  // Check actual content bounds as well as document width, since overflow-x:hidden can mask clipping.
  const overflow = await page.locator(".nav, .title-word, .main-cash-sponsor, .main-sponsor-logo, .main-sponsor-description, .reward-total, .reward-amount, .podium-rewards, .reward-group-title, .sponsor-card, .sponsor-brand h3").evaluateAll((elements) =>
    elements.filter((element) => {
      const rect = element.getBoundingClientRect();
      return rect.left < -1 || rect.right > window.innerWidth + 1;
    }).map((element) => element.className),
  );
  expect(overflow, "Important content should fit the viewport").toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(errors, "No uncaught application errors").toEqual([]);
});

test("registration calculator, official link, and prize FAQ work", async ({ page }) => {
  await page.goto("/?webgl=off#register");
  const register = page.locator("#register");
  await register.getByRole("button", { name: "3 members" }).click();
  await expect(register.locator(".calc-out")).toContainText("₹1200");
  await register.getByRole("button", { name: "4 members" }).click();
  await expect(register.locator(".calc-out")).toContainText("₹1600");
  await expect(register.getByRole("link", { name: /Register Now/ })).toHaveAttribute("href", "https://konfhub.com/the-cataclysm");
  const question = page.locator("#faq summary").filter({ hasText: "What rewards can I receive?" });
  await question.click();
  const answer = page.locator("#faq details[open]");
  await expect(answer).toContainText("₹60,000–₹70,000");
  await expect(answer).toContainText("separate from the cash prize pool");
  await expect(answer).toContainText("one Pro training subscription for its highest-scoring member");
  await expect(answer).toContainText("one free TC-VAPT exam voucher (12 vouchers total across all three teams)");
  await expect(answer).toContainText("All registered participants get 66% off the TC-VAPT exam");
  await expect(answer).not.toContainText(/CyberDefenders|ThunderCipher/);
});

test("WebGL opening reaches the title reveal without application errors", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "One full WebGL smoke check; responsive content checks use the fallback.");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator(".world canvas")).toBeVisible();
  await expect(page.locator("#top")).toHaveAttribute("data-stage", "exploration", { timeout: 15_000 });
  await expect(page.locator(".letter").last()).toHaveCSS("opacity", "1");
  await page.screenshot({ path: testInfo.outputPath("webgl-hero.png") });
  expect(errors).toEqual([]);
});
