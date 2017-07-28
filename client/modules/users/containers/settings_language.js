import {useDeps, composeAll, composeWithTracker} from 'mantra-core';

import SettingsLanguage from '../components/settings_language.jsx';

export const composer = ({context, clearErrors}, onData) => {
  const {i18n, LocalState, Meteor} = context();

  const error = LocalState.get('ACCOUNTS_ERROR_LANGUAGE_UPDATE');
  const success = LocalState.get('ACCOUNTS_SUCCESS_LANGUAGE_UPDATE');

  const languages = i18n.languages;
  const user = Meteor.user();
  if (user) {
    const currentLang = user.profile.language;

    onData(null, {languages, currentLang, success, error});
    return clearErrors;
  }

};

export const depsMapper = (context, actions) => ({
  context: () => context,
  setLang: actions.settings.setLang,
  clearErrors: actions.settings.clearErrors,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SettingsLanguage);
