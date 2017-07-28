import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { IntlProvider } from 'react-intl';

// i18n and l10n
import i18n from '../../../intl/settings.js';
import i18nLocales from '../../../intl/index.js';

import MainLayout from './components/main_layout.jsx';
import NotFount from './components/not_found.jsx';
import Logout from './components/logout.jsx';

// pages
import Homepage from '../pages/components/homepage.jsx';
import About from '../pages/components/about.jsx';

// user pages
import Dashboard from '../users/components/dashboard.jsx';
import SignIn from '../users/containers/sign_in.js';
import SignUp from '../users/containers/sign_up.js';
import Settings from '../users/components/settings.jsx';
import UserList from '../users/containers/list.js';
import Profile from '../users/containers/profile.js';
import FriendRequests from '../users/containers/friend_requests.js';
import FriendsList from '../users/containers/friends_list.js';
import SetPassword from '../users/containers/settings_password_set.js';
import ForgotPassword from '../users/containers/settings_password_forgot.js';
import EmailVerify from '../users/containers/email_verify.js';
import UserSearch from '../users/containers/user_search.js';

// messaging
import UserConversationOverview from '../messaging/containers/overview.js';
import UserConversation from '../messaging/containers/conversation.js';


function getRootNode(rootId) {
  const rootNode = document.getElementById(rootId);

  if (rootNode) {
    return rootNode;
  }

  const rootNodeHtml = '<div id="' + rootId + '"></div>';
  const body = document.getElementsByTagName('body')[0];
  body.insertAdjacentHTML('beforeend', rootNodeHtml);

  return document.getElementById(rootId);
}

const requireAuth = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

const anonOnly = (nextState, replace) => {
  if (Meteor.loggingIn() && Meteor.userId()) {
    replace({
      pathname: '/dashboard',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

/**
 * Determines what language should be used
 */
function getLang() {
  let locale = localStorage.getItem('LU-locale');

  if (Meteor.user()) {
    locale = Meteor.user().profile.language.split('-')[0];
  }

  if (locale === undefined || locale === '' || locale === null || locale === ' ' || locale === 'null') {
    let browserLocale = (
      navigator.languages && navigator.languages[0] ||
      navigator.language ||
      navigator.browserLanguage ||
      navigator.userLanguage ||
      'en-US');
    // check that we support that locale
    i18n.supportedLocales.map((lc) => {
      if ( lc === browserLocale) {
        locale = browserLocale;
        return;
      }
    });
  }

  // last check, just in case
  if (locale === null || locale === undefined || locale === 'null' ) {
    locale = 'en-US';
  }

  localStorage.setItem('LU-locale', locale);
  return locale;
}

export default function (injectDeps) {
  const MainLayoutCtx = injectDeps(MainLayout);

  const locale = getLang();
  const lang = locale.split('-')[0];
  const messages = i18nLocales[lang];

  Meteor.startup( () => {
    ReactDOM.render(
      <IntlProvider key={locale} locale={locale} messages={messages}>
        <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
          <Route path="/users" component={MainLayoutCtx} >
            <IndexRoute component={UserList} onEnter={requireAuth} />
            <Route path="?page=:page" component={UserList} onEnter={requireAuth} />
            <Route path="search" component={UserSearch} onEnter={requireAuth} />
            <Route path=":username" component={Profile} onEnter={requireAuth} />
          </Route>
          <Route path="/user" component={MainLayoutCtx}>
            <IndexRoute component={Profile} onEnter={requireAuth} />
            <Route path="settings" component={Settings} onEnter={requireAuth} />
            <Route path="friend-requests" component={FriendRequests} onEnter={requireAuth} />
            <Route path="friends" component={FriendsList} onEnter={requireAuth} />
            <Route path="reset-password" component={SetPassword} />
            <Route path="forgot-password" component={ForgotPassword} />
            <Route path="verify-email" component={EmailVerify} />
          </Route>
          <Route path="/pm" component={MainLayoutCtx}>
            <IndexRoute component={UserConversationOverview} onEnter={requireAuth} />
            <Route path=":conversationId" component={UserConversation} onEnter={requireAuth} />
          </Route>
          <Route path="/" component={MainLayoutCtx}>
            <IndexRoute component={Homepage} onEnter={anonOnly} />
            <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
            <Route path="login" component={SignIn} onEnter={anonOnly} />
            <Route path="register" component={SignUp} onEnter={anonOnly} />
            <Route path="logout" component={Logout} />
            <Route path="about" component={About} />
            <Route path="*" component={NotFount} />
          </Route>
        </Router>
      </IntlProvider>,
      getRootNode('reactRoot')
    );
  } );
}
