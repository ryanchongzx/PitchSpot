import { useDeps, composeAll, composeWithTracker } from 'mantra-core';

import UserConversationOverview from '../components/overview.jsx';

export const composer = ({ context }, onData) => {
  const { Meteor, MessagesSubs } = context();
  if (MessagesSubs.subscribe('pm.conversations').ready()) {
    const conversations = Meteor.conversations.find().fetch();

    onData(null, { conversations });
  }
};

export const depsMapper = (context) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(UserConversationOverview);
