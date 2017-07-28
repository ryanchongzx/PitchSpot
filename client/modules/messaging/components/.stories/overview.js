import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Overview from '../overview.jsx';

storiesOf('messaging.Overview', module)
  .add('default view', () => {
    return (
      <Overview />
    );
  })
