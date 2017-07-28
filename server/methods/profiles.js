import { Meteor } from 'meteor/meteor';
import sanitizeHtml from 'sanitize-html';
import { check } from 'meteor/check';

export default function () {
  Meteor.methods({
    /**
     * Updates user's biography
     * @function call profile.biography.update
     * @param {string} bio
     * @returns {boolean}
     */
    'profile.biography.update'(bio) {
      check(bio, String);
      bio = sanitizeHtml(bio);
      const result = Meteor.profiles.update({ userId: Meteor.userId() }, { $set: { biography: bio } });
      if (result) {
        return true;
      } else {
        return false;
      }
    },
    /**
     * Updates user's name
     * @function call profile.name.update
     * @param {object} names object containing the given and family name {given: "firstname", family: "surname"}
     * @returns {boolean}
     */
    'profile.name.update'(names) {
      check(names, {
        given: String,
        family: String,
      });

      const result = Meteor.profiles.update({ userId: Meteor.userId() }, {
        $set: {
          givenName: sanitizeHtml(names.given),
          familyName: sanitizeHtml(names.family),
        },
      });

      if (result) {
        return true;
      } else {
        return false;
      }
    },
    /**
     * Set a new avatar for the user
     * @param {string} url
     */
    'profile.avatar.set'(url) {
      check(url, String);

      return Meteor.profiles.update({ userId: Meteor.userId() }, {
        $set: { avatar: url }
      });
    }
  });
}
