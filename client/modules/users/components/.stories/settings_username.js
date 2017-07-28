import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import SettingsUsername from '../settings_username.jsx';

storiesOf('users.SettingsUsername', module)
  .add('default view', () => {
    return (
      <SettingsUsername />
    );
  })
