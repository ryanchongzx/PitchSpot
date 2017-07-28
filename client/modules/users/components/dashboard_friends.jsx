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
        return (<div className="col s6 m4 l3 center-align">
          <div className="card hoverable indigo waves-effect waves-block waves-light">
            <Link to={'/user/friend-requests'}>
              <div className="card-image">
                <i className="material-icons white-text">person_add</i>
              </div>
              <div className="card-content">
                <p className="flow-text white-text">
                  <FormattedMessage
                    id="user.friend.requests"
                    values={{
                      num: user.numRequests(),
                    }}
                  />
                </p>
              </div>
            </Link>
          </div>
        </div>);
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
