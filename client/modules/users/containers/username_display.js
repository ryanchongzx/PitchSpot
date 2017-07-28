import {useDeps, composeAll, composeWithTracker} from 'mantra-core';

import UsernameDisplay from '../components/username_display.jsx';

export const composer = ({context, user, avatar}, onData) => {
  const {Meteor, UserSubs} = context();
  // make sure that we have a boolean value for avatar if nothing is passed in
  if (!avatar) {
    avatar = false;
  }

  UserSubs.subscribe('profile.card', user, avatar);

  if (UserSubs.ready()) {
    user = Meteor.users.findOne({$or: [ { _id: user }, { username: user } ] });
    let profile = null;
    if (avatar) {
      profile = Meteor.profiles.findOne({userId: user._id});
    }

    onData(null, {user, profile});
  }
};

export const depsMapper = (context) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(UsernameDisplay);
