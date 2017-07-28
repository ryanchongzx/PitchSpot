const { describe, it } = global;
import { expect } from 'chai';
import proxyquire from 'proxyquire';
import { spy, stub } from 'sinon';

const Accounts = stub();

// Get the component
const { actions } = proxyquire('../user', {
  'meteor/accounts-base': { Accounts, '@noCallThru': true },
});

describe('users.actions.user', () => {
  it('should do something');
});
