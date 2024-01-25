import {
    ButtonElement,
  ContainerElement,
  InputFormControl,
  SimpleElement,
  StringMatcher,
  StringOrRegExp,
  TextElement,
  cssSelector,
} from '@lowgular/testgular';

export class NewsletterForm extends ContainerElement {
  readonly emailInput = this.elementLocator.locateChild(
    InputFormControl,
    cssSelector('.mat-mdc-input-element')
  );
  readonly consentCheckbox = this.elementLocator.locateChild(
    SimpleElement,
    cssSelector('mat-checkbox')
  );
  readonly submitButton = this.elementLocator.locateChild(
    ButtonElement,
    cssSelector('.kfb-button')
  );

  readonly errorText = this.elementLocator.locateChild(TextElement, cssSelector('.mat-error'));

  async submitWithValue(value: string) {
    await this.emailInput.setValue(value);
    await this.submitButton.click();
  }

  async checkConsent() {
    await this.consentCheckbox.click();
  }

  async checkExpectedErrorContent(content: StringOrRegExp) {
    await this.errorText.expectContent(content)
  }

  async checkIfSubmitted(){
    await this.submitButton.expectContent(
        StringMatcher.mustContainWords(['zapisano'])
      );
  }

  async checkIfFormElementsDisabled() {
   await this.submitButton.expectHasAttribute('disabled');
   await this.consentCheckbox.expectAttribute(
      'class',
      StringMatcher.mustContainWords(['mat-mdc-checkbox-disabled'])
    );
  }

}
