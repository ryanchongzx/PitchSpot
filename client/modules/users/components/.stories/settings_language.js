import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import SettingsLanguage from '../settings_language.jsx';

storiesOf('users.SettingsLanguage', module)
  .add('default view', () => {
    return (
      <SettingsLanguage />
    );
  })
