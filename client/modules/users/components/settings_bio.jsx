import React from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import S from 'string';
import PropTypes from 'prop-types';
import Error from '../../core/components/error.jsx';

/**
 * @class component UserChangeBio
 * @classdesc Change user biography
 */
class UserChangeBio extends React.Component {
  constructor(props) {
    super(props);
    $('#userBio').trigger('autoresize');
  }

  componentDidUpdate() {
    $('#userBio').trigger('autoresize');
  }

  /**
   * Changes currently logged in user's biography
   * @access private
   * @param {event} e Submit event from form
   */
  changeBio(e) {
    e.preventDefault();
    const bio = e.target.userBio.value;

    const { bioUpdate } = this.props;
    bioUpdate(bio);
  }

  /**
   * Content to be displayed when user data are available.
   * @access private
   * @returns {jsx}
   */
  render() {
    const { formatMessage } = this.props.intl;
    return (
      <form method="post" className="row" ref="bioForm" onSubmit={this.changeBio.bind(this)}>
        <fieldset>
          <legend>
            <FormattedMessage
              id='settings.biography'
              defaultMessage='Biography'
            />
          </legend>
          <Error error={this.props.error} success={this.props.success} />
          <div className="input-field col s12">
            <textarea
              id="userBio"
              name="userBio"
              className="materialize-textarea"
              defaultValue={S(this.props.profile.biography).decodeHTMLEntities().toString()}
            />
            <label htmlFor="userBio" className="active">
              <FormattedMessage
                id='settings.biography.placeholder'
                defaultMessage='A little bit about yourself to be shown on your profile.'
              />
            </label>
            <input
              type="submit"
              value={formatMessage({id: 'common.save'})}
              className="btn waves-effect waves-light"
            />
          </div>
        </fieldset>
      </form>);
  }
}

UserChangeBio.propTypes = {
  bioUpdate: PropTypes.func.isRequired,
  error: PropTypes.string,
  intl: intlShape.isRequired,
  profile: PropTypes.object.isRequired,
  success: PropTypes.string,
};

export default injectIntl(UserChangeBio);
