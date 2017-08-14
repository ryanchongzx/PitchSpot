import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// import feed
import NewFeedPost from '../containers/feed_new_post.js';
import UserFeed from '../containers/feed.js';
import DashboardFriends from '../containers/dashboard_friends.js';
import Carousell from '../components/Carousell.jsx';
import Parallax from '../components/Parallax.jsx';

export default class UserDashboard extends React.Component {
  render() {
    return (<div className="row ">

           <Carousell/> 
      <Helmet title="Dashboard" />
<div>
  <div className="row card-panel RIP-Padding pitchspot-blue-two">
    <div className="RIP center-align">Recently Initiated Projects</div>
  </div>
    <NewFeedPost />
    <UserFeed userId={false} />
    </div>
  </div>);
  }
}

/*
        <div className="col s6 m4 l3 center-align">
          <div className="card hoverable indigo darken-4 waves-effect waves-block waves-light">
            <Link to={"user/groups"}>
              <div className="card-image">
                <i className="material-icons white-text">group</i>
              </div>
              <div className="card-content">
                <p className="flow-text white-text">Groups</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="col s6 m4 l3 center-align">
          <div className="card hoverable indigo darken-4 waves-effect waves-block waves-light">
            <Link to={"forums"}>
              <div className="card-image">
                <i className="material-icons white-text">forum</i>
              </div>
              <div className="card-content">
                <p className="flow-text white-text">Forums</p>
              </div>
            </Link>
          </div>
        </div>
 */
