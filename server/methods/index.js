import profiles from './profiles';
import feed from './feed';
import betaSignup from './beta_signup';
import { messagingMethods } from 'meteor/storyteller:messaging-server';
import { accountsMethods } from 'meteor/storyteller:accounts-server';

export default function () {
  accountsMethods();
  profiles();
  messagingMethods();
  feed();
  betaSignup();
}
