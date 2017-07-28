import { useDeps, composeAll, composeWithTracker } from 'mantra-core';
import { browserHistory } from 'react-router';

import ConversationMessages from '../components/conversation_messages.jsx';

export const composer = ({ context, params, conversationId, clearErrors }, onData) => {
  const { Meteor, LocalState, MessagesSubs } = context();

  let msgLimit = LocalState.get('MESSAGING_LIMIT');

  if (params && params.conversationId) {
    conversationId = params.conversationId;
  }

  if (!msgLimit) {
    msgLimit = 10;
    LocalState.set('MESSAGING_LIMIT', 10);
  }

  if (conversationId) {
    MessagesSubs.subscribe('pm.messages.for', conversationId, { limit: msgLimit, skip: 0 });
    MessagesSubs.subscribe('pm.conversation', conversationId);

    if (MessagesSubs.ready()) {
      const messages = Meteor.messages.find({ conversationId }, { sort: { date: 1 } }).fetch();
      const conversation = Meteor.conversations.findOne({ _id: conversationId });

      // confirm that user can view the conversation
      let access = false;

      conversation._participants.forEach((p) => {
        if (p === Meteor.userId()) {
          access = true;
        }
      });

      if (access) {
        onData(null, { messages });
      } else {
        // unsubscribe
        MessagesSubs.stop();
        // redirect back
        browserHistory.push('/pm');
      }
    }
  } else {
    browserHistory.push('/pm');
  }

  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  clearErrors: actions.messages.clearErrors,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ConversationMessages);
