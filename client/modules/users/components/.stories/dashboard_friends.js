import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import DashboardFriends from '../dashboard_friends.jsx';

storiesOf('users.DashboardFriends', module)
  .add('default view', () => {
    return (
      <DashboardFriends />
    );
  })
