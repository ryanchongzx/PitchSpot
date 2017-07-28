const { describe, it } = global;
import { expect } from 'chai';
import { shallow } from 'enzyme';
import proxyquire from 'proxyquire';
import { spy, stub } from 'sinon';

const Materialize = {
  toast: spy(),
};

// Get the component
const { FriendRequests } = proxyquire('../friend_requests', {
  'meteor/poetic:materialize-scss': { Materialize, '@noCallThru': true },
});

describe('users.components.friend_requests', () => {
  it('should do something');
});
