import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import SignUpBeta from '../sign_up_beta.jsx';

storiesOf('users.SignUpBeta', module)
  .add('default view', () => {
    return (
      <SignUpBeta />
    );
  })
