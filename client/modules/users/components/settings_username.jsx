import React from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import Error from '../../core/components/error.jsx';

/**
 * @class component UserChangeUsername
 * @classdesc Allows user to change username
 */
class UserChangeUsernane extends React.Component {
  /**
   * Changes currently logged in user's username
   * @access private
   * @param {event} e Submit event from form
   */
  changeUsername(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const { changeUsername } = this.props;
    changeUsername(username);
  }
  /**
   * Actual content to be displayed when user data are available.
   * @access private
   * @returns {jsx}
   */
  render() {
    const { formatMessage } = this.props.intl;
    return (
      <form method="post" className="row" ref="usernameForm" onSubmit={this.changeUsername.bind(this)}>
        <fieldset>
          <legend>
            <FormattedMessage
              id='settings.username'
              defaultMessage="Change Username"
            />
          </legend>
          <Error error={this.props.error} success={this.props.success} />
          <div className="input-field col s12">
            <input type="text" className="validate" name="username" defaultValue={this.props.currentUsername} />
            <label htmlFor="username" className="active">
              <FormattedMessage
                id='settings.username.label'
                defaultMessage="Username"
              />
            </label>
            <input
              type="submit"
              value={formatMessage({id: 'common.save'})}
              className="btn waves-effect"
            />
          </div>
        </fieldset>
      </form>);
  }
}

UserChangeUsernane.propTypes = {
  changeUsername: PropTypes.func.isRequired,
  currentUsername: PropTypes.string,
  error: PropTypes.string,
  intl: intlShape.isRequired,
  success: PropTypes.string,
};

export default injectIntl(UserChangeUsernane);
