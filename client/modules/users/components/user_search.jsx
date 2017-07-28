import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

/**
 * Search for users
 */
class UserSearch extends React.Component {
  constructor(props) {
    super(props);

    this.showResults.bind(this);
    this.state = {
      results: null,
    };
  }

  search(e) {
    e.preventDefault();
    const query = e.target.value;
    if (query.length > 2) {
      const results = Meteor.subscribe('pm.users.search', query, [ Meteor.userId() ], () => {
        this.setState({
          results: Meteor.users.find({
            username: { $regex: query, $options: 'i' },
            _id: { $nin: [ Meteor.userId() ] },
          }, { fields: { username: 1, roles: 1 } }).fetch(),
        });
      });

      if (results.ready() === false) {
        this.setState({
          results: false,
        });
      }
    }
  }

  showResults() {
    const { results } = this.state;
    // first account for not results or search not even started
    if (results === false) {
      return (<div><FormattedMessage id="common.searching" defaulMessage="Searching..." /></div>);
    } else if (results === undefined || results === null) {
      return null;
    } else if (results.length < 1) {
      return <p className="flow-text">No users found.</p>;
    }

    // no return back stuff
    return results.map((user) => {
      return (<Link key={user._id} to={'/users/' + user.username} className="collection-item">
        <i className="material-icons">account_circle</i> {user.username}
      </Link>);
    });
  }

  render() {
    const { formatMessage } = this.props.intl;
    return (<div className="row">
      <Helmet
        title={formatMessage({id: 'search.users', defaulMessage: 'Search for users'})}
      />
      <div className="input-field col s12">
        <i className="material-icons prefix">search</i>
        <input type="text" name="search" id="search" onKeyUp={this.search.bind(this)} />
        <label htmlFor="search">
          <FormattedMessage
            id="common.search.do"
            defaulMessage="Search"
          />
        </label>
      </div>
      <div className="collection">
        {this.showResults()}
      </div>
    </div>);
  }
}

UserSearch.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(UserSearch);
