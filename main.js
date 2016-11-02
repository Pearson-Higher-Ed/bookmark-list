
import React from 'react';
import ReactDOM from 'react-dom';
import { addLocaleData, IntlProvider } from 'react-intl';
import frLocaleData from 'react-intl/locale-data/fr';
import frJson from './translations/fr.json';
import BookmarkList from './src/js/BookmarkList';
import './main.scss';

const translations = {
  'fr' : frJson
};

export default class BookmarkListComponent {
  constructor(config) {
    const locale = config.locale ? config.locale : '';
    
    if (locale) {
      addLocaleData(frLocaleData);
    }
    this.init(config);
  }

  init(config) {
    const locale = config.locale ? config.locale : 'en';

    ReactDOM.render(
      <IntlProvider locale={locale} messages={translations[locale]}>
          <BookmarkList 
              bookmarksArr={config.bookmarksArr}
              clickBookmarkHandler={config.clickBookmarkHandler}
              removeBookmarkHandler={config.removeBookmarkHandler}
              store={config.store}
              actions={config.actions} />
      </IntlProvider>,
      document.getElementById(config.elementId)
    );
  }
}

export BookmarkList from './src/js/BookmarkList';

document.body.addEventListener('o.InitBookmarkList', e => new BookmarkListComponent(e.detail));
