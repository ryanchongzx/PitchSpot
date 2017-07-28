import { useDeps, composeAll, composeWithTracker } from 'mantra-core';

import UserSearch from '../components/user_search.jsx';

export const composer = ({}, onData) => {
  onData(null, {});
};

export const depsMapper = context => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(UserSearch);
