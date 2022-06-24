import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loader } from '../../../reducers/Loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Table,
  Button
} from 'reactstrap';
import {
  AvForm,
  AvField,
} from 'availity-reactstrap-validation';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
export function LivePreviewExample(props) {
  const { REACT_APP_API_URL } = process.env;
  const { form_id } = useParams();
  const [teamList, setTeamList] = useState([]);
  let history = useHistory();
  const [teamId,setTeamId]=useState();
  const [marks,setMarks]=useState();
  const [courseId,setCourseId]=useState();
  //Displaying teams starts here
  const fetchTeams = async (id) => {
    const res = await fetch(
      `${REACT_APP_API_URL}api/form/detail-lecturer/${form_id}`,
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
  const getTeams = async (id) => {
    props.loader(true);
    const detailFromServer = await fetchTeams();
    setCourseId(detailFromServer.course_id)
    setTeamList(detailFromServer.teams);
  };
  useEffect(() => {
    getTeams();
  }, []);
  //Displaying teams ends here

  async function postMarks(formData) {
    return fetch(`${REACT_APP_API_URL}api/add/team-review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      body: JSON.stringify(formData)
    });
  }

  const onSubmit = async (id) => {
    let mark=document.getElementById(id).value;
    if(mark<0 || mark>100 || mark===""){
    }
    else{
      props.loader(true);
    const token = await postMarks({course_id:courseId, team_id:id, form_id:form_id, team_rating: mark})
      .then((data) => data.json())
      .then((res) => {
        if (res.status == false) {
          props.loader(false);
          toast.warn(res.message, { containerId: 'B' });
        } else {
          props.loader(false);
          toast.success('Marks assigned to the team', { containerId: 'B' });
          setMarks("");
          getTeams();
        }
      });
    }
  };

  async function declareResult(id) {
    return fetch(`${REACT_APP_API_URL}api/add/declare-result/${form_id}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
    });
  }

  const onDeclare = async (team_id) => {
    props.loader(true);
    const token = await declareResult(team_id)
      .then((data) => data.json())
      .then((res) => {
        if (res.status == false) {
          props.loader(false);
          toast.warn(res.message, { containerId: 'B' });
        } else {
          props.loader(false);
          toast.success('Result has been declared', { containerId: 'B' });
          getTeams();
        }
      });
  };
  return (
    <>
      <div
        className="mb-3"
        onClick={() => history.goBack()}
        style={{ cursor: 'pointer' }}>
        <FontAwesomeIcon icon={['fas', 'angle-left']} /> Back
      </div>
      <div className="card-box mb-5 card">
        <div className="card-header-alt p-4 d-flex align-items-center justify-content-between">
          <div>
            <h6 className="font-weight-bold font-size-lg mb-1 text-black">
              Team
            </h6>
          </div>
        </div>
        <div className="divider"></div>
        <div className="card-body pt-3 px-4 pb-4">
          <Table responsive className="table-alternate-spaced mb-0 table">
            <thead>
              <tr>
                <th>#</th>
                <th>Team Name</th>
                <th>Marks</th>
                <th>Assign Marks</th>
                <th>Declare Result</th>
              </tr>
            </thead>
            <tbody>
              {teamList?.map((e, index) => (
                <tr key={index}>
                  <td className="px-4" key={e + index}>
                    <div className="font-weight-bold">{index + 1}</div>
                  </td>
                  <td className="px-4">
                    <div className="font-weight-bold">
                      <Link
                        to={`/courses/view-students/${form_id}/${e._id}`}>
                        {e.name}
                      </Link>
                    </div>
                  </td>
                  <td className="px-4">
                    <div className="font-weight-bold">{e.assignmarks}</div>
                  </td>
                  <td className="px-4 py-1">
                    {e.isvalidToMark ?
                    <AvForm name="addMarks" onValidSubmit={()=>onSubmit(e._id)}>
                      <div className="d-flex">
                        <AvField
                          name={e._id}
                          id={e._id}
                          type="number"
                          className="marksField"
                          min="0"
                          max="100"
                          // onChange={(e)=>setMarks(e.target.value)}
                          validate={{
                            required: {
                              value: true,
                              errorMessage: 'Please enter the marks'
                            },
                            pattern: {
                              value: '^[0-9][0-9]?$|^100$',
                              errorMessage: 'Enter values from 0 to 100 only'
                            }
                          }}
                        />
                      <Button
                        type="submit"
                        size="sm"
                        color="neutral-dark"
                        onClick={()=>{setTeamId(e._id)}}
                        className="hover-scale-sm d-40 p-0 btn-icon">
                        <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                      </Button>
                      </div>
                    </AvForm>
                    :
                    e.assignmarks===null?
                      <div>Can't Assign</div> 
                      :
                      <div>Assigned</div>  
                    } 
                  </td>

            <td className="px-4">
              {e.isDeclared?
              <div>Declared</div>
              :
            <Button size="sm" outline color="primary" onClick={()=>{onDeclare(e._id);}}>
              Declare
            </Button>
            }
            </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}


const mapStateToProps = () => ({});
  const mapDispatchToProps = (dispatch) => {
    return {
      loader: (payload) => dispatch(loader(payload))
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(LivePreviewExample)