import { useDeps, composeAll, composeWithTracker } from 'mantra-core';

import SignIn from '../components/sign_in.jsx';

export const composer = ({ context, clearErrors }, onData) => {
  const { LocalState } = context();
  const error = LocalState.get('LOGIN_ERROR');
  onData(null, { error });

  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  loginUser: actions.user.login,
  clearErrors: actions.user.clearErrors,
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SignIn);
