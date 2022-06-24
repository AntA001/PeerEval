import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loader } from '../../../reducers/Loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Label,
  Button
} from 'reactstrap';
import {
  AvForm,
  AvField,
  AvGroup,
} from 'availity-reactstrap-validation';
import { toast, ToastContainer } from 'react-toastify';
import DatePicker from 'react-datepicker';
import { useHistory, useParams } from 'react-router';

const AddNewForm = (props) => {
  const { REACT_APP_API_URL } = process.env;
  const today=new Date();
  today.setHours(23);
  today.setMinutes(59);
  today.setSeconds(59);
  today.setMilliseconds(999);
  const [startDate, setStartDate] = useState(today);
  const [serverError, setServerError] = useState({});
  if (serverError?.display) {
    setTimeout(() => {
      setServerError({});
    }, 2000);
  }
  const { course_id } = useParams();
  const navigate = useHistory();
  async function postValues(formData) {
    return fetch(`${REACT_APP_API_URL}api/create/form`, {
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
    var { formName } = document.forms['addNewForm'];
    props.loader(true);
    const token = await postValues({
      name: formName.value,
      expire_at: startDate,
      course_id: course_id
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.status == false) {
          props.loader(false);
          setServerError({ display: true, message: res.message });
        } else {
          props.loader(false);
          toast.success('Form has been added', { containerId: 'B' });
          navigate.push(`/courses/view-course/${course_id}`);
        }
      });
  };

  return (
    <>
    <div className="mb-3" onClick={()=>navigate.goBack()} style={{cursor:"pointer"}}><FontAwesomeIcon icon={['fas', 'angle-left']} /> Back</div>
      <div className="card-box mb-5 card">
        <div className="card-header-alt p-4">
          <h6 className="font-weight-bold font-size-lg mb-1 text-black">
            Add New Form
          </h6>
        </div>
        <div className="divider"></div>
        <div className="card-body pt-3 px-4 pb-4">
          <AvForm name="addNewForm" onValidSubmit={onSubmit}>
            <AvGroup>
              <Label className="font-weight-bold" for="formName">
                Name
              </Label>
              <AvField
                name="formName"
                id="formName"
                type="text"
                placeholder="Enter the form name"
                validate={{
                  required: {
                    value: true,
                    errorMessage: 'Please enter a form name'
                  },
                  pattern: {
                    value: '[a-zA-Zd]+',
                    errorMessage:
                      'Form name must be composed only with letters and numbers'
                  }
                }}
              />
            </AvGroup>
            <AvGroup>
              <Label className="font-weight-bold" for="deadline">
                Deadline
              </Label>
              {/* <AvInput
                type="date"
                name="deadline"
                id="deadline"
                placeholder="Enter the deadline"
                min={new Date().toISOString().split('T')[0]}
                required
              />
              <AvFeedback>Deadline is required.</AvFeedback> */}
              <DatePicker
                className="form-control"
                selected={startDate}
                minDate={new Date()}
                dateFormat="dd/MM/yyyy"
                popperPlacement="bottom"
                onChange={(date) => {
                  date.setHours(23);
                  date.setMinutes(59);
                  date.setSeconds(59);
                  date.setMilliseconds(999);
                  setStartDate(date);
                }}
                placeholderText="DD/MM/YYYY"
                showPopperArrow={false}
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
    </>
  );
};

const mapStateToProps = () => ({});
  const mapDispatchToProps = (dispatch) => {
    return {
      loader: (payload) => dispatch(loader(payload))
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(AddNewForm);
