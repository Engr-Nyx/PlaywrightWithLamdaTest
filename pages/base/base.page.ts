import test, { Browser, Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly browser: Browser;
  constructor(page: Page, browser: Browser) {
    this.page = page;
    this.browser = browser;
  }

  async navigate(url: string) {
    await this.page.goto(url);
  }

  async takeScreenshot(prefix: string = 'error') {
    const uniqueId = crypto.randomUUID();
    const fileName = `${prefix}_${uniqueId}.png`;
    await test.step(`Saving screenshot to ${fileName}`, async () => {
      await this.page.screenshot({ path: `screenshots/${fileName}` });
    });
  }
}