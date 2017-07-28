const { describe, it } = global;
import { expect } from 'chai';
import { shallow } from 'enzyme';
import proxyquire from 'proxyquire';
import { spy, stub } from 'sinon';

const Materialize = {
  toast: spy(),
};

// Get the component
const { SettingsEmail } = proxyquire('../settings_email', {
  'meteor/poetic:materialize-scss': { Materialize, '@noCallThru': true },
});

describe('users.components.settings_email', () => {
  it('should do something');
});
