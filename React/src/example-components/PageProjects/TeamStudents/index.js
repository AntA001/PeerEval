import React,{useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { loader } from '../../../reducers/Loader'
import {
  Table
} from 'reactstrap';


import { useHistory, useParams } from 'react-router';

export function LivePreviewExample(props) {
  const { REACT_APP_API_URL } = process.env;
  const { team_id } = useParams();
  const [studentList, setStudentList]=useState([]);
  const [team, setTeam]=useState();
  let history=useHistory();

  const fetchStudents = async (id) => {
    const res = await fetch(
      `${REACT_APP_API_URL}api/team/detail/${team_id}`,
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
    const teamFromServer = await fetchStudents();
    const array = teamFromServer.students;
    setTeam(teamFromServer.name);
    setStudentList(array);
  };
  useEffect(() => {
    getStudents();
  }, []);
  return (
    <>

        <div className="mb-3" onClick={()=>history.goBack()} style={{cursor:"pointer"}}><FontAwesomeIcon icon={['fas', 'angle-left']} /> Back</div>
          <div className="card-box mb-5 card">
            <div className="card-header-alt p-4">
              <h6 className="font-weight-bold font-size-lg mb-1 text-black">{team}</h6>
            </div>
            <div className="divider"></div>
            <div className="card-body pt-3 px-4 pb-4">
              <Table
                responsive
                className="table-alternate-spaced mb-0 table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email id</th>
                    <th>Registration Code</th>
                  </tr>
                </thead>
                <tbody>
                  {studentList?.map((e, index) =>
                    <tr key={index}>
                      <td className="px-4"><div className="font-weight-bold">{index + 1}</div></td>
                      <td className="px-4"><div>{e.fullname}</div></td>
                      <td className="px-4"><div>{e.email}</div></td>
                      <td className="px-4"><div>{e.registration_number}</div></td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
    </>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    loader: (payload) => dispatch(loader(payload))
  };
};
export default connect(null, mapDispatchToProps)(LivePreviewExample)
