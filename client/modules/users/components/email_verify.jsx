import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import Error from '../../core/components/error.jsx';

class EmailVerify extends React.Component {
  render() {
    let message;
    let { success, error } = this.props;
    const { formatMessage } = this.props.intl;

    // TODO improve the look
    if (!success && !error) {
      message = (<p className="flow-text">
        <FormattedMessage
        id="email.verifying"
        defaultMessage="Veryfing your e-mail. This will take just a moment..."
      />
      </p>);
    }

    if (success) {
      // TODO add link to settings/dashboard
      message = (<p className="flow-text">
        <FormattedMessage
          id="email.verified"
          defaultMessage="Your e-mail has been verified!"
        />
      </p>);
    } else if (!success && error) {
      message = <Error error={error} />;
    }

    return (<div>
      <Helmet
        title={formatMessage({ id: 'email.verification', defaultMessage: 'E-mail verification'})}
      />
      {message}
    </div>);
  }
}

EmailVerify.propTypes = {
  error: PropTypes.string,
  intl: intlShape.isRequired,
  success: PropTypes.string,
};

export default injectIntl(EmailVerify);
