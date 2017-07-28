import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import SettingsName from '../settings_name.jsx';

storiesOf('users.SettingsName', module)
  .add('default view', () => {
    return (
      <SettingsName />
    );
  })
