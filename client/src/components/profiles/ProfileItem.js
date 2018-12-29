import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class ProfileItem extends React.Component {

  render() {
    const { profile } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img src={profile.user.avatar} alt="" className="rounded-circle"/>
          </div>
          <div className="col-lg-5 col-md-5 col-8">
            <h3>{profile.user.name}</h3>
            <p style={{ marginBottom: '5px' }}>
              {profile.status} {isEmpty(profile.company) ? null : (<span>at {profile.company}</span>)}
            </p>
            <p>
              {isEmpty(profile.location) ? null : (<span>{profile.location}</span>)}
            </p>
            <Link to={`/profile/${profile.handle}`} className="btn btn-info">View Profile</Link>
          </div>
          <div className="col-md-5 d-none d-md-block"
               style={{ marginTop: '5px' }}>
            <h4>Skill Set</h4>
            <ul className="list-group" style={{ flexDirection: 'row' }}>
              {profile.skills.slice(0, 1).map((skill, index) => (
                <li key={index} style={{ listStyleType: 'none', padding: '5px', paddingLeft: '0px' }}>
                  {skill}
                </li>
              ))}
              {profile.skills.slice(1, 6).map((skill, index) => (
                <li key={index} style={{ listStyleType: 'none', padding: '5px' }}>
                  {skill}
                </li>
              ))}
            </ul>
            <h4 className="mt-2">Education</h4>
            {isEmpty(profile.education) ? 'No education listed' : profile.education[0].school}
          </div>
        </div>
      </div>
    )
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileItem;
