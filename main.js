
import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import './main.scss';
import ComponentOwner from './src/js/component-owner';
import InternationalSupport from './src/js/InternationalSupport';

export default class BookmarkListDemo {
  constructor(config) {
    this.init(config);
  }

  init(config) {
    this.intlObj = new InternationalSupport(config.locale);

    ReactDOM.render(
      <IntlProvider locale={this.intlObj.getLocale()} messages={this.intlObj.getMessages()}>
          <ComponentOwner 
              bookmarksArr={config.bookmarksArr}
              clickBookmarkHandler={config.clickBookmarkHandler}
              removeBookmarkHandler={config.removeBookmarkHandler}
         />
      </IntlProvider>,
      document.getElementById(config.elementId)
    );
  }
}

export { BookmarkListComponent } from './src/js/BookmarkListComponent';

document.body.addEventListener('o.InitBookmarkList', e => new BookmarkListDemo(e.detail));
