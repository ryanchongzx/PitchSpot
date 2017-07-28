import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import ConversationMessages from '../conversation_messages.jsx';

storiesOf('messaging.ConversationMessages', module)
  .add('default view', () => {
    return (
      <ConversationMessages />
    );
  })
