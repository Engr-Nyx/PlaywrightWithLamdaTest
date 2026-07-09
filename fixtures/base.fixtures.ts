import { test as base } from '@playwright/test';
import { DashboardPage } from '../pages/dashboard.page';
import { BasePage } from '../pages/base/base.page';
import { SimpleFormDemoPage } from '../pages/simple-form.page';
import { DragDropSliders } from '../pages/drag-drop-sliders.page';
import { InputFormSubmitPage } from '../pages/input-form-submit.page';

type fixtures = {
  dashboardPage: DashboardPage;
  simpleFormPage: SimpleFormDemoPage;
  basePage: BasePage;
  dragDropSliders: DragDropSliders;
  inputFormSubmitPage: InputFormSubmitPage
};

export const test = base.extend<fixtures>({
  dashboardPage: async ({ page, browser }, use) => {
    await use(new DashboardPage(page, browser));
  },
  basePage: async ({ page, browser }, use) => {
    await use(new BasePage(page, browser));
  },

  simpleFormPage: async ({ page, browser }, use) => {
    await use(new SimpleFormDemoPage(page, browser));
  },
  dragDropSliders: async ({ page, browser }, use) => {
    await use(new DragDropSliders(page, browser));
  },
  inputFormSubmitPage: async ({ page, browser }, use) => {
    await use(new InputFormSubmitPage(page, browser));
  },
});

export { expect } from '@playwright/test';