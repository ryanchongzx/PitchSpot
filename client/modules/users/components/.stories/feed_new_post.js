import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import FeedNewPost from '../feed_new_post.jsx';

storiesOf('users.FeedNewPost', module)
  .add('default view', () => {
    return (
      <FeedNewPost />
    );
  })
