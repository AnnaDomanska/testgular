import {
  App,
  ContainerElement,
  ElementLocator,
  Router,
  TextElement,
  UrlMatcher,
  cssSelector,
  it,
} from '@lowgular/testgular';
import { APP_CONFIG } from '../utils/app-config';
import { ANY_SIGN } from '../utils/test-config';
import { TEST_CONFIG } from '../utils/test-config';
import {SingleReview} from '../components/single-review';
import {ReviewsSection} from '../components/reviews-section';

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

it('reviews section', APP_CONFIG, async(app: App) => {
  const router = app.inject(Router);
  const el = app.inject(ElementLocator);

  await router.navigate(
    `/wydarzenia/${TEST_CONFIG.showSlug}?eventId=${TEST_CONFIG.eventId}`
  );

const reviewsSection = el.locateChild(ReviewsSection, cssSelector('section.reviews'));

await reviewsSection.checkHeaderContent();
await reviewsSection.checkCounterFormat();
await reviewsSection.checkLength();
await reviewsSection.checkDataFormat();

});

//@todo paginator