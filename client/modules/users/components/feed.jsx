import React from 'react';
import S from 'string';
import { Link } from 'react-router';
import { FormattedMessage, FormattedRelative } from 'react-intl';
import PropTypes from 'prop-types';

import InitiateChat from '../../messaging/components/initiate_chat.jsx';

export default class UserFeed extends React.Component {
  constructor(props) {
    super(props);

    this.likingDisplay = this.likingDisplay.bind(this);
    this.extendLimit = this.extendLimit.bind(this);
  }

  liking(post) {
    const { likePost, unlikePost, currentUser } = this.props;

    if (post.isLikedBy(currentUser)) {
      unlikePost(post._id);
    } else {
      likePost(post._id);
    }
  }

  likingDisplay(post) {
    return (<span className="link" onClick={this.liking.bind(this, post)}>
      {post.likeCount()} <i className="material-icons">thumb_up</i>
    </span>);
  }

  /**
   * List individual post
   * @access private
   */
  listPost() {
    

    const { posts } = this.props;
    if (posts !== undefined && posts !== null) {
      if (posts.length > 0) {
        return posts.map((post) => {
          return (<div key={post._id}>
            

<div className="row">
<div className="col s12 m12  remove-padding">
     <div className="card horizontal hoverable">
      <div className="card-image imageSize">
        <img src="/images/HomePagev2-2.jpg"/>
      </div>
      <div className="card-stacked">
        <div className="card-content">
       <div className="col s12 m12">{S(post.body).decodeHTMLEntities().toString()}</div>
       <br/>
         
        </div>




        <div className="card-panel remove-shadow">
   <InitiateChat  chatwith={post.poster().username } PosterID={post.poster()._id} 
            buttonText={<i className=" material-icons">chat_bubble</i>}
            buttonClass={'right valign btn-floating btn waves-effect waves-light blue'}
          />
    
          


<div className="col s3 ">
  <Link to={'users/' + post.poster().username} >

    {post.poster().username}

  </Link>
</div>
            
         
<div className="col s3">
   <FormattedRelative value={post.date} />  
</div>

<div className= "col s3">
 {this.likingDisplay(post)}
</div>
          </div>
       
          
         
      </div>
    </div>
  </div>
   </div>
          


          </div>);
        });
      } else {
        return (<div>
          <FormattedMessage
            id="feed.empty"
            defaultMessage="No entries in the feed."
          />
        </div>);
      }
    }
  }

  /**
   * Show additional posts
   * @access private
   */
  extendLimit() {
    const { increaseLimit } = this.props;
    increaseLimit();
  }

  render() {

    let addToLimit;
    const { posts, postsLimit, totalPosts } = this.props;
    if (posts !== undefined && posts !== null) {
      if (totalPosts > postsLimit) {
        addToLimit = (<div className="align-center">
          <a className="btn waves-effect waves-light col s12 float-none" onClick={this.extendLimit}>
            <FormattedMessage
              id="common.showmore"
              defaultMessage="Show more"
            />
          </a>
        </div>);
      }
    }

    return (<div>
      {this.listPost()}
      {addToLimit}
    </div>);
  }
}

UserFeed.propTypes = {
  currentUser: PropTypes.oneOfType([ PropTypes.object, PropTypes.bool ]).isRequired,
  /* eslint-disable react/no-unused-prop-types */
  feedUser: PropTypes.oneOfType([ PropTypes.object, PropTypes.bool ]).isRequired,
  /* eslint-enable react/no-unused-prop-types */
  increaseLimit: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  posts: PropTypes.array,
  postsLimit: PropTypes.number.isRequired,
  totalPosts: PropTypes.number.isRequired,
  unlikePost: PropTypes.func.isRequired,
};

UserFeed.defaultProps = {
  feedUser: false,
};
