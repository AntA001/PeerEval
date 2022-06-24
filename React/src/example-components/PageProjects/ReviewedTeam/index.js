import React,{useState, useEffect} from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import {
  Table,
  Badge
} from 'reactstrap';


import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';

export function LivePreviewExample(props) {
  const { REACT_APP_API_URL } = process.env;
  const { form_id } = useParams();
  const [reviewedStudents,setReviewedStudents]=useState([]);
    const [team, setTeam]=useState();
    let history = useHistory();

    const fetchReviews = async () => {
        const res = await fetch(
          `${REACT_APP_API_URL}api/form/reviews-detail/${form_id}/${props.user._id}`,
          {
            method: 'GET',
            headers: {
              'x-access-token': localStorage?.getItem('token')
            }
          }
        );
        const data = await res.json();
        return data;
      };
      const getReviews = async (id) => {
        const reviewFromServer = await fetchReviews();
        setReviewedStudents(reviewFromServer.students)
      };
      useEffect(() => {
          getReviews();
      },[]);
    
  return (
    <>
    <div className="container my-3">
      <div className="mb-3" onClick={()=>history.goBack()} style={{cursor:"pointer"}}><FontAwesomeIcon icon={['fas', 'angle-left']} /> Back</div>
      <div className="card-box mb-5 card">
      <div className="card-header-alt p-4">
              <h6 className="font-weight-bold font-size-lg mb-1 text-black">Review</h6>
              <Badge className="m-1" color="success">
                Attempted
              </Badge>
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
                    <th>Marks</th>
                    </tr>
              </thead>
              <tbody>
                {reviewedStudents.map((e,index)=>
                <tr
                key={e._id}
                data-toggle="collapse"
                data-target=".multi-collapse1"
                aria-controls="multiCollapseExample1">
                  <td className="px-4"><div className="font-weight-bold">{index + 1}</div></td>
                      <td className="px-4"><div>{e.fullname}</div></td>
                      <td className="px-4"><div>{e.review}</div></td>
                    </tr>
                )}
              </tbody>
            </Table>
          </div>
      </div>

    </div>
    </>
  );
}

const mapStateToProps = (state) => ({
    user: state.User.user
  });
  
  export default connect(mapStateToProps, null)(LivePreviewExample);