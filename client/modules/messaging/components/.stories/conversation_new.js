import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import ConversationNew from '../conversation_new.jsx';

storiesOf('messaging.ConversationNew', module)
  .add('default view', () => {
    return (
      <ConversationNew />
    );
  })
