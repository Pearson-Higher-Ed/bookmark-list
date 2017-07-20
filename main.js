
import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import { InternationalSupport } from '@pearson-incubator/aquila-js-core';
import ComponentOwner from './src/js/component-owner';
import msgObject from './translations';
import './main.scss';

export default class BookmarkListDemo {
  constructor(config) {
    this.init(config);
  }

  init(config) {
    this.intlObj = new InternationalSupport(msgObject, config.locale);

    ReactDOM.render(
      <IntlProvider locale={this.intlObj.getLocale()} messages={this.intlObj.getMessages()}>
        <ComponentOwner
          bookmarksArr={config.bookmarksArr}
          clickBookmarkHandler={config.clickBookmarkHandler}
          removeBookmarkHandler={config.removeBookmarkHandler}
          drawerCallbacks={config.drawerCallbacks}
        />
      </IntlProvider>,
      document.getElementById(config.elementId)
    );
  }
}

export BookmarkListComponent from './src/js/BookmarkListComponent';

document.body.addEventListener('o.InitBookmarkList', e => new BookmarkListDemo(e.detail));
