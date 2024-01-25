import { ButtonElement, ContainerElement, StringMatcher, StringOrRegExp, cssSelector } from "@lowgular/testgular";

export class CitySelector extends ContainerElement {
    readonly button = this.elementLocator.locateChild(ButtonElement,
        cssSelector('kfb-button'))
    readonly container = this.elementLocator.locateChild(
        ContainerElement,
        cssSelector('.km-city-selector-container')
      );
    readonly selector = this.elementLocator.locateChild(
        ContainerElement,
        cssSelector('kfb-advanced-select')
      );
    readonly citiesList = this.elementLocator.locateList(
        ContainerElement,
        cssSelector('kfb-advanced-select-option')
      );

      async selectOption(index: number){
       const option = await this.citiesList.getNthElement(index);
       await option.click();
      }

      async expectOptionContent(index: number, content: StringOrRegExp){
        const option = await this.citiesList.getNthElement(index);
        await option.expectContent(content);
      }

      async expectButtonContent(content: StringOrRegExp){
        await this.button.expectContent(content)
      }

      async open() {
        await this.button.click()
      }

      async checkIfOpen() {
        await this.container.expectAttribute(
            'class',
            StringMatcher.mustContainWords(['km-city-selector-container-opened'])
          );
      }
}