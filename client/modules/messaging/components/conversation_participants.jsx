import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
/**
 * @class component ConversationParticipants
 * @classdesc Lists conversation participants
 * TODO Show status ("typing", etc.) by each user
 */
export default class ConversationParticipants extends React.Component {
  render() {
    const participants = this.props.conversation.participants().map((participant) => {
      // get username and avatar
      return (<li className="collection-item avatar" key={participant._id}>
        <Link to={'/users/' + participant.user().username}>
          <i className="material-icons circle">person</i>
          <span className="title">{participant.user().username}</span>
        </Link>
      </li>);
    });

    return <div className="collection">{participants}</div>;
  }
}

ConversationParticipants.propTypes = {
  conversation: PropTypes.object.isRequired,
};
