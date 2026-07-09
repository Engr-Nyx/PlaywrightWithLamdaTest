import test, { Browser, expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../pages/base/base.page";
export class InputFormSubmitPage extends BasePage {


  readonly submitButton: Locator;
  readonly errorMessage: Locator;
  readonly successMessage: Locator;
  readonly fields: Record<string, Locator>;

  constructor(page: Page, browser: Browser) {
    super(page, browser);
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.errorMessage = page.getByRole('alert');
    this.successMessage = page.getByText('Thanks for contacting us, we will get back to you shortly.');
    this.fields = {
      name: page.getByRole('textbox', { name: 'Name' }),
      email: page.getByRole('textbox', { name: 'Email*' }),
      password: page.getByRole('textbox', { name: 'Password*' }),
      company: page.getByRole('textbox', { name: 'Company' }),
      website: page.getByRole('textbox', { name: 'Website' }),
      country: page.getByRole('combobox'),
      city: page.getByRole('textbox', { name: 'City', exact: true }),
      address1: page.getByRole('textbox', { name: 'Address 1' }),
      address2: page.getByRole('textbox', { name: 'Address 2' }),
      state: page.getByRole('textbox', { name: 'City* State*' }),
      zipCode: page.getByRole('textbox', { name: 'Zip Code*' }),
    }
  }

  async validatePleaseFillInTheFields(field: keyof typeof this.fields) {
    await test.step(`Validate "please fill in the fields" error for ${field}`, async () => {
      const isValid = await this.fields[field].evaluate((el: HTMLInputElement) => el.checkValidity());
      expect(isValid).toBe(false);

      const message = await this.fields[field].evaluate((el: HTMLInputElement) => el.validationMessage);
      expect(message).toBe("Please fill out this field.");
    });
  }

  async validateSuccessMessage() {
    await test.step('Validate success message is displayed', async () => {
      await expect(this.successMessage).toBeVisible();
    });
  }

  async fillField(field: keyof typeof this.fields, value: string) {
    await test.step(`Input ${field} field`, async () => {
      await this.fields[field].fill(value);
    });
  }

  async fillForm(data: Partial<Record<keyof typeof this.fields, string>>) {
    await test.step('Fill out the form', async () => {
      for (const [field, value] of Object.entries(data)) {
        if (field === 'country') {
          await this.selectCountry(value!);
        } else {
          await this.fillField(field as keyof typeof this.fields, value!);
        }
      }
    });
  }

  async selectCountry(value: string) {
    await test.step('Select country field', async () => {
      await this.fields.country.selectOption({ label: value });
    });
  }
}