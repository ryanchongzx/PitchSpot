import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import SettingsAvatar from '../settings_avatar.jsx';

storiesOf('users.SettingsAvatar', module)
  .add('default view', () => {
    return (
      <SettingsAvatar />
    );
  })
