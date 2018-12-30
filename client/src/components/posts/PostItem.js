import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../actions/postActions';
import Moment from 'react-moment';

class PostItem extends Component {

  onDeleteClick(id, history) {
    return e => {
      if (this.props.auth.user.id === '5c26b5525928c71648d1fb99') {
        alert('This action cannot be performed with demo account')
        e.stopPropagation();
      } else {
        e.stopPropagation();
        this.props.deletePost(id, history);
      }
    }
  }

  onLikeClick(id) {
    return e => {
      e.stopPropagation();
      this.props.addLike(id);
    }
  }

  onUnlikeClick(id) {
    return e => {
      e.stopPropagation();
      this.props.removeLike(id);
    }
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  redirectToPost(e) {
    this.props.history.push(`/post/${this.props.post._id}`);
  }

  render() {
    const { post, auth, showActions } = this.props;
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    const dateObject = new Date(post.date);

    return (
      <div onClick={this.redirectToPost.bind(this)}>
      <div className="card card-body mb-3 post-item-hover">
        <div className="row">
          <div className="col-md-2">
            <Link onClick='event.stopBubble = true' to={`/profile/user/${post.user}`}>
              <img
                className="d-none d-md-block mb-2"
                style={{ width: '75px', height: '75px', margin: '0 auto' }}
                src={post.avatar}
                alt=""
              />
            </Link>
            <p style={{ marginBottom: '0', textAlign: 'center' }}>{post.name}</p>
          </div>
          <div className="col-md-9 ml-5">
            <p className="lead">{post.text}</p>
            {showActions ? (
              <span>
                <button
                  onClick={this.onLikeClick(post._id).bind(this)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames('fas fa-thumbs-up', {
                      'text-info': this.findUserLike(post.likes)
                    })}
                  />
                  <span className="badge">{post.likes.length}</span>
                </button>
                <button
                  onClick={this.onUnlikeClick(post._id).bind(this)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  {post.comments.length === 1 ? '1 Comment' : post.comments.length
                   + ' Comments'}
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick(post._id, this.props.history).bind(this)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
            <span className="d-inline-block ml-5">Posted on: {dateObject.toLocaleDateString('en-US', dateOptions)}</span>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(
  withRouter(PostItem)
);
