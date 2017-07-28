import { useDeps, composeAll, composeWithTracker } from 'mantra-core';

import UserProfile from '../components/profile.jsx';

export const composer = ({ context, params, clearErrors }, onData) => {
  const { Meteor } = context();

  let user = params.username;

  if (!user) {
    user = Meteor.userId();
  }

  if (Meteor.subscribe('profile.for', user).ready()) {
    const profile = Meteor.profiles.findOne({ $or: [ { userId: user }, { username: user } ] });

    if (profile && Meteor.userId() !== profile.userId) {
      if (
        Meteor.subscribe('user.get', profile.userId).ready() &&
        Meteor.subscribe('friends').ready() &&
        Meteor.subscribe('friends.requests').ready() &&
        Meteor.subscribe('friends.requests.outgoing').ready()
      ) {
        const profileUser = Meteor.users.findOne({ _id: profile.userId });
        const currentUser = Meteor.users.findOne({ _id: Meteor.userId() });
        const currentFriends = Meteor.friends.find().fetch();
        const currentRequests = Meteor.requests.find().fetch();

        onData(null, { profile, profileUser, currentUser, currentFriends, currentRequests });
      }
    } else if (profile) {
      // The user is visiting their own profile
      const profileUser = Meteor.users.findOne({ _id: profile.userId });
      const currentUser = profileUser;
      onData(null, { profile, profileUser, currentUser });
    } else {
      onData(null, {});
    }
  }
};

export const depsMapper = context => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(UserProfile);
