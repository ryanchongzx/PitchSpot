import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import SettingsEmail from '../settings_email.jsx';

storiesOf('users.SettingsEmail', module)
  .add('default view', () => {
    return (
      <SettingsEmail />
    );
  })
