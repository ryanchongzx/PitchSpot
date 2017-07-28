import { useDeps, composeAll, composeWithTracker } from 'mantra-core';

import NavUser from '../components/nav_user.jsx';

export const composer = ({ context }, onData) => {
  // const { Meteor } = context();
  // TODO subscribe to profile and get the user avatar url
  // const user = Meteor.user();
  onData(null, {});
};

export const depsMapper = (context) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(NavUser);
