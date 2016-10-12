import BookmarkListDemo from '../main';
import * as bookmarkActions from './actions';

import {createStore} from 'redux';
import { combineReducers } from 'redux'
import bookmarks from './reducer';

const rootReducer = combineReducers({
  bookmarks
});

const sampleData = [{'id': '1', 'uri':'OPS/xhtml/file_0003.html', 'data':{'baseUrl':'https://content.stg-openclass.com/eps/pearson-reader/api/item/12d4a34c-e9ff-4537-b4b0-c1538ac01af2/1/file/QA_TEST_FILE/'}, 'createdTimestamp':1467924204506, 'title':'Copyright', 'labels':['Copyright']}, {'id': '2', 'uri':'OPS/xhtml/file_0005.html', 'data':{'baseUrl':'https://content.stg-openclass.com/eps/pearson-reader/api/item/12d4a34c-e9ff-4537-b4b0-c1538ac01af2/1/file/QA_TEST_FILE/'}, 'createdTimestamp':1467924210841, 'title':'Page 6-7', 'labels':['Page 6-7']}, {'id': '3', 'uri':'OPS/xhtml/file_0008.html', 'data':{'baseUrl':'https://content.stg-openclass.com/eps/pearson-reader/api/item/12d4a34c-e9ff-4537-b4b0-c1538ac01af2/1/file/QA_TEST_FILE/'}, 'createdTimestamp':1467924217566, 'title':'Page 12-13', 'labels':['Page 12-13']}, {'id': '4', 'uri':'OPS/xhtml/file_0011.html', 'data':{'baseUrl':'https://content.stg-openclass.com/eps/pearson-reader/api/item/12d4a34c-e9ff-4537-b4b0-c1538ac01af2/1/file/QA_TEST_FILE/'}, 'createdTimestamp':1467924224680, 'title':'Page 18-19', 'labels':['Page 18-19']}];

const store = createStore(rootReducer, {bookmarks:sampleData}, (window.devToolsExtension ? window.devToolsExtension() : undefined));

window.onload = init;

window.bookmarkClickCbk = function() {
  alert('Clicked on bookmark');
};

function getParam(item) {
  const svalue = location.search.match(new RegExp('[\?\&]' + item + '=([^\&]*)(\&?)', 'i'));
  return svalue ? svalue[1] : svalue;
}

function init() {

  const region = getParam('lang') || 'en';
  //Demo Loading component via event:
  document.body.dispatchEvent(new CustomEvent('o.InitBookmarkList', {
    detail: {
      elementId: 'demo-container',
      bookmarksArr: sampleData,
      locale: region,
      clickBookmarkHandler : window.bookmarkClickCbk,
      store: store,
      actions: bookmarkActions
    }
  }));

  console.log(BookmarkListDemo);
  // Demo direct API
  //new BookmarkListDemo({
  //  elementId: 'container',
  //  bookmarksArr: sampleData,
  //  locale:region,
  //  clickBookmarkHandler : window.bookmarkClickCbk,
  //  store: store,
  //  actions: bookmarkActions
  //});
}
