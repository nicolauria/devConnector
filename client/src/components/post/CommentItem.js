import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addCommentLike, removeCommentLike, deleteComment } from '../../actions/postActions';

class CommentItem extends Component {
  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }

  likeComment(postId, commentId) {
    this.props.addCommentLike(postId, commentId)
  }

  unlikeComment(postId, commentId) {
    this.props.removeCommentLike(postId, commentId)
  }

  render() {
    const { comment, postId, auth } = this.props;
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    const dateObject = new Date(comment.date);

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
          <Link to={`/profile/user/${comment.user}`}>
              <img
                className="d-none d-md-block mb-2"
                style={{ width: '75px', height: '75px', margin: '0 auto' }}
                src={comment.avatar}
                alt=""
              />
            </Link>
            <p style={{ marginBottom: '0', textAlign: 'center' }}>{comment.name}</p>
          </div>
          <div className="col-md-9">
            <p className="lead">{comment.text}</p>
            <button
              onClick={this.likeComment.bind(this, postId, comment._id)}
              type="button"
              className="btn btn-light mr-1"
            >
              <i
                className='fas fa-thumbs-up'
              />
              <span className="badge">{comment.likes.length}</span>
            </button>
            <button
              onClick={this.unlikeComment.bind(this, postId, comment._id)}
              type="button"
              className="btn btn-light mr-1"
            >
              <i className="text-secondary fas fa-thumbs-down" />
            </button>
            {comment.user === auth.user.id ? (
              <button
                onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
            <span className="d-inline-block ml-5 mr-3">Commented on: {dateObject.toLocaleDateString('en-US', dateOptions)}</span>
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment, addCommentLike, removeCommentLike })(CommentItem);
