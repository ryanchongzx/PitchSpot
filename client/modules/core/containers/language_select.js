import {useDeps, composeAll, composeWithTracker} from 'mantra-core';

import LanguageSelect from '../components/language_select.jsx';

export const composer = ({context}, onData) => {
  const {i18n, Meteor} = context();

  const languages = i18n.languages;
  const currentLang = localStorage.getItem('LU-locale').split('-')[0];
  let hide = false;
  if (Meteor.userId()) {
    hide = true;
  }

  onData(null, {languages, currentLang, hide});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  changeLang: actions.languages.change,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(LanguageSelect);
