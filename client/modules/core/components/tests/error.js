const { describe, it } = global;
import { expect } from 'chai';
import { shallow } from 'enzyme';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

const Materialize = {
  toast: sinon.spy(),
};

// Get the component
const { Error } = proxyquire('../error', {
  'meteor/poetic:materialize-scss': { Materialize, '@noCallThru': true },
});

describe('core.components.error', () => {
  it('should do something');
});
