import React from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Materialize } from 'meteor/poetic:materialize-scss';
import PropTypes from 'prop-types';
import Error from '../../core/components/error.jsx';

/**
 * @class component UserChangePassword
 * @classdesc Changes user password
 */
class UserChangePassword extends React.Component {
  /**
   * Changes user password
   * @access private
   * @param {event} Submit event from form.
   * @returns {null}
   */
  changePassword(event) {
    event.preventDefault();
    const { formatMessage } = this.props.intl;

    const oldPassword = event.target.old.value;
    const newPassword = event.target.new.value;
    const newPasswordConfirm = event.target.repeat.value;

    const { changePassword } = this.props;
    const minPasswordLength = 6;

    if (newPassword === newPasswordConfirm) {
      if (newPassword.length >= minPasswordLength) {
        changePassword(oldPassword, newPassword);
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

    event.target.reset();
  }
  /**
   * Content to be displayed when user data are available.
   * @access private
   * @returns {jsx}
   */
  render() {
    const { formatMessage } = this.props.intl;
    return (
      <form method="post" className="row" onSubmit={this.changePassword.bind(this)}>
        <fieldset>
          <legend>
            <FormattedMessage
              id='settings.password'
              defaultMessage="Change password"
            />
          </legend>
          <Error error={this.props.error} success={this.props.success} />
          <div className="input-field col s12">
            <input className="validate" type="password" name="old" />
            <label htmlFor="old">
              <FormattedMessage
                id='settings.password.current'
                defaultMessage="Current password"
              />
            </label>
          </div>
          <div className="input-field col s12">
            <input className="validate" type="password" name="new" />
            <label htmlFor="new">
              <FormattedMessage
                id='settings.password.new'
                defaultMessage="New password"
              />
            </label>
          </div>
          <div className="input-field col s12">
            <input className="validate" type="password" name="repeat" />
            <label htmlFor="repeat">
              <FormattedMessage
                id='settings.password.new.repeat'
                defaultMessage="Repeat new password"
              />
            </label>
          </div>
          <input
            type="submit"
            value={formatMessage({id: 'common.save'})}
            className="btn waves-effect waves-light"
          />
        </fieldset>
      </form>);
  }
}

UserChangePassword.propTypes = {
  changePassword: PropTypes.func.isRequired,
  error: PropTypes.string,
  intl: intlShape.isRequired,
  success: PropTypes.string,
};

export default injectIntl(UserChangePassword);
