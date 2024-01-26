import {
  ContainerElement,
  TextElement,
  cssSelector,
} from '@lowgular/testgular';
import { SingleReview } from './single-review';

export class ReviewsSection extends ContainerElement {
  readonly header = this.elementLocator.locateChild(
    TextElement,
    cssSelector('h3')
  );
  readonly reviewsContainer = this.elementLocator.locateChild(
    ContainerElement,
    cssSelector('.reviews-header')
  );
  readonly reviewsCounter = this.reviewsContainer.elementLocator.locateChild(
    TextElement,
    cssSelector('span')
  );
  readonly reviewList = this.elementLocator.locateList(
    SingleReview,
    cssSelector('km-review-detail')
  );

  async checkHeaderContent() {
    await this.header.expectContent(new RegExp('opinie naszych widzów', 'i'));
  }

  async checkCounterFormat() {
    await this.reviewsCounter.expectContent(new RegExp(/\([1-9]\d*\)/));
  }

  async checkLength(){
    await this.reviewList.expectToHaveLength(5)
  }

  async checkDataFormat(){
    await this.reviewList.forEachChild(singleReview => singleReview.expectData())
  }
}
