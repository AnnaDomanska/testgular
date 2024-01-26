import {
  App,
  ButtonElement,
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
import { ReviewsSection } from '../components/reviews-section';
import { Paginator } from '../components/paginator';
import { CastSection } from '../components/cast-section';
import {ArtistPageMainSection} from '../components/artist-page-main-section';
import {ReminderDialog} from '../components/reminder-dialog';

it('navigation without eventId', APP_CONFIG, async (app: App) => {
  const router = app.inject(Router);
  const el = app.inject(ElementLocator);

  await router.navigate(`/wydarzenia/${TEST_CONFIG.default.showSlug}`);
  await router.expectAndWaitForFullUrl(
    UrlMatcher.startsWith(
      `${APP_CONFIG.appUrl}/wydarzenia/${TEST_CONFIG.default.showSlug}`,
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
    `/wydarzenia/${TEST_CONFIG.default.showSlug}?eventId=${TEST_CONFIG.default.eventId}`
  );
  await router.expectAndWaitForFullUrl(
    UrlMatcher.startsWith(
      `${APP_CONFIG.appUrl}/wydarzenia/${TEST_CONFIG.default.showSlug}`,
      `?eventId=${TEST_CONFIG.default.eventId}`
    )
  );
  await app.waitForTimeout(5000);
  const header = el
    .locateChild(ContainerElement, cssSelector('.show-detail-box-header'))
    .elementLocator.locateChild(TextElement, cssSelector('h3'));
  await header.expectContent(ANY_SIGN);
});

it('reviews section', APP_CONFIG, async (app: App) => {
  const router = app.inject(Router);
  const el = app.inject(ElementLocator);

  await router.navigate(
    `/wydarzenia/${TEST_CONFIG.default.showSlug}?eventId=${TEST_CONFIG.default.eventId}`
  );

  const reviewsSection = el.locateChild(
    ReviewsSection,
    cssSelector('section.reviews')
  );

  await reviewsSection.checkHeaderContent();
  await reviewsSection.checkCounterFormat();
  await reviewsSection.checkLength();
  await reviewsSection.checkDataFormat();

  const paginator = el.locateChild(Paginator, cssSelector('.pagination'));

  await paginator.checkFirstPageScenario();
  await paginator.goToPage(3);
});

it('cast section', APP_CONFIG, async (app: App) => {
  const router = app.inject(Router);
  const el = app.inject(ElementLocator);

  await router.navigate(
    `/wydarzenia/${TEST_CONFIG.default.showSlug}?eventId=${TEST_CONFIG.default.eventId}`
  );

  const castSection = el.locateChild(CastSection, cssSelector('section.cast'));

  await castSection.checkHeaderContent();
  await castSection.checkFormatImagesUrls();

  const selectedName = await castSection.getSelectedArtistName(1);

  await castSection.selectArtisByIndex(1);
  await router.expectAndWaitForUrl(UrlMatcher.startsWith('artysta/', ''));
  await app.waitForTimeout(5000);
  const artistSection = el.locateChild(ArtistPageMainSection, cssSelector('article'));
  await artistSection.expectContentContainsName(selectedName);

});

it('reminder', APP_CONFIG, async (app:App) => {
  const router = app.inject(Router);
  const el = app.inject(ElementLocator);

  await router.navigate(
    `/wydarzenia/${TEST_CONFIG.forReminder.showSlug}?eventId=${TEST_CONFIG.forReminder.eventId}`
  );

  const reminderButton = await el.locateChild(ContainerElement, cssSelector('.reminder-button')).elementLocator.locateChild(ButtonElement, cssSelector('.kfb-button'));
  const reminderDialog = await el.locateChild(ReminderDialog, cssSelector('mat-dialog-container'));

  await reminderButton.click();
  await reminderDialog.checkIfOpen();
  await reminderDialog.setEmail('anna@wp.pl');
  await reminderDialog.checkConsent();
  await reminderDialog.submitForm();
  await reminderDialog.checkIfValid();
  await reminderDialog.close();
  await reminderDialog.checkIfClose();

})
