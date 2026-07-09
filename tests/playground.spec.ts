import { test } from '../fixtures/base.fixtures';
test.describe('Assignment Task: Playwright 101', () => {

  test.beforeEach(async ({ dashboardPage }) => {
    await dashboardPage.navigateToDashboard();
  });

  test('Test Scenario 1', async ({ dashboardPage, simpleFormPage }) => {
    const message = "Welcome to TestMu AI";
    await dashboardPage.clickItem("Simple Form Demo");
    await dashboardPage.validateURLContains("simple-form-demo");
    await simpleFormPage.inputBoxField.fill(message);
    await simpleFormPage.checkValueButton.click();
    await simpleFormPage.validateDisplayedMessage(message, { timeout: 10000 });
  });

  test('Test Scenario 2:', async ({ dashboardPage, dragDropSliders }) => {
    const value = 95;
    await dashboardPage.clickItem("Drag & Drop Sliders");
    await dragDropSliders.dragSlider3(value);
    await dragDropSliders.validateSliderValue(value);
  });


  test('Test Scenario 3:', async ({ dashboardPage, inputFormSubmitPage }) => {
    const formData = {
      name: 'PlaywrightAccount',
      email: 'PlaywrightAccount@gmail.com',
      password: 'PlawrightAccount@123',
      company: 'Playwright',
      website: 'Playwright.com',
      country: 'United States',
      city: 'New York City',
      address1: '59 West',
      address2: '46th Street',
      state: 'NY',
      zipCode: '10036',
    };

    await dashboardPage.clickItem('Input Form Submit');
    await inputFormSubmitPage.submitButton.click();
    await inputFormSubmitPage.validatePleaseFillInTheFields('name');
    await inputFormSubmitPage.fillForm(formData);
    await inputFormSubmitPage.submitButton.click();
    await inputFormSubmitPage.validateSuccessMessage();
  });

});