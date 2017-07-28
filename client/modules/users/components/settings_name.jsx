import React from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Materialize } from 'meteor/poetic:materialize-scss';
import PropTypes from 'prop-types';
import Error from '../../core/components/error.jsx';

class UserChangeName extends React.Component {
  constructor(props) {
    super(props);
    this.changeName = this.changeName.bind(this);
  }
  /**
   * Functions that run every time the component updates
   * @access private
   */
  componentDidUpdate() {
    Materialize.updateTextFields();
  }

  /**
   * Changes currently logged in user's name
   * @access private
   * @param {event} e Submit event from form
   */
  changeName(e) {
    e.preventDefault();
    const given = e.target.given.value;
    const family = e.target.family.value;

    const { nameUpdate } = this.props;
    nameUpdate(given, family);
  }

  /**
   * Content to be displayed
   * @access private
   * @returns {jsx}
   */
  render() {
    let { givenName, familyName } = this.props.profile;
    const { formatMessage } = this.props.intl;

    return (
      <form method="post" className="row section" onSubmit={this.changeName}>
        <fieldset>
          <legend>
            <FormattedMessage
              id="settings.name"
              defaultMessage="Real name"
            />
          </legend>
          <Error error={this.props.error} success={this.props.success} />
          <div className="input-field col s12 m6">
            <input type="text" name="given" className="validate" defaultValue={givenName} />
            <label htmlFor="given" className="active">
              <FormattedMessage
                id="settings.name.given"
                defaultMessage="Given name"
              />
            </label>
          </div>
          <div className="input-field col s12 m6">
            <input type="text" name="family" className="validate" defaultValue={familyName} />
            <label htmlFor="family" className="active">
              <FormattedMessage
                id="settings.name.family"
                defaultMessage="Family name"
              />
            </label>
          </div>
          <input
            type="submit"
            value={formatMessage({id: 'common.save'})}
            className="btn waves-effect waves-light"
          />
        </fieldset>
      </form>);
  }
}

UserChangeName.propTypes = {
  error: PropTypes.string,
  intl: intlShape.isRequired,
  nameUpdate: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  success: PropTypes.string,
};

export default injectIntl(UserChangeName);
