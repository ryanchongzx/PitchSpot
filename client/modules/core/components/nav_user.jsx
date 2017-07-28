import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';

class NavUser extends React.Component {
  constructor(props) {
    super(props);

    this.showAvatar = this.showAvatar.bind(this);
  }

  componentDidMount() {
    // activate the menu
    $('.button-collapse').sideNav({ menuWidth: 300, closeOnClick: true });
    $('.dropdown-button').dropdown();
  }

  showAvatar() {
    // show user avatar
    if (this.props.avatar) {
      const { formatMessage } = this.props.intl;
      return (<span className="valign-wrapper"><img
        className="circle responsive-img valign"
        alt={formatMessage({id: 'common.settings', defaultMessage: 'Settings'})}
        height="30"
        width="30"
        src={this.props.avatar}
      /></span>);
    } else {
      return (<i className="material-icons">account_circle</i>);
    }
  }

  render() {
    return (<header className="navbar-fixed">
      <nav role="navigation">
        <div className="nav-wrapper container">
          <ul className="left">
            <li>
              <Link to={'#'} data-activates="slide-out" className="button-collapse show-on-large">
                <i className="material-icons">menu</i>
              </Link>
            </li>
            <li><Link to={'/dashboard'} id="pageName" className="brand-logo">
              <FormattedMessage
                id="sitename"
                defaultMessage="Socialize-starter"
              />
            </Link></li>
          </ul>
          <ul className="right">
            <li className="hide-on-small-only">
              <Link to={'/dashboard'} className="waves-effect"><i className="material-icons">dashboard</i></Link>
            </li>
            <li className="hide-on-med-and-down">
              <Link to={'/pm'} className="waves-effect"><i className="material-icons">mail</i></Link>
            </li>
            <li>
              <a
                title="Options"
                className="dropdown-button waves-effect"
                data-activates="user-dropdown"
                href="#!"
              >
                {this.showAvatar()}
              </a>
            </li>
          </ul>
          <ul id="user-dropdown" className="dropdown-content">
            <li><Link className="waves-effect" to={'/user'}>
              <FormattedMessage
                id="common.profile"
                defaultMessage="Profile"
              />
            </Link></li>
            <li><Link className="waves-effect" to={'/user/friends'}>
              <FormattedMessage
                id="common.friends"
                defaultMessage="Friends"
              />
            </Link></li>
            <li><Link className="waves-effect" to={'/user/settings'}>
              <FormattedMessage
                id="common.settings"
                defaultMessage="Settings"
              />
            </Link></li>
            <li><Link className="waves-effect" to={'/logout'}>
              <FormattedMessage
                id="common.signout"
                defaultMessage="Logout"
              />
            </Link></li>
          </ul>
        </div>
        <ul id="slide-out" className="side-nav">
          <li><Link to={'/dashboard'}>
            <FormattedMessage
              id="common.dashboard"
              defaultMessage="Dashboard"
            />
          </Link></li>
          <li><Link to={'/blogs'}>
            <FormattedMessage
              id="common.blogs"
              defaultMessage="Blogs"
            />
          </Link></li>
          <li><Link to={'/pm'}>
            <FormattedMessage
              id="common.pm"
              defaultMessage="Messages"
            />
          </Link></li>
          <li><Link className="waves-effect" to={'/user/friends'}>
            <FormattedMessage
              id="common.friends"
              defaultMessage="Friends"
            />
          </Link></li>
          <li><Link to={'/user/settings'}>
            <FormattedMessage
              id="common.settings"
              defaultMessage="Settings"
            />
          </Link></li>
          <li><Link to={'/logout'}>
            <FormattedMessage
              id="common.signout"
              defaultMessage="Logout"
            />
          </Link></li>
        </ul>
      </nav>
    </header>);
  }
}

NavUser.propTypes = {
  avatar: PropTypes.string,
  intl: intlShape.isRequired,
};

export default injectIntl(NavUser);
