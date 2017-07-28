/*
import React from 'react';
import filepicker from 'filepicker-js';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import Error from '../../core/components/error.jsx';

class SettingsAvatar extends React.Component {
  constructor(props) {
    super(props);

    this.upload = this.upload.bind(this);
    this.imageUploaded = this.imageUploaded.bind(this);
  }

  upload(e) {
    e.preventDefault();
    filepicker.setKey(this.props.filestackKey);
    const options = {
      services: [
        'CONVERT',
        'COMPUTER',
        'URL',
        'DROPBOX',
        'BOX',
        'FACEBOOK',
        'FLICKR',
        'PICASA',
        'IMGUR',
        'GMAIL',
        'SKYDRIVE',
        'GOOGLE_DRIVE',
        'INSTAGRAM',
        'WEBCAM',
      ],
      conversions: [ 'crop', 'rotate' ],
      cropRatio: 1 / 1,
      openTo: 'COMPUTER',
      language: this.props.userLang,
      extensions: [ '.jpg', '.png', '.svg' ],
      imageDim: [ 220,220 ]
    };
    filepicker.pick(options, this.imageUploaded);
  }

  imageUploaded(blob) {
    const { saveAvatar } = this.props;
    saveAvatar(blob.url);
  }

  render() {
    const { formatMessage } = this.props.intl;
    let avatar = (<i className="material-icons profile-picture">account_circle</i>);
    if (this.props.avatar) {
      avatar = (<img
        width="220"
        height="220"
        alt={formatMessage({id: 'settings.avatar.own', defaultMessage: 'Your avatar'})}
        src={this.props.avatar}
      />);
    }

    return (<form className="row">
      <fieldset>
        <legend>
          <FormattedMessage id="settings.avatar" defaultMessage="Avatar" />
        </legend>
        <Error error={this.props.error} success={this.props.success} />
        <div className="col s12 m4">
          {avatar}
        </div>
        <div className="col s12 m8">
          <button className="btn waves-effect waves-light" onClick={this.upload}>
            <i className="material-icons left">cloud_upload</i>
            <FormattedMessage
             id="settings.avatar.upload"
             defaultMessage="Select image"
            />
          </button>
        </div>
      </fieldset>
    </form>);
  }
}

SettingsAvatar.propTypes = {
  avatar: PropTypes.string,
  error: PropTypes.string,
  filestackKey: PropTypes.string,
  intl: intlShape.isRequired,
  saveAvatar: PropTypes.func,
  success: PropTypes.string,
  userLang: PropTypes.string,
};

export default injectIntl(SettingsAvatar);
*/
