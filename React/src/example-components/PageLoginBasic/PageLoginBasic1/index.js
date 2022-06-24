import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { loader } from '../../../reducers/Loader'
import { saveUser } from '../../../reducers/User';
import { Col, Button, Label } from 'reactstrap';
// import queryString from 'query-string';
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
} from 'availity-reactstrap-validation';
// import logo from '../../../assets/images/dummy-logo.png';
// import { toast } from 'react-toastify';

export function LivePreviewExample(props) {
  const { REACT_APP_API_URL } = process.env;
  const [serverError, setServerError] = useState({});
  if (serverError?.display) {
    setTimeout(() => {
      setServerError({});
    }, 5000);
  }
  const navigate = useHistory();
  // const location= useLocation();
  // let params = queryString.parse(location.search)
  // if(params.status==="verifyed"){
  // toast.success('You email has been verified', {
  //   containerId: 'B'
  // });
  // navigate.push("/login");
  // }

  async function loginUser(credentials) {
    return fetch(`${REACT_APP_API_URL}api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
  }
  const onSubmit = async (e) => {
    var { email, password } = document.forms['loginForm'];
    props.loader(true);
    const token = await loginUser({
      email: email.value,
      password: password.value
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.status == false) {
          props.loader(false);
          setServerError({ display: true, message: res.message });
        } else {
          props.loader(false);
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('cuser', JSON.stringify(res.data));
          props.saveUser(res.data);
          navigate.push('/courses');
        }
      });
  };
  return (
    <>
      <div className="app-wrapper bg-white min-vh-100">
        <div className="app-main min-vh-100">
          <div className="app-content p-0">
            <div className="app-content--inner d-flex align-items-center">
              <div className="flex-grow-1 w-100 d-flex align-items-center">
                <div className="bg-composed-wrapper--content py-5">
                  <Col md="7" lg="5" xl="4" className="mx-auto">
                    <h1 className="display-3 mb-3 font-weight-normal">Login</h1>
                    <p className="font-size-lg mb-3 text-black-50">
                      Fill in the fields below to login your account
                    </p>
                    <AvForm name="loginForm" onValidSubmit={onSubmit}>
                      <div>
                        <div className="form-group my-3">
                          <AvGroup>
                            <Label className="font-weight-bold" for="email">
                              Email Address
                            </Label>
                            <AvInput
                              type="email"
                              name="email"
                              id="email"
                              required
                            />
                            <AvFeedback>Email is required.</AvFeedback>
                          </AvGroup>
                        </div>
                        <div className="form-group my-3">
                          <AvGroup>
                            <Label className="font-weight-bold" for="password">
                              Password
                            </Label>
                            <AvInput
                              type="password"
                              name="password"
                              id="password"
                              required
                            />
                            <AvFeedback>Password is required.</AvFeedback>
                          </AvGroup>
                        </div>
                        <div className="d-flex justify-content-between">
                          <AvGroup check>
                            <Label check>
                              <AvInput type="checkbox" name="checkbox" />{' '}
                              Remember me
                            </Label>
                          </AvGroup>
                          <div>
                            <Link to="/recover-password" className="text-first">
                              Forgot password
                            </Link>
                          </div>
                        </div>
                        <div className="text-center my-3">
                          <Button
                            color="second"
                            className="font-weight-bold w-100">
                            Sign in
                          </Button>
                        </div>
                        <div className="mb-2 text-center">
                          {serverError?.display && (
                            <p className="text-danger">{serverError.message}</p>
                          ) 
                          }
                        </div>
                        <div className="text-center text-black-50 mt-3">
                          Don't have an account?{' '}
                          <Link to="/register" className="text-first">
                            Sign up
                          </Link>
                        </div>
                      </div>
                    </AvForm>
                  </Col>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => ({
  user: state.User.user
});
const mapDispatchToProps = (dispatch) => {
  return {
    saveUser: (payload) => dispatch(saveUser(payload)),
    loader: (payload) => dispatch(loader(payload))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LivePreviewExample);
