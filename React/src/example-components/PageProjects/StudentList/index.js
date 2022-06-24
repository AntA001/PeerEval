import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table, Badge, Collapse } from 'reactstrap';
import { connect } from 'react-redux';
import { loader } from '../../../reducers/Loader';

import { useHistory, useParams } from 'react-router';

export function LivePreviewExample(props) {
  const { REACT_APP_API_URL } = process.env;
  const { form_id, team_id } = useParams();
  const [studentList, setStudentList] = useState([]);
  const [team, setTeam] = useState();
  let history = useHistory();
  const [accordion, setAccordion] = useState([]);
  const [reviewedStudents, setReviewedStudents] = useState([]);
  const toggleAccordion = (tab) => {
    setAccordion(accordion.map((x, index) => (tab === index ? !x : false)));
  };
  const fetchStudents = async (id) => {
    const res = await fetch(`${REACT_APP_API_URL}api/team/detail-with-form-status/${team_id}/${form_id}`, {
      method: 'GET',
      headers: {
        'x-access-token': localStorage?.getItem('token')
      }
    });
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
    let boolArr=[];
    for(let i=0;i<array.length;i++){
      boolArr.push(false);
    }
    setAccordion(boolArr);
  };
  useEffect(() => {
    getStudents();
  }, []);

  const fetchReviews = async (id) => {
    const res = await fetch(
      `${REACT_APP_API_URL}api/form/reviews-detail/${form_id}/${id}`,
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
  const getReviews = async (id) => {
    props.loader(true);
    const reviewFromServer = await fetchReviews(id);
    setReviewedStudents(reviewFromServer.students);
  };
  useEffect(()=>{
    if(studentList[0]?.reviewOnForm===1)
  getReviews(studentList[0]?._id);
},[studentList])
  return (
    <>
      <div className="container my-3">
        <div
          className="mb-3"
          onClick={() => history.goBack()}
          style={{ cursor: 'pointer' }}>
          <FontAwesomeIcon icon={['fas', 'angle-left']} /> Back
        </div>
        <div className="card-box mb-5 card">
          <div className="card-header-alt p-4">
            <h6 className="font-weight-bold font-size-lg mb-1 text-black">
              {team}
            </h6>
          </div>
          <div className="divider"></div>
          <div className="card-body pt-3 px-4 pb-4">
            <Table responsive className="table-alternate-spaced mb-0 table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email id</th>
                  <th>Registration Code</th>
                  <th>Status</th>
                  <th>Marks</th>
                  <th>More</th>
                </tr>
              </thead>
              <tbody>
                {studentList.map((e, index) => (
                  <React.Fragment key={e._id + index}>
                    <tr>
                      <td>
                        <div className="font-weight-bold">{index + 1}</div>
                      </td>
                      <td>
                        <div>{e.fullname}</div>
                      </td>
                      <td>
                        <div>{e.email}</div>
                      </td>
                      <td>
                        <div>{e.registration_number}</div>
                      </td>
                      <td>
                        {e.reviewOnForm===1?
                        <Badge className="m-1" color="success">
                          Filled
                        </Badge>
                        :
                        <Badge className="m-1" color="danger">
                          Pending
                        </Badge>
                        }
                      </td>
                      <td>
                      <div>{e.finalMarks!==null && parseInt(e.finalMarks)}</div>
                      </td>
                      <td>
                        <div className="accordion-toggle">
                          <Button
                            color="link"
                            size="lg"
                            className="d-flex align-items-center justify-content-between"
                            onClick={() => {
                              {e.reviewOnForm===1 &&
                              getReviews(e._id);
                              toggleAccordion(index);
                            }
                            }}
                            aria-expanded={accordion[index]}>
                              {accordion[index]?
                            <FontAwesomeIcon
                              icon={['fas', 'angle-up']}
                              className="font-size-xl accordion-icon"
                            />
                            :
                            <FontAwesomeIcon
                              icon={['fas', 'angle-right']}
                              className="font-size-xl accordion-icon"
                            />
                              }
                          </Button>
                        </div>
                      </td>
                    </tr>
                    {e.reviewOnForm===1 &&
                    <tr>
                      <td colSpan="7" style={{padding:"0"}}>
                    <Collapse isOpen={accordion[index]} style={{padding:"15px"}}>
                      <Table
                        responsive
                        className="table-alternate-spaced mb-0 table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Marks</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reviewedStudents?.map((e, index) => (
                            <tr
                              key={index}
                              data-toggle="collapse"
                              data-target=".multi-collapse1"
                              aria-controls="multiCollapseExample1">
                              <td className="px-4">
                                <div className="font-weight-bold">
                                  {index + 1}
                                </div>
                              </td>
                              <td className="px-4">
                                <div>{e.fullname}</div>
                              </td>
                              <td className="px-4">
                                <div>{e.email}</div>
                              </td>
                              <td className="px-4">
                                <div>{e.review}</div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Collapse>
                    </td>
                    </tr>
                    }
                  </React.Fragment>
                ))}
              </tbody>
            </Table>
          </div>
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
  export default connect(mapStateToProps, mapDispatchToProps)(LivePreviewExample);