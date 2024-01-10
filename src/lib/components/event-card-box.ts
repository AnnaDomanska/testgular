import {
  ContainerElement,
  SimpleElement,
  StringOrRegExp,
  TextElement,
  cssSelector,
} from '@lowgular/testgular';
import { ANY_SIGN } from '../utils/test-config';

export class EventCardBox extends ContainerElement {
  readonly header = this.elementLocator.locateChild(
    TextElement,
    cssSelector('.card-box-header-text')
  );
  readonly rating = this.elementLocator.locateChild(
    TextElement,
    cssSelector('.card-box-rating')
  );
  readonly title = this.elementLocator.locateChild(
    TextElement,
    cssSelector('.card-box-title')
  );
  readonly locationInfo = this.elementLocator.locateChild(
    TextElement,
    cssSelector('.card-box-localization')
  );
  readonly button = this.elementLocator.locateChild(
    ContainerElement,
    cssSelector('.card-box-button')
  );
  readonly imageContainer = this.elementLocator.locateChild(
    ContainerElement,
    cssSelector('.card-box-image-container')
  );
  readonly imageLink = this.imageContainer.elementLocator.locateChild(
    SimpleElement,
    cssSelector('a')
  );

  async expectData(url: StringOrRegExp) {
    await this.imageLink.expectAttribute('href', url);
    await this.header.expectContent(ANY_SIGN);
    await this.title.expectContent(ANY_SIGN);
    await this.rating.expectContent(
      new RegExp(/^(10(\.00?)?|[0-9](\.[0-9]{1,2})?|nowość)$/)
    );
    await this.locationInfo.expectContent(ANY_SIGN);
    await this.button.expectAttribute('href', url);
  }
}
