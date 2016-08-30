import React, {PropTypes} from 'react';
import {injectIntl, intlShape} from 'react-intl';
import {messages} from './defaultMessages';

class BookmarkList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bookmarkList: this.props.bookmarksArr};
  }

  handleClick(uri) {
    if (this.props.clickBookmarkHandler) {
      this.props.clickBookmarkHandler(uri);
    }
  }

  handleRemoveBookmark(uri, event) {
    function callBack() {
      const index = this.props.bookmarksArr.findIndex(item => item.uri === uri);
      this.props.bookmarksArr.splice(index, 1);

      this.setState({bookmarkList: this.props.bookmarksArr});
    }

    event.stopPropagation();
    if (this.props.removeBookmarkHandler) {
      this.props.removeBookmarkHandler(uri, callBack.bind(this));
    }
  }

  renderNoBookmarks() {
    const {formatMessage} = this.props.intl;
    return (<div className="o-bookmark-empty-help">
      <div tabIndex="0" className="o-bookmark-empty-message">
        <p>{formatMessage(messages.noBookmarksMsg)}</p>
      </div>
    </div>);
  }

  onFocus() {
    this.setState({focused: true});
  }

  onBlur() {
    this.setState({focused: false});
  }

  renderBookmarks() {
    const that = this;
    const {formatMessage} = this.props.intl;
    const {formatDate} = this.props.intl;
    const {formatTime} = this.props.intl;

    return(<ul className="o-bookmark-list">
      {
        this.state.bookmarkList.map(function(bkmark) {
          return <li className={that.state.focused ? 'o-bookmark-section focused' : 'o-bookmark-section focused'} onFocus={that.onFocus.bind(that)} key={bkmark.uri} >
            <a className="o-bookmark-content"
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
    if (this.state.bookmarkList.length) {
      return this.renderBookmarks();
    } else {
      return this.renderNoBookmarks();
    }
  }
}

BookmarkList.propTypes = {
  intl: intlShape.isRequired,
  locale: PropTypes.string,
  clickBookmarkHandler: PropTypes.func,
  removeBookmarkHandler: PropTypes.func,
  bookmarksArr: PropTypes.array.isRequired
};

export default injectIntl(BookmarkList);
