import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import SignUp from '../sign_up.jsx';

storiesOf('users.SignUp', module)
  .add('default view', () => {
    return (
      <SignUp />
    );
  })
