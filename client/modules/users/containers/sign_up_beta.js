import { useDeps, composeAll, composeWithTracker } from 'mantra-core';

import SignUpBeta from '../components/sign_up_beta.jsx';

export const composer = ({ context, success, error, clearErrors }, onData) => {
  // const {} = context();

  onData(null, { success, error });
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  clearErrors: actions.user.clearErrors,
  betaSignup: actions.users.betaSignUp,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SignUpBeta);
