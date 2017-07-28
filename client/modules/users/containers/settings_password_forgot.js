import { useDeps, composeAll, composeWithTracker } from 'mantra-core';

import SettingsPasswordForgot from '../components/settings_password_forgot.jsx';

export const composer = ({ context, clearErrors }, onData) => {
  const { LocalState } = context();
  const error = LocalState.get('ACCOUNTS_ERROR_RESET_PASSWORD');
  const success = LocalState.get('ACCOUNTS_SUCCESS_RESET_PASSWORD');

  onData(null, { error, success });
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  resetPasswordEmail: actions.user.resetPasswordEmail,
  clearErrors: actions.user.clearErrors,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SettingsPasswordForgot);
