import { ContainerElement, ImageElement, StringOrRegExp, TextElement, cssSelector } from "@lowgular/testgular";

export class TopArtistBox extends ContainerElement {
    readonly artistLink = this.elementLocator.locateChild(TextElement, cssSelector('.top-artist-box-link'));
    readonly eventLink = this.elementLocator.locateChild(TextElement, cssSelector('.top-artist-box-event-link'));
    readonly image = this.elementLocator.locateChild(ImageElement, cssSelector('image'));

    async expectData(artistUrl: StringOrRegExp, eventUrl: StringOrRegExp, imageUrl: StringOrRegExp) {
        await this.artistLink.expectAttribute('href', artistUrl);
        await this.eventLink.expectAttribute('href', eventUrl);
        await this.image.expectAttribute('href', imageUrl);
    }
}