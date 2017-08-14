import { useDeps, composeAll, composeWithTracker } from 'mantra-core';

import InitiateChat from '../components/initiate_chat.jsx';

export const composer = ({ context, recipients, clearErrors }, onData) => {
  const { Meteor, LocalState } = context();

  /**
   * TODO move user search sub fully here?
   */
  if (LocalState.get('CONVERSATION_USER_SEARCH')) {
    if (Meteor.subscribe('pm.users.search', LocalState.get('CONVERSATION_USER_SEARCH')).ready()) {
      const userSearchResults = Meteor.users.find({}).fetch();
      onData(null, { userSearchResults, recipients });
    }
  }
};

export const depsMapper = (context) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(InitiateChat);
