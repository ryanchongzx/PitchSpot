import { useDeps, composeAll, composeWithTracker } from 'mantra-core';

import SettingsUsername from '../components/settings_username.jsx';

export const composer = ({ context, clearErrors }, onData) => {
  const { Meteor, LocalState } = context();
  if (Meteor.user()) {
    const currentUsername = Meteor.user().username;
    const error = LocalState.get('ACCOUNTS_ERROR_USERNAME_UPDATE');
    const success = LocalState.get('ACCOUNTS_SUCCESS_USERNAME_UPDATE');
    onData(null, { currentUsername, error, success });
    return clearErrors;
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  changeUsername: actions.settings.usernameUpdate,
  clearErrors: actions.settings.clearErrors,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SettingsUsername);
