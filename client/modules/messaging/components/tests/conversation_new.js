const { describe, it } = global;
import { expect } from 'chai';
import { shallow } from 'enzyme';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

const Materialize = {
  toast: sinon.spy(),
};

const Conversation = {
};

// Get the component
const { ConversationNew } = proxyquire('../conversation_new', {
  'meteor/poetic:materialize-scss': { Materialize, '@noCallThru': true },
  'meteor/socialize:messaging': { Conversation, '@noCallThru': true },
});

describe('messaging.components.conversation_new', () => {
  it('should do something');
});
