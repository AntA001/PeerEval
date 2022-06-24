import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loader } from '../../../reducers/Loader'
import { Label, Button } from 'reactstrap';
import {
  AvForm,
  AvField,
  AvGroup,
  AvFeedback,
} from 'availity-reactstrap-validation';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const AddNewTeam = (props) => {
  const { REACT_APP_API_URL } = process.env;
  const { course_id } = useParams();
  const [studentList,setStudentList]=useState([]);
  const [serverError, setServerError] = useState({});
  const [teamStudent,setTeamStudent]=useState([]);
  if(serverError?.display){
    setTimeout(()=>{
      setServerError({});
    },2000)
  }
 
  const navigate=useHistory();
  async function postValues(formData) {
    return fetch(`${REACT_APP_API_URL}api/create/team`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      body: JSON.stringify(formData)
    });
  }

  const onSubmit = async (e) => {
    var { teamName } = document.forms['addNewTeam'];
    props.loader(true);
    const token = await postValues({
      name: teamName.value,
      student_ids: teamStudent,
      course_id: course_id
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.status == false) {
          props.loader(false);
          setServerError({ display: true, message: res.message });
        } else {
          props.loader(false);
          toast.success('Team has been added', { containerId: 'B' });
          navigate.push(`/courses/view-course/${course_id}`)
        }
      });
  };

  const selectedStudents=()=>{
    var list=document.getElementById("studentsList");
    var selected = [...list.selectedOptions].map(option => option.value);
    setTeamStudent(selected);
  }

     //Displaying students starts here
     const fetchStudents = async (id) => {
      const res = await fetch(`${REACT_APP_API_URL}api/course/detail/${course_id}`, {
        method: 'GET',
        headers: {
          'x-access-token': localStorage?.getItem('token')
        }
      });
      const data = await res.json();
      return data;
    };
    const getStudents = async (id) => {
      const studentsFromServer = await fetchStudents();
      const array=studentsFromServer.subscriberNotInTeam;
      setStudentList(array);
    };
    useEffect(() => {
      getStudents();
    }, []);
    //Displaying students ends here
  return (
    <>
    <div className="mb-3" onClick={()=>navigate.goBack()} style={{cursor:"pointer"}}><FontAwesomeIcon icon={['fas', 'angle-left']} /> Back</div>
      <div className="card-box mb-5 card">
      {/* <div className="container my-4"> */}
      <div className="card-header-alt p-4">
      <h5 className="font-weight-bold font-size-xl mb-1 text-black">Add a new team</h5>
      </div>
      <div className="divider"></div>
      <div className="card-body pt-3 px-4 pb-4">
        <AvForm onValidSubmit={onSubmit} name="addNewTeam">
          <AvGroup>
            <Label className="font-weight-bold" for="teamName">
              Name
            </Label>
            <AvField
                name="teamName"
                id="teamName"
                type="text"
                placeholder="Enter the team name"
                validate={{
                  required: {
                    value: true,
                    errorMessage: 'Please enter a team name'
                  },
                  pattern: {
                    value: '[a-zA-Zd]+',
                    errorMessage:
                      'Team name must be composed only with letters and numbers'
                  }
                }}
              />
          </AvGroup>
          <AvGroup>
            <Label className="font-weight-bold" for="studentsList">
              Students
            </Label>
            <AvField
              type="select"
              id="studentsList"
              name="studentsList"
              className="studentsList"
              onChange={selectedStudents}
              helpMessage="Select+Drag /Ctrl+Select"
              multiple
              validate={{
                required: {
                  value: true,
                  errorMessage: 'Please select some students'
                }
              }}>
              {studentList.map((e) => (
                <option key={e._id} value={e._id}>{e.fullname}</option>
              ))}
            </AvField>
            <AvFeedback>Please select some students</AvFeedback>
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
  export default connect(mapStateToProps, mapDispatchToProps)(AddNewTeam);
