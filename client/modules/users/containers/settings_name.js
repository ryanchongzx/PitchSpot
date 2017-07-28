import { useDeps, composeAll, composeWithTracker } from 'mantra-core';

import SettingsName from '../components/settings_name.jsx';

export const composer = ({ context, clearErrors }, onData) => {
  const { Meteor, LocalState } = context();
  if (Meteor.subscribe('profile.for', Meteor.userId()).ready()) {
    const profile = Meteor.profiles.findOne({ userId: Meteor.userId() });
    const error = LocalState.get('ACCOUNTS_ERROR_NAME_UPDATE');
    const success = LocalState.get('ACCOUNTS_SUCCESS_NAME_UPDATE');
    onData(null, { profile, error, success });
    return clearErrors;
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  nameUpdate: actions.settings.nameUpdate,
  clearErrors: actions.settings.clearErrors,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SettingsName);
