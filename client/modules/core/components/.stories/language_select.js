import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import LanguageSelect from '../language_select.jsx';

storiesOf('core.LanguageSelect', module)
  .add('default view', () => {
    return (
      <LanguageSelect />
    );
  })
