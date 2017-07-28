import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import NavPublic from '../nav_public.jsx';

storiesOf('core.NavPublic', module)
  .add('default view', () => {
    return (
      <NavPublic />
    );
  })
