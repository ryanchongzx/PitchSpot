import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import SettingsBio from '../settings_bio.jsx';

storiesOf('users.SettingsBio', module)
  .add('default view', () => {
    return (
      <SettingsBio />
    );
  })
