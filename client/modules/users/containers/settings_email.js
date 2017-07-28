import { useDeps, composeAll, composeWithTracker } from 'mantra-core';

import SettingsEmail from '../components/settings_email.jsx';

export const composer = ({ context, clearErrors }, onData) => {
  const { Meteor, LocalState } = context();
  const error = LocalState.get('ACCOUNTS_ERROR_EMAIL');
  const success = LocalState.get('ACCOUNTS_SUCCESS_EMAIL');

  if (Meteor.user()) {
    const emails = Meteor.user().emails;
    onData(null, { emails, error, success });
    return clearErrors;
  }
};

export const depsMapper = (context, actions) => ({
  verify: actions.settings.emailVerify,
  addEmail: actions.settings.emailAdd,
  removeEmail: actions.settings.emailRemove,
  context: () => context,
  clearErrors: actions.settings.clearErrors,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SettingsEmail);
