import { useDeps, composeAll, composeWithTracker } from 'mantra-core';
import { browserHistory } from 'react-router';

import UserConversation from '../components/conversation.jsx';

export const composer = ({ context, params }, onData) => {
  const { Meteor, MessagesSubs, LocalState } = context();

  if (params.conversationId) {
    const conversationId = params.conversationId;
    MessagesSubs.subscribe('pm.conversation', conversationId);
    if (MessagesSubs.ready()) {
      const conversation = Meteor.conversations.findOne({ _id: conversationId });

      // confirm that user can view the conversation
      let access = false;

      conversation._participants.forEach((p) => {
        if (p === Meteor.userId()) {
          access = true;
        }
      });

      if (access) {
        let totalMessages = 1;
        Meteor.call('pm.conversation.count', conversationId, (error, result) => {
          if (error) {
            // console.log(error);
          }
          if (result) {
            totalMessages = result;
          }
        });

        let msgLimit = LocalState.get('MESSAGING_LIMIT');
        if (!msgLimit) {
          msgLimit = 10;
          LocalState.set('MESSAGING_LIMIT', 10);
        }

        onData(null, { conversation, totalMessages, msgLimit, conversationId });
      } else {
        // unauthorized access
        browserHistory.push('/pm');
      }
    }
  } else {
    browserHistory.push('/pm');
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  increaseLimit: actions.messages.increaseLimit,
  resetLimit: actions.messages.resetLimit,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(UserConversation);
