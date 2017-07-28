import { useDeps, composeAll, composeWithTracker } from 'mantra-core';

import SettingsBio from '../components/settings_bio.jsx';

export const composer = ({ context, clearErrors }, onData) => {
  const { Meteor, LocalState } = context();
  // TODO: Limit to getting only the biography data
  if (Meteor.subscribe('profile.for', Meteor.userId()).ready()) {
    const profile = Meteor.profiles.findOne({ userId: Meteor.userId() });
    const error = LocalState.get('ACCOUNTS_ERROR_BIO_UPDATE');
    const success = LocalState.get('ACCOUNTS_SUCCESS_BIO_UPDATE');
    onData(null, { profile, error, success });
    return clearErrors;
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  bioUpdate: actions.settings.bioUpdate,
  clearErrors: actions.settings.clearErrors,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SettingsBio);
