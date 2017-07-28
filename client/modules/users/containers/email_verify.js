import { useDeps, composeAll, composeWithTracker } from 'mantra-core';

import EmailVerify from '../components/email_verify.jsx';

export const composer = ({ context, location, verify, clearErrors }, onData) => {
  const { LocalState } = context();

  let { token } = location.query;

  // TODO figure out why we get invalid 3D at the beginning of every token
  if (token[0] === '3' && token[1] === 'D') {
    token = token.substr(2);
  }

  verify(token);

  const error = LocalState.get('ACCOUNTS_ERROR_EMAIL_VERIFYCATION');
  const success = LocalState.get('ACCOUNTS_SUCCESS_EMAIL_VERIFYCATION');

  onData(null, { success, error });
  if (!success && !error) {
    return clearErrors;
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  verify: actions.user.verifyEmail,
  clearErrors: actions.user.clearErrors,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(EmailVerify);
