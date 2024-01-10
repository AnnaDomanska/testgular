import { ContainerElement, ImageElement, SimpleElement, StringOrRegExp, TextElement, cssSelector } from "@lowgular/testgular";
import { ANY_SIGN } from "../utils/test-config";

export class ClickableImageRow extends ContainerElement {
    readonly clickableArea = this.elementLocator.locateChild(SimpleElement, cssSelector('.single-item'));

    readonly image = this.elementLocator.locateChild(ImageElement, cssSelector('img'));
    readonly title = this.elementLocator.locateChild(TextElement, cssSelector('.single-item-title'))
    readonly subtitle = this.elementLocator.locateChild(TextElement, cssSelector('.single-item-subtitle'))

    async expectData(url: StringOrRegExp) {
        await this.clickableArea.expectAttribute('href', url);
        await this.title.expectContent(ANY_SIGN);
        await this.subtitle.expectContent(ANY_SIGN)
    }
}