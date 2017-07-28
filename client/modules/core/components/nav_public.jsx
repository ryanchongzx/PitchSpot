import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

export default class NavPublic extends React.Component {
  componentDidMount() {
    // activate the menu
    $('.button-collapse').sideNav({ menuWidth: 300, closeOnClick: true });
  }

  render() {
    return (
      <header className="navbar-fixed">
        <nav role="navigation">
          <div className="container">
            <div className="nav-wrapper">
              <Link to={'/'} className="brand-logo left">
                <FormattedMessage
                  id="sitename"
                  defaultMessage="Socialize-starter"
                />
              </Link>
              <Link to={'#'} data-activates="nav-mobile" className="button-collapse right">
                <i className="material-icons">menu</i>
              </Link>
              <ul className="right hide-on-med-and-down">
                <li><Link to={'/register'}>
                  <FormattedMessage
                    id="common.signup"
                    defaultMessage="Register"
                  />
                </Link></li>
                <li><Link to={'/login'}><i className="material-icons right">lock_open</i>
                  <FormattedMessage
                    id="common.signin"
                    defaultMessage="Login"
                  />
                </Link></li>
              </ul>
              <ul className="side-nav" id="nav-mobile">
                <li><Link to={'/register'}>
                  <FormattedMessage
                    id="common.signup"
                    defaultMessage="Register"
                  />
                </Link></li>
                <li><Link to={'/login'}>
                  <FormattedMessage
                    id="common.signin"
                    defaultMessage="Login"
                  />
                </Link></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}
