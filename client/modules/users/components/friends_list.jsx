import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import DashboardFriends from '../containers/dashboard_friends.js';
import UsernameDisplay from '../containers/username_display.js';
import PropTypes from 'prop-types';

class FriendsList extends React.Component {
  constructor(props) {
    super(props);

    this.listFriends = this.listFriends.bind(this);
  }

  // TODO add friendship cancelation option
  listFriends() {
    const { friends } = this.props;
    if (friends && friends.length > 0) {
      return friends.map((friend) => {
        return (<li className="collection-item avatar" key={friend._id}>
          <UsernameDisplay user={friend._id} avatar={true} />

        </li>);
      });
    } else {
      return (<li><FormattedMessage id="common.nothingfound" defaultMessage="Nothing found" /></li>);
    }
  }

  render() {
    const { formatMessage } = this.props.intl;
    return (<div className="row">
      <Helmet
        title={formatMessage({id: 'common.friends', defaultMessage: 'Friends'})}
      />
     
  <div className="row card-panel RIP-Padding pitchspot-blue-two center-align">
    <div className="RIP ">Friends</div>
  </div>
     
      <DashboardFriends />
      <div className="row col s12">
        <ul className="collection">
          {this.listFriends()}
        </ul>
      </div>
    </div>);
  }
}

FriendsList.propTypes = {
  friends: PropTypes.array,
  intl: intlShape.isRequired,
};

export default injectIntl(FriendsList);
