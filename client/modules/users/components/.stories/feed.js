import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Feed from '../feed.jsx';

storiesOf('users.Feed', module)
  .add('default view', () => {
    return (
      <Feed />
    );
  })
