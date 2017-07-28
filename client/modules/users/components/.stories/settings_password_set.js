import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import SettingsPasswordSet from '../settings_password_set.jsx';

storiesOf('users.SettingsPasswordSet', module)
  .add('default view', () => {
    return (
      <SettingsPasswordSet />
    );
  })
