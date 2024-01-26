import { ContainerElement, StringMatcher, TextElement, cssSelector } from "@lowgular/testgular";

export class ArtistSection extends ContainerElement {
    readonly header = this.elementLocator.locateChild(TextElement, cssSelector('h1'));

    async expectContentContainsName(artistName: string) {
await this.header.expectContent(StringMatcher.mustContainWords([artistName]))
    }
}