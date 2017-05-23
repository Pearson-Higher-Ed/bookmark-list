export function addBookmark(bookmark) {
  return {
    type: 'ADD_BOOKMARK',
    id: bookmark.id,
    uri: bookmark.uri,
    data: bookmark.data,
    createdTimestamp: bookmark.createdTimestamp,
    title: bookmark.title,
    labels: bookmark.title
  };
}

export function removeBookmark(id) {
  return {
    type: 'REMOVE_BOOKMARK',
    id
  };
}
