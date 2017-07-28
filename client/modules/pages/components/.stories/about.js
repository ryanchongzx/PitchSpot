import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import About from '../about.jsx';

storiesOf('pages.About', module)
  .add('default view', () => {
    return (
      <About />
    );
  })
