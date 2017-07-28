const { describe, it } = global;
import { expect } from 'chai';
import { shallow } from 'enzyme';
import proxyquire from 'proxyquire';
import { spy, stub } from 'sinon';

const Materialize = {
  toast: spy(),
};

// Get the component
const { SettingsPasswordSet } = proxyquire('../settings_password_set', {
  'meteor/poetic:materialize-scss': { Materialize, '@noCallThru': true },
});

describe('users.components.settings_password_set', () => {
  it('should do something');
});
