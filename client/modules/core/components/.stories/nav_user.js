import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import NavUser from '../nav_user.jsx';

storiesOf('core.NavUser', module)
  .add('default view', () => {
    return (
      <NavUser />
    );
  })
