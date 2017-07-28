import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import EmailVerify from '../email_verify.jsx';

storiesOf('users.EmailVerify', module)
  .add('default view', () => {
    return (
      <EmailVerify />
    );
  })
