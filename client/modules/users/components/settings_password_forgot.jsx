import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import Error from '../../core/components/error.jsx';

/**
 * @class component ForgotPassword
 * @classdesc A form to fill in e-mail to send reset password link to.
 */
class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.sendReset = this.sendReset.bind(this);
  }

  sendReset(e) {
    e.preventDefault();

    const email = e.target.email.value;

    const { resetPasswordEmail } = this.props;
    resetPasswordEmail(email);
    e.target.reset();
  }

  render() {
    const { formatMessage } = this.props.intl;
    return (<form method="post" onSubmit={this.sendReset} className="row">
      <Helmet
        title={formatMessage({id: 'password.reset', defaultMessage: 'Reset password'})}
      />
      <h2 className="center-align">
        <FormattedMessage
          id="password.reset"
          defaultMessage="Reset password"
        />
      </h2>
      <Error error={this.props.error} success={this.props.success} />
      <div className="input-field col s12 m10">
        <i className="material-icons prefix">mail</i>
        <input type="email" name="email" className="validate" />
        <label htmlFor="email">
          <FormattedMessage
            id='common.email'
            defaultMessage='E-mail'
          />
        </label>
      </div>
      <div className="input-field col s12 m2">
        <input
          type="submit"
          value={formatMessage({id: 'pm.send'})}
          className="btn waves-effect waves-light"
        />
      </div>
    </form>);
  }
}

ForgotPassword.propTypes = {
  error: PropTypes.string,
  intl: intlShape.isRequired,
  resetPasswordEmail: PropTypes.func.isRequired,
  success: PropTypes.string,
};

export default injectIntl(ForgotPassword);
