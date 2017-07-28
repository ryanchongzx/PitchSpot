import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Error from '../error.jsx';

storiesOf('core.Error', module)
  .add('default view', () => {
    return (
      <Error />
    );
  })
