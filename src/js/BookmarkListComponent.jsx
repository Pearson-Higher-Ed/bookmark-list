import React from 'react';
import { IntlProvider } from 'react-intl';
import { InternationalSupport } from '@pearson-incubator/aquila-js-core';
import BookmarkList from './BookmarkList';
import msgObject from '../../translations';

export const BookmarkListComponent = function BookmarkListComponent(paramsObj) { // eslint-disable-line import/prefer-default-export
  const intlObj = new InternationalSupport(msgObject, paramsObj.locale);

  return (<IntlProvider locale={intlObj.getLocale()} messages={intlObj.getMessages()}>
        <BookmarkList
          bookmarksArr={paramsObj.bookmarksArr}
          clickBookmarkHandler={paramsObj.clickBookmarkHandler}
          removeBookmarkHandler={paramsObj.removeBookmarkHandler}
          drawerCallbacks={paramsObj.drawerCallbacks} />
      </IntlProvider>)
};
