import React from 'react';
import { Materialize } from 'meteor/poetic:materialize-scss';
import sanitizeHtml from 'sanitize-html';
import { Conversation } from 'meteor/socialize:messaging';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';

/**
 * @class component UserNewConversation
 * @classdesc Modal to start a new conversation.
 */
class InitiateChat extends React.Component {
  constructor(props) {
    super(props);

    let users = props.recipients;

    if (users === undefined) {
      users = [];
    }

    this.state = {
      users,
    };

    this.usersListing = this.usersListing.bind(this);
    this.populateSuggestions = this.populateSuggestions.bind(this);
    this.lookupUser = this.lookupUser.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  componentDidMount() {
    this.hideSuggestions();
    $('#newConversation').modal();
     console.log("did mount");
     
  }

  /**
   * Searches for a user
   */
  lookupUser(event) {
    const query = event.target.value;

    // first wait for at least three characters to by typed before doing anything
    if (query.length > 2) {
      // exlude users that have already been added + current user
      const excluded = [ Meteor.userId() ];
      this.state.users.forEach((user) => {
        excluded.push(user._id);
      });

      // search through users collection
      Meteor.subscribe('pm.users.search', query, excluded, () => {
        // onReady
        this.setState({
          search: Meteor.users.find(
            {
              username: { $regex: query, $options: 'i' },
              _id: { $nin: excluded }
            },
            { limit: 10 }
          ).fetch(),
        });
        this.showSuggestions();
      });
    } else {
      this.hideSuggestions();
    }
  }

  showSuggestions() {
    $('#searchSuggestions').show();
  }

  populateSuggestions() {
    if (this.state.search) {
      return this.state.search.map((user) => {
        return (<div
          key={'SUG' + user._id}
          className="suggestion-item avatar clickable"
          onClick={this.addUser.bind(this, user)}
        >
          <i className="material-icons circle">account_circle</i>
          <span className="title">{user.username}</span>
        </div>);
      });
    } else {
      // TODO fix that this displays
      return (<div className="suggestion-item"><span className="title">
        <FormattedMessage id='common.nothingfound' defaultMessage='Nothing found.' />
      </span></div>);
    }
  }

  hideSuggestions() {
    $('#searchSuggestions').hide();
  }

  /**
   * Adds a user to the list of recipients
   * @param user User Object
   */
  addUser(user) {
    // clear the searchbox
    $('#searchUsernames').val('');

    let users = this.state.users.filter( () => { return true; } );
    users.push(user);

    this.setState({
      users,
    });

    // hide suggestions
    this.hideSuggestions();
  }

  /**
   * Removes a user from recipients
   */
  removeUser(user) {
    const users = this.state.users;

    const i = users.indexOf(user);

    users.splice(i, 1);

    this.setState({
      users,
    });
  }

  /**
   * Creates a list of users that have already been added to the conversation
   */
  usersListing() {
    // create a listing of users
    if (this.state.users.length > 0) {
      return this.state.users.map((user) => {
        // NOTE: can't add the close tag since Materialize fires the event
        // to remove the element before the function is called
        return (<button onClick={this.removeUser.bind(this, user)} key={user._id} className="chip">
          {user.username}
        </button>);
      });
    }
  }

  /**
   * Sends the initial message
   */
  sendMessage(e) {
    e.preventDefault();
    const { formatMessage } = this.props.intl; //translation (can delete)
    let msg = e.target.msg.value;
    const users = this.state.chatwith;
    if (users.length > 0) {
      // create conversation
      const converstation = new Conversation().save();

      // add participants
  //  converstation.addParticipant(this.props.chatwith);
users.forEach((user) => {
        converstation.addParticipant(user);
      });

      // sanitize
      msg = sanitizeHtml(msg);
      if (msg.length > 1) {
        // send the message
        converstation.sendMessage(msg);

        Materialize.toast('Converstaion created!', 3000);

        // close modal or redirect to the conversation
        $('#newConversation').modal('close');
      } else {
        Materialize.toast(formatMessage({
          id: 'pm.errors.saysomething',
          defaultMessage: 'You should really say something...'
        }) , 5000);
      }
    } else {
      Materialize.toast(formatMessage({
        id: 'pm.errors.addrecipient',
        defaultMessage: 'You need to add at least one other user.'
      }), 5000);
    }
  }

  openModal(e) {
    e.preventDefault();
    $('#newConversation').openModal('open');
    console.log(this.props.chatwith)
  }


  render() {
   console.log(this.props);
    let { buttonClass, buttonText } = this.props;
    const { formatMessage } = this.props.intl;

    if (buttonClass === null || buttonClass === undefined) {
      buttonClass = 'btn waves-effect modal-trigger';
    } else {
      buttonClass += ' modal-trigger';
    }

    if (buttonText === null || buttonText === undefined) {
      buttonText = 'Send a message';
    }

    // the search element
   const search = (<div className="input-field col s12">
      <i className="material-icons prefix">search</i>
      <input
        id="searchUsernames"
        name="searchUsernames"
        type="text"
        className="validate"
        onInput={this.lookupUser}
      />
      <label className="active" htmlFor="searchUsernames">
        <FormattedMessage id='settings.username.label' defaultMessage='Username' />
      </label>
      <div id="searchSuggestions" className="search-suggestions-box">
        {this.populateSuggestions()}
      </div>
    </div>);

    return (
      <div  >
          
        <button className={buttonClass} onClick={this.openModal}>{buttonText}</button>
        <div id="newConversation" className="modal">
            
          <div className="modal-content">
            <form method="post" className="row" onSubmit={this.sendMessage}>
         {search}
              <div className="">
                <FormattedMessage id='pm.to' defaultMessage='To:' /> {this.usersListing()}
              </div>
              <div className="input-field col s12">
                <i className="material-icons prefix">mode_edit</i>
                <textarea name="msg" className="materialize-textarea validate" />
                <label htmlFor="msg">
                  <FormattedMessage id='pm.message' defaultMessage='Message' />
                </label>
                 
              </div>
              <div className="input-field col s12">
                <input
                  type="submit"
                  className="btn waves-effect waves-light right"
                  value={formatMessage({id: 'pm.send', defaultMessage: 'Send'})}
                />  
              </div>
             
            </form>
          </div>
        </div>
      </div>
    );
  }
}

InitiateChat.propTypes = {
  buttonClass: PropTypes.string,
  buttonText: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
  intl: intlShape.isRequired,
  recipients: PropTypes.array,
};

export default injectIntl(InitiateChat);
