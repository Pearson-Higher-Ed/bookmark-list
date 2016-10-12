import React, {PropTypes} from 'react';
import {injectIntl, intlShape} from 'react-intl';
import {messages} from './defaultMessages';

class BookmarkList extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(uri) {
    if (this.props.clickBookmarkHandler) {
      this.props.clickBookmarkHandler(uri);
    }
  }

  handleRemoveBookmark(uri, event) {
    event.stopPropagation();
    this.props.store.dispatch(this.props.actions.removeBookmark(uri));
    this.forceUpdate();
  }

  renderNoBookmarks() {
    const {formatMessage} = this.props.intl;
    return (<div className="o-bookmark-empty-help">
      <div tabIndex="0" className="o-bookmark-empty-message">
        <p>{formatMessage(messages.noBookmarksMsg)}</p>
      </div>
    </div>);
  }

  onFocus(e) {
    e.target.parentNode.classList.add('focused');
    return true;
  }

  onLiBlur(e) {
    if (e.shiftKey && e.keyCode === 9) {
      e.target.parentNode.classList.remove('focused');
    }
  }

  onBlur(e) {
    e.target.parentNode.className = ' o-bookmark-section';
    return true;
  }

  renderBookmarks() {
    const that = this;
    const {formatMessage} = this.props.intl;
    const {formatDate} = this.props.intl;
    const {formatTime} = this.props.intl;

    return(<ul className="o-bookmark-list">
      {
        this.props.store.getState().bookmarks.map(function(bkmark) {
          return <li
            className="o-bookmark-section"
            key={bkmark.uri} >
            <a className="o-bookmark-content"
              onFocus= {that.onFocus.bind(that)}
              onKeyDown= {that.onLiBlur.bind(that)}
              data-uri={bkmark.uri}
              href="javascript:void(0)"
              onClick = {that.handleClick.bind(that, bkmark.uri)}
              onKeyPress={that.handleClick.bind(that, bkmark.uri)}>{bkmark.title}
              <div className="o-bookmark-date">
                <time value={bkmark.createdTimestamp}>{formatDate(new Date(bkmark.createdTimestamp), {
                  year : 'numeric',
                  month: 'numeric',
                  day  : 'numeric'
                })}</time>
              {' '}
                <time value={bkmark.createdTimestamp}>{formatTime(new Date(bkmark.createdTimestamp), {
                  timeZone:that.props.locale,
                  hour12: true,
                  hour : 'numeric',
                  minute: 'numeric'
                })}</time>
              </div>
            </a>
            <a href="javascript:void(0);"
              onBlur={that.onBlur.bind(that)}
              className="remove"
              onClick= {that.handleRemoveBookmark.bind(that, bkmark.uri)}
              aria-label={formatMessage(messages.removeBookmarkText)}
              role="button">
            </a>
          </li>
        })
      }
    </ul>);
  }

  render() {
    if (this.props.store.getState().bookmarks.length) {
      return this.renderBookmarks();
    } else {
      return this.renderNoBookmarks();
    }
  }
}

BookmarkList.propTypes = {
  intl: intlShape.isRequired,
  locale: PropTypes.string,
  clickBookmarkHandler: PropTypes.func
};

export default injectIntl(BookmarkList);
