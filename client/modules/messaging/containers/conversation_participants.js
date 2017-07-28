import { useDeps, composeAll, composeWithTracker } from 'mantra-core';

import ConversationParticipants from '../components/conversation_participants.jsx';

export const composer = ({ context, conversationId }, onData) => {
  const { Meteor, MessagesSubs } = context();
  if (MessagesSubs.subscribe('pm.conversation', conversationId).ready()) {
    const conversation = Meteor.conversations.findOne({ _id: conversationId });

    onData(null, { conversation });
  }
};

export const depsMapper = (context) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ConversationParticipants);
