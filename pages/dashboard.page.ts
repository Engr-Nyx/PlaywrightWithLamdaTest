import test, { Browser, expect, Locator, Page } from "@playwright/test";
import { baseURL } from "../utils/constant.utils";
import { BasePage } from "../pages/base/base.page";
export class DashboardPage extends BasePage {

  constructor(page: Page, browser: Browser) {
    super(page, browser);
  }

  getItemLocator(value: string): Locator {
    return this.page.getByRole('link', { name: value })
  }

  async navigateToDashboard(): Promise<void> {
    this.navigate(baseURL);
  }

  async clickItem(value: string) {
    await test.step(`Click Item that contains ${value}`, async () => {
      return await this.getItemLocator(value).click();
    });
  }
  async validateURLContains(value: string) {
    await test.step(`Validate that the URL contains ${value}.`, async () => {
      await expect(this.page).toHaveURL(new RegExp(value));
    });
  }

}