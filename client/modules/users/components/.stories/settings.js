import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Settings from '../settings.jsx';

storiesOf('users.Settings', module)
  .add('default view', () => {
    return (
      <Settings />
    );
  })
