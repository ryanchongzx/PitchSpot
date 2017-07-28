import React from 'react';
import { Materialize } from 'meteor/poetic:materialize-scss';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';

/**
 * @class component UserFriendsRequests
 * @classdesc Component to manage friend requests.
 */
class UserFriendsRequests extends React.Component {
  /**
   * Accepts a friend request from a given user.
   * @access private
   * @param {string} requestor userId
   */
  accept(requestor) {
    requestor.acceptFriendshipRequest();
    Materialize.toast('You are now friends with ' + requestor.username, 5000);
  }

  /**
   * Deny a request for friendship from the given user.
   * @access private
   * @param {string} requestor userId
   */
  deny(requestor) {
    requestor.denyFriendshipRequest();
  }

  /**
   * Shows listing and options for friend requests.
   * @access private
   * @returns {jsx}
   */
  request() {
    const { requests } = this.props;

    if (requests.length === 0) {
      return (<li className="collection-item">
        <FormattedMessage id='user.friend.norequests' defaultMessage='You have no requests for friendship.' />
      </li>);
    } else {
      return requests.map((req) => {
        const requester = req.requester();

        return (<li key={requester._id} className="collection-item avatar">
          <i className="material-icons circle">user</i>
          <span className="title">{requester.username}</span>
          <p>
            <a className="clickable" onClick={this.accept.bind(this, requester)} >
              <i className="material-icons">check</i>
            </a>
            <a className="clickable" onClick={this.deny.bind(this, requester)} >
              <i className="material-icons">cancel</i>
            </a>
          </p>
          <Link to={'/users/' + requester.username} className="secondary-content">
            <i className="material-icons">send</i>
          </Link>
        </li>);
      });
    }
  }

  /**
   * Content to be displayed when user data are available.
   * @access private
   * @returns {jsx}
   */
  render() {
    const { formatMessage } = this.props.intl;
    return (<div>
      <Helmet
        title={formatMessage({id: 'user.friend.requests.title', defaultMessage: 'Friend requests'})}
      />
      <h1>
        <Link to={'/dashboard'}>
          <i className="material-icons">arrow_back</i>
        </Link> <FormattedMessage id='user.friend.requests.title' defaultMessage='Friendships requests' />
      </h1>
      <ul className="collection">
        {this.request()}
      </ul>
    </div>);
  }
}

UserFriendsRequests.propTypes = {
  intl: intlShape.isRequired,
  requests: PropTypes.array,
};

export default injectIntl(UserFriendsRequests);
