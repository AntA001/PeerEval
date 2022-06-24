import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { loader } from '../../../reducers/Loader'
import {
  Table,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  CustomInput,
  Form,
  Modal,
  ModalHeader,
  Label
} from 'reactstrap';
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback
} from 'availity-reactstrap-validation';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
export function LivePreviewExample(props) {
  const { REACT_APP_API_URL } = process.env;
  const [startDate, setStartDate] = useState();
  const [formList, setFormList] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [updateId, setUpdateId] = useState(null);
  const [updateName, setUpdateName] = useState(null);
  const [updateDeadline, setUpdateDeadline] = useState();
  const { course_id } = useParams();
  const [courseKey, setCourseKey] = useState();
  const [modal2, setModal2] = useState(false);
  const toggle2 = () => setModal2(!modal2);

  const [modal4, setModal4] = useState(false);
  const toggle4 = () => setModal4(!modal4);

  // Displaying Form starts here
  const fetchForms = async (id) => {
    const res = await fetch(
      `${REACT_APP_API_URL}api/course/detail/${course_id}`,
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
  const getForms = async (id) => {
    props.loader(true);
    const coursesFromServer = await fetchForms();
    const array = coursesFromServer.forms;
    setFormList(array);
  };
  useEffect(() => {
    getForms();
  }, []);

  // Displaying Form ends here
  // Pagination of form starts here
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsperPage] = useState(10);
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(formList.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(formList.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, formList]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % formList.length;
    setItemOffset(newOffset);
  };

  const formatDate = (input) => {
    var mydate = new Date(input);
    var month = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ][mydate.getMonth()];
    var str = mydate.getDate() + ' ' + month + ' ' + mydate.getFullYear();
    return str;
  };

  // Update Form
  async function updateForm(formData) {
    return fetch(`${REACT_APP_API_URL}api/update/form/${updateId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      body: JSON.stringify(formData)
    });
  }

  const updateSubmit = async (e) => {
    var { formName } = document.forms['updateForm'];
    const token = await updateForm({
      name: formName.value,
      expire_at: startDate
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.status === false) {
          toast.warn(res.message, {
            containerId: 'B'
          });
        } else {
          getForms();
          toast.success(`Form has been updated`, {
            containerId: 'B'
          });
        }
      });
  };
  // Update Form ends here
  const currentData = (
    <>
      {currentItems &&
        currentItems.map((e, index) => (
          <tr key={index}>
            <td>
              <div>{itemOffset + index + 1}</div>
            </td>
            <td className="px-4">
              <div className="d-flex align-items-center">
                <div className="d-40 text-white d-flex align-items-center justify-content-center rounded-pill mr-3 bg-plum-plate">
                  <FontAwesomeIcon
                    icon={['fas', 'book']}
                    className="font-size-xxl"
                  />
                </div>
                <Link to={`/courses/view-team/${e._id}`}>
                  <div>
                    <div className="font-weight-bold">{e.name}</div>
                    {/* <div className="opacity-7">{e.description}</div> */}
                  </div>
                </Link>
              </div>
            </td>
            <td className="px-4">
              <div className="font-weight-bold">{formatDate(e.expire_at)}</div>
            </td>
            <td className="text-left">
              <Button
                className="p-0 d-30 mx-1 btn-transition-none border-0"
                color="first"
                onClick={() => {
                  toggle4();
                  setUpdateId(e._id);
                  setUpdateName(e.name);
                  let deadline=new Date(e.expire_at);
                  deadline.setHours(23);
                  deadline.setMinutes(59);
                  deadline.setSeconds(59);
                  deadline.setMilliseconds(999);
                  setStartDate(deadline);
                }}
                outline>
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon
                    icon={['fa', 'pen']}
                    className="font-size-sm"
                  />
                </span>
              </Button>
            </td>
          </tr>
        ))}
    </>
  );

  // Pagination of form ends here
  //Displaying teams starts here
  const fetchTeams = async (id) => {
    const res = await fetch(
      `${REACT_APP_API_URL}api/course/teams/list/${course_id}`,
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
  const getTeams = async (id) => {
    const teamsFromServer = await fetchTeams();
    setTeamList(teamsFromServer);
  };
  useEffect(() => {
    getTeams();
  }, []);
  //Displaying teams ends here

  // Pagination of teams starts here

  const [currentItems2, setCurrentItems2] = useState(null);
  const [pageCount2, setPageCount2] = useState(0);
  const [itemOffset2, setItemOffset2] = useState(0);
  const [itemsPerPage2, setItemsperPage2] = useState(10);
  useEffect(() => {
    const endOffset2 = itemOffset2 + itemsPerPage2;
    setCurrentItems2(teamList.slice(itemOffset2, endOffset2));
    setPageCount2(Math.ceil(teamList.length / itemsPerPage2));
  }, [itemOffset2, itemsPerPage2, teamList]);

  const handlePageClick2 = (event) => {
    const newOffset = (event.selected * itemsPerPage2) % teamList.length;
    setItemOffset2(newOffset);
  };
  const currentData2 = (
    <>
      {currentItems2 &&
        currentItems2.map((e, index) => (
          <tr key={e + index}>
            <td className="px-4">
              <div className="font-weight-bold">{itemOffset2 + index + 1}</div>
            </td>
            <td className="px-4">
              <div className="font-weight-bold">
                <Link to={`/courses/view-team-students/${e._id}`}>
                  {e.name}
                </Link>
              </div>
            </td>
          </tr>
        ))}
    </>
  );

  //Displaying students starts here
  const fetchStudents = async (id) => {
    const res = await fetch(
      `${REACT_APP_API_URL}api/course/detail/${course_id}`,
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
  const getStudents = async (id) => {
    const studentsFromServer = await fetchStudents();
    setCourseKey(studentsFromServer.course_key);
    const array = studentsFromServer.subscribers;
    setStudentList(array);
  };
  useEffect(() => {
    getStudents();
  }, []);
  //Displaying students ends here

  // Updating Team of student starts here
  async function updateValues(formData) {
    return fetch(
      `${REACT_APP_API_URL}api/assign/student/team/${formData.team_id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token')
        },
        body: JSON.stringify(formData)
      }
    );
  }

  const updateTeam = async (e) => {
    const token = await updateValues(e)
      .then((data) => data.json())
      .then((res) => {
        if (res.status == false) {
          toast.warn(res.message, {
            containerId: 'B'
          });
        } else {
          getStudents();
          toast.success(`Team has been updated`, {
            containerId: 'B'
          });
        }
      });
  };
  // Updating Team of student ends here

  // Pagination of students starts here
  const [currentItems3, setCurrentItems3] = useState(null);
  const [pageCount3, setPageCount3] = useState(0);
  const [itemOffset3, setItemOffset3] = useState(0);
  const [itemsPerPage3, setItemsperPage3] = useState(10);
  useEffect(() => {
    const endOffset3 = itemOffset3 + itemsPerPage3;
    setCurrentItems3(studentList.slice(itemOffset3, endOffset3));
    setPageCount3(Math.ceil(studentList.length / itemsPerPage3));
  }, [itemOffset3, itemsPerPage3, studentList]);

  const handlePageClick3 = (event) => {
    const newOffset = (event.selected * itemsPerPage3) % studentList.length;
    setItemOffset3(newOffset);
  };
  const currentData3 = (
    <>
      {currentItems3 &&
        currentItems3.map((e, index) => (
          <tr key={e._id + index}>
            <td className="px-4">
              <div className="font-weight-bold">{itemOffset3 + index + 1}</div>
            </td>
            <td className="px-4">
              <div className="font-weight-bold">{e.fullname}</div>
            </td>
            <td className="px-4">
              <div className="font-weight-bold">{e.email}</div>
            </td>
            <td className="px-4">
              <div className="font-weight-bold">{e.registration_number}</div>
            </td>
            <td className="px-4">
              <div className="font-weight-bold">{e?.teamDetail?.name}</div>
            </td>
            <td className="px-4">
              <Form>
                <CustomInput
                  type="select"
                  id="exampleCustomSelect"
                  name="customSelect"
                  style={{ width: '10rem' }}
                  onChange={(team) =>
                    updateTeam({
                      student_id: e._id,
                      team_id: team.target.value
                    })
                  }>
                  <option value="">Select Team</option>
                  {teamList.map((f) => (
                    <option key={f._id} value={f._id}>
                      {f.name}
                    </option>
                  ))}
                </CustomInput>
              </Form>
            </td>
          </tr>
        ))}
    </>
  );
  // Pagination of students ends here

  return (
    <>
      <div className="container my-3">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/courses">Courses</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{courseKey}</BreadcrumbItem>
        </Breadcrumb>

        <div className="card-box mb-5 card">
          <div className="card-header-alt p-4 d-flex align-items-center justify-content-between">
            <div>
              <h6 className="font-weight-bold font-size-lg mb-1 text-black">
                All Forms
              </h6>
              <p className="text-black-50 mb-0">
                {formList.length} Forms Found
              </p>
            </div>
            <Link to={`/courses/add-new-form/${course_id}`}>
              <Button color="primary ml-2">
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon icon={['fas', 'plus']} />
                </span>
                <span className="btn-wrapper--label">Add New</span>
              </Button>
            </Link>
          </div>
          <div className="divider"></div>
          <div className="card-body pt-3 px-4 pb-4">
            {formList?.length > 0 ? (
              <Table responsive className="table-alternate-spaced mb-0 table">
                <thead className="bg-white font-size-sm text-uppercase">
                  <tr>
                    <th>#</th>
                    <th>Forms</th>
                    <th>Deadline</th>
                    <th>Action</th>
                    {/* <th className="text-center">Action</th> */}
                  </tr>
                </thead>
                <tbody>{currentData}</tbody>
              </Table>
            ) : (
              ''
            )}
          </div>

          <div className="d-flex card-footer py-3 align-items-center justify-content-center flex-wrap">
            {formList?.length > itemsPerPage && (
              <ReactPaginate
                breakLabel="..."
                previousLabel={' ← Previous '}
                nextLabel={' Next → '}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousLinkClassName="page-link"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            )}
          </div>
        </div>

        <div className="card-box mb-5 card">
          <div className="card-header-alt p-4 d-flex align-items-center justify-content-between">
            <div>
              <h6 className="font-weight-bold font-size-lg mb-1 text-black">
                Teams
              </h6>
              {teamList?.length < 1 && (
                <p className="text-black-50 mb-0">No team found</p>
              )}
            </div>
            <Link to={`/courses/add-new-team/${course_id}`}>
              <Button color="primary ml-2">
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon icon={['fas', 'plus']} />
                </span>
                <span className="btn-wrapper--label">Add New</span>
              </Button>
            </Link>
          </div>
          <div className="divider"></div>
          <div className="card-body pt-3 px-4 pb-4">
            {teamList?.length > 0 && (
              <Table responsive className="table-alternate-spaced mb-0 table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Team Name</th>
                    {/* <th>Members</th> */}
                  </tr>
                </thead>
                <tbody>{currentData2}</tbody>
              </Table>
            )}
          </div>

          <div className="card-footer py-3 text-center">
            <div className="d-flex align-items-center justify-content-center flex-wrap">
              {teamList?.length > itemsPerPage2 && (
                <ReactPaginate
                  breakLabel="..."
                  previousLabel={' ← Previous '}
                  nextLabel={' Next → '}
                  pageCount={pageCount2}
                  onPageChange={handlePageClick2}
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousLinkClassName="page-link"
                  nextLinkClassName="page-link"
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName="active"
                  renderOnZeroPageCount={null}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Student list starts here */}

      <div className="card-box mb-5 card">
        <div className="card-header-alt p-4">
          <h6 className="font-weight-bold font-size-lg mb-1 text-black">
            Enrolled Students
          </h6>
          {studentList?.length < 1 && (
            <p className="text-black-50 mb-0">No student found</p>
          )}
        </div>
        <div className="divider"></div>
        <div className="card-body pt-3 px-4 pb-4">
          {studentList?.length > 0 && (
            <Table responsive className="table-alternate-spaced mb-0 table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email id</th>
                  <th>Registration Code</th>
                  <th>Assigned Team</th>
                  <th>Assign To</th>
                </tr>
                {/* <tr>
                    <th>#</th>
                    <th className="text-left">Student</th>
                    <th className="text-center">Registration Code</th>
                    <th className="text-center">Team</th>
                  </tr> */}
              </thead>
              <tbody>{currentData3}</tbody>
            </Table>
          )}
        </div>
        <div className="card-footer py-3 text-center">
          <div className="d-flex align-items-center justify-content-center flex-wrap">
            {studentList?.length > itemsPerPage3 && (
              <ReactPaginate
                breakLabel="..."
                previousLabel={' ← Previous '}
                nextLabel={' Next → '}
                pageCount={pageCount3}
                onPageChange={handlePageClick3}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousLinkClassName="page-link"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            )}
          </div>
        </div>
      </div>
      {/* Student list ends here */}

      {/* Delete modal starts here */}
      <Modal zIndex={2000} centered isOpen={modal2} toggle={toggle2}>
        <div className="text-center p-5">
          <div className="avatar-icon-wrapper rounded-circle m-0">
            <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-danger text-danger m-0 d-130">
              <FontAwesomeIcon
                icon={['fas', 'times']}
                className="d-flex align-self-center display-3"
              />
            </div>
          </div>
          <h4 className="font-weight-bold mt-4">
            Are you sure you want to delete this entry?
          </h4>
          <div className="pt-4">
            <Button
              onClick={toggle2}
              color="neutral-secondary"
              className="btn-pill mx-1">
              <span className="btn-wrapper--label">Cancel</span>
            </Button>
            <Button onClick={toggle2} color="danger" className="btn-pill mx-1">
              <span className="btn-wrapper--label">Delete</span>
            </Button>
          </div>
        </div>
      </Modal>
      {/* Delete modal ends here */}

      {/* Update Modal starts here */}
      <Modal zIndex={2000} centered isOpen={modal4} toggle={toggle4}>
        <ModalHeader toggle={toggle4}></ModalHeader>
        <div className="text-center p-5">
          <AvForm name="updateForm" onSubmit={updateSubmit}>
            <div className="avatar-icon-wrapper rounded-circle m-0">
              <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-first text-first m-0 d-100">
                <FontAwesomeIcon
                  icon={['far', 'keyboard']}
                  className="d-flex align-self-center display-3"
                />
              </div>
            </div>
            <h4 className="font-weight-bold mt-4">Update the form</h4>
            <p className="mb-0 text-black-50"></p>
            <AvGroup>
              <AvInput
                name="formName"
                id="formName"
                placeholder="Enter the form name"
                defaultValue={updateName}
                required
              />
              <AvFeedback>Course name is required.</AvFeedback>
            </AvGroup>
            <AvGroup>
              {/* <AvInput
                type="date"
                name="deadline"
                id="deadline"
                value={updateDeadline}
                placeholder="Enter the deadline"
                min={new Date().toISOString().split('T')[0]}
                required
              /> 
                <AvFeedback>Deadline is required.</AvFeedback> */}
              <DatePicker
                className="form-control"
                selected={startDate}
                minDate={new Date()}
                popperPlacement="bottom"
                onChange={(date) => {
                  date.setHours(23);
                  date.setMinutes(59);
                  date.setSeconds(59);
                  date.setMilliseconds(999);
                  setStartDate(date);
                }}
                dateFormat="dd/MM/yyyy"
                placeholderText="DD/MM/YYYY"
                showPopperArrow={false}
                required
              />
            </AvGroup>
            <div className="pt-4">
              <Button
                onClick={toggle4}
                color="neutral-secondary"
                className="btn-pill text-danger mx-1">
                <span className="btn-wrapper--label">Cancel</span>
              </Button>
              <Button
                type="submit"
                onClick={toggle4}
                color="first"
                className="btn-pill mx-1">
                <span className="btn-wrapper--label">Update</span>
              </Button>
            </div>
          </AvForm>
        </div>
      </Modal>
      {/* Update Modal ends here */}
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    loader: (payload) => dispatch(loader(payload))
  };
};
export default connect(null, mapDispatchToProps)(LivePreviewExample)