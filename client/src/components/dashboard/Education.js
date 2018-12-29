import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions';

class Education extends React.Component {

  onDeleteClick(id) {
    if (this.props.auth.user.id === '5c26b5525928c71648d1fb99') {
      alert('This action cannot be performed with demo account')
    } else {
      if (window.confirm('Are you sure you want to delete')) {
        this.props.deleteEducation(id);
      }
    }
  }

  render() {
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td width="25%">{edu.school}</td>
        <td width="25%">{edu.degree}</td>
        <td width="30%"><Moment format="YYYY/MM/DD">{edu.from}</Moment> - {edu.to === null ? ('Now') : (<Moment format="YYYY/MM/DD">{edu.to}</Moment>)}</td>
        <td width="20%"><button onClick={this.onDeleteClick.bind(this, edu._id)} className="btn btn-danger">Delete</button></td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {education}
          </tbody>
        </table>
      </div>
    )
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteEducation })(Education);
