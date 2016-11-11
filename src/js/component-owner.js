import React, { PropTypes } from 'react';
import { injectIntl } from 'react-intl';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { darkBlack, fullBlack } from 'material-ui/styles/colors';

import BookmarkList from './BookmarkList';

const muiTheme = getMuiTheme({
  palette: {    
    textColor: darkBlack,    
    shadowColor: fullBlack
  }
});

class ComponentOwner extends React.Component {
  constructor(props) {
    super(props);
  }

  getChildContext() {
    return {
      muiTheme: muiTheme
    };
  }

  render() {    
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <BookmarkList
          bookmarksArr={this.props.bookmarksArr}
          clickBookmarkHandler={this.props.clickBookmarkHandler} 
          removeBookmarkHandler={this.props.removeBookmarkHandler} />
      </MuiThemeProvider>
    )
  }
}

ComponentOwner.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};

export default injectIntl(ComponentOwner); // Inject this.props.intl into the component context
