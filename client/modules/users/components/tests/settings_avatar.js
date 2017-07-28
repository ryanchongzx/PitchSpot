const {describe, it} = global;
import {expect} from 'chai';
import {shallow} from 'enzyme';
import proxyquire from 'proxyquire';
import { spy, stub } from 'sinon';

const Materialize = {
  toast: spy(),
};

const filepicker = {
  setKey: spy(),
  pick: spy(),
}

// Get the component
const { SettingsAvatar } = proxyquire('../settings_avatar', {
  'meteor/poetic:materialize-scss': { Materialize, '@noCallThru': true },
  'filepicker-js': { filepicker, '@noCallThru': true },
});

describe('users.components.settings_avatar', () => {
  it('should do something');
});
