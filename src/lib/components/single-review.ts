import { ContainerElement, SimpleElement, TextElement, cssSelector } from "@lowgular/testgular";
import { ANY_SIGN } from '../utils/test-config'

export class SingleReview extends ContainerElement {
    readonly rating = this.elementLocator.locateChild(ContainerElement, cssSelector('.single-review-rating'));
    readonly ratingIcon = this.rating.elementLocator.locateChild(SimpleElement, cssSelector('.mat-icon'));
    readonly ratingValue = this.rating.elementLocator.locateChild(TextElement, cssSelector('span'))
    readonly text = this.elementLocator.locateChild(TextElement, cssSelector('.single-review-text'));
    readonly details = this.elementLocator.locateChild(TextElement, cssSelector('.single-review-details'));


    async expectData() {
        await this.ratingIcon.expectAttribute('fonticon', 'star');
        await this.ratingValue.expectContent(new RegExp(/^(10|[1-9])\/10$/));
        // await this.text.expectContent(ANY_SIGN);
        await this.details.expectContent(ANY_SIGN)
    }
}

//@todo sprawdzić content details => mail + data
//@todo naprawić content text