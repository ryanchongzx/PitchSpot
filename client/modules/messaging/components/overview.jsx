import React from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { FormattedMessage, FormattedRelative, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import UserNewConversation from './conversation_new.jsx';

/**
 * @class component UserConversationOverview
 * @classdesc Overview of all conversations that the user is involved in.
 */
class UserConversationOverview extends React.Component {
  constructor(props) {
    super(props);

    this.getConversations = this.getConversations.bind(this);
  }

  getConversations(conversations) {
    if (conversations && conversations.length > 0) {
      return conversations.map((conversation) => {
        const usersArray = [];
        let participants = conversation.participants().fetch();
        participants.forEach((participant) => {
          usersArray.push(participant.user().username);
        });

        let users = usersArray[0];
        for (let i = 1; i < usersArray.length; i++) {
          users = users + ', ' + usersArray[i];
        }

        const lastMessage = conversation.lastMessage();
        let msg = null;
        let date = null;
        if ( lastMessage ) {
          msg = (<p className="flow-text truncate">{lastMessage.user().username}: {lastMessage.body}</p>);
          date = (<span className="right"><FormattedRelative value={lastMessage.date} /></span>);
        }

        return (<li className="collection-item avatar" key={conversation._id}>
          <Link to={'/pm/' + conversation._id} >
            <i className="material-icons circle  pitchspot-blue-three">mail</i>
            <p>
              <span className="title">{users}</span>
              {date}
            </p>
            {msg}
          </Link>
        </li>);
      });
    } else {
      return this.noData();
    }
  }

  noData() {
    return (<li className="collection-item avatar">
      <FormattedMessage id='pm.conversations.none' defaultMessage='You are currently not conversing with anyone.' />
    </li>);
  }

  render() {
    const { conversations } = this.props;
    const { formatMessage } = this.props.intl;
 /* <li>      <div className="">
          <Link to={'/dashboard'}>
          <div className="btn">
           <span>Return to HomePage</span>
            </div>
          </Link> 
      
          </div>
     </li>
*/
    return (<div>
      <Helmet
        title={formatMessage({id: 'pm.messages.own', defaultMessage: 'Your messages'})}
      />
  <div className="row card-panel RIP-Padding center-align pitchspot-blue-two">
    <div className="RIP white-font">Inbox</div>
  </div>
      <section className="row valign-wrapper col s3">
       <ul>
       <li>

</li>
 
<li>
        <div className="">
          <UserNewConversation
            buttonText={<span>Add Conversations</span>}
            buttonClass={'btn'}
          />
        </div>
   </li>
        </ul>
      </section>
      <ul className="collection col s9">
        {this.getConversations(conversations)}
      </ul>
    </div>);
  }
}

UserConversationOverview.propTypes = {
  conversations: PropTypes.array,
  intl: intlShape.isRequired,
};

export default injectIntl(UserConversationOverview);
