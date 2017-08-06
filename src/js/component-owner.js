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
import { injectIntl } from 'react-intl';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { darkBlack, fullBlack } from 'material-ui/styles/colors';

import BookmarkListComponent from './BookmarkListComponent';

const muiTheme = getMuiTheme({
  palette: {
    textColor: darkBlack,
    shadowColor: fullBlack
  }
});

class ComponentOwner extends React.Component {
  getChildContext() {
    return {
      muiTheme
    };
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <BookmarkListComponent
          bookmarksArr={this.props.bookmarksArr}
          clickBookmarkHandler={this.props.clickBookmarkHandler}
          removeBookmarkHandler={this.props.removeBookmarkHandler}
          locale={this.props.intl.locale}
          drawerCallbacks={this.props.drawerCallbacks}
        />
      </MuiThemeProvider>
    );
  }
}

ComponentOwner.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};

ComponentOwner.propTypes = {
  bookmarksArr: PropTypes.array.isRequired,
  intl: PropTypes.object.isRequired,
  drawerCallbacks: PropTypes.object.isRequired,
  clickBookmarkHandler: PropTypes.func.isRequired,
  removeBookmarkHandler: PropTypes.func.isRequired
};

export default injectIntl(ComponentOwner); // Inject this.props.intl into the component context
