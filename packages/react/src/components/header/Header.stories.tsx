import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';

import { Header } from './Header';
import { HeaderUniversalBar } from './components/headerUniversalBar/HeaderUniversalBar';
import { HeaderActionBar } from './components/headerActionBar/HeaderActionBar';
import { HeaderLink } from './components/headerLink/HeaderLink';
import { HeaderNavigationMenu } from './components/headerNavigationMenu';
import { LanguageOption } from './LanguageContext';
import { IconSearch, IconUser } from '../../icons';
import { Link } from '../link/Link';

export default {
  component: Header,
  title: 'Components/Header',
  subcomponents: {
    HeaderUniversalBar,
    HeaderNavigationMenu,
    HeaderActionBar,
    HeaderLink,
  },
  parameters: {
    controls: { expanded: true },
    layout: 'fullscreen',
  },
  args: {},
};

const languageChangedAction = action('language:onChange');
const searchSubmitAction = action('search:onSubmit');
const searchChangeAction = action('search:onChange');

const languages: LanguageOption[] = [
  { label: 'Suomi', value: 'fi' },
  { label: 'Svenska', value: 'sv' },
  { label: 'English', value: 'en' },
];

export const WithFullFeatures = (args) => (
  <>
    <Header {...args} onDidChangeLanguage={languageChangedAction}>
      <Header.SkipLink skipTo="#content" label="Skip To Content" />
      <Header.UniversalBar primaryLinkText="Helsingin kaupunki" primaryLinkHref="#">
        <Header.Link href="#" label="Uutiset" />
        <Header.Link href="#" label="Asioi verkossa" />
        <Header.Link href="#" label="Anna palautetta" />
      </Header.UniversalBar>

      <Header.ActionBar
        title="Helsingin kaupunki"
        titleAriaLabel="Helsingin kaupunki"
        titleHref="https://hel.fi"
        logoAriaLabel="Service logo"
        logoHref="https://hel.fi"
        menuButtonAriaLabel="Menu"
      >
        <Header.LanguageSelector languages={languages} ariaLabel="Kielen valinta">
          <h3>Tietoa muilla kielillä</h3>
          <Link external href="www.example.com">
            Selkosuomi
          </Link>
          <Link external href="www.example.com">
            Viittomakieli
          </Link>
        </Header.LanguageSelector>

        <Header.ActionBarItem label="Haku" icon={<IconSearch />} id="action-bar-search">
          <Header.Search label="Hae palvelusta" onChange={searchChangeAction} onSubmit={searchSubmitAction} />
        </Header.ActionBarItem>
      </Header.ActionBar>

      <Header.NavigationMenu>
        <Header.Link
          href="#"
          label="Sosiaali- ja terveyspalvelut"
          onClick={(event) => event.preventDefault()}
          active
          dropdownLinks={[
            <Header.Link
              href="#"
              label="Terveydenhoito"
              active
              dropdownLinks={[
                <Header.Link href="#" label="Hammashoito" />,
                <Header.Link href="#" label="Julkinen terveydenhoito" />,
              ]}
            />,
            <Header.Link
              href="#"
              label="Senioripalvelut"
              dropdownLinks={[
                <Header.Link href="#" label="Viriketoiminta" />,
                <Header.Link href="#" label="Kuntouttavat palvelut" />,
              ]}
            />,
          ]}
        />
        <Header.Link
          href="#"
          label="Kasvatus ja koulutus"
          dropdownLinks={[
            <Header.Link
              href="#"
              label="Kasvatus"
              active
              dropdownLinks={[
                <Header.Link href="#" label="Varhaiskasvatus" />,
                <Header.Link href="#" label="Esiopetus" />,
              ]}
            />,
            <Header.Link
              href="#"
              label="Koulutus"
              dropdownLinks={[
                <Header.Link href="#" label="Perusopetus" />,
                <Header.Link href="#" label="Toisen asteen koulutus" />,
                <Header.Link href="#" label="Työväenopistot" />,
              ]}
            />,
          ]}
        />
        <Header.Link
          href="#"
          label="Yritykset ja työ"
          dropdownLinks={[
            <Header.Link
              href="#"
              label="Työnantajat"
              active
              dropdownLinks={[<Header.Link href="#" label="Yritykset" />, <Header.Link href="#" label="Yrittäjät" />]}
            />,
            <Header.Link
              href="#"
              label="Työntekijät"
              dropdownLinks={[<Header.Link href="#" label="Avoimet työpaikat" />]}
            />,
          ]}
        />
      </Header.NavigationMenu>
    </Header>
  </>
);

