import React from 'react';
import sanitizeHtml from 'sanitize-html';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';

/**
 * @class component ConversationReply
 * @classdesc Reply to the given conversation
 */
class ConversationReply extends React.Component {
  constructor(props) {
    super(props);

    this.isTyping = this.isTyping.bind(this);
    this.isNotTyping = this.isNotTyping.bind(this);
    this.sendMessage = this.sendMessage.bind(this);

    this.state = {
      typing: null,
    };
  }

  componentWillUnmount() {
    this.state.typing.stop();
  }

  isTyping() {
    this.setState({
      typing: Meteor.subscribe('typing', this.props.conversationId),
    });
  }

  isNotTyping() {
    if (this.state.typing !== null) {
      this.state.typing.stop();
    }
  }

  sendMessage(e) {
    e.preventDefault();
    // get message
    // TODO get from e.target
    let msg = $('#messageToSend').val();

    // sanitize
    msg = sanitizeHtml(msg);

    // send the message
    // const send = this.props.conversation.sendMessage(msg);
    // send(msg);
    this.props.conversation.sendMessage(msg);

    // increase the limit so the current conversation stays on the screen
    this.setState({
      msgLimit: this.state.msgLimit + 1,
    });

    // reset the text field
    $('#messageToSend').val('');
  }

  render() {
    const { formatMessage } = this.props.intl;
    return (<form method="post" onSubmit={this.sendMessage}>
      <fieldset>
        <legend>
          <FormattedMessage id='pm.send.message' defaultMessage='Send message' />
        </legend>
        <div className="input-field col s12">
          <i className="material-icons prefix">mode_edit</i>
          <textarea
            name="message"
            id="messageToSend"
            className="materialize-textarea"
            onFocus={this.isTyping}
            onBlur={this.isNotTyping}
          />
          <label htmlFor="messageToSend">
            <FormattedMessage id='pm.message' defaultMessage='Message' />
          </label>
        </div>
        <input
          type="submit"
          value={formatMessage({id: 'feed.post.send', defaultMessage: 'Send'})}
          className="btn pull-right waves-light waves-light"
        />
      </fieldset>
    </form>);
  }
}


ConversationReply.propTypes = {
  conversation: PropTypes.object.isRequired,
  conversationId: PropTypes.string,
  intl: intlShape.isRequired,
};

export default injectIntl(ConversationReply);
