import React from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import Error from '../../core/components/error.jsx';

/**
 * @class component UserLogin
 * @classdesc Shows user login form
 */
class UserLogin extends React.Component {
  /**
   * Login the user
   * @access private
   * @param {event} e Submit event from the form
   */
  login(e) {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const { loginUser } = this.props;
    loginUser(email, password);
  }

  /**
   * Renders the login form
   * @access private
   */
  render() {
    const { formatMessage } = this.props.intl;

    return (<div className="row">
      <Helmet
        title={formatMessage({id: 'common.signin', defaultMessage: 'Login'})}
      />
      <div className="col s12 m8 offset-m2 l4 offset-l4 center-align">
        <h1>       <img  src="/images/pitchspot-logo-1.png" height="100" className="brand-logo left " />
        </h1>
        <Error error={this.props.error} />
        <form onSubmit={this.login.bind(this)}>
          <div className="input-field col s12 left-align">
            <input className="validate" type="email" id="email" name="email" required />
            <label htmlFor="email">
              <FormattedMessage
                id='common.email'
                defaultMessage='E-mail'
              />
            </label>
          </div>
          <div className="input-field col s12 left-align">
            <input className="validate" type="password" name="password" required />
            <label htmlFor="email">
              <FormattedMessage
                id='common.password'
                defaultMessage='Password'
              />
            </label>
          </div>
          <div className="left-align"><Link to={'/user/forgot-password'}>
            <FormattedMessage
              id='signin.password.forgot'
              defaultMessage='Forgot password?'
            />
          </Link></div>
          <div className="expanded button-group">
            <Link to={'/register'} className="waves-effect waves-teal btn-flat">
              <FormattedMessage
                id='common.signup'
                defaultMessage='Register'
              />
            </Link>
            <input
              type="submit"
              value={formatMessage({id: 'common.signin', defaultMessage: 'Login'})}
              className="btn waves-effect waves-light"
            />
          </div>
        </form>
      </div>
    </div>);
  }
}

UserLogin.propTypes = {
  error: PropTypes.string,
  intl: intlShape.isRequired,
  loginUser: PropTypes.func.isRequired,
};

export default injectIntl(UserLogin);
