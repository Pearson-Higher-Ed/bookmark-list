import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { darkBlack, fullBlack } from 'material-ui/styles/colors';

import { BookmarkListComponent } from './BookmarkListComponent';

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
