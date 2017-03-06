import {defineMessages} from 'react-intl';

//
// Default messages are 'en-US'
//
export const messages = defineMessages({
  bookmarkTitle: {
    id: 'bookmarkTitle',
    description:'Bookmarks',
    defaultMessage:'Bookmarks'
  },
  noBookmarksMsg: {
    id: 'noBookmarksMsg',
    description: 'No Bookmarks were found.',
    defaultMessage: 'No Bookmarks were found.'
  },
  removeBookmarkText: {
    id: 'removeBookmarkText',
    description: 'Remove bookmark',
    defaultMessage: 'Remove bookmark'
  },
  cancel: {
    id: 'cancel',
    defaultMessage: 'Cancel'
  },
  delete: {
    id: 'delete',
    defaultMessage: 'Delete'
  },
  confirmDelete: {
    id: 'confirmDelete',
    defaultMessage: 'Confirm Delete?'
  },
  actionCannotBeUnDone: {
    id: 'actionCannotBeUnDone',
    defaultMessage: 'This action cannot be undone.'
  },
  close: {
    id: 'close',
    defaultMessage: 'Close'
  }
});

