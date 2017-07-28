import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import Error from '../../core/components/error.jsx';

/**
 * @class component UserRegister
 * @classdesc User registration form.
 */
class UserRegister extends React.Component {
  /**
   * Registers a new user in the system.
   * @access private
   * @param {event} e Submit event from form
   */
  register(e) {
    e.preventDefault();
    // get the data
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const password2 = e.target.password2.value;

    const { create } = this.props;

    create(username, email, password, password2);
  }
  /**
   * Render the registration form.
   * @access private
   */
  render() {
    const {formatMessage} = this.props.intl;
    return (
      <div className="row">
        <Helmet
          title={formatMessage({id: 'common.signup', defaultMessage: 'Register'})}
        />
        <div className="col s12 m8 offset-m2 l4 offset-l4 center-align">
          <h1>
            <FormattedMessage
              id='common.signup'
              defaultMessage='Register'
            />
          </h1>
          <Error error={this.props.error} />
          <form onSubmit={this.register.bind(this)}>
            <div className="input-field col s12 left-align">
              <input className="validate" type="text" id="username" name="username" required />
              <label htmlFor="username">
                <FormattedMessage
                  id='signup.username'
                  defaultMessage='Desired username'
                />
              </label>
            </div>
            <div className="input-field col s12 left-align">
              <input className="validate" type="email" name="email" required />
              <label htmlFor="email">
                <FormattedMessage
                  id='signup.email'
                  defaultMessage='Your e-mail'
                />
              </label>
            </div>
            <div className="input-field col s12 left-align">
              <input className="validate" type="password" name="password" required />
              <label htmlFor="password">
                <FormattedMessage
                  id='signup.password'
                  defaultMessage='Your password'
                />
              </label>
            </div>
            <div className="input-field col s12 left-align">
              <input className="validate" type="password" name="password2" required />
              <label htmlFor="password2">
                <FormattedMessage
                  id='signup.password.repeat'
                  defaultMessage='Repeat your password'
                />
              </label>
            </div>
            <div className="expanded button-group">
              <Link to={'login'} className="waves-effect waves-teal btn-flat">
                <FormattedMessage
                  id='common.signin'
                  defaultMessage='Login'
                />
              </Link>
              <input
                type="submit"
                value={formatMessage({id: 'common.account.create', defaultMessage: 'Create an account'})}
                className="btn waves-effect"
              />
            </div>
          </form>
        </div>
      </div>);
  }
}

UserRegister.propTypes = {
  create: PropTypes.func.isRequired,
  error: PropTypes.string,
  intl: intlShape.isRequired,
};

export default injectIntl(UserRegister);