export const WithFullFeaturesDarkTheme = (args) => (
  <>
    <Header {...args} onDidChangeLanguage={languageChangedAction}>
      <Header.UniversalBar primaryLinkText="Helsingin kaupunki" primaryLinkHref="#">
        <Header.NavigationLink href="#" label="Link 1" />
        <Header.NavigationLink href="#" label="Link 2" />
        <Header.NavigationLink href="#" label="Link 3" />
      </Header.UniversalBar>

      <Header.ActionBar
        title="Helsingin kaupunki"
        titleAriaLabel="Helsingin kaupunki"
        titleUrl="https://hel.fi"
        titleStyle={TitleStyleType.normal}
        logoAriaLabel="Service logo"
        logoUrl="https://hel.fi"
        menuButtonAriaLabel="Menu"
      >
        <Header.NavigationLanguageSelector languages={languages}>
          <h3>Tietoa muilla kielillä</h3>
          <Link external href="www.example.com">
            Selkosuomi
          </Link>
          <Link external href="www.example.com">
            Viittomakieli
          </Link>
        </Header.NavigationLanguageSelector>

        <Header.ActionBarItem fullWidth label="Haku" icon={IconSearch} id="action-bar-search">
          <Header.NavigationSearch label="Hae palvelusta" onChange={searchChangeAction} onSubmit={searchSubmitAction} />
        </Header.ActionBarItem>
      </Header.ActionBar>

      <Header.NavigationMenu>
        <Header.NavigationLink
          href="#"
          label="Link 1"
          onClick={(event) => event.preventDefault()}
          active
          dropdownLinks={[
            <Header.NavigationLink
              href="#"
              label="Test"
              active
              dropdownLinks={[
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
              ]}
            />,
            <Header.NavigationLink
              href="#"
              label="Test"
              dropdownLinks={[
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
              ]}
            />,
          ]}
        />
        <Header.NavigationLink
          href="#"
          label="Link 2"
          dropdownLinks={[
            <Header.NavigationLink
              href="#"
              label="Test"
              active
              dropdownLinks={[
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
              ]}
            />,
            <Header.NavigationLink
              href="#"
              label="Test"
              dropdownLinks={[
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
              ]}
            />,
          ]}
        />
        <Header.NavigationLink href="#" label="Link 3" />
        <Header.NavigationLink href="#" label="Link 4" />
        <Header.NavigationLink href="#" label="Link 5" />
        <Header.NavigationLink href="#" label="Link 6" />
        <Header.NavigationLink href="#" label="Link 7" />
        <Header.NavigationLink
          href="#"
          label="Link 8"
          dropdownLinks={[
            <Header.NavigationLink
              href="#"
              label="Test"
              active
              dropdownLinks={[
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
              ]}
            />,
            <Header.NavigationLink
              href="#"
              label="Test"
              dropdownLinks={[
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
              ]}
            />,
          ]}
        />
      </Header.NavigationMenu>
    </Header>
  </>
);

WithFullFeaturesDarkTheme.args = {
  theme: 'dark',
};

export const Minimal = (args) => {
  return (
    <Header {...args} onDidChangeLanguage={languageChangedAction}>
      <Header.SkipLink skipTo="#content" label="Skip To Content" />
      <Header.ActionBar title="Helsingin kaupunki" titleAriaLabel="Helsingin kaupunki" titleHref="https://hel.fi">
        <Header.LanguageSelector languages={languages}>
          <h3>Tietoa muilla kielillä</h3>
          <Link external href="www.example.com">
            Selkosuomi
          </Link>
          <Link external href="www.example.com">
            Viittomakieli
          </Link>
        </Header.LanguageSelector>

        <Header.ActionBarItem label="Haku" icon={<IconSearch />} id="action-bar-search">
          <Header.Search onChange={searchChangeAction} onSubmit={searchSubmitAction} label="Haku" />
        </Header.ActionBarItem>
        <Header.ActionBarItem label="Kirjaudu" fixedRightPosition icon={<IconUser />} id="action-bar-login">
          <h3>Kirjautumisvalinnat</h3>
        </Header.ActionBarItem>
      </Header.ActionBar>

      <Header.NavigationMenu>
        <Header.Link href="#" label="Sosiaali- ja terveyspalvelut" />
        <Header.Link href="#" label="Kasvatus ja koulutus" />
        <Header.Link href="#" label="Asuminen" />
      </Header.NavigationMenu>
    </Header>
  );
};

