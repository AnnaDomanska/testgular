import {
  App,
  ContainerElement,
  ElementLocator,
  Router,
  StringMatcher,
  TextElement,
  UrlMatcher,
  cssSelector,
  it,
} from '@lowgular/testgular';
import { APP_CONFIG } from '../utils/app-config';
import { ANY_SIGN } from '../utils/test-config';
import { TEST_CONFIG } from '../utils/test-config';
import { ClickableImageRow} from '../components/clickable-image-row'
import {SingleReview} from '../components/single-review'

it('navigation without eventId', APP_CONFIG, async (app: App) => {
  const router = app.inject(Router);
  const el = app.inject(ElementLocator);

  await router.navigate(`/wydarzenia/${TEST_CONFIG.showSlug}`);
  await router.expectAndWaitForFullUrl(
    UrlMatcher.startsWith(
      `${APP_CONFIG.appUrl}/wydarzenia/${TEST_CONFIG.showSlug}`,
      ''
    )
  );
  const header = el
    .locateChild(ContainerElement, cssSelector('.show-detail-box-header'))
    .elementLocator.locateChild(TextElement, cssSelector('h3'));
  await header.expectContent(ANY_SIGN);
});

it('navigation with eventId', APP_CONFIG, async (app: App) => {
  const router = app.inject(Router);
  const el = app.inject(ElementLocator);

  await router.navigate(
    `/wydarzenia/${TEST_CONFIG.showSlug}?eventId=${TEST_CONFIG.eventId}`
  );
  await router.expectAndWaitForFullUrl(
    UrlMatcher.startsWith(
      `${APP_CONFIG.appUrl}/wydarzenia/${TEST_CONFIG.showSlug}`,
      `?eventId=${TEST_CONFIG.eventId}`
    )
  );
  await app.waitForTimeout(5000);
  const header = el
    .locateChild(ContainerElement, cssSelector('.show-detail-box-header'))
    .elementLocator.locateChild(TextElement, cssSelector('h3'));
  await header.expectContent(ANY_SIGN);
});

it('cast section', APP_CONFIG, async(app: App) => {
  const router = app.inject(Router);
  const el = app.inject(ElementLocator);

  await router.navigate(
    `/wydarzenia/${TEST_CONFIG.showSlug}?eventId=${TEST_CONFIG.eventId}`
  );

const castSection = el.locateChild(ContainerElement, cssSelector('section.cast'));
const castList = await castSection.elementLocator.locateList(ClickableImageRow, cssSelector('km-clickable-image-row'));
await castList.expectToHaveLength(5);
await castList.forEachChild(castElement => castElement.expectData(UrlMatcher.startsWith('/artysta/', '')));
const firstElement = await castList.getNthElement(0);
const firstElementTitle = await firstElement.title.getContent();
await firstElement.click();
await router.expectAndWaitForUrl(UrlMatcher.startsWith('artysta/', ''));
await app.waitForTimeout(5000);
const mainSection = el.locateChild(ContainerElement, cssSelector('article'))
const header = mainSection.elementLocator.locateChild(TextElement, cssSelector('h1'));
await header.expectContent(StringMatcher.mustContainWords([firstElementTitle]));
});

it('reviews section', APP_CONFIG, async(app: App) => {
  const router = app.inject(Router);
  const el = app.inject(ElementLocator);

  await router.navigate(
    `/wydarzenia/${TEST_CONFIG.showSlug}?eventId=${TEST_CONFIG.eventId}`
  );

const reviewsSection = el.locateChild(ContainerElement, cssSelector('section.reviews'));
const reviewsHeader = await reviewsSection.elementLocator.locateChild(TextElement, cssSelector('h3'));
await reviewsHeader.expectContent(new RegExp('opinie naszych widzów', 'i'))
const headerContainer = await reviewsSection.elementLocator.locateChild(ContainerElement, cssSelector('.reviews-header'));
const reviewsCounter = await headerContainer.elementLocator.locateChild(TextElement, cssSelector('span'));
await reviewsCounter.expectContent(new RegExp(/\([1-9]\d*\)/));

const reviewList = await reviewsSection.elementLocator.locateList(SingleReview, cssSelector('km-review-detail'));
await reviewList.expectToHaveLength(5);
await reviewList.forEachChild(singleReview => singleReview.expectData())

});



//@todo paginator