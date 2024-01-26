import { ContainerElement, ImageElement, TextElement, cssSelector } from "@lowgular/testgular";

export class ClickableImageRow extends ContainerElement {
    readonly image = this.elementLocator.locateChild(ImageElement, cssSelector('img'));
    readonly title = this.elementLocator.locateChild(TextElement, cssSelector('.single-item-title'));
    readonly subtitle = this.elementLocator.locateChild(TextElement, cssSelector('.single-item-subtitle'));
}