import React from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';

class FeedNewPost extends React.Component {
  constructor(props) {
    super(props);

    this.addPost = this.addPost.bind(this);
  }

  addPost(e) {
    e.preventDefault();

    // get the value
    const body = e.target.postText.value;

    // add post
    const { addPost } = this.props;
    addPost(body);

    // reset the form
    e.target.reset();
  }

  render() {
    let error;
    if (this.props.error) {
      error = <div className="col s12 red darken-2"><p className="white-text flow-text">{this.props.error}</p></div>;
    }
    const { formatMessage } = this.props.intl;

    if (Meteor.userId()) {
      return (<form id="postForm" method="post" className="row card-panel hoverable" onSubmit={this.addPost}>
        <div className="input-field col s10">
          <input type="text" className="validate" name="postText" />
          <label htmlFor="postText">
            <FormattedMessage
              id="feed.post.new"
              defaultMessage="New post"
            />
          </label>
        </div>
        <div className="input-field col s2">
          <input type="submit" className="btn" name="postSubmit" value={formatMessage({ id: 'feed.post.send'})} />
        </div>
        {error}
      </form>);
    }
  }
}

FeedNewPost.propTypes = {
  addPost: PropTypes.func.isRequired,
  error: PropTypes.string,
  intl: intlShape.isRequired,
};

export default injectIntl(FeedNewPost);
