import React, { useState } from 'react';

import { connect } from 'react-redux';
import { saveUser } from '../../../reducers/User';
import { loader } from '../../../reducers/Loader'
import {
  Container,
  Button,
  Label
} from 'reactstrap';
import {
  AvForm,
  AvField,
  AvGroup,
} from 'availity-reactstrap-validation';

import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';


import { Upload, Check, X, User } from 'react-feather';
import { useEffect } from 'react';


export function LivePreviewExample(props) {
  const { REACT_APP_API_URL } = process.env;
  const [inputBg, setInputBg] = useState(false);
  const toggleInputBg = () => setInputBg(!inputBg);
  const [imgData, setImgData] = useState(props.user.pictures !== null && `${REACT_APP_API_URL}${props.user.pictures}`);
  const [serverError, setServerError] = useState({});
  if (serverError?.display) {
    setTimeout(() => {
      setServerError({});
    }, 2000);
  }



  const [files, setFiles] = useState([]);
  const {
    isDragActive,
    isDragAccept,
    isDragReject,
    open,
    getRootProps,
    getInputProps
  } = useDropzone({
    noClick: true,
    noKeyboard: true,
    multiple: false,
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
  });

  const thumbs = files.map((file) => (
    <div
      key={file.name}
      className="rounded-circle avatar-image overflow-hidden d-140 bg-neutral-success text-center font-weight-bold text-success d-flex justify-content-center align-items-center">
      <img
        className="img-fluid img-fit-container rounded-sm"
        src={file.preview}
        alt="..."
      />
    </div>
  ));

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  async function updateLecturer(formData) {
    return fetch(`${REACT_APP_API_URL}api/update/lecturer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      body: JSON.stringify(formData)
    });
  }
  async function updateStudent(formData) {
    return fetch(`${REACT_APP_API_URL}api/update/student`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      body: JSON.stringify(formData)
    });
  }

  const onSubmit = async (e) => {
    if(props.user.role==="lecturer"){
    var { name,university } = document.forms['editProfile'];
    props.loader(true);
    const token = await updateLecturer({fullname:name.value,university:university.value})
      .then((data) => data.json())
      .then((res) => {
        if (res.status == false) {
          props.loader(false);
          setServerError({ display: true, message: res.message });
        } else {
          props.loader(false);
          localStorage.setItem("cuser", JSON.stringify(res.data));
          props.saveUser(res.data);
          toast.success('Your profile has been updated', { containerId: 'B' });
          toast.clearWaitingQueue({ containerId: "B" });
        }
      });
    }
    else{
      var { name,registration } = document.forms['editProfile'];
      props.loader(true);
    const token = await updateStudent({fullname:name.value,registration_number:registration.value})
      .then((data) => data.json())
      .then((res) => {
        if (res.status == false) {
          props.loader(false);
          setServerError({ display: true, message: res.message });
        } else {
          props.loader(false);
          localStorage.setItem("cuser", JSON.stringify(res.data));
          props.saveUser(res.data);
          toast.success('Your profile has been updated', { containerId: 'B' });
        }
      });
    }
  };

  async function uploadPicture(picture) {
    let formData = new FormData();
    formData.append('picture', picture);
    return fetch(`${REACT_APP_API_URL}api/upload/profile/picture`, {
      method: 'POST',
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
      body: formData
    });
  }
  const onChangePicture = async e => {
    if (e.target.files[0]) {
      if(e.target.files[0]['type'].split('/')[0] !== 'image'){
        toast.warn('Choose a valid image', { containerId: 'B' })
      }
      else{
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);

      await uploadPicture(e.target.files[0]).then(data => data.json())
        .then(res => {
          if (res.status == true) {
            localStorage.setItem('cuser', JSON.stringify(res.data));
            props.saveUser(res.data);
            toast.success('Profile picture has been updated', { containerId: 'B' });
          }
        })
      }
    }
  };

  return (
    <>
      <div className="app-inner-content-layout">
        <div className="app-inner-content-layout--main bg-white p-0">
          <div className="hero-wrapper rounded-bottom shadow-xxl bg-composed-wrapper bg-second">
            <div className="flex-grow-1 w-100 d-flex align-items-center">
              <div
                className="bg-composed-wrapper--image opacity-3"
                // style={{ backgroundImage: 'url(' + hero1 + ')' }}
              />
              <div className="bg-composed-wrapper--bg bg-deep-sky opacity-4" />
              <div className="bg-composed-wrapper--content px-3">
                <Container className="pt-4">
                  <div className="d-block d-md-flex align-items-start py-5">
                    {props.user.pictures===null ?
                      <div className="dropzone rounded-circle shadow-sm-dark mr-md-3">
                      <div
                        {...getRootProps({
                          className: 'dropzone-upload-wrapper'
                        })}>
                        
                        <input {...getInputProps()} onChange={onChangePicture} accept="image/jpeg, image/png" />
                        <div className="dropzone-inner-wrapper d-140 rounded-circle dropzone-avatar">
                          <div className="avatar-icon-wrapper d-140 rounded-circle m-2">
                            <Button
                              color="link"
                              onClick={open}
                              className="avatar-button badge shadow-sm-dark btn-icon badge-position badge-position--bottom-right border-2 text-indent-0 d-40 badge-circle badge-first text-white">
                              <Upload className="d-20" />
                            </Button>

                            <div>
                              {isDragAccept && (
                                <div className="rounded-circle overflow-hidden d-140 bg-success text-center font-weight-bold text-white d-flex justify-content-center align-items-center">
                                  <Check className="d-40" />
                                </div>
                              )}
                              {isDragReject && (
                                <div className="rounded-circle overflow-hidden d-140 bg-danger text-center font-weight-bold text-white d-flex justify-content-center align-items-center">
                                  <X className="d-60" />
                                </div>
                              )}
                              {!isDragActive && (
                                <div className="rounded-circle overflow-hidden d-140 bg-second text-center font-weight-bold text-white-50 d-flex justify-content-center align-items-center">
                                  <User className="d-50" />
                                </div>
                              )}
                            </div>

                            {thumbs.length > 0 && <div>{thumbs}</div>}
                          </div>
                        </div>
                      </div>
                    </div>
                    :
                    <div className="dropzone mr-md-3">
                      <div className='profile-div'>
                      <img src={imgData} alt="" width="100%" height="100%" />
                      </div>
                      <input {...getInputProps()} onChange={onChangePicture} accept="image/jpeg, image/png"/>
                      <div className="avatar-icon-wrapper rounded-circle m-2">
                            <Button
                              color="link"
                              onClick={open}
                              className="avatar-button badge shadow-sm-dark btn-icon badge-position badge-position--bottom-right border-2 text-indent-0 d-40 badge-circle badge-first text-white">
                              <Upload className="d-20" />
                            </Button>
                      </div>
                      </div>
                      }
                    <div className="d-flex text-white flex-column pl-md-2">
                      <div className="d-block d-md-flex align-items-center">
                        <div className="my-3 my-md-0">
                          <div className="d-flex align-items-end">
                            <div className="font-size-xxl font-weight-bold">
                              @{props.user.fullname}
                            </div>
                          </div>
                          <div className="font-weight-bold mt-1 font-size-lg text-white-50">
                            {props.user.role}
                          </div>
                        </div>
                      </div>
                      <div className="font-size-lg">

                      </div>
                    </div>
                  </div>
                </Container>
              </div>
            </div>
          </div>


      <div className="card-box my-5 card">
        <div className="card-header-alt p-4">
          <h6 className="font-weight-bold font-size-lg mb-1 text-black">
            Edit Profile
          </h6>
        </div>
        <div className="divider"></div>
        <div className="card-body pt-3 px-4 pb-4">
          <AvForm name="editProfile" onValidSubmit={onSubmit}>
          <AvGroup>
                        <Label className="font-weight-semibold" for="name">
                          Full Name
                        </Label>
                        <AvField
                          name="name"
                          id="name"
                          type="text"
                          defaultValue={props.user.fullname}
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
                      {props.user.role==="lecturer"?
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
                            defaultValue={props.user.university}
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
                        :
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
                            defaultValue={props.user.registration_number}
                            readOnly
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
                      }
                      <AvGroup>
                        <Label className="font-weight-semibold" for="email">
                          Email
                        </Label>
                        <AvField
                          name="email"
                          id="email"
                          type="text"
                          defaultValue={props.user.email}
                          readOnly
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
            <div className="my-2">
              {serverError?.display && (
                <p className="text-danger">{serverError.message}</p>
              )}
            </div>
            <Button color="primary" className="mt-4">
              Submit
            </Button>
          </AvForm>
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