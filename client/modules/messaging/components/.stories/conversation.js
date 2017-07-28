import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Conversation from '../conversation.jsx';

storiesOf('messaging.Conversation', module)
  .add('default view', () => {
    return (
      <Conversation />
    );
  })
