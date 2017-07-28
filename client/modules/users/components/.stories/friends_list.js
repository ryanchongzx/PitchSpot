import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import FriendsList from '../friends_list.jsx';

storiesOf('users.FriendsList', module)
  .add('default view', () => {
    return (
      <FriendsList />
    );
  })
