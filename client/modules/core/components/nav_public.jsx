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
        <nav role="navigation" className="indigo darken-4">
         <div className="nav-wrapper container paddingLogo">
            <div className="nav-wrapper ">
              <ul className="left">
             <li>
              <Link to={'/dashboard'} className="brand-logo left">

              <img  src="/images/navbar-logo.png" height="30" width="24" className="brand-logo left " />
              
                
              </Link>
              </li>
          
          </ul>
              <Link to={'#'} data-activates="nav-mobile" className="button-collapse right">
                <i className="material-icons">menu</i>
              </Link>
              <ul className="right hide-on-med-and-down">
                <li><Link to={'/register'}>
                  <span className="small-font"> Register
                  </span>
                </Link></li>
                <li><Link to={'/login'}><i className="material-icons right small-lock">lock_open</i>
                  <span className="small-font"> Login
                  </span>
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