export const MinimalWithDarkTheme = (args) => {
  return (
    <Header {...args} onDidChangeLanguage={languageChangedAction}>
      <Header.ActionBar
        title="Helsingin kaupunki"
        titleAriaLabel="Helsingin kaupunki"
        titleUrl="https://hel.fi"
        titleStyle={TitleStyleType.black}
      >
        <Header.NavigationLanguageSelector languages={languages}>
          <h3>Tietoa muilla kielillä</h3>
          <Link external href="www.example.com">
            Selkosuomi
          </Link>
          <Link external href="www.example.com">
            Viittomakieli
          </Link>
        </Header.NavigationLanguageSelector>

        <Header.ActionBarItem fullWidth label="Haku" icon={IconSearch} id="action-bar-search">
          <Header.NavigationSearch onChange={searchChangeAction} onSubmit={searchSubmitAction} label="Haku" />
        </Header.ActionBarItem>
        <hr style={{ order: 9 }} />
        <Header.ActionBarItem label="Kirjaudu" icon={IconUser} style={{ order: 10 }} id="action-bar-login">
          <h3>Kirjautumisvalinnat</h3>
        </Header.ActionBarItem>
      </Header.ActionBar>

      <Header.NavigationMenu>
        <Header.NavigationLink href="#" label="Link 1" />
        <Header.NavigationLink href="#" label="Link 2" />
        <Header.NavigationLink href="#" label="Link 3" />
      </Header.NavigationMenu>
    </Header>
  );
};

MinimalWithDarkTheme.args = {
  theme: 'dark',
};

export const MinimalWithLocalization = (args) => {
  const [lang, setLang] = useState<string>('fi');

  const translations = {
    en: {
      'header-title': 'Helsinki city',
      'header-aria-label': 'Helsinki city',
      'header-login': 'Login',
      'header-search': 'Search',
      'header-menu-title': 'Other languages',
    },
    fi: {
      'header-title': 'Helsingin kaupunki',
      'header-aria-label': 'Helsingin kaupunki',
      'header-login': 'Kirjaudu',
      'header-search': 'Haku',
      'header-menu-title': 'Tietoa muilla kielillä',
    },
    sv: {
      'header-title': 'Helsingfors Stad',
      'header-aria-label': 'Helsingfors Stad',
      'header-login': 'Logga in',
      'header-search': 'Sök',
      'header-menu-title': 'Andra språk',
    },
  };

  const languageChangedAction2 = (lg: string) => setLang(lg);

  return (
    <Header {...args} onDidChangeLanguage={languageChangedAction2}>
      <Header.SkipLink skipTo="#content" label="Skip To Content" />
      <Header.ActionBar
        title={translations[lang]['header-title']}
        titleAriaLabel={translations[lang]['header-aria-label']}
        titleHref="https://hel.fi"
      >
        <Header.LanguageSelector languages={languages}>
          <h3>{translations[lang]['header-menu-title']}</h3>
          <Link external href="www.example.com">
            Selkosuomi
          </Link>
          <Link external href="www.example.com">
            Viittomakieli
          </Link>
        </Header.LanguageSelector>

        <Header.ActionBarItem
          fullWidth
          label={translations[lang]['header-search']}
          icon={<IconSearch />}
          id="action-bar-search"
        >
          <Header.Search
            onChange={searchChangeAction}
            onSubmit={searchSubmitAction}
            label={translations[lang]['header-search']}
          />
        </Header.ActionBarItem>
        <Header.ActionBarItem
          label={translations[lang]['header-login']}
          fixedRightPosition
          icon={<IconUser />}
          id="action-bar-login"
        >
          <h3>Kirjautumisvalinnat</h3>
        </Header.ActionBarItem>
      </Header.ActionBar>

      <Header.NavigationMenu>
        <Header.Link href="#" label="Sosiaali- ja terveyspalvelut" />
        <Header.Link href="#" label="Kasvatus ja koulutus" />
        <Header.Link href="#" label="Asuminen" />
      </Header.NavigationMenu>
    </Header>
  );
};
