import React, { useState } from 'react';

import { Col, FormGroup, Input, Button, Label } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import { useHistory } from 'react-router';
import {
  AvForm,
  AvField,
  AvGroup,
  AvInput,
} from 'availity-reactstrap-validation';
export default function LivePreviewExample() {
  const { REACT_APP_API_URL } = process.env;
  const [serverError, setServerError] = useState({});
  if (serverError?.display) {
    setTimeout(() => {
      setServerError({});
    }, 2000);
  }
  const navigate=useHistory();
  async function postValues(formData) {
    return fetch(`${REACT_APP_API_URL}api/forgot/password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
  }

  const onSubmit = async (e) => {
    var { email } = document.forms['recoverForm'];
    const token = await postValues({
      email: email.value
      })
      .then((data) => data.json())
      .then((res) => {
        if (res.status == false) {
          setServerError({ display: true, message: res.message });
        } else {
          toast.success('Reset password link has been sent to your email address', { containerId: 'B' });
          navigate.push(`/login`)
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
                      <h1 className="display-3 mb-2 font-weight-normal">Forgot Password</h1>
                      <p className="font-size-lg mb-5 text-black-50">
                        Forgot your password? No worries, we're here to help!
                      </p>
                      <AvForm name="recoverForm" onValidSubmit={onSubmit}>
                    <AvGroup>
                        <Label className="font-weight-semibold" for="email">
                          Email Address
                        </Label>
                        <AvField
                          name="email"
                          id="email"
                          type="text"
                          placeholder="Enter your email address"
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
                      <div className="mb-2 text-center">
                          {serverError?.display && (
                            <p className="text-danger">{serverError.message}</p>
                          )
                          }
                          </div>
                      <div className="text-center mt-4">
                      <Button
                        className="font-weight-bold w-100"
                        color="second">
                        Reset Password
                      </Button>
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
