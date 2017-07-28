import React from 'react';
import Error from '../../core/components/error.jsx';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

export default class SignUpBeta extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $('#socialMedia').hide();
  }

  componentDidUpdate() {
    $('#socialMedia').hide();
    if (this.props.success) {
      $('#signupForm').hide();
      $('#socialMedia').show();
    }
  }

  signUp(e) {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const username = form.username.value;
    const email = form.email.value;
    const reason = form.why.value;

    const { betaSignup } = this.props;

    betaSignup(name, username, email, reason);
  }

  render() {
    return (<div>
      <Helmet
        title="Sign Up for Beta!"
      />
      <h1>Beta signup</h1>
      <p className="flow-text">This application currently is not ready for everyone.
      As such we are not allowing registration on our site.
      But, we are looking for those writers and readers who are willing to accept that there will
      be issues and work with us to solve them and improve the site in general.
      If you are interested to help us make the best of this application, we would like to encourage you sign-up
      bellow. We will be selecting from those who sing-up who we will let in early, but eventually we will allow
      everyone in.</p>
      <form onSubmit={this.signUp.bind(this)} className="row card-panel hoverable" id="signupForm">
        <Error error={this.props.error} />
        <div className="input-field col s12">
          <input type="text" name="name" required />
          <label htmlFor="name">Your name</label>
        </div>
        <div className="input-field col s12">
          <input type="text" name="username" required />
          <label htmlFor="username">Desired username</label>
        </div>
        <div className="input-field col s12">
          <input type="email" name="email" required />
          <label htmlFor="email">Your e-mail</label>
        </div>
        <div className="input-field col s12">
          <textarea name="why" className="materialize-textarea" />
          <label htmlFor="why">Why?</label>
        </div>
        <input type="submit" value="Submit" className="btn waves-effect waves-light right" />
      </form>
      <div id="socialMedia" className="card-panel hoverable">
        <p className="flow-text">
          Thank you for signing up! We will let you know once you get selected. In the meantime join us on social media:
        </p>
        <h2 className="center-align">
          <a
            href="https://www.facebook.com/"
            title="Facebook"
          >
            <i className="fa fa-facebook-official" />
          </a>
          <a
            href="https://twitter.com/"
            title="Twitter"
          >
            <i className="fa fa-twitter" />
          </a>
          <a
            href="https://plus.google.com/"
            title="Google Plus"
          >
            <i className="fa fa-google-plus-official" />
          </a>
          <a
            href="https://www.youtube.com/channel/"
            title="YouTube"
          >
            <i className="fa fa-youtube" />
          </a>
        </h2>
      </div>
    </div>);
  }
}

SignUpBeta.propTypes = {
  betaSignup: PropTypes.func.isRequired,
  error: PropTypes.string,
  success: PropTypes.string,
};
