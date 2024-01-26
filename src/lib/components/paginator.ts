import { ButtonElement, ContainerElement, SimpleElement, StringMatcher, cssSelector } from "@lowgular/testgular";

export class Paginator extends ContainerElement {
    readonly pageNumberList = this.elementLocator.locateList(ButtonElement, cssSelector('.page-numbers'));

    readonly arrowButtonContainerList = this.elementLocator.locateList(ContainerElement, cssSelector('.page-btn'));
    
    readonly pageDotsList = this.elementLocator.locateList(SimpleElement, cssSelector('.page-dots'));

    async checkFirstPageScenario() {
        const firstPageButton = await this.pageNumberList.getNthElement(0);

        const prevArrowButton = (await this.arrowButtonContainerList.getNthElement(0)).elementLocator.locateChild(ButtonElement, cssSelector('.kfb-button'));

        const nextArrowButton = (await this.arrowButtonContainerList.getNthElement(1)).elementLocator.locateChild(ButtonElement, cssSelector('.kfb-button'));

        await firstPageButton.expectAttribute('class', StringMatcher.mustContainWords(['active']));
        await prevArrowButton.expectDisabled();
        await nextArrowButton.expectDisabled(false);
    }

    async goToPage(pageNumber: number) {
        const selectedButton = await this.pageNumberList.find(await(button => button.hasContent(pageNumber.toString())));
        await selectedButton.click();
        await selectedButton.expectAttribute('class', StringMatcher.mustContainWords(['active']));
    }
}