import {
  ButtonElement,
  ContainerElement,
  InputFormControl,
  SimpleElement,
  StringMatcher,
  TextElement,
  cssSelector,
} from '@lowgular/testgular';

export class ReminderDialog extends ContainerElement {
  readonly closeButton = this.elementLocator.locateChild(
    ButtonElement,
    cssSelector('mat-icon')
  );
  readonly emailInput = this.elementLocator.locateChild(
    InputFormControl,
    cssSelector('.mat-mdc-input-element')
  );
  readonly errorTextList = this.elementLocator.locateList(
    TextElement,
    cssSelector('.mat-error')
  );
  readonly consentChecbox = this.elementLocator.locateChild(
    SimpleElement,
    cssSelector('mat-checkbox')
  );
  readonly submitButton = this.elementLocator.locateChild(
    ButtonElement,
    cssSelector('.kfb-button')
  );

  async checkIfOpen() {
    await this.expectAttribute(
      'class',
      StringMatcher.mustContainWords(['mdc-dialog--open'])
    );
  }

  async checkIfClose() {
    await this.expectAttribute(
      'class',
      StringMatcher.mustContainWords(['mdc-dialog--closing'])
    );
  }

  async close() {
    await this.closeButton.click();
  }

  async setEmail(email: string) {
    await this.emailInput.setValue(email)
  }

  async checkConsent() {
    await this.consentChecbox.click();
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async checkIfValid() {
    await this.errorTextList.expectToHaveLength(0)
  }

}
