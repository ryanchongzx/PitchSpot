import { useDeps, composeAll, composeWithTracker } from 'mantra-core';

import Navigation from '../components/navigation.jsx';

export const composer = ({ context }, onData) => {
  const { Meteor } = context();
  const user = Meteor.user();
  onData(null, { user });
};

export const depsMapper = (context) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Navigation);
