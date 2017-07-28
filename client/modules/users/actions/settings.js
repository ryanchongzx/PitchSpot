export default {
  emailVerify({ Meteor, LocalState }, email) {
    Meteor.call('accounts.email.verify.send', email, (error, result) => {
      if (error) {
        LocalState.set('ACCOUNTS_ERROR_EMAIL', error.reason);
      }
      if (result === undefined) {
        LocalState.set('ACCOUNTS_SUCCESS_EMAIL', 'Verification e-mail has been send.');
      }
    });
  },
  emailAdd({ Meteor, LocalState }, email) {
    // TODO: Add more rigorous e-mail checking
    if (email.length > 6) {
      Meteor.call('accounts.email.add', email, (error, result) => {
        if (error) {
          LocalState.set('ACCOUNTS_ERROR_EMAIL', error.reason);
        }
        if (result === false) {
          LocalState.set('ACCOUNTS_ERROR_EMAIL', email + ' is already associated with another account.');
        }
      });
    } else {
      LocalState.set('ACCOUNTS_ERROR_EMAIL', 'That is not a valid e-mail address!');
    }
  },
  emailRemove({ Meteor, LocalState }, email) {
    Meteor.call('accounts.email.remove', email, (error, result) => {
      if (error || result === false) {
        LocalState.set('ACCOUNTS_ERROR_EMAIL', error.reason);
      }
      // no need for success message as the e-mail will disapear from the listing on success
    });
  },
  usernameUpdate({ Meteor, LocalState }, username) {
    Meteor.call('accounts.username', username, (error, result) => {
      if (error) {
        LocalState.set('ACCOUNTS_ERROR_USERNAME_UPDATE', error.reason);
      }
      if (result === false) {
        LocalState.set('ACCOUNTS_ERROR_USERNAME_UPDATE', 'This username already exists.');
      } else {
        LocalState.set('ACCOUNTS_SUCCESS_USERNAME_UPDATE', 'Username updated.');
      }
    });
  },
  bioUpdate({ Meteor, LocalState }, text) {
    Meteor.call('profile.biography.update', text, (error, result) => {
      if (error) {
        LocalState.set('ACCOUNTS_ERROR_BIO_UPDATE', error.reason);
      }
      if (result) {
        LocalState.set('ACCOUNTS_SUCCESS_BIO_UPDATE', 'Biography updated.');
      }
    });
  },
  nameUpdate({ Meteor, LocalState }, givenName, familyName) {
    Meteor.call('profile.name.update', { given: givenName, family: familyName }, (error, result) => {
      if (error) {
        LocalState.set('ACCOUNTS_ERROR_NAME_UPDATE', error.reason);
      }
      if (result) {
        LocalState.set('ACCOUNTS_SUCCESS_NAME_UPDATE', 'Name updated.');
      }
    });
  },
  setLang({ Meteor, LocalState }, newLang) {
    localStorage.setItem('LU-locale', newLang);
    Meteor.call('accounts.language.set', newLang, (error, result) => {
      if (error) {
        LocalState.set('ACCOUNTS_ERROR_LANGUAGE_UPDATE', error.reason);
      }
      if (result) {
        LocalState.set('ACCOUNTS_SUCCESS_LANGUAGE_UPDATE', 'New language set.');
      }
    });
  },
  setPatreon({}) {
    // check that url goes to Patreon
    // url = url.trim();
    // save
  },
  setAvatar({LocalState}, url) {
    Meteor.call('profile.avatar.set', url, (error, result) => {
      if (error) {
        LocalState.set('ACCOUNTS_ERROR_AVATAR_UPDATE', error.reason);
      }
      if (result) {
        LocalState.set('ACCOUNTS_SUCCESS_AVATAR_UPDATE', 'New avatar has been set.');
      }
    });
  },
  clearErrors({ LocalState }) {
    LocalState.set('ACCOUNTS_ERROR_EMAIL', null);
    LocalState.set('ACCOUNTS_ERROR_USERNAME_UPDATE', null);
    LocalState.set('ACCOUNTS_ERROR_BIO_UPDATE', null);
    LocalState.set('ACCOUNTS_SUCCESS_EMAIL', null);
    LocalState.set('ACCOUNTS_SUCCESS_USERNAME_UPDATE', null);
    LocalState.set('ACCOUNTS_SUCCESS_BIO_UPDATE', null);
    LocalState.set('ACCOUNTS_ERROR_LANGUAGE_UPDATE', null);
    LocalState.set('ACCOUNTS_SUCCESS_LANGUAGE_UPDATE', null);
    LocalState.set('ACCOUNTS_ERROR_AVATAR_UPDATE', null);
    LocalState.set('ACCOUNTS_SUCCESS_AVATAR_UPDATE', null);
    LocalState.set('ACCOUNTS_SUCCESS_NAME_UPDATE', null);
    return LocalState.set('ACCOUNTS_ERROR_NAME_UPDATE', null);
  },
};
