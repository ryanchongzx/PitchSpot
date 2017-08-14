import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

// TODO display premium and admin graphics if applicable to user
class UsernameDisplay extends React.Component {
  render() {
    let avatar = null;
    if ( this.props.avatar ) {
      if (this.props.profile.avatar) {
        avatar = (<img src={this.props.profile.avatar} alt={this.props.user.username} className="circle" />);
      } else {
        avatar = (<img src="/images/friends.jpg"/>);
      }
    }

    return (
      <Link to={'/users/' + this.props.user.username}>
        {avatar}
        <span className="username-display">{this.props.user.username}
        </span>
      </Link>
    );
  }
}

UsernameDisplay.propTypes = {
  avatar: PropTypes.bool,
  profile: PropTypes.object,
  user: PropTypes.object.isRequired,
};

UsernameDisplay.defaultProps = {
  avatar: false,
};

export default UsernameDisplay;
