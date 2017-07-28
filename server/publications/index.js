import friendships from './friendships.js';
import feed from './feed.js';
import profiles from './profiles.js';
import user from './user.js';
import { messagingPublications } from 'meteor/storyteller:messaging-server';

export default function () {
  friendships();
  feed();
  profiles();
  user();
  messagingPublications();
}
