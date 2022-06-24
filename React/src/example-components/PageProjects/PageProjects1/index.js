import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loader } from '../../../reducers/Loader'
import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Table,
  Modal,
  ModalHeader,
  Button,
  Input
} from 'reactstrap';

import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback
} from 'availity-reactstrap-validation';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link, useHistory } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { toast} from 'react-toastify';

export function LivePreviewExample(props) {
  const { role } = props;
  const { REACT_APP_API_URL } = process.env;
  const [inputBg, setInputBg] = useState(false);
  const [serverError, setServerError] = useState({});
  if (serverError?.display) {
    setTimeout(() => {
      setServerError({});
    }, 2000);
  }
  const toggleInputBg = () => setInputBg(!inputBg);
  const [deleteId, setDeleteId] = useState();
  const [updateId, setUpdateId] = useState(null);
  const [updateValue, setUpdateValue] = useState(null);
  const [searchString, setSearchString] = useState('');
  const [searchStatus3, setSearchStatus3] = useState(false);
  const toggleSearch3 = () => setSearchStatus3(!searchStatus3);

  const [activeTab, setActiveTab] = useState('1');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const [isSidebarMenuOpen, setIsSidebarMenuOpen] = useState(false);

  const toggleSidebarMenu = () => setIsSidebarMenuOpen(!isSidebarMenuOpen);

  const [courses, setCourses] = useState([]);
  const [courses2, setCourses2] = useState([]);
  const navigate = useHistory();
  const toAddNewCourse = () => {
    navigate.push('/add-new-course');
  };

  const [modal2, setModal2] = useState(false);
  const toggle2 = () => setModal2(!modal2);
  const [modal4, setModal4] = useState(false);
  const toggle4 = () => setModal4(!modal4);
  const [modal, setModal] = useState(false);
  const subscribeModal = () => setModal(!modal);
  // Pagination starts here

  // Displaying Courses

  const fetchCourses = async (id) => {
    const res = await fetch(`${REACT_APP_API_URL}api/course/list`, {
      method: 'GET',
      headers: {
        'x-access-token': localStorage?.getItem('token')
      }
    });
    props.loader(false);
    const data = await res.json();
    return data;
  };
  const getCourses = async (id) => {
    props.loader(true);
    const coursesFromServer = await fetchCourses();
    setCourses(coursesFromServer);
    setCourses2(coursesFromServer);
  };

  // Student enrolled courses starts here
  const fetchCourses2 = async (id) => {
    const res = await fetch(`${REACT_APP_API_URL}api/subscribed/courses`, {
      method: 'GET',
      headers: {
        'x-access-token': localStorage?.getItem('token')
      }
    });
    props.loader(false);
    const data = await res.json();
    return data;
  };
  const getCourses2 = async (id) => {
    props.loader(true);
    const coursesFromServer = await fetchCourses2();
    setCourses(coursesFromServer);
  };
  // Student enrolled courses ends here
  useEffect(() => {
    role === 'lecturer' ? getCourses() : getCourses2();
  }, []);
  // Displaying Courses ends here

  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsperPage] = useState(10);
  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(courses?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(courses?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, courses]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % courses?.length;
    setItemOffset(newOffset);
  };

  //Update Course Title
  async function updateValues(formData) {
    return fetch(`${REACT_APP_API_URL}api/update/course/${updateId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      body: JSON.stringify(formData)
    });
  }

  const updateSubmit = async (e) => {
    // setValue("title",getValues("title").trim());
    var { courseName2 } = document.forms['updateCourse'];
    const token = await updateValues({ name: courseName2.value })
      .then((data) => data.json())
      .then((res) => {
        if (res.status === false) {
          toast.warn(res.message, {
            containerId: 'B'
          });
        } else {
          getCourses();
          toast.success(`Course name has been updated`, {
            containerId: 'B'
          });
          document.forms['updateCourse'].reset();
        }
      });
  };
  //Update Course Title
  const currentData = (
    <>
      {currentItems &&
        currentItems.map((e) => (
          <tr key={e._id}>
            <td className="px-4">
              <Link to={role === 'lecturer'?`/courses/view-course/${e._id}`:`/courses/forms/${e._id}`}>
                <div className="d-flex align-items-center">
                  <div className="d-40 text-white d-flex align-items-center justify-content-center rounded-pill mr-3 bg-plum-plate">
                    <FontAwesomeIcon
                      icon={['fas', 'book']}
                      className="font-size-xxl"
                    />
                  </div>
                  <div>
                    <div className="font-weight-bold">{e.name}</div>
                    <div className="opacity-7">{e.course_key}</div>
                  </div>
                </div>
              </Link>
            </td>
            <td className="px-4">
              <div className="font-weight-bold">{e.formCount}</div>
            </td>
            {role === 'lecturer' && (
              <td className="text-center px-4">
                <Link to={`/courses/view-course/${e._id}`}>
                  <Button
                    className="p-0 d-30 mx-1 btn-transition-none border-0"
                    color="first"
                    outline>
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon
                        icon={['far', 'eye']}
                        className="font-size-sm"
                      />
                    </span>
                  </Button>
                </Link>
                <Button
                  className="p-0 d-30 mx-1 btn-transition-none border-0"
                  color="first"
                  onClick={() => {
                    toggle4();
                    setUpdateId(e._id);
                    setUpdateValue(e.name);
                  }}
                  outline>
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon
                      icon={['fa', 'pen']}
                      className="font-size-sm"
                    />
                  </span>
                </Button>
                <Button
                  className="p-0 d-30 mx-1 btn-transition-none border-0"
                  color="danger"
                  onClick={() => {
                    toggle2();
                    setDeleteId(e._id);
                  }}
                  outline>
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon
                      icon={['fa', 'trash']}
                      className="font-size-sm"
                    />
                  </span>
                </Button>
              </td>
            )}
          </tr>
        ))}
    </>
  );
  // Pagination ends here

  // Delete course starts here
  async function deleteValue(formData) {
    return fetch(`${REACT_APP_API_URL}api/delete/course/${formData}`, {
      method: 'DELETE',
      headers: {
        'x-access-token': localStorage.getItem('token')
      },
      body: JSON.stringify(formData)
    });
  }

  const deleteCourse = async (id) => {
    const token = await deleteValue(id)
      .then((data) => data.json())
      .then((res) => {
        if (res.status === false) {
          toast.warn(res.message, {
            containerId: 'B'
          });
        } else {
          getCourses();
        }
      });
  };
  // Delete course ends here

  // Enroll to course
  async function postValues(formData) {
    return fetch(
      `${REACT_APP_API_URL}api/subscribe/course-by-key/${formData}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token')
        }
      }
    );
  }

  const subscribeCourse = async (e) => {
    // setValue("title",getValues("title").trim());
    var { courseKey } = document.forms['subscribeForm'];
    const token = await postValues(courseKey.value)
      .then((data) => data.json())
      .then((res) => {
        if (res.status === false) {
          setServerError({ display: true, message: res.message });
        } else {
          toast.success(`You have enrolled the ${courseKey.value} course`, {
            containerId: 'B'
          });
          subscribeModal();
          getCourses2();
        }
      });
  };
  // Enroll to course ends here
  // Search list 
  const filteredList = courses2?.filter(
    course => {
      return (
      course
      .name
      .toLowerCase()
      .includes(searchString.toLowerCase()) ||
      course
      .course_key
      .toLowerCase()
      .includes(searchString.toLowerCase())
    );
  }
);
useEffect(()=>{
  if(searchStatus3){
    setCourses(filteredList);
  }
},[searchString])
// Search list ends here

  return (
    <>
      <div className="app-inner-content-layout--main bg-white p-0">
        <PerfectScrollbar>
          {/* List view of courses  */}
          <div className="card-box mb-5 card">
            <div className="card-header-alt p-4 d-flex flex-column flex-md-row align-items-center justify-content-between">
              <div>
                <h6 className="font-weight-bold font-size-lg mb-1 text-black">
                  All Courses
                </h6>
                <p className="text-black-50 mb-0">
                  {courses?.length ? courses?.length : 0} Courses Found
                </p>
              </div>
              <div className="d-flex flex-wrap justify-content-center">
                <div
                  className={clsx('search-wrapper search-wrapper--grow', {
                    'is-active': searchStatus3
                  })}>
                  <span className="icon-wrapper text-black">
                    <FontAwesomeIcon icon={['fas', 'search']} />
                  </span>
                  <Input
                    type="search"
                    className="bg-white"
                    onFocus={toggleSearch3}
                    onBlur={toggleSearch3}
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                    placeholder="Search courses..."
                  />
                </div>
                <Button
                  onClick={() =>
                    role === 'lecturer' ? toAddNewCourse() : subscribeModal()
                  }
                  color="primary ml-2">
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon icon={['fas', 'plus']} />
                  </span>
                  <span className="btn-wrapper--label">{role === 'lecturer'?"Add New":"Enroll Course"}</span>
                </Button>
              </div>
            </div>
          </div>
          {/* </CardHeader> */}

          {/* List view of courses  */}
          <div className="divider"></div>
          <div className="card-body pt-3 px-4 pb-4">
            <Table responsive className="table-alternate-spaced mb-0 table">
              <thead>
                <tr>
                  <th>Courses</th>
                  <th>Forms</th>
                  {role === 'lecturer' && (
                  <th className="text-center">Action</th>
                  )}
                </tr>
              </thead>
              <tbody>{currentData}</tbody>
            </Table>

            <div className="d-flex mt-4 align-items-center justify-content-center flex-wrap">
              {courses?.length > itemsPerPage && (
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

          {/* List view of courses ends here */}
        </PerfectScrollbar>
      </div>
      {/* </div> */}

      {/* Delete modal starts here */}
      <Modal zIndex={2000} centered isOpen={modal2} toggle={toggle2}>
      <ModalHeader toggle={toggle2}></ModalHeader>
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
            Are you sure you want to delete this course?
          </h4>
          <div className="pt-4">
            <Button
              onClick={toggle2}
              color="neutral-secondary"
              className="btn-pill mx-1">
              <span className="btn-wrapper--label">Cancel</span>
            </Button>
            <Button
              onClick={() => {
                toggle2();
                deleteCourse(deleteId);
              }}
              color="danger"
              className="btn-pill mx-1">
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
          <AvForm name="updateCourse" onSubmit={updateSubmit}>
            <div className="avatar-icon-wrapper rounded-circle m-0">
              <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-first text-first m-0 d-100">
                <FontAwesomeIcon
                  icon={['far', 'keyboard']}
                  className="d-flex align-self-center display-3"
                />
              </div>
            </div>
            <h4 className="font-weight-bold mt-4">Update the course name</h4>
            <p className="mb-0 text-black-50"></p>
            <AvGroup>
              <AvInput
                name="courseName2"
                id="courseName"
                placeholder="Enter the course name"
                defaultValue={updateValue}
                required
              />
              <AvFeedback>Course name is required.</AvFeedback>
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

      {/* Course enroll modal starts here  */}
     
      <Modal zIndex={2000} centered isOpen={modal} toggle={subscribeModal}>
          <div className="text-center p-5">
            <div className="avatar-icon-wrapper rounded-circle m-0">
              <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-success text-success m-0 d-130">
                <FontAwesomeIcon
                  icon={['far', 'lightbulb']}
                  className="d-flex align-self-center display-3"
                />
              </div>
            </div>
            <h4 className="font-weight-bold mt-4">
              Enter the course key to enroll
            </h4>
            <div className="my-4" />
            <AvForm onSubmit={subscribeCourse} name="subscribeForm">
            <div className="text-left">
                    <AvGroup>
                      <AvInput
                        name="courseKey"
                        id="coursekey"
                        placeholder="Enter the course key"
                        required
                      />
                      <AvFeedback>Course key is required.</AvFeedback>
                    </AvGroup>
                  </div>
            <div className="pt-2">
                  <div className="my-1">
              {serverError?.display && (
                <p className="text-danger">{serverError.message}</p>
              )}
              </div>
              <Button
                onClick={subscribeModal}
                color="neutral-dark"
                className="btn-pill mx-1">
                <span className="btn-wrapper--label">Cancel</span>
              </Button>
              <Button
                type="submit"
                color="success"
                className="btn-pill mx-1">
                <span className="btn-wrapper--label">Create</span>
              </Button>
            </div>
            </AvForm>
          </div>
        </Modal>
      {/* Course enroll modal ends here  */}
    </>
  );
}




  const mapDispatchToProps = (dispatch) => {
    return {
      loader: (payload) => dispatch(loader(payload))
    };
  };
  export default connect(null, mapDispatchToProps)(LivePreviewExample)
