import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export default function () {
  Meteor.methods({
    'feed.add'(text) {
      check(text, String);

      Meteor.user(this.userId).feed().addPost(text);
    },
    'feed.post.like'(postId) {
      check(postId, String);

      const post = Meteor.posts.find({ _id: postId }).fetch()[0];

      post.like();
    },
    'feed.post.unlike'(postId) {
      check(postId, String);

      const post = Meteor.posts.find({ _id: postId }).fetch()[0];

      post.unlike();
    },/*
    'feed.post.comment'(postId, text) {
      check(postId, String);
      check(text, String);
    },*/
  });
}
