import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import List from '../list.jsx';

storiesOf('users.List', module)
  .add('default view', () => {
    return (
      <List />
    );
  })
