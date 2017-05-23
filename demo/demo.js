import injectTapEventPlugin from 'react-tap-event-plugin';
import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import frLocaleData from 'react-intl/locale-data/fr';
import tsLocaleData from 'react-intl/locale-data/ts';

const localeData = {
  en: enLocaleData,
  fr: frLocaleData,
  ts: tsLocaleData
};

const sampleData = [
  {
    id: '1',
    uri: 'OPS/xhtml/file_0003.html',
    data: {
      baseUrl:
        'https://content.stg-openclass.com/eps/pearson-reader/api/' +
        'item/12d4a34c-e9ff-4537-b4b0-c1538ac01af2/1/file/QA_TEST_FILE/'
    },
    createdTimestamp: 1467924204506,
    title: 'Copyright',
    labels: ['Copyright']
  },
  {
    id: '2',
    uri: 'OPS/xhtml/file_0005.html',
    data: {
      baseUrl: 'https://content.stg-openclass.com/eps/pearson-reader/api/' +
      'item/12d4a34c-e9ff-4537-b4b0-c1538ac01af2/1/file/QA_TEST_FILE/'
    },
    createdTimestamp: 1467924210841,
    title: 'Page 6-7',
    labels: ['Page 6-7']
  },
  {
    id: '3',
    uri: 'OPS/xhtml/file_0008.html',
    data: {
      baseUrl: 'https://content.stg-openclass.com/eps/pearson-reader/api/' +
      'item/12d4a34c-e9ff-4537-b4b0-c1538ac01af2/1/file/QA_TEST_FILE/'
    },
    createdTimestamp: 1467924217566,
    title: 'Page 12-13',
    labels: ['Page 12-13']
  },
  {
    id: '4',
    uri: 'OPS/xhtml/file_0011.html',
    data: {
      baseUrl: 'https://content.stg-openclass.com/eps/pearson-reader/api' +
      '/item/12d4a34c-e9ff-4537-b4b0-c1538ac01af2/1/file/QA_TEST_FILE/'
    },
    createdTimestamp: 1467924224680,
    title: 'Page 18-19',
    labels: ['Page 18-19']
  }
];

function getParam(item) {
  const svalue = window.location.search.match(new RegExp(`[?&]${item}=([^&]*)(&?)`, 'i'));
  return svalue ? svalue[1] : svalue;
}

function messageAlert() {
// eslint-disable-next-line no-alert
  window.alert(this);
}

function init() {
  injectTapEventPlugin();
  const region = getParam('lang') || 'en';
  addLocaleData(localeData[region.split('-')[0]]);
  // Demo Loading component via event:
  document.body.dispatchEvent(new window.CustomEvent('o.InitBookmarkList', {
    detail: {
      elementId: 'demo-container',
      bookmarksArr: sampleData,
      locale: region,
      clickBookmarkHandler: messageAlert.bind('bookmark clicked'),
      removeBookmarkHandler: messageAlert.bind('remove bookmark clicked'),
      drawerCallbacks: {
        onActive: messageAlert.bind('onActive callback'),
        changeState: messageAlert.bind('changeState callback')
      }
      // store: store,
      // actions: bookmarkActions
    }
  }));

  // Demo direct API
  // new BookmarkListDemo({
  //  elementId: 'container',
  //  bookmarksArr: sampleData,
  //  locale:region,
  //  clickBookmarkHandler : window.bookmarkClickCbk,
  //  store: store,
  //  actions: bookmarkActions
  // });
}


window.onload = init;

