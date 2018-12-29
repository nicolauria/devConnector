import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileActions';

class Experience extends React.Component {

  onDeleteClick(id) {
    if (this.props.auth.user.id === '5c26b5525928c71648d1fb99') {
      alert('This action cannot be performed with demo account')
    } else {
      if (window.confirm('Are you sure you want to delete')) {
        this.props.deleteExperience(id);
      }
    }
  }

  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td width="25%">{exp.company}</td>
        <td width="25%">{exp.title}</td>
        <td width="30%"><Moment format="YYYY/MM/DD">{exp.from}</Moment> - {exp.to === null ? ('Now') : (<Moment format="YYYY/MM/DD">{exp.to}</Moment>)}</td>
        <td width="20%"><button onClick={this.onDeleteClick.bind(this, exp._id)} className="btn btn-danger">Delete</button></td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {experience}
          </tbody>
        </table>
      </div>
    )
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteExperience })(Experience);
