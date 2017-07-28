import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import SettingsPasswordForgot from '../settings_password_forgot.jsx';

storiesOf('users.SettingsPasswordForgot', module)
  .add('default view', () => {
    return (
      <SettingsPasswordForgot />
    );
  })
