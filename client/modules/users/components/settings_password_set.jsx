import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Materialize } from 'meteor/poetic:materialize-scss';
import PropTypes from 'prop-types';
import Error from '../../core/components/error.jsx';
/**
 * @class component SetPassword
 * @classdesc Component where users can reset their password.
 */
class SetPassword extends React.Component {
  constructor(props) {
    super(props);

    this.setPassword = this.setPassword.bind(this);
  }

  setPassword(e) {
    e.preventDefault();
    const { formatMessage } = this.props.intl;

    const newPassword = e.target.pass1.value;
    const newPasswordConfirm = e.target.pass2.value;
    const minPasswordLength = 6;

    let { token } = this.props;
    if (token) {
      /**
       * TODO figure out why "3D" is added after "=" in url token creation
       * so that we don't have to doctor the token
       */
      if (token[0] === '3' && token[1] === 'D') {
        token = token.substr(2);
      }

      if (newPassword === newPasswordConfirm) {
        if (newPassword.length >= minPasswordLength) {
          const { resetPassword } = this.props;
          resetPassword(token, newPassword);
        } else {
          // TODO: Display as error
          Materialize.toast(formatMessage({
            id: 'settings.password.badlength',
            defaultMessage: 'Password must be at least {legth} characters long.',
            values: { length: minPasswordLength }
          }), 5000);
        }
      } else {
        // TODO: Display as error
        Materialize.toast(formatMessage({
          id: 'settings.password.nomatch',
          defaultMessage: 'New password does not match!',
        }), 5000);
      }
    }
    e.target.reset();
  }

  render() {
    const { formatMessage } = this.props.intl;
    return (<form method="post" className="row" onSubmit={this.setPassword}>
      <Helmet
        title="Set your password"
      />
      <Error error={this.props.error} />
      <div className="input-field col s12">
        <input type="password" name="pass1" className="validate" />
        <label htmlFor="pass1">
          <FormattedMessage
            id='settings.password.new'
            defaultMessage="New password"
          />
        </label>
      </div>
      <div className="input-field col s12">
        <input type="password" name="pass2" className="validate" />
        <label htmlFor="pass2">
          <FormattedMessage
            id='settings.password.new.repeat'
            defaultMessage="Repeat new password"
          />
        </label>
      </div>
      <div className="input-field col s12 right-align">
        <input
          type="submit"
          value={formatMessage({id: 'common.save'})}
          className="btn waves-effect waves-light"
        />
      </div>
    </form>);
  }
}

SetPassword.propTypes = {
  error: PropTypes.string,
  intl: intlShape.isRequired,
  resetPassword: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

export default injectIntl(SetPassword);
