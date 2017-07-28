import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Logout from '../logout.jsx';

storiesOf('users.Logout', module)
  .add('default view', () => {
    return (
      <Logout />
    );
  })
