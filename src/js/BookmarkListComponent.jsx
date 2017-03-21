import React from 'react';
import { IntlProvider } from 'react-intl';
import InternationalSupport from './InternationalSupport';
import BookmarkList from './BookmarkList';

export const BookmarkListComponent = function BookmarkListComponent(paramsObj) { // eslint-disable-line import/prefer-default-export
  const intlObj = new InternationalSupport(paramsObj.locale);
  return (<IntlProvider locale={intlObj.getLocale()} messages={intlObj.getMessages()}>
    <BookmarkList
      bookmarksArr={paramsObj.bookmarksArr}
      clickBookmarkHandler={paramsObj.clickBookmarkHandler}
      removeBookmarkHandler={paramsObj.removeBookmarkHandler}
      drawerCallbacks={paramsObj.drawerCallbacks}
      isET1={paramsObj.isET1}  />
  </IntlProvider>)
}
