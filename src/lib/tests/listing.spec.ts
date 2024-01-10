import {
  it,
  App,
  Router,
  ElementLocator,
  ContainerElement,
  cssSelector,
  ButtonElement,
  StringMatcher,
  UrlMatcher,
  InputFormControl,
  TextElement,
  SimpleElement,
} from '@lowgular/testgular';
import { EventCardBox } from '../components/event-card-box';
import { TopArtistBox } from '../components/top-artist-box';
import { APP_CONFIG } from '../utils/app-config';
import { TEST_CONFIG, removePolishCharacters } from '../utils/test-config';

//@todo ugenerycznić cityselector
//@todo sprawdzić, czy lista miast jest alfabetycznie
it('headerCitySelector', APP_CONFIG, async (app: App) => {
  const router = app.inject(Router);
  const el = app.inject(ElementLocator);

  await router.navigateAndWait(`/${removePolishCharacters(TEST_CONFIG.city)}`);
  const header = el.locateChild(ContainerElement, cssSelector('km-header'));
  const headerCitySelector = await header.elementLocator.locateChild(
    ContainerElement,
    cssSelector('km-city-selector')
  );
  const headerCitySelectorButton =
    await headerCitySelector.elementLocator.locateChild(
      ButtonElement,
      cssSelector('kfb-button')
    );
  await headerCitySelectorButton.expectContent(
    StringMatcher.titleCase(TEST_CONFIG.city)
  );
  await headerCitySelectorButton.click();
  const citySelectorContainer =
    await headerCitySelector.elementLocator.locateChild(
      ContainerElement,
      cssSelector('.km-city-selector-container')
    );
  await citySelectorContainer.expectAttribute(
    'class',
    StringMatcher.mustContainWords(['km-city-selector-container-opened'])
  );
  const citySelectorSelect =
    await citySelectorContainer.elementLocator.locateChild(
      ContainerElement,
      cssSelector('kfb-advanced-select')
    );
  const citySelectorOptions =
    await citySelectorSelect.elementLocator.locateList(
      ContainerElement,
      cssSelector('kfb-advanced-select-option')
    );
  const firstOption = await citySelectorOptions.getNthElement(0);
  await firstOption.expectContent(
    StringMatcher.mustContainWords(['wszystkie', 'miasta'])
  );
  await firstOption.click();
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

it('newsletterSection', APP_CONFIG, async (app: App) => {
  const router = app.inject(Router);
  const el = app.inject(ElementLocator);

  await router.navigateAndWait(`/${removePolishCharacters(TEST_CONFIG.city)}`);
  const newsletterSection = await el.locateChild(
    ContainerElement,
    cssSelector('km-newsletter-section')
  );
  const emailInput = await newsletterSection.elementLocator.locateChild(
    InputFormControl,
    cssSelector('.mat-input-element')
  );
  const consentCheckbox = await newsletterSection.elementLocator.locateChild(
    SimpleElement,
    cssSelector('mat-checkbox')
  );
  const submitButton = await newsletterSection.elementLocator.locateChild(
    ButtonElement,
    cssSelector('.kfb-button')
  );

  await emailInput.setValue('kot');
  await submitButton.click();
  const errorText = await newsletterSection.elementLocator.locateChild(
    TextElement,
    cssSelector('.mat-error')
  );
  await errorText.expectContent(StringMatcher.titleCase('zgoda jest wymagana'));
  await consentCheckbox.click();
  await submitButton.click();
  await errorText.expectContent(StringMatcher.mustContainWords(['e-mail']));
  await emailInput.setValue('kot@wp.pl');
  await submitButton.click();
  await app.waitForTimeout(5000);
  await submitButton.expectContent(
    StringMatcher.mustContainWords(['zapisano'])
  );
  await submitButton.expectHasAttribute('disabled');
  await consentCheckbox.expectAttribute(
    'class',
    StringMatcher.mustContainWords(['mat-checkbox-disabled'])
  );
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
