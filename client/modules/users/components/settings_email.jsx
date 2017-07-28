import React from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import Error from '../../core/components/error.jsx';

/**
 * @class component UserEmail
 * @classdesc Shows e-mails associated with the account and allows to add more or delete them.
 */
class UserEmail extends React.Component {
  constructor(props) {
    super(props);

    this.verification.bind(this);
  }
  /**
   * Prepares the list of e-mails for display
   * @access private
   * @returns {jsx}
   */
  getEmails(emails) {
    if (Meteor.user() !== undefined) {
      return emails.map((email) => {
        let verified = null;
        if (email.verified) {
          verified = (<i className="material-icons green-text">check</i>);
        } else {
          verified = (<div className="chip red darken-1">
            <span className="link" onClick={this.verification.bind(this, email.address)}>
              <FormattedMessage
               id="settings.email.verified.not"
               defaultMessage="not verified"
              />
            </span>
          </div>);
        }
        return (<li key={email.address} className="collection-item">
          {email.address} {verified}
          <div className="secondary-content">
            <span className="link" onClick={this.removeEmail.bind(this, email.address)}>
              <i id={email.address} className="material-icons">delete</i>
            </span>
          </div>
        </li>);
      });
    } else {
      // TODO add Loader here
      return (<div><FormattedMessage
               id="common.loading"
               defaultMessage="Loading..."
              /></div>);
    }
  }

  /**
   * Removes the particular e-mail that was clicked
   * @access private
   */
  removeEmail(email) {
    const { removeEmail } = this.props;
    removeEmail(email);
  }

  /**
   * Adds the inputed e-mail to the list and creates a Materialize toast with the result
   * @access private
   * @param {event} e Submit event from form
   */
  addEmail(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const { addEmail, verify, emails } = this.props;

    let exists = false;
    for (let i = 0; i < emails.length; i++) {
      if (emails[i].address === email) {
        exists = true;
        break;
      }
    }

    if (!exists) {
      addEmail(email);
      verify(email);
    }

    e.target.reset();
  }

  /**
   * @access private
   */
  verification(email) {
    const { verify } = this.props;
    verify(email);
  }

  /**
   * Content to be displayed when user data are available.
   * @access private
   * @returns {jsx}
   */
  render() {
    const { formatMessage } = this.props.intl;
    return (
      <form method="post" className="row" ref="emailForm" onSubmit={this.addEmail.bind(this)}>
        <fieldset>
          <legend>
            <FormattedMessage
              id="settings.email"
              defaultMessage="E-mails"
            />
          </legend>
          <Error error={this.props.error} success={this.props.success} />
          <ul className="collection with-header col s12">
            <li className="collection-header">
              <FormattedMessage
              id="settings.email.msg"
              defaultMessage="E-mails associated with your account"
            />
            </li>
            {this.getEmails(this.props.emails)}
          </ul>
          <div className="input-field col s12">
            <input type="email" className="validate" required name="email" />
            <label htmlFor="email">
              <FormattedMessage
                id="settings.email.add"
                defaultMessage="Add e-mail"
              />
            </label>
          </div>
          <input
            type="submit"
            className="btn waves-effect waves-light"
            value={formatMessage({id: 'common.add', defaultMessage: 'Add'})} />
        </fieldset>

      </form>);
  }
}

UserEmail.propTypes = {
  addEmail: PropTypes.func.isRequired,
  emails: PropTypes.array.isRequired,
  error: PropTypes.string,
  intl: intlShape.isRequired,
  removeEmail: PropTypes.func.isRequired,
  success: PropTypes.string,
  verify: PropTypes.func.isRequired,
};

export default injectIntl(UserEmail);
