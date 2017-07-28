import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import SettingsPassword from '../settings_password.jsx';

storiesOf('users.SettingsPassword', module)
  .add('default view', () => {
    return (
      <SettingsPassword />
    );
  })
