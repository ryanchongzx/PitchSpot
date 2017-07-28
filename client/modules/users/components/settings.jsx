import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import UserChangeUsernane from '../containers/settings_username.js';
import UserChangeName from '../containers/settings_name.js';
import UserChangeBio from '../containers/settings_bio.js';
import UserEmail from '../containers/settings_email.js';
import UserChangePassword from '../containers/settings_password.js';
import SettingsLanguage from '../containers/settings_language.js';
// import SettingsAvatar from '../containers/settings_avatar.js';

/**
 * @class component UserSettings
 * @classdesc Shows full settings page.
 */
class UserSettings extends React.Component {
  /**
   * Renders the components for full settings page.
   * @access private
   */
  render() {
    const { formatMessage } = this.props.intl;
    return (<div className="container">
      <Helmet
        title={formatMessage({id: 'common.settings', defaultMessage: 'Settings'})}
      />
      <div className="row">
        <h1>
          <FormattedMessage
            id="common.settings"
            defaultMessage="Settings"
          />
        </h1>
        <div className="col s12">
          <UserChangeUsernane />
          <UserChangeName />
          <UserEmail />
          <UserChangeBio />
          <SettingsLanguage />
          <UserChangePassword />
        </div>
      </div>
    </div>);
  }
}

UserSettings.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(UserSettings);
