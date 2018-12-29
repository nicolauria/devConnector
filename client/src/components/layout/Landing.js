import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

class Landing extends React.Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  async demoLogin() {
    const user = { email: 'nicolauria@outlook.com', password: 'secret' };
    await this.props.loginUser(user);
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Developer Connector
                </h1>
                <p className="lead"> Create a developer profile/portfolio, share posts and get help from other developers</p>
                <hr />
                <div className="d-flex justify-content-center">
                  <Link to="/register" className="btn btn-lg btn-info mr-2" style={{ height: '49px' }}>Sign Up</Link>
                  <span className="d-flex flex-column" style={{ width: '10%' }}>
                    <Link to="/login" className="btn btn-lg btn-light">Login</Link>
                    <small className="demo-login mt-1" onClick={this.demoLogin.bind(this)}>
                      Demo Login
                    </small>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { loginUser })(withRouter(Landing));
