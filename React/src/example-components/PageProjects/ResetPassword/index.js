import React, { useEffect, useState } from 'react';

import { Col, FormGroup, Input, Button, Label } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import { useHistory, useLocation } from 'react-router';
import {
  AvForm,
  AvField,
  AvGroup,
  AvInput,
} from 'availity-reactstrap-validation';
import queryString from 'query-string';
export default function LivePreviewExample() {
  const { REACT_APP_API_URL } = process.env;
  const [serverError, setServerError] = useState({});
  const [matchError, setMatchError] = useState({});
  const [flag,setFlag]=useState(false);
  if (serverError?.display) {
    setTimeout(() => {
      setServerError({});
    }, 2000);
  }
  const navigate=useHistory();
  const location= useLocation();
  let params = queryString.parse(location.search)
//   console.log(params.otp,params.email)
  const [newPassword,setNewPassword]=useState();
  const [confirmPassword,setConfirmPassword]=useState();

  useEffect(()=>{
      if(newPassword?.length>5 ||confirmPassword?.length>5){
      if(newPassword!==confirmPassword){
        setMatchError({ display: true, message: "Your password does not match" });
        setFlag(false);
      }
      else{
        setMatchError({});
        setFlag(true);
      }
    }
  },[newPassword,confirmPassword])

  async function postValues(formData) {
    return fetch(`${REACT_APP_API_URL}api/reset/password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
  }

  const onSubmit = async (e) => {
      if(flag){
    const token = await postValues({
        new_password: newPassword,
        email: params.email,
        reset_code: params.otp
      })
      .then((data) => data.json())
      .then((res) => {
        if (res.status == false) {
          setServerError({ display: true, message: res.message });
        } else {
          toast.success('Your password has been changed', { containerId: 'B' });
          navigate.push(`/login`)
        }
      });
    }
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
                      <h1 className="display-3 mb-2 font-weight-normal">Reset Password</h1>
                      <p className="font-size-lg mb-5 text-black-50">
                      </p>
                      <AvForm name="resetForm" onValidSubmit={onSubmit}>
                    <AvGroup>
                        <Label className="font-weight-semibold" for="email">
                          New Password
                        </Label>
                        <AvField
                          name="password"
                          id="password"
                          type="password"
                          placeholder="Enter the new password"
                          value={newPassword}
                          onChange={(e)=>setNewPassword(e.target.value)}
                          validate={{
                            required: {
                              value: true,
                              errorMessage: 'Please enter the email name'
                            },
                            minLength: {
                                value: 6,
                                errorMessage:
                                  'Your password must be of more than 6 characters'
                              }
                          }}
                        />
                      </AvGroup>
                    <AvGroup>
                        <Label className="font-weight-semibold" for="email">
                          Confirm Password
                        </Label>
                        <AvField
                          name="confirmPassword"
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm the password"
                          value={confirmPassword}
                          onChange={(e)=>setConfirmPassword(e.target.value)}
                          validate={{
                            required: {
                              value: true,
                              errorMessage: 'Please confirm your password'
                            },
                            minLength: {
                                value: 6,
                                errorMessage:
                                  'Your password must be of more than 6 characters'
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
                      <div className="mb-2 text-center">
                          {matchError?.display && (
                            <p className="text-danger">{matchError.message}</p>
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
