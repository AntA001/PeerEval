import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CountUp from 'react-countup';
import { connect } from 'react-redux';
import { setCourses } from '../../reducers/Courses';
import { Link } from 'react-router-dom';

import {
  Table, Card, Pagination, PaginationItem, PaginationLink, Row,
  Col, Badge, Button, Modal, FormGroup
} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import avatar5 from '../../assets/images/avatars/avatar5.jpg';

function Courses(props) {
  const { REACT_APP_API_URL } = process.env;
  const { courses } = props
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  function handleSubmit(event, errors, values) {
    const addNew = [{
      "name": values.course_key,
      "description": ' it to make a type specimen book.',
      "created_at": '31 Jan, 2022',
      "total_tasks": 15,
      "total_members": 33,
      'is_expired': false,
      '_id': '12hjlertjlll'
    }];
    props.setCourses([...addNew, ...courses]);
    toggleModal()
  }


  return (
    <>
      <Card className="card-box mb-5">
        <div className="card-header py-3">
          <div className="card-header--title font-size-lg">Support board</div>
          <div className="card-header--actions">
            <Button size="sm" color="neutral-primary" onClick={toggleModal}>
              <span className="btn-wrapper--icon">
                <FontAwesomeIcon icon={['fas', 'plus-circle']} />
              </span>
              <span className="btn-wrapper--label">Enroll Course</span>
            </Button>
          </div>
        </div>
        <div className="divider" />
        <div className="table-responsive-md">
          <Table hover className="text-nowrap mb-0">
            <thead>
              <tr>
                <th className="bg-white text-left">ID</th>
                <th className="bg-white text-left">Name</th>
                <th className="bg-white text-center">Status</th>
                <th className="bg-white text-center">Tasks</th>
                <th className="bg-white text-center">Total Members</th>
                <th className="bg-white text-center">Created date</th>
              </tr>
            </thead>
            {courses.length > 0 &&
              <tbody>
                {courses.map((_item, index) => <React.Fragment key={_item._id}>
                  <tr>
                    <td className="font-weight-bold">#{index + 1}</td>

                    <td>
                      <div>
                        <Link className='font-weight-bold text-black' to={`/student/view-course/${_item._id}`}>
                          {_item.name}
                        </Link>
                        <span className="text-black-50 d-block">
                          {_item.description}
                        </span>
                      </div>
                    </td>
                    <td className="text-left">
                      <Badge color={`${_item.is_expired ? 'danger' : 'first'}`}>Overdue</Badge>
                    </td>
                    <td className="text-center">
                      <span className="font-weight-bold">{_item.total_tasks}</span>
                    </td>

                    <td className="text-right">
                      <div className="d-flex align-items-center justify-content-end">
                        <div className="font-weight-bold font-size-lg pr-2">
                          <CountUp
                            start={0}
                            end={_item.total_members}
                            duration={6}
                            deplay={2}
                            separator=""
                            decimals={0}
                            decimal=","
                          />
                        </div>
                        <FontAwesomeIcon
                          icon={['fas', 'arrow-down']}
                          className="font-size-sm opacity-5"
                        />
                      </div>
                    </td>
                    <td className="text-center">
                      <span className="font-weight-bold">{_item.created_at}</span>
                    </td>
                  </tr>
                </React.Fragment>)}
              </tbody>
            }
          </Table>
        </div>
      </Card>
      <Modal
        centered
        size="md"
        isOpen={modal}
        zIndex={1300}
        toggle={toggleModal}
        contentClassName="border-0 bg-transparent">
        <Row className="no-gutters">
          <Col lg="12">
            <div className="bg-white rounded-left rounded-right">
              <div className="p-4 text-center">
                <div className="avatar-icon-wrapper rounded-circle mx-auto">
                  <div className="d-block p-0 avatar-icon-wrapper rounded-circle m-0 border-3 border-first">
                    <div className="rounded-circle border-3 border-white overflow-hidden">
                      <img alt="..." className="img-fluid" src={avatar5} />
                    </div>
                  </div>
                </div>
                <h4 className="font-size-lg font-weight-bold my-2">
                  Antonis Antoniadis
                </h4>


                <p className="text-muted mb-4">
                  Lorem Ipsum
                </p>

                <div className="divider my-4" />

                <AvForm onSubmit={handleSubmit}>
                  <div className='text-left'>
                    <AvField name="course_key" label="Course Key" placeholder="Enter course key here.." required />
                  </div>
                  <div className="divider my-4" />
                  <FormGroup>
                    <Button outline color="first" className="mt-2">
                      Enroll course
                    </Button>
                  </FormGroup>
                </AvForm>
              </div>
            </div>
          </Col>
        </Row>
      </Modal>
    </>
  );
}


const mapStateToProps = (state) => ({
  courses: state.Courses.courses
});
const mapDispatchToProps = (dispatch) => {
  return {
    setCourses: (payload) => dispatch(setCourses(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Courses);
