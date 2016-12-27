import React, {PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SvgIcon from 'material-ui/SvgIcon';

class BookmarkList extends React.Component {
  constructor(props) {
    super(props);
    this.handleModalOpen=this.handleModalOpen.bind(this);
    this.state = { 
      bookmarkList: this.props.bookmarksArr,
      modalOpen: false,
      bookmarkId:''
    };
  }

  handleModalOpen (id) {
    this.setState({
      modalOpen: true,
      bookmarkId:id
    });    
  };

  handleModalClose = () =>  {
    this.setState({modalOpen: false});
  };

  handleClick(uri, e) {
    this.props.clickBookmarkHandler(uri);
    const listDom = Array.from(document.getElementsByClassName('o-bookmark-section'));
    listDom.map((node) => node.className = 'o-bookmark-section');
    e.target.parentNode.classList.add('focused');
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
    return (<div className="o-bookmark-empty-help">
      <div tabIndex="0" className="o-bookmark-empty-message">
        <p>No Bookmarks were found.</p>
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
    // const {formatMessage} = this.props.intl;
    // const {formatDate} = this.props.intl;
    // const {formatTime} = this.props.intl;
    const DialogStyle = {
      dialogContainerstyl : {
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
      cancelbtnstyl : {
        color: '#74797b'
      },
      deleteBtnstyl : {
        borderRadius: 2,
        backgroundColor: '#34b6b4'
      }
    }
    
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        style={DialogStyle.cancelbtnstyl}
        className="cancelBtn"
        onClick={this.handleModalClose} />,
      <FlatButton
        label="Delete"
        primary={true}
        onClick={that.handleRemoveBookmark.bind(that, that.state.bookmarkId)}
        style={DialogStyle.deleteBtnstyl}
        className="deleteBtn" />
    ];

    const CancelIcon = (props) => (
      <SvgIcon {...props}>
        <path d="M712.993036,23.3253012 L720.736289,15.2808193 C721.026024,14.9878313 721.026024,14.5128916 720.735855,14.2199036 C720.445687,13.9266988 719.975518,13.9266988 719.685349,14.2199036 L711.976795,22.005012 L704.268458,14.2199036 C703.978072,13.9266988 703.50812,13.9266988 703.217735,14.2199036 C702.927566,14.5128916 702.927566,14.9878313 703.217518,15.2808193 L710.960554,23.3253012 L703.217735,31.3697831 C702.927566,31.6627711 702.927566,32.1377108 703.217735,32.4306988 C703.507687,32.7234699 703.978072,32.7239036 704.268458,32.4306988 L711.976795,24.6455904 L719.685349,32.4306988 C719.975518,32.7239036 720.44612,32.7234699 720.735855,32.4306988 C721.026024,32.1377108 721.026024,31.6627711 720.735855,31.3697831 L712.993036,23.3253012 Z" id="ic_cancel" fill="#8d8d8d"></path>
      </SvgIcon>
    );

    return(<div><ul className="o-bookmark-list">
      {
        this.state.bookmarkList.map(function(bkmark) {
          const formatDateFrom_ms = new Date(bkmark.createdTimestamp);
          const date = formatDateFrom_ms.toLocaleDateString();
          const time = formatDateFrom_ms.toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
          return <li
            className="o-bookmark-section"
            key={bkmark.id} >
            <a className="o-bookmark-content"
              onFocus= {that.onFocus.bind(that)}
              onKeyDown= {that.onLiBlur.bind(that)}
              data-uri={bkmark.uri}
              href="javascript:void(0)"
              onClick = {that.handleClick.bind(that, bkmark.uri)}
              onKeyPress={that.handleClick.bind(that, bkmark.uri)}>{bkmark.title}
              <div className="o-bookmark-date">
                <time value={bkmark.createdTimestamp}>{date + ' ' + time}</time>
              </div>
            </a>
            <a href="javascript:void(0);"
              onBlur={that.onBlur.bind(that)}
              className="remove"
              onClick= {that.handleModalOpen.bind(this, bkmark.id)}
              role="button">
            </a>
            </li>
        })
      }
    </ul>
    <Dialog
        title="Confirm Delete?"
        actions={actions}
        modal={false}
        open={that.state.modalOpen}
        onRequestClose={that.handleModalClose}
        contentStyle={DialogStyle.dialogContainerstyl}>
        <CancelIcon onClick={that.handleModalClose} viewBox="703 14 18 18.7" style={DialogStyle.cancelIcon}/> 
        This action cannot be undone.
    </Dialog>
     </div>     
    );
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
  // intl: intlShape.isRequired,
  locale: PropTypes.string,
  clickBookmarkHandler: PropTypes.func,
  bookmarksArr: PropTypes.array.isRequired
};

export default BookmarkList;
