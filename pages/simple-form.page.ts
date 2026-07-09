import test, { Browser, expect, Locator, Page } from "@playwright/test";
import { baseURL } from "../utils/constant.utils";
import { BasePage } from "../pages/base/base.page";
export class SimpleFormDemoPage extends BasePage {

  readonly inputBoxField: Locator;
  readonly checkValueButton: Locator;
  readonly displayMessage: Locator;

  constructor(page: Page, browser: Browser) {
    super(page, browser);
    this.inputBoxField = page.getByRole('textbox', { name: 'Please enter your Message' });
    this.checkValueButton = page.locator('#showInput')
    this.displayMessage = page.locator('#message');
  }

  async validateDisplayedMessage(expectedMessage: string, options?: { timeout?: number }) {
    await test.step(`Validate that the right-hand panel displays: "${expectedMessage}"`, async () => {
      await expect(this.displayMessage).toHaveText(expectedMessage, options);
    });
  }
}