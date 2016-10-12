function bookmarks(state=[], action) {
  switch (action.type) {
  case 'ADD_BOOKMARK':
    return [
      ...state,
      {
        id: action.id,
        uri: action.uri,
        data: action.data,
        createdTimestamp: action.createdTimestamp,
        title: action.title,
        labels: action.title
      }];
  case 'REMOVE_BOOKMARK':
    return state.filter(bookmark => bookmark.uri !== action.id);
  default:
    return state
  }
}

export default bookmarks;
