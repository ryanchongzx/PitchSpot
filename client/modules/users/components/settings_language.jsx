import React from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import Error from '../../core/components/error.jsx';

class SettingsLanguage extends React.Component {
  constructor(props) {
    super(props);
    this.changeLang = this.changeLang.bind(this);
  }

  componentDidMount() {
    this.initializeSelect();
  }

  componentDidUpdate() {
    this.initializeSelect();
  }

  initializeSelect() {
    $('#langSelect').material_select();
  }

  getOptions(options) {
    return options.map((lang) => {
      return <option key={lang.code} value={lang.defaultLocale}>{lang.native}</option>;
    });
  }

  changeLang(e) {
    e.preventDefault();
    const { setLang } = this.props;
    setLang(e.target.langSelect.value);
    location.reload();
  }

  render() {
    const { formatMessage } = this.props.intl;
    return (<form onSubmit={this.changeLang} className="row" >
      <Error error={this.props.error} success={this.props.success} />
      <fieldset>
        <legend>
          <FormattedMessage
           id="settings.languages"
           defaultMessage="Language settings"
          />
        </legend>
        <div className="input-field row">
          <select id="langSelect" name="langSelect" defaultValue={this.props.currentLang} className="col s10">
            {this.getOptions(this.props.languages)}
          </select>
          <input type="submit" value={formatMessage({ id: 'common.save'})} className="col s2 btn waves" />
        </div>
        <div>
          <p><FormattedMessage id="settings.languages.notice" /></p>
          <p><a href="https://github.com/LiteraryUniverse/intl-web" target="_blank">
            <FormattedMessage id="settings.languages.join" />
          </a></p>
        </div>
      </fieldset>
    </form>);
  }
}

SettingsLanguage.propTypes = {
  currentLang: PropTypes.string.isRequired,
  error: PropTypes.string,
  intl: intlShape.isRequired,
  languages: PropTypes.arrayOf( PropTypes.object ).isRequired,
  setLang: PropTypes.func.isRequired,
  success: PropTypes.string,
};

SettingsLanguage.defaultProps = {
  currentLang: 'en',
};

export default injectIntl(SettingsLanguage);
