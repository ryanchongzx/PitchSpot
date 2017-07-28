import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import UserSearch from '../user_search.jsx';

storiesOf('users.UserSearch', module)
  .add('default view', () => {
    return (
      <UserSearch />
    );
  })
