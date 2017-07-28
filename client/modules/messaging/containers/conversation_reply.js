import { useDeps, composeAll, composeWithTracker } from 'mantra-core';

import ConversationReply from '../components/conversation_reply.jsx';

export const composer = ({ context, conversationId }, onData) => {
  const { Meteor, MessagesSubs } = context();

  if (conversationId) {
    if (MessagesSubs.subscribe('pm.conversation', conversationId).ready()) {
      const conversation = Meteor.conversations.findOne({ _id: conversationId });

      // confirm that user can view the conversation
      let access = false;

      conversation._participants.forEach((p) => {
        if (p === Meteor.userId()) {
          access = true;
        }
      });

      if (access) {
        onData(null, { conversation });
      } else {
        // console.log("Access denied!")
        // redirect back
        // FlowRouter.go("pmOverview")
      }
    }
  }
};

export const depsMapper = (context) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ConversationReply);
