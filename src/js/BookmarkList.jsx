/**
 * PEARSON PROPRIETARY AND CONFIDENTIAL INFORMATION SUBJECT TO NDA
 * Copyright © 2017 Pearson Education, Inc.
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Pearson Education, Inc.  The intellectual and technical concepts contained
 * herein are proprietary to Pearson Education, Inc. and may be covered by U.S. and Foreign Patents,
 * patent applications, and are protected by trade secret or copyright law.
 * Dissemination of this information, reproduction of this material, and copying or distribution of this software
 * is strictly forbidden unless prior written permission is obtained
 * from Pearson Education, Inc.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SvgIcon from 'material-ui/SvgIcon';
import { AnalyticsManager } from '@pearson-incubator/aquila-js-core';
import { messages } from './defaultMessages';

class BookmarkList extends React.Component {
  constructor(props) {
    super(props);
    // Bindings
    this.handleModalOpen = this.handleModalOpen.bind(this);
    // State
    this.state = {
      bookmarkList: this.props.bookmarksArr,
      modalOpen: false,
      bookmarkId: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.bookmarksArr !== this.props.bookmarksArr) {
      this.setState({ bookmarkList: nextProps.bookmarksArr });
    }
  }

  handleModalOpen(id, e) {
    this.setState({
      modalOpen: true,
      bookmarkId: id
    });
    if (e && e.preventDefault) {
      e.preventDefault();
    }
  }

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };

  handleClick(uri, e) {
    this.props.clickBookmarkHandler(uri);
    const listDom = Array.from(document.getElementsByClassName('o-bookmark-section'));
    listDom.map(node => node.setAttribute('class', 'o-bookmark-section'));
    e.target.parentNode.classList.add('focused');
    AnalyticsManager.dispatch({
      category: 'Bookmarks',
      action: 'Click',
      label: JSON.stringify({ PageId: uri })
    });
    if (e && e.preventDefault) {
      e.preventDefault();
    }
  }

  handleRemoveBookmark(id) {
    this.props.removeBookmarkHandler(id);
    const index = this.props.bookmarksArr.findIndex(item => item.id === id);
    this.props.bookmarksArr.splice(index, 1);
    this.setState({
      bookmarkList: this.props.bookmarksArr,
      modalOpen: false
    });
  }
  renderNoBookmarks() {
    const { formatMessage } = this.props.intl;
    return (<div className="o-bookmark-empty-help">
      <div tabIndex="0" className="o-bookmark-empty-message" role="article">
        <p>{formatMessage(messages.noBookmarksMsg)}</p>
      </div>
    </div>);
  }
  static arrowKeyPress(e) {
    if (
      e.which === 37 ||
      e.keyCode === 37 ||
      e.which === 38 ||
      e.keyCode === 38 ||
      e.which === 39 ||
      e.keyCode === 39 ||
      e.which === 40 ||
      e.keyCode === 40
    ) { // down Arrow key
      e.preventDefault();
      e.target.parentNode.classList.remove('focused');
    }
  }

  static onFocus(e) {
    e.target.parentNode.classList.add('focused');
    return true;
  }

  static onLiBlur(e) {
    if (e.shiftKey && e.keyCode === 9) {
      e.target.parentNode.classList.remove('focused');
    }
  }

  dialogKeySelect = (event) => {
    if ((event.which === 9 || event.keyCode === 9) && !event.shiftKey) {
      document.getElementsByClassName('handleCloseIcon')[0].focus();
      event.preventDefault();
    }
  };

  cancelIconKeySelect = (event) => {
    if ((event.which || event.keyCode) === 13) {
      this.handleModalClose();
    }
    if ((event.which === 9 || event.keyCode === 9) && event.shiftKey) {
      document.getElementsByClassName('deleteBtn')[0].focus();
      event.preventDefault();
    }
  };

  renderBookmarks() {
    const that = this;
    const { formatMessage, formatDate, formatTime } = this.props.intl;
    const DialogStyle = {
      dialogContainerstyl: {
        width: '362px',
        backgroundColor: '#fff',
        borderRadius: '4px'
      },
      cancelIcon: {
        color: '#8d8d8d',
        position: 'absolute',
        top: '19px',
        right: '19px',
        height: '18.7px',
        width: '18px',
        cursor: 'pointer'
      },
      cancelbtnstyl: {
        color: '#74797b'
      },
      deleteBtnstyl: {
        borderRadius: 2,
        backgroundColor: '#34b6b4'
      }
    };
    const actions = [
      <FlatButton
        label={formatMessage(messages.cancel)}
        primary
        style={DialogStyle.cancelbtnstyl}
        className="cancelBtn"
        onClick={this.handleModalClose}
      />,
      <FlatButton
        label={formatMessage(messages.delete)}
        primary
        autoFocus
        onClick={() => that.handleRemoveBookmark(that.state.bookmarkId)}
        onKeyDown={this.dialogKeySelect}
        style={DialogStyle.deleteBtnstyl}
        className="deleteBtn"
      />
    ];

    const CancelIcon = props => (
      <SvgIcon {...props}>
        <path
          d="M712.993036,23.3253012 L720.736289,15.2808193 C721.026024,14.9878313 721.026024,14.5128916 720.735855,
          14.2199036 C720.445687,13.9266988 719.975518,13.9266988 719.685349,14.2199036 L711.976795,
          22.005012 L704.268458,14.2199036 C703.978072,13.9266988 703.50812,13.9266988 703.217735,
          14.2199036 C702.927566,14.5128916 702.927566,14.9878313 703.217518,15.2808193 L710.960554,
          23.3253012 L703.217735,31.3697831 C702.927566,31.6627711 702.927566,32.1377108 703.217735,
          32.4306988 C703.507687,32.7234699 703.978072,32.7239036 704.268458,32.4306988 L711.976795,
          24.6455904 L719.685349,32.4306988 C719.975518,32.7239036 720.44612,32.7234699 720.735855,
          32.4306988 C721.026024,32.1377108 721.026024,31.6627711 720.735855,31.3697831 L712.993036,23.3253012 Z"
          id="ic_cancel"
          fill="#8d8d8d"
        />
      </SvgIcon>
    );

    return (
      <div>
        <ul className="o-bookmark-list">
          {
            this.state.bookmarkList.map(bookmark => (
              <li
                className="o-bookmark-section"
                key={bookmark.id}
              >
                <a
                  className="o-bookmark-content"
                  onFocus={BookmarkList.onFocus}
                  onKeyDown={BookmarkList.onLiBlur}
                  data-uri={bookmark.uri}
                  onClick={e => that.handleClick(bookmark.uri, e)}
                  onKeyPress={e => that.handleClick(bookmark.uri, e)}
                  onKeyUp={BookmarkList.arrowKeyPress}
                  tabIndex="0"
                  role="button"
                >{bookmark.title}
                  <div className="o-bookmark-date">
                    <time value={bookmark.createdTimestamp}>{formatDate(new Date(Number(bookmark.createdTimestamp)), {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric'
                    })}</time>
                    {' '}
                    <time value={bookmark.createdTimestamp}>{formatTime(new Date(Number(bookmark.createdTimestamp)), {
                      timeZone: that.props.locale,
                      hour12: true,
                      hour: 'numeric',
                      minute: 'numeric'
                    })}</time>
                  </div>
                </a>
                <a
                  tabIndex="0"
                  className="remove"
                  onClick={e => that.handleModalOpen(bookmark.id, e)}
                  aria-label={formatMessage(messages.removeBookmarkText)}
                  role="button"
                >{''}
                </a>
              </li>
              )
            )
          }
        </ul>
        <Dialog
          title={formatMessage(messages.confirmDelete)}
          actions={actions}
          modal={false}
          open={that.state.modalOpen}
          onRequestClose={that.handleModalClose}
          contentStyle={DialogStyle.dialogContainerstyl}
        >
          <CancelIcon
            tabIndex="0"
            onClick={that.handleModalClose}
            viewBox="703 14 18 18.7"
            style={DialogStyle.cancelIcon}
            className="handleCloseIcon"
            aria-label={formatMessage(messages.close)}
            onKeyDown={this.cancelIconKeySelect}
          />
          {formatMessage(messages.actionCannotBeUnDone)}
        </Dialog>
      </div>
    );
  }

  render() {
    if (this.state.bookmarkList !== undefined && this.state.bookmarkList.length) {
      return this.renderBookmarks();
    }
    return this.renderNoBookmarks();
  }
}

BookmarkList.propTypes = {
  intl: intlShape,
  clickBookmarkHandler: PropTypes.func.isRequired,
  bookmarksArr: PropTypes.array.isRequired,
  removeBookmarkHandler: PropTypes.func.isRequired
};

BookmarkList.defaultProps = {
  intl: {}
};

export default injectIntl(BookmarkList);
