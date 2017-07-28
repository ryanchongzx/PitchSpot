import { useDeps, composeAll, composeWithTracker } from 'mantra-core';

import FriendRequests from '../components/friend_requests.jsx';

export const composer = ({ context }, onData) => {
  const { Meteor } = context();

  if (Meteor.subscribe('friends.requests').ready()) {
    const requests = Meteor.requests.find({ userId: Meteor.userId() }).fetch();

    onData(null, { requests });
  }
};

export const depsMapper = context => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(FriendRequests);
