import React from 'react';
import { FormattedMessage } from 'react-intl';
import LanguageSelect from '../containers/language_select.js';

export default class Footer extends React.Component {
  thisYear() {
    return new Date().getFullYear();
  }

  render() {
    return (<footer className="page-footer">
      <div className="footer-copyright">
        <div className="container row">
          <div className="col s12 m6">
            <LanguageSelect />
          </div>
          <div className="col s12 m6">
            <FormattedMessage
              id="common.legal.disclaimer"
              defaultMessage="© {year} All rights reserved, all texts belong to their respective authors."
              values={{year: this.thisYear()}}
            />
          </div>
        </div>
      </div>
    </footer>);
  }
}
