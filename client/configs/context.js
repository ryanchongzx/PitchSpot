import * as Collections from '/lib/collections';
import { Meteor } from 'meteor/meteor';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tracker } from 'meteor/tracker';
import { SubsManager } from 'meteor/meteorhacks:subs-manager';

// i18n
import i18n from '../../intl/settings.js';

const UserSubs = new SubsManager();
const ProfileSubs = new SubsManager();
const MessagesSubs = new SubsManager();

export default function () {
  return {
    Meteor,
    Collections,
    LocalState: new ReactiveDict(),
    Tracker,
    i18n,
    /* SUBS */
    UserSubs,
    ProfileSubs,
    MessagesSubs,
  };
}
