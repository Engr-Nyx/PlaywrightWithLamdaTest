import test, { Browser, expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../pages/base/base.page";
export class DragDropSliders extends BasePage {

  readonly slider: Locator;
  constructor(page: Page, browser: Browser) {
    super(page, browser);
    this.slider = page.locator('#slider3').getByRole('slider');
  }

  getSliderValue(value: number) {
    return this.page.getByText(value.toString(), { exact: true });
  }

  async dragSlider3(value: number) {
    await test.step(`Drag slide til value "${value}"`, async () => {
      this.slider.focus();
      for (let i = 15; i < value; i++) {
        await this.slider.press('ArrowRight');
      }
    });
  }

  async validateSliderValue(value: number) {
    await test.step(`Validate whether the range value shows "${value}"`, async () => {
      const sliderOutput = this.getSliderValue(value);
      await expect(sliderOutput).toHaveText(value.toString());
    });
  }

}