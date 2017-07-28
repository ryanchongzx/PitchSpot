import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import Component from '../components/feed.jsx';
import { Counter } from 'meteor/natestrauser:publish-performant-counts';

export const composer = ({ context, feedUser, resetErrors }, onData) => {
  const { LocalState, Meteor, UserSubs } = context();

  let postsLimit = LocalState.get('USER_FEED_POST_LIMIT');
  if (postsLimit === undefined || postsLimit === null) {
    postsLimit = 10;
    LocalState.set('USER_FEED_POST_LIMIT', 10);
  }

  const currentUser = Meteor.user();

  if (feedUser) {
    if (
      UserSubs.subscribe('feed.posts', currentUser._id, { limit: postsLimit, sort: { date: -1 } }).ready() &&
      UserSubs.subscribe('feed.posts.count.all', currentUser._id, true).ready()
    ) {
      const posts = Meteor.posts.find({ posterId: feedUser._id }, { sort: { date: -1 } }).fetch();
      const totalPosts = Counter.get('feed.count.by.author');
      onData(null, { posts, postsLimit, currentUser, feedUser, totalPosts });
    }
  } else {
    if (
      UserSubs.subscribe('feed', { limit: postsLimit, sort: { date: -1 } }).ready() &&
      UserSubs.subscribe('feed.posts.count.all', currentUser._id, false).ready()
    ) {
      const posts = Meteor.posts.find({}, { sort: { date: -1 } }).fetch();
      const totalPosts = Counter.get('feed.count.for.user');
      onData(null, { posts, postsLimit, currentUser, feedUser, totalPosts });
    }
  }
  return resetErrors;
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  likePost: actions.feed.like,
  unlikePost: actions.feed.unlike,
  increaseLimit: actions.feed.increaseLimit,
  clearErrors: actions.feed.clearErrors,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Component);
