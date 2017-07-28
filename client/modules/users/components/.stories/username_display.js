import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import UsernameDisplay from '../username_display.jsx';

storiesOf('users.UsernameDisplay', module)
  .add('default view', () => {
    return (
      <UsernameDisplay />
    );
  })
