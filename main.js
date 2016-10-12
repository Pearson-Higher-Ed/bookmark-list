import './main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import BookmarkList from './src/js/bookmarkList';
import {addLocaleData, IntlProvider} from 'react-intl';
import frLocaleData from 'react-intl/locale-data/fr';
import frJson from './translations/fr.json';

const translations = {
  'fr' : frJson
};

export default class Bookmarks {

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
          <BookmarkList bookmarksArr={config.bookmarksArr}
              clickBookmarkHandler={config.clickBookmarkHandler}
              removeBookmarkHandler={config.removeBookmarkHandler}
              store={config.store}
              actions={config.actions}
              />
      </IntlProvider>,
      document.getElementById(config.elementId)
    );
  }
}

document.body.addEventListener('o.InitBookmarkList', e => new Bookmarks(e.detail));
