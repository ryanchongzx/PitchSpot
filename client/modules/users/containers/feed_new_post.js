import { useDeps, composeAll, composeWithTracker } from 'mantra-core';

import FeedNewPost from '../components/feed_new_post.jsx';

export const composer = ({ context }, onData) => {
  const { LocalState } = context();
  const error = LocalState.get('FEED_ADD_ERROR');
  onData(null, { error });
};

export const depsMapper = (context, actions) => ({
  addPost: actions.feed.add,
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(FeedNewPost);
