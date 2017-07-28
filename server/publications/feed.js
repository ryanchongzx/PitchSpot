import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';
import { Counter } from 'meteor/natestrauser:publish-performant-counts';

export default function () {
  const publicationOptionsSchema = new SimpleSchema({
    limit: {
      type: Number,
      optional: true,
    },
    skip: {
      type: Number,
      optional: true,
    },
    sort: {
      type: Object,
      optional: true,
      blackbox: true,
    },
  });

  /**
   * Feed for the current user
   * @function publication feed
   * @param {object} options
   * @returns {pointer}
   */
  Meteor.publishComposite('feed', function (options) {
    options = options || {};

    check(options, publicationOptionsSchema);

    if (!this.userId) {
      return this.ready();
    }

    // only allow the limit, skip and sort options
    options = _.pick(options, 'limit', 'skip', 'sort');

    const friendMap = Meteor.friends.find({ userId: this.userId }, { fields: { friendId: true } }).map((friend) => {
      return friend.friendId;
    });

    friendMap.push(this.userId);

    return {
      find() {
        return Meteor.posts.find(
          { $or: [ { userId: { $in: friendMap } },
          { posterId: { $in: friendMap } } ] },
          options
        );
      },
      children: [
        {
          find(post) {
            return Meteor.comments.find({ linkedObjectId: post._id }, { sort: { date: -1 }, limit: 3 });
          },
          children: [
            {
              find(comment) {
                return Meteor.users.find({ _id: comment.userId }, { fields: { username: true } });
              },
            },
          ],
        },
        {
          find(post) {
            return Meteor.likes.find(
              { linkedObjectId: post._id },
              { fields: { linkedObjectId: true, userId: true, date: true },
              });
          },
        },
        {
          find(post) {
            return Meteor.users.find({ _id: post.posterId }, { fields: { username: true } });
          },
        },
      ],
    };
  });

  /**
   * Post for a particular user
   * @function publication posts
   * @param {string} userId
   * @param {object} options
   * @returns {pointer}
   */
  Meteor.publishComposite('feed.posts', function (userId, options) {
    check(userId, String);

    options = options || {};

    check(options, publicationOptionsSchema);

    if (!userId) {
      return this.ready();
    }

    // only allow the limit, skip and sort options
    options = _.pick(options, 'limit', 'skip', 'sort');

    return {
      find: () => {
        return Meteor.posts.find({ $or: [ { userId }, { posterId: userId } ] }, options);
      },
      children: [
        {
          find: (post) => {
            return Meteor.comments.find({ linkedObjectId: post._id }, { sort: { date: -1 }, limit: 3 });
          },
          children: [
            {
              find: (comment) => {
                return Meteor.users.find({ _id: comment.userId }, { fields: { username: true } });
              },
            },
          ],
        },
        {
          find: (post) => {
            return Meteor.likes.find(
              { linkedObjectId: post._id, userId: this.userId },
              { fields: { linkedObjectId: true, userId: true, date: true },
              });
          },
        },
        {
          find: (post) => {
            return Meteor.users.find({ _id: post.posterId }, { fields: { username: true } });
          },
        },
      ],
    };
  });

  /**
   * Return total number of posts in a given user feed
   * @param userId {String} The owner of the stream
   * @param author {Bool} Are we looking only for the posts authored by the user?
   * @returns {Number}
   */
  Meteor.publish('feed.posts.count.all', function (userId, author) {
    check(userId, String);
    check(author, Boolean);

    if (this.userId === userId && !author) {
      const friendMap = Meteor.friends.find({ userId: this.userId }, { fields: { friendId: true } }).map((friend) => {
        return friend.friendId;
      });
      friendMap.push(this.userId);

      return new Counter('feed.count.for.user', Meteor.posts.find(
        { $or: [ { userId: { $in: friendMap } },
          { posterId: { $in: friendMap } } ] }
        )
      );
    } else {
      return new Counter('feed.count.by.author', Meteor.posts.find({ $or: [ { userId }, { posterId: userId } ] }));
    }
  });
}
