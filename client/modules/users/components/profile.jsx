import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage, FormattedDate } from 'react-intl';
import { Roles } from 'meteor/alanning:roles';
import S from 'string';
import PropTypes from 'prop-types';
import UserFeed from '../containers/feed.js';
import NewFeedPost from '../containers/feed_new_post.js';
// NOTE This was creating a very strange behavior where
// it would redirect user to a conversation (right after component mounted)
// import UserNewConversation from '../../messaging/components/conversation.jsx'

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.addActions = this.addActions.bind(this);
    this.showAvatar = this.showAvatar.bind(this);
    this.block = this.block.bind(this);
    this.unblock = this.unblock.bind(this);
    this.unfriend = this.unfriend.bind(this);
    this.cancelFriendshipRequest = this.cancelFriendshipRequest.bind(this);
    this.acceptFriendshipRequest = this.acceptFriendshipRequest.bind(this);
    this.denyFriendshipRequest = this.denyFriendshipRequest.bind(this);
    this.requestFriendship = this.requestFriendship.bind(this);
    this.reportUser = this.reportUser.bind(this);
    this.showRoles = this.showRoles.bind(this);
  }

  showAvatar() {
    // show user avatar
    if (this.props.profile.avatar) {
      return (<img
        className="profile-picture responsive-img circle"
        src={this.props.profile.avatar}
        alt={'Avatar for ' + this.props.profile.username}
      />);
    } else {
      return (<i className="material-icons profile-picture">account_circle</i>);
    }
  }

  // requests friendship
  requestFriendship(e) {
    e.preventDefault();
    this.props.profileUser.requestFriendship();
  }

  unfriend(e) {
    e.preventDefault();
    this.props.profileUser.unfriend();
  }

  block(e) {
    e.preventDefault();
    this.props.profileUser.block();
  }

  unblock(e) {
    e.preventDefault();
    this.props.profileUser.unblock();
  }

  reportUser(e) {
    // TODO
    e.preventDefault();
  }

  acceptFriendshipRequest(e) {
    e.preventDefault();
    this.props.profileUser.acceptFriendshipRequest();
  }

  denyFriendshipRequest(e) {
    e.preventDefault();
    this.props.profileUser.denyFriendshipRequest();
  }

  cancelFriendshipRequest(e) {
    e.preventDefault();
    this.props.profileUser.cancelFriendshipRequest();
  }

  // figure out which button to show
  friendshipOption() {
    const currentUser = this.props.currentUser;
    const profileUser = this.props.profileUser;

    // if friend request pending show cancel request button
    if (profileUser.hasRequestFrom(currentUser)) {
      return (<button
        onClick={this.cancelFriendshipRequest}
        className="btn waves-effect"
      >
        Cancel friendship request
      </button>);
    }

    // if friendship request from this user show accept or deny button
    if (currentUser.hasRequestFrom(profileUser)) {
      return (<span>
        <button
          onClick={this.acceptFriendshipRequest}
          className="btn waves-effect"
        >
          <FormattedMessage
            id='user.friend.request.accept'
            defaultMessage='Accept friendship request'
          />
        </button>
        <button
          onClick={this.denyFriendshipRequest}
          className="btn waves-effect"
        >
          <FormattedMessage
            id='user.friend.request.deny'
            defaultMessage='Deny friendship'
          />
        </button>
      </span>);
    }

    // if friends show unfriend button
    if (currentUser.isFriendsWith(profileUser)) {
      return (<button onClick={this.unfriend} className="btn waves-effect">
        <FormattedMessage id="user.friend.unfriend" defaultMessage="Unfriend" />
      </button>);
    } else {
      return (<button onClick={this.requestFriendship} className="btn waves-effect">
        <FormattedMessage id="user.friend.request" defaultMessage="Add to friends" />
      </button>);
    }
  }

  // figure which button to show
  blockOption() {
    const currentUser = this.props.currentUser;
    const profileUser = this.props.profileUser;

    // if friends don't display anything
    if (!currentUser.isFriendsWith(profileUser)) {
      // has user been blocked by the current user?
      if (currentUser.blocksUser(profileUser)) {
        // show unblock button
        return (<button onClick={this.unblock} className="btn waves-effect">
          <FormattedMessage id="user.unblock" defaultMessage="Unblock" />
        </button>);
      } else {
        // show block button
        return (<button onClick={this.block} className="btn waves-effect">
          <FormattedMessage id="user.block" defaultMessage="Block" />
        </button>);
      }
    }
  }

  addActions() {
    // no actions if user not logged in
    if (Meteor.userId()) {
      // not the same user
      if (Meteor.userId() !== this.props.profile.userId) {
        return (<div className="card-action">
          {this.friendshipOption()}
          {this.blockOption()}
          <button onClick={this.reportUser} className="btn waves-effect">
            <FormattedMessage
             id='common.report'
             defaultMessage='Report'
            />
          </button>
        </div>);
      }
    }
  }

  showRoles() {
    const roles = Roles.getRolesForUser(this.props.profileUser, Roles.GLOBAL_GROUP);
    return roles.map((role) => {
      switch (role) {
        case 'premium':
          return (<span key='premium' className="chip lime">
            <FormattedMessage id='premium' defaultMessage='Premium' />
          </span>);
        case 'admin':
          return (<span key='admin' className="chip red accent-4">
            <FormattedMessage id='admin' defaultMessage='Admin' />
          </span>);
      }
    });
  }

  /**
   * Actual content to be displayed when user data are available.
   * @access private
   * @returns {jsx}
   */
  render() {
    if (this.props.profile) {
      const { profile } = this.props;
      let newPost = null;
      if (profile.userId === Meteor.userId()) {
        newPost = <NewFeedPost />;
      }

      let bio = null;
      if (profile.biography) {
        S(profile.biography).decodeHTMLEntities().toString();
      }

      return (<div className="profile-header-bg">
        <Helmet
          title={profile.username}
          meta={[
            {name: 'twitter:card' , content: 'summary'},
            {name: 'twitter:site' , content: '@lituniapp'},
            {name: 'twitter:title' , content: profile.username},
            {name: 'twitter:description' , content: profile.biography},
            {name: 'twitter:image' , content: ''},
            {propery: 'og:title' , content: profile.username},
            {propery: 'og:description' , content: profile.biography},
            {propery: 'og:locale' , content: 'en_US'},
            {propery: 'og:site_name' , content: 'Literary Universe'},
            {propery: 'og:type' , content: 'profile'},
            {propery: 'og:profile:username' , content: profile.username},
            {propery: 'og:profile:first_name' , content: profile.givenName},
            {propery: 'og:profile:last_name' , content: profile.familyName},
            {propery: 'og:image' , content: ''},
          ]}
        />
        <section className="card-panel">
          <span className="profile-picture-box">{this.showAvatar()}</span>
          <h1 className="profile-username">{this.props.profileUser.username}</h1>
          <hr />
          {this.showRoles()}
          {this.addActions()}
        </section>
        <section className="row">
          <div className="col s12 m10 l9">
            <div className="card-panel">
              <h4>
                <FormattedMessage
                  id="feed"
                  defaultMessage="Stream"
                />
              </h4>
              {newPost}
              <UserFeed feedUser={this.props.profileUser} />
            </div>
          </div>
          <div className="col s12 m2 l3">
            <div className="card-panel">
              <h5>{profile.givenName} {profile.familyName}</h5>
              <p>{bio}</p>
              <p>
                <FormattedMessage
                  id="user.joined"
                  values={{
                    gender: 'other'
                  }}
                />
                <FormattedDate
                  value={profile.createdAt}
                  day='numeric'
                  month='long'
                  year='numeric'
                />
              </p>
            </div>
          </div>
        </section>
      </div>);
    } else {
      return (<div>
        <Helmet
          title="404"
          meta={[
            {
              name: 'prerender-status-code',
              content: '404'
            },
          ]}
        />
        <h1>404</h1>
        <p className="flow-text">
          <FormattedMessage id='404' defaultMessage="Page not found" />
        </p>
      </div>);
    }
  }
}

UserProfile.propTypes = {
  currentUser: PropTypes.object,
  profile: PropTypes.object,
  profileUser: PropTypes.object,
};
