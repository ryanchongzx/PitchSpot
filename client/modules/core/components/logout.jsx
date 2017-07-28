import { Meteor } from 'meteor/meteor';
import React from 'react';
import { FormattedMessage } from 'react-intl';

class Logout extends React.Component {
  constructor() {
    super();
    Meteor.logout();
  }

  render() {
    return (
      <div className="flow-text center">
        <FormattedMessage id='goodbye' defaultMessage='Thank you! See you again!' />
      </div>
    );
  }
}

export default Logout;
