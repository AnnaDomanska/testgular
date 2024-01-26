import {
  it,
  App,
  Router,
  ElementLocator,
  ContainerElement,
  cssSelector,
  StringMatcher,
  UrlMatcher
} from '@lowgular/testgular';
import { EventCardBox } from '../components/event-card-box';
import { TopArtistBox } from '../components/top-artist-box';
import { APP_CONFIG } from '../utils/app-config';
import { TEST_CONFIG, removePolishCharacters } from '../utils/test-config';
import { CitySelector } from '../components/city-selector';
import { NewsletterForm } from '../components/newsletter-form';

it('headerCitySelector', APP_CONFIG, async (app: App) => {
  const router = app.inject(Router);
  const el = app.inject(ElementLocator);

  await router.navigateAndWait(`/${removePolishCharacters(TEST_CONFIG.city)}`);
  const header = el.locateChild(ContainerElement, cssSelector('km-header'));
  const headerCitySelector = await header.elementLocator.locateChild(
    CitySelector,
    cssSelector('km-city-selector')
  );

  await headerCitySelector.expectButtonContent(
    StringMatcher.titleCase(TEST_CONFIG.city)
  );
  await headerCitySelector.open();
  await headerCitySelector.checkIfOpen();
  await headerCitySelector.expectOptionContent(
    0,
    StringMatcher.mustContainWords(['wszystkie', 'miasta'])
  );
  await headerCitySelector.selectOption(0);
  await router.expectAndWaitForUrl('');
});

it('listingCardBox', APP_CONFIG, async (app: App) => {
  const router = app.inject(Router);
  const el = app.inject(ElementLocator);

  await router.navigateAndWait(`/${removePolishCharacters(TEST_CONFIG.city)}`);
  const eventCardBoxes = await el.locateList(
    EventCardBox,
    cssSelector('.card-box')
  );

  await eventCardBoxes.forEachChild(
    async (cardBox) =>
      await cardBox.expectData(
        UrlMatcher.startsWith(`${APP_CONFIG.appUrl}/wydarzenia/`, '')
      )
  );
});

it('newsletterForm', APP_CONFIG, async (app: App) => {
  const router = app.inject(Router);
  const el = app.inject(ElementLocator);

  await router.navigateAndWait(`/${removePolishCharacters(TEST_CONFIG.city)}`);
  const newsletterForm = await el.locateChild(
    NewsletterForm,
    cssSelector('.newsletter-section-item.newsletter-form')
  );
  await newsletterForm.submitWithValue('kot@wp.pl');
  await newsletterForm.checkExpectedErrorContent(
    StringMatcher.titleCase('zgoda jest wymagana')
  );

  await newsletterForm.checkConsent();
  await newsletterForm.submitWithValue('kot');
  await newsletterForm.checkExpectedErrorContent(
    StringMatcher.mustContainWords(['e-mail'])
  );

  await newsletterForm.submitWithValue('kot@wp.pl');
  await app.waitForTimeout(5000);
  await newsletterForm.checkIfSubmitted();
  await newsletterForm.checkIfFormElementsDisabled();
});

it('artist-section', APP_CONFIG, async (app: App) => {
  const router = app.inject(Router);
  const el = app.inject(ElementLocator);

  await router.navigateAndWait(`/${removePolishCharacters(TEST_CONFIG.city)}`);
  const topArtistBoxes = await el.locateList(
    TopArtistBox,
    cssSelector('km-top-artist-box')
  );
  await topArtistBoxes.forEachChild(
    async (artitBox) =>
      await artitBox.expectData(
        UrlMatcher.startsWith('/artysta', ''),
        UrlMatcher.startsWith(`${APP_CONFIG.appUrl}/wydarzenia/`, ''),
        UrlMatcher.startsWith(`${APP_CONFIG.appUrl}/api/images`, '')
      )
  );
});

it('event-navigation', APP_CONFIG, async (app: App) => {
  const router = app.inject(Router);
  const el = app.inject(ElementLocator);

  await router.navigateAndWait(`/${removePolishCharacters(TEST_CONFIG.city)}`);
  const eventCardBoxes = await el.locateList(
    EventCardBox,
    cssSelector('.card-box')
  );

  const firstEventCardBox = await eventCardBoxes.getNthElement(0);

  await firstEventCardBox.imageContainer.click();
  await router.expectAndWaitForUrl(
    UrlMatcher.startsWith(`${APP_CONFIG.appUrl}/wydarzenia`, '')
  );
});
