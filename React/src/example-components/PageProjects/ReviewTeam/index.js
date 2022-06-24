import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux';
import { loader } from '../../../reducers/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Table,
  Button,
  Badge
} from 'reactstrap';

import {
  AvForm,
  AvField,
} from 'availity-reactstrap-validation';
import { useHistory, useParams } from 'react-router';
import { toast } from 'react-toastify';
export function LivePreviewExample(props) {
  const { REACT_APP_API_URL } = process.env;
  const { form_id } = useParams();
  const [totalError,setTotalError]=useState(false);
  if (totalError?.display) {
    setTimeout(() => {
      setTotalError({});
    }, 2000);
  }
  const navigate=useHistory();
  const [courseId,setCourseId]=useState();
  const [teamId,setTeamId]=useState();
  const [serverError, setServerError] = useState({});
  if (serverError?.display) {
    setTimeout(() => {
      setServerError({});
    }, 2000);
  }
  const [studentList,setStudentList]=useState([]);
  let history = useHistory();
  // Displaying teams starts here
  const fetchStudents = async (id) => {
    const res = await fetch(
      `${REACT_APP_API_URL}api/form/detail/${form_id}`,
      {
        method: 'GET',
        headers: {
          'x-access-token': localStorage?.getItem('token')
        }
      }
    );
    props.loader(false);
    const data = await res.json();
    return data;
  };
  const getStudents = async (id) => {
    props.loader(true);
    const formFromServer = await fetchStudents();
    setCourseId(formFromServer.course_id);
    setTeamId(formFromServer?.teamDetail?._id);
    setStudentList(formFromServer.teamMembers);
  };
  useEffect(() => {
    getStudents();
  }, []);
  // Displaying teams ends here
  
  async function postValues(formData) {
    return fetch(`${REACT_APP_API_URL}api/add/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      body: JSON.stringify(formData)
    });
  }
  const onSubmit=async ()=>{
    var students = document.getElementsByClassName("student");
    let total=0;
    let teamReview=[];
    for (var i = 0; i < students.length; i++) {
      total=parseInt(students[i].value)+total;
      let studentId=students[i].name;
      let studentMarks=parseInt(students[i].value);
      teamReview.push({"student_id":studentId, "review":studentMarks})
   }
   if(total!==100){
     setTotalError({display:true,message:`Total= ${total}, it should be 100`})
   }
   else{
    props.loader(true);
    const token = await postValues({"reviews":teamReview, "course_id":courseId, "team_id":teamId, "form_id":form_id, "rating":100})
    .then((data) => data.json())
    .then((res) => {
      if (res.status == false) {
        props.loader(false);
        setServerError({ display: true, message: res.message });
      } else {
        props.loader(false);
        toast.success('Your reviews have been saved', { containerId: 'B' });
        navigate.push(`/courses/forms/${courseId}`)
      }
    });
   }
  }

  

  return (
    <>
    <div className="mb-3" onClick={()=>history.goBack()} style={{cursor:"pointer"}}><FontAwesomeIcon icon={['fas', 'angle-left']} /> Back</div>
      <div className="card-box mb-5 card">
        <div className="card-header-alt p-4 d-flex align-items-center justify-content-between">
          <div>

            <h5 className="font-weight-bold font-size-lg mb-1 text-black">Review</h5>
            <Badge className="m-1" color="warning">
              Pending
            </Badge>
            <p style={{margin:"0",padding:"0"}}>How much each one of your team members including you contributed to this coursework out of 100% ?</p>
            <p style={{margin:"0",padding:"0"}}>Note:- The total of all % efforts assigned to each member should be precise 100%</p>
          </div>
        </div>
        <div className="divider"></div>
        <div className="card-body pt-3 px-4 pb-4">
        {studentList.length>0?
          <AvForm name="addNewForm" onValidSubmit={onSubmit}>
          <Table
            responsive
            className="table-alternate-spaced mb-0 table">
            <thead>
              <tr>
                <th>#</th>
                <th>Team Members</th>
                <th>Marks</th>
              </tr>
            </thead>
            
            <tbody>
              {studentList?.map((e, index) =>
                <tr key={index}>
                  <td className="px-2 py-1" key={e + index}><div className="font-weight-bold">{index + 1}</div></td>
                  <td className="px-2 py-1"><div className="font-weight-bold">{e.fullname}</div></td>
                  <td className="px-2 py-1">
                  
              
                <AvField
                  name={e._id}
                  id={e._id}
                  className="student"
                  type="number"
                  placeholder="Enter the marks"
                  min="0"
                  validate={{
                    required: {
                      value: true,
                      errorMessage: 'Please enter the marks'
                    },
                    pattern: {
                      value: '^[0-9][0-9]?$|^100$',
                      errorMessage:
                        'Enter values from 0 to 100 only'
                    }
                  }}
                />
                  
                  </td>
                </tr>
              )}

            </tbody>
          </Table>
          <div className="my-2">
              {totalError?.display && (
                <p className="text-danger">{totalError.message}</p>
                )}
            </div>
            <div className="my-2">
              {serverError?.display && (
                <p className="text-danger">{serverError.message}</p>
              )}
            </div>
          <Button color="primary" className="mt-4">
              Submit
            </Button>
          </AvForm>
                :
                <p><strong>You are not added in any team.</strong></p>
                }
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
    loader: (payload) => dispatch(loader(payload))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LivePreviewExample);