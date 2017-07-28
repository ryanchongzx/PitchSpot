import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

class NotFound extends React.Component {
  render() {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <Helmet
          title={formatMessage({ id: '404', defaultMessage: 'Page not found'})}
          meta={[
            {
              name: 'prerender-status-code',
              content: '404'
            },
          ]}
        />
        <h1>404</h1>
        <p className="flow-text">
          <FormattedMessage
            id="404"
            defaultMessage="Page not found"
          />
        </p>
      </div>
    );
  }
}

NotFound.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(NotFound);
