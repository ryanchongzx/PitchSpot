import React from 'react';
import Helmet from 'react-helmet';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import Footer from './footer.jsx';
import Navigation from '../containers/navigation.js';

const Layout = props => (
  <div id="app">

    <Helmet
      titleTemplate={'%s - ' + props.intl.formatMessage({id: 'sitename'})}
      meta={[
        { name: 'description', content: props.intl.formatMessage({id: 'site.description'}) },
        { name: 'author', content: 'Jan Dvorak IV.' },
      ]}
    />

    <Navigation />
    <div id="contentView" className="container">
      <div className="row">
        <div className="col s12">
          <main className="card-panel">
            {props.children}
          </main>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

Layout.propTypes = {
  children: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(Layout);
