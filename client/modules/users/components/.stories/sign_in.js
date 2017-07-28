import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import SignIn from '../sign_in.jsx';

storiesOf('users.SignIn', module)
  .add('default view', () => {
    return (
      <SignIn />
    );
  })
