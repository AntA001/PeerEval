import React, { useState } from 'react';
import { Col, FormGroup, Button, Label } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../../assets/images/dummy-logo.png';
import {
  AvForm,
  AvField,
  AvGroup,
  AvInput,
  AvFeedback
} from 'availity-reactstrap-validation';
import { connect } from 'react-redux';
import { saveUser } from '../../../reducers/User';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export function LivePreviewExample(props) {
  const { REACT_APP_API_URL } = process.env;
  const [accountType, setAccountType] = useState('lecturer');
  const [serverError, setServerError] = useState({});
  if (serverError?.display) {
    setTimeout(() => {
      setServerError({});
    }, 2000);
  }
  let navigate = useHistory();

  async function registerLecturer(details) {
    return fetch(`${REACT_APP_API_URL}api/register/lecturer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(details)
    });
  }
  async function registerStudent(details) {
    return fetch(`${REACT_APP_API_URL}api/register/student`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(details)
    });
  }
  async function loginUser(credentials) {
    return fetch(`${REACT_APP_API_URL}api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
  }
  const onSubmit = async (e) => {
    var { name, university, registration, email, password } = document.forms[
      'registerForm'
    ];
    if (accountType === 'lecturer') {
      const submittedData = {
        fullname: name.value,
        university: university.value,
        email: email.value,
        password: password.value
      };
      const token = await registerLecturer(submittedData)
        .then((data) => data.json())
        .then((res) => {
          if (res.status == false) {
            setServerError({ display: true, message: res.message });
          } else {
            toast.success('You are registered successfully', {
              containerId: 'B'
            });
            const onSubmit = async (e) => {
              const token = await loginUser({
                email: email.value,
                password: password.value
              })
                .then((data) => data.json())
                .then((res) => {
                  if (res.status == false) {
                    setServerError({ display: true, message: res.message });
                  } else {
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('cuser', JSON.stringify(res.data));
                    props.saveUser(res.data);
                    navigate.push('/courses');
                  }
                });
            };
            onSubmit();
          }
        });
    } else {
      const submittedData = {
        fullname: name.value,
        registration_number: registration.value,
        email: email.value,
        password: password.value
      };
      const token = await registerStudent(submittedData)
        .then((data) => data.json())
        .then((res) => {
          if (res.status == false) {
            setServerError({ display: true, message: res.message });
          } else {
            toast.success('You are registered successfully', {
              containerId: 'B'
            });
            const onSubmit = async (e) => {
              const token = await loginUser({
                email: email.value,
                password: password.value
              })
                .then((data) => data.json())
                .then((res) => {
                  if (res.status == false) {
                    setServerError({ display: true, message: res.message });
                  } else {
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('cuser', JSON.stringify(res.data));
                    props.saveUser(res.data);
                    navigate.push('/courses');
                  }
                });
            };
            onSubmit();
          }
        });
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="app-wrapper bg-white min-vh-100">
        <div className="app-main min-vh-100">
          <div className="app-content p-0">
            <div className="app-content--inner d-flex align-items-center">
              <div className="flex-grow-1 w-100 d-flex align-items-center">
                <div className="bg-composed-wrapper--content py-5">
                  <Col md="7" lg="5" xl="4" className="mx-auto">
                    <h1 className="display-3 mb-4 font-weight-normal">
                      Create Account
                    </h1>

                    <AvForm name="registerForm" onValidSubmit={onSubmit}>
                      <AvGroup>
                        <Label className="font-weight-semibold" for="name">
                          Full Name
                        </Label>
                        <AvField
                          name="name"
                          id="name"
                          type="text"
                          validate={{
                            required: {
                              value: true,
                              errorMessage: 'Please enter a name'
                            },
                            pattern: {
                              value: '[a-zA-Zd]+',
                              errorMessage:
                                'Your name must be composed only with letters and numbers'
                            },
                            maxLength: {
                              value: 255,
                              errorMessage:
                                'You can not enter this field with more than 255 characters'
                            }
                          }}
                        />
                      </AvGroup>
                      <AvGroup>
                        <Label
                          className="font-weight-semibold"
                          for="university">
                          Account Type
                        </Label>
                        <AvField
                          type="select"
                          name="type"
                          placeholder="Select the user type"
                          id="type"
                          onChange={(e) => setAccountType(e.target.value)}>
                          <option value="lecturer">Lecturer</option>
                          <option value="student">Student</option>
                        </AvField>
                        <AvFeedback>Account type is required.</AvFeedback>
                      </AvGroup>
                      {accountType === 'lecturer' ? (
                        <AvGroup>
                          <Label
                            className="font-weight-semibold"
                            for="university">
                            University
                          </Label>
                          <AvField
                            name="university"
                            id="university"
                            type="text"
                            validate={{
                              required: {
                                value: true,
                                errorMessage: 'Please enter the university name'
                              },
                              pattern: {
                                value: '[a-zA-Zd]+',
                                errorMessage:
                                  'Your university name must be composed only with letters and numbers'
                              }
                            }}
                          />
                        </AvGroup>
                      ) : (
                        <AvGroup>
                          <Label
                            className="font-weight-semibold"
                            for="registration">
                            Registration Code
                          </Label>
                          <AvField
                            name="registration"
                            id="registration"
                            type="text"
                            validate={{
                              required: {
                                value: true,
                                errorMessage:
                                  'Please enter the registration code'
                              },
                              pattern: {
                                value: '^[a-zA-Z0-9_-]+$',
                                errorMessage:
                                  'Your registration code must be composed only with letters, numbers, _ and -'
                              }
                            }}
                          />
                        </AvGroup>
                      )}
                      <AvGroup>
                        <Label className="font-weight-semibold" for="email">
                          Email
                        </Label>
                        <AvField
                          name="email"
                          id="email"
                          type="text"
                          validate={{
                            required: {
                              value: true,
                              errorMessage: 'Please enter the email name'
                            },
                            pattern: {
                              value: '[a-z0-9._%+-]+@[a-z0-9.-]+[.][a-z]{2,4}$',
                              errorMessage:
                                'Please enter a correct email address'
                            }
                          }}
                        />
                      </AvGroup>
                      <AvGroup>
                        <Label className="font-weight-semibold" for="password">
                          Password
                        </Label>
                        <AvField
                          name="password"
                          id="password"
                          type="password"
                          validate={{
                            required: {
                              value: true,
                              errorMessage: 'Please enter the password'
                            },
                            minLength: {
                              value: 6,
                              errorMessage:
                                'Your password must be of more than 6 characters'
                            }
                          }}
                        />
                      </AvGroup>
                      <AvGroup check>
                        <Label check>
                          <AvInput type="checkbox" name="checkbox" required />{' '}
                          By checking this box, you agree to our terms of
                          service and privacy policy.
                        </Label>
                      </AvGroup>
                      <FormGroup>
                        <div className="text-center my-4">
                          <Button
                            color="second"
                            className="font-weight-bold w-100">
                            Create Account
                          </Button>
                        </div>
                      </FormGroup>
                      <div className="my-2 text-center">
                        {serverError?.display && (
                          <p className="text-danger">{serverError.message}</p>
                        )}
                      </div>
                    </AvForm>
                    <div className="text-center text-black-50 mt-3">
                      Already have an account?{' '}
                      <Link to="/login" className="text-first">
                        Login
                      </Link>
                    </div>
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
    saveUser: (payload) => dispatch(saveUser(payload))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LivePreviewExample);
