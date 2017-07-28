import {useDeps, composeAll, composeWithTracker} from 'mantra-core';

import FriendsList from '../components/friends_list.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, UserSubs} = context();

  if ( UserSubs.subscribe('friends').ready() ) {
    let fl = Meteor.friends.find({friendId: { $ne: Meteor.userId() }, userId: Meteor.userId()}).fetch();
    let friends = [];
    fl.forEach((friend) => {
      friends.push(Meteor.users.findOne({_id: friend.friendId}));
    });
    onData(null, {friends});
  }
};

export const depsMapper = (context) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(FriendsList);
