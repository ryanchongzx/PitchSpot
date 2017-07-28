import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Counter } from 'meteor/natestrauser:publish-performant-counts';

// total user count
const totalUsers = new Counter('countAllUsers', Meteor.users.find({}));

export default function () {
  /**
   * Looks up user details by username or id.
   * @param {string} userIdOrUsername User id or username
   * @returns {pointer} MongoDB pointer to the user
   */
  Meteor.publish('user.get', (userIdOrUsername) => {
    check(userIdOrUsername, String);
    return Meteor.users.find({
      $or: [ { _id: userIdOrUsername }, { username: userIdOrUsername } ] },
      {
        fields: { username: 1, createdAt: 1, roles: 1 },
      });
  });

  /**
   * Fetches a basic list of users for a page listing.
   * @param {Number} page
   * @param {Number} limit Limit of users shown per page
   * @returns {pointer} MongoDB pointer to the user
   */
  Meteor.publish('users.list', (page, limit) => {
    check(page, Number);
    check(limit, Number);

    const skip = (page - 1) * limit;

    const results = Meteor.users.find({}, { fields: { username: 1, createdAt: 1 }, limit, skip });

    return results;
  });

  /**
   * Returns total number of users in the DB
   */
  Meteor.publish('users.count.all', () => {
    return totalUsers;
  });
}
