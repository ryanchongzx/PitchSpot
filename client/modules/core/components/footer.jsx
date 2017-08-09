import React from 'react';
import { FormattedMessage } from 'react-intl';
import LanguageSelect from '../containers/language_select.js';
import { Link } from 'react-router';

export default class Footer extends React.Component {
  thisYear() {
    return new Date().getFullYear();
  }

  render() {
    return (<footer className="page-footer fixed indigo darken-4">
      <div className="footer-copyright indigo darken-4">

        <div className="container row">
          <div className="col s12 m6">
            <LanguageSelect />
          </div>
          <div className="col s12 m6">
            <FormattedMessage
              id="common.legal.disclaimer"
              defaultMessage="© {year} All rights reserved."
              values={{year: this.thisYear()}}
            />
          </div>
        </div>
      </div>
    </footer>);
  }
}

