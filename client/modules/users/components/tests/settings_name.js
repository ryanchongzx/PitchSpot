const { describe, it } = global;
import { expect } from 'chai';
import { shallow } from 'enzyme';
import proxyquire from 'proxyquire';
import { spy, stub } from 'sinon';

const Materialize = {
  toast: spy(),
  updateTextFields: stub(),
};

// Get the component
const { SettingsName } = proxyquire('../settings_name', {
  'meteor/poetic:materialize-scss': { Materialize, '@noCallThru': true },
});

describe('users.components.settings_name', () => {
  it('should do something');
});
