import { useDeps, composeAll, composeWithTracker } from 'mantra-core';
import { Counter } from 'meteor/natestrauser:publish-performant-counts';

import UserList from '../components/list.jsx';

export const composer = ({ context, location }, onData) => {
  const { Meteor, UserSubs } = context();
  let page = 1;
  if (typeof location.query.page !== 'undefined') {
    page = Number(location.query.page);
  }
  const limit = 10;

  UserSubs.subscribe('users.list', page, limit);
  UserSubs.subscribe('users.count.all');

  if (UserSubs.ready()) {
    const skip = (page - 1) * limit;
    // This will get 10 users without the current user
    const users = Meteor.users.find(
      { _id: { $nin: [ Meteor.userId() ] } },
      { fields: { username: 1, createdAt: 1 },
        limit,
        skip,
      }).fetch();

    const totalUsers = Counter.get('countAllUsers') - 1; // -1 for current user

    onData(null, { users, totalUsers, page, limit });
  }
};

export const depsMapper = context => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(UserList);
