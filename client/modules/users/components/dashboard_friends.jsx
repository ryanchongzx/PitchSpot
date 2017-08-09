import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';

export default class DashboardFriends extends React.Component {
  render() {
    const { user } = this.props;
    if (user) {
      // friends requests
      if (user.numRequests() > 0) {
        return (<li className="hide-on-med-and-down">
              <Link to={'/user/friend-requests'} className="waves-effect"><i className="material-icons">person_add</i></Link>
            </li>);
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}

DashboardFriends.propTypes = {
  user: PropTypes.object.isRequired,
};
