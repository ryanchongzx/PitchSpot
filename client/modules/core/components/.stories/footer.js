import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Footer from '../footer.jsx';

storiesOf('core.Footer', module)
  .add('default view', () => {
    return (
      <Footer />
    );
  })
