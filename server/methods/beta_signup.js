import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import sanitizeHtml from 'sanitize-html';

export default function () {
  Meteor.methods({
    /**
     * User requested to be added on a waiting list for the BETA
     * @param {String} name
     * @param {String} email
     * @param {String} reason
     */
    'app.beta.signup'(name, username, email, reason) {
      check(name, String);
      check(username, String);
      check(email, String);
      check(reason, Match.Maybe(String));

       // create the object
      const object = {
        name,
        username,
        email,
      };

      if (reason) {
        object.reason = sanitizeHtml(reason);
      }

      return Meteor.betaSignups.insert(object);
    },
    /**
     * Check if the username is already in the DB
     * @param {String} username
     */
    'app.beta.username.unique'(username) {
      check(username, String);
      const match = Meteor.betaSignups.find({ username }).fetch();
      if (match.length > 0) {
        return false;
      } else {
        return true;
      }
    },
    /**
     * Check if the email is already in the DB
     * @param {String} email
     */
    'app.beta.email.unique'(email) {
      check(email, String);
      const match = Meteor.betaSignups.find({ email }).fetch();
      if (match.length > 0) {
        return false;
      } else {
        return true;
      }
    },
  });
}
