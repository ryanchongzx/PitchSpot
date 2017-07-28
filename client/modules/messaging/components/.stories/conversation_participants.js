import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import ConversationParticipants from '../conversation_participants.jsx';

storiesOf('messaging.ConversationParticipants', module)
  .add('default view', () => {
    return (
      <ConversationParticipants />
    );
  })
