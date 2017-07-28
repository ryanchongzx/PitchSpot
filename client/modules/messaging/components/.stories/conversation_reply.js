import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import ConversationReply from '../conversation_reply.jsx';

storiesOf('messaging.ConversationReply', module)
  .add('default view', () => {
    return (
      <ConversationReply />
    );
  })
