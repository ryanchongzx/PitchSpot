import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import FriendRequests from '../friend_requests.jsx';

storiesOf('users.FriendRequests', module)
  .add('default view', () => {
    return (
      <FriendRequests />
    );
  })
