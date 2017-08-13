import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Email } from 'meteor/email';

export default function () {
  Accounts.urls.resetPassword = function (token) {
    return Meteor.absoluteUrl('user/reset-password?token=' + token);
  };

  Accounts.urls.verifyEmail = function (token) {
    return Meteor.absoluteUrl('user/verify-email?token=' + token);
  };

  Accounts.urls.enrollAccount = function (token) {
    return Meteor.absoluteUrl('user/enroll?token=' + token);
  };

  Meteor.startup(() => {
    // TODO Don't forget to set the mailing url
    // process.env.MAIL_URL = Meteor.settings.mailUrl

    var smtp = {
    username: 'teampitchspot@gmail.com',   // eg: server@gentlenode.com
    password: 'stsyryzf',   // eg: 3eeP1gtizk5eziohfervU
    server:   'smtp.gmail.com',  // eg: mail.gandi.net
    port: 587
  };

    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;


    /**
     * Accounts e-mail templates
     */
    Accounts.emailTemplates.siteName = 'PitchSpot';
    Accounts.emailTemplates.from = 'PitchSpot no-reply <no-reply@pitchspot.co>';

    // Account enrollment
    Accounts.emailTemplates.enrollAccount = {
      subject(user) {
        return 'Welcome to PitchSpot, ' + user.username;
      },
      text(user, url) {
        return 'Hello ' + user.username + '\n\n' +
          'You have been selected to participate in building a better future!' +
          ' To activate your account, simply click the link below:\n\n' +
          url;
      },
    };

    // Reset password
    Accounts.emailTemplates.resetPassword = {
      subject() {
        return 'PitchSpot reset password';
      },
      text(user, url) {
        return 'Hello ' + user.username + '!\n\n' +
        'We have recieved a request to reset your password for your account.' +
        'Please follow the link bellow to reset your password:\n\n' +
        url;
      },
    };

    // Verifying email
    Accounts.emailTemplates.verifyEmail = {
      subject() {
        return 'PitchSpot e-mail verification';
      },
      text(user, url) {
        return 'Hello ' + user.username + '!\n\n' +
        'Please verify your e-mail address by clicking on the link bellow:\n\n' +
        url;
      },
    };
  });
}
