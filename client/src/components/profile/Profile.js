import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import Spinner from '../common/spinner';
import { getProfileByHandle } from '../../actions/profileActions';

class Profile extends React.Component {

  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  render() {
    return (
      <div>
        <h1>Profile</h1>
        <ProfileHeader />
        <ProfileAbout />
        <ProfileCreds />
        <ProfileGithub />
      </div>
    )
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
