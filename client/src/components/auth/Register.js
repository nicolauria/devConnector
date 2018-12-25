import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.props;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form noValidate onSubmit={this.onSubmit}>
              <TextFieldGroup
                name="name"
                placeHolder="Name"
                value={this.state.name}
                error={errors.name}
                type="text"
                onChange={this.onChange}
                disabled={false} />
              <TextFieldGroup
                name="email"
                placeHolder="Email Address"
                value={this.state.email}
                error={errors.email}
                type="email"
                info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                onChange={this.onChange}
                disabled={false} />
              <TextFieldGroup
                name="password"
                placeHolder="Password"
                value={this.state.password}
                error={errors.password}
                type="password"
                onChange={this.onChange}
                disabled={false} />
              <TextFieldGroup
                name="password2"
                placeHolder="Confirm Password"
                value={this.state.password2}
                error={errors.password2}
                type="password"
                onChange={this.onChange}
                disabled={false} />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(Register);
