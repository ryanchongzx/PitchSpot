import { useDeps, composeAll, composeWithTracker } from 'mantra-core';

import SettingsPasswordSet from '../components/settings_password_set.jsx';

export const composer = ({ context, clearErrors, location }, onData) => {
  // const {} = context();
  const { token } = location.query;
  onData(null, { token });
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  resetPassword: actions.user.resetPassword,
  clearErrors: actions.user.clearErrors,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SettingsPasswordSet);
