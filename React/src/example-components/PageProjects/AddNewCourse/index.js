import React, { useState } from 'react';
import { Label, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { loader } from '../../../reducers/Loader'
import {
  AvForm,
  AvField,
  AvGroup,
} from 'availity-reactstrap-validation';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const AddNewCourse = (props) => {
  const { REACT_APP_API_URL } = process.env;
  const [serverError, setServerError] = useState({});
  if (serverError?.display) {
    setTimeout(() => {
      setServerError({});
    }, 2000);
  }
  let navigate = useHistory();
  async function postValues(formData) {
    return fetch(`${REACT_APP_API_URL}api/create/course`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      body: JSON.stringify(formData)
    });
  }

  const onSubmit = async (e) => {
    // setValue("title",getValues("title").trim());
    var { courseName, courseKey } = document.forms['addNewCourseForm'];
    props.loader(true);
    const token = await postValues({
      name: courseName.value,
      course_key: courseKey.value
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.status == false) {
          props.loader(false);
          setServerError({ display: true, message: res.message });
        } else {
          props.loader(false);
          toast.success('Course has been added', { containerId: 'B' });
          navigate.push('/courses');
        }
      });
  };
  return (
    <>
    <div className="mb-3" onClick={()=>navigate.goBack()} style={{cursor:"pointer"}}><FontAwesomeIcon icon={['fas', 'angle-left']} /> Back</div>
      <div className="card-box mb-5 card">
        {/* <div className="container my-4"> */}
        <div className="card-header-alt p-4">
          <h6 className="font-weight-bold font-size-lg mb-1 text-black">
            Add New Course
          </h6>
        </div>
        <div className="divider"></div>
        <div className="card-body pt-3 px-4 pb-4">
          <AvForm name="addNewCourseForm" onValidSubmit={onSubmit}>
            <AvGroup>
              <Label className="font-weight-bold" for="courseName">
                Name
              </Label>
              <AvField
                name="courseName"
                id="courseName"
                type="text"
                placeholder="Enter the course name"
                validate={{
                  required: {
                    value: true,
                    errorMessage: 'Please enter a course name'
                  },
                  pattern: {
                    value: '[a-zA-Zd]+',
                    errorMessage:
                      'Course name must be composed only with letters and numbers'
                  }
                }}
              />
            </AvGroup>
            <AvGroup>
              <Label className="font-weight-bold" for="courseKey">
                Course key
              </Label>
              <AvField
                name="courseKey"
                id="courseKey"
                type="text"
                placeholder="Enter the course name"
                validate={{
                  required: {
                    value: true,
                    errorMessage: 'Please enter a course key'
                  },
                  pattern: {
                    value: '^[a-zA-Z0-9_-]+$',
                    errorMessage:
                      'Course key must be composed only with letters, numbers, _ , - and no spaces'
                  }
                }}
              />
            </AvGroup>
            <div className="my-2">
              {serverError?.display && (
                <p className="text-danger">{serverError.message}</p>
              )}
            </div>
            <Button color="primary" className="mt-1">
              Submit
            </Button>
          </AvForm>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

const mapStateToProps = () => ({});
  const mapDispatchToProps = (dispatch) => {
    return {
      loader: (payload) => dispatch(loader(payload))
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(AddNewCourse);
