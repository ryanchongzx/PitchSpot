/* import {useDeps, composeAll, composeWithTracker} from 'mantra-core';

import SettingsAvatar from '../components/settings_avatar.jsx';

export const composer = ({context, clearErrors}, onData) => {
  const {Meteor, ProfilesSubs, LocalState} = context();

  const success = LocalState.get('ACCOUNTS_SUCCESS_AVATAR_UPDATE');
  const error = LocalState.get('ACCOUNTS_ERROR_AVATAR_UPDATE');

  ProfilesSubs.subscribe('profile');

  if (ProfilesSubs.ready()) {
    const avatar = Meteor.profiles.findOne({ userId: Meteor.userId() }).avatar;
    const userLang = Meteor.user().profile.language.split('-')[0];
    const filestackKey = Meteor.settings.public.filestack.key;
    onData(null, {success, error, avatar, filestackKey, userLang});
  }

  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  saveAvatar: actions.settings.setAvatar,
  clearErrors: actions.settings.clearErrors,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SettingsAvatar);*/
