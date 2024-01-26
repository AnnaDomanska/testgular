import {
  ContainerElement,
  TextElement,
  UrlMatcher,
  cssSelector,
} from '@lowgular/testgular';
import { ClickableImageRow } from './clickable-image-row';

export class CastSection extends ContainerElement {
  readonly header = this.elementLocator.locateChild(
    TextElement,
    cssSelector('h3')
  );
  readonly castList = this.elementLocator.locateList(
    ClickableImageRow,
    cssSelector('km-clickable-image-row')
  );

  async checkHeaderContent() {
    await this.header.expectContent(new RegExp('występują', 'i'));
  }

  async checkFormatImagesUrls() {
    await this.castList.forEachChild(singleItem => singleItem.image.expectAttribute('src', UrlMatcher.startsWith('https://kicket.com/api/images/', '')))
  }

  async getSelectedArtistName(index: number) {
    const selectedArtist = await this.castList.getNthElement(index);
    const selectedName= await selectedArtist.title.getContent();

    return selectedName;
  }

  async selectArtisByIndex(index:number) {
    const selectedArtist = await this.castList.getNthElement(index);
    await selectedArtist.click();
  }
}