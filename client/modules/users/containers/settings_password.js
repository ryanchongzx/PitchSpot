import { useDeps, composeAll, composeWithTracker } from 'mantra-core';

import SettingsPassword from '../components/settings_password.jsx';

export const composer = ({ context, clearErrors }, onData) => {
  const { LocalState } = context();
  const error = LocalState.get('ACCOUNTS_ERROR_PASSWORD_UPDATE');
  const success = LocalState.get('ACCOUNTS_SUCCESS_PASSWORD_UPDATE');
  onData(null, { error, success });

  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  changePassword: actions.user.passwordUpdate,
  clearErrors: actions.user.clearErrors,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SettingsPassword);
