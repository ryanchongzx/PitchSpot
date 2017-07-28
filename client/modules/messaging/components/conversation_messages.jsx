import React from 'react';
import S from 'string';
import { FormattedRelative } from 'react-intl';
import PropTypes from 'prop-types';

/**
 * @class component ConversationMessage
 * @classdesc Component to display a full user conversation.
 */
export default class ConversationMessage extends React.Component {
  constructor(props) {
    super(props);
    this.getMessages = this.getMessages.bind(this);

    this.state = {
      viewing: Meteor.subscribe('viewingConversation', props.conversationId),
    };
  }

  componentWillUnmount() {
    this.state.viewing.stop();
  }

  getMessages() {
    const { messages } = this.props;
    return messages.map((msg) => {
      const user = msg.user();

      return (<div key={msg._id} className="row">
        <div className="col s10"><strong>{user.username}:</strong> {S(msg.body).decodeHTMLEntities().toString()}</div>
        <div className="col s2"><FormattedRelative value={msg.date} /></div>
      </div>);
    });
  }

  render() {
    return (<div>
      {this.getMessages()}
    </div>);
  }
}

ConversationMessage.propTypes = {
  conversationId: PropTypes.string,
  messages: PropTypes.array,
};
