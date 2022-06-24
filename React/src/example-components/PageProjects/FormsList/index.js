import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loader } from '../../../reducers/Loader'
import clsx from 'clsx';
import { useParams } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table, Input, Badge, Button, Modal } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link, useHistory } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

export function LivePreviewExample(props) {
  const { REACT_APP_API_URL } = process.env;
  const { course_id } = useParams();
  const [courseKey, setCourseKey] = useState();
  const [inputBg, setInputBg] = useState(false);
  const toggleInputBg = () => setInputBg(!inputBg);

  const [formList, setFormList] = useState([]);
  const [formList2, setFormList2] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [searchStatus3, setSearchStatus3] = useState(false);
  const toggleSearch3 = () => setSearchStatus3(!searchStatus3);

  const [activeTab, setActiveTab] = useState('1');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const [isSidebarMenuOpen, setIsSidebarMenuOpen] = useState(false);

  const toggleSidebarMenu = () => setIsSidebarMenuOpen(!isSidebarMenuOpen);

  const navigate = useHistory();
  const toAddNewCourse = () => {
    navigate.push('/add-new-course');
  };

  const [modal2, setModal2] = useState(false);
  const toggle2 = () => setModal2(!modal2);

  // Pagination starts here

  // Displaying Form starts here
  const fetchForms = async (id) => {
    const res = await fetch(
      `${REACT_APP_API_URL}api/course/detail-student/${course_id}`,
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
    setCourseKey(coursesFromServer.course_key);
    const array = coursesFromServer.forms;
    setFormList(array);
    setFormList2(array);
  };
  useEffect(() => {
    getForms();
  }, []);
  // Displaying Form ends here

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

  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsperPage] = useState(10);
  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(formList.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(formList.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, formList]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % formList.length;
    setItemOffset(newOffset);
  };

  const checkDeadline=(d)=>{
    const today=new Date();
    today.setHours(0,0,0,0);
    const deadline=new Date(d);
    deadline.setHours(0,0,0,0);
    if(deadline<today){
      return true;
    }
    else{ return false;}
  }
  const currentData = (
    <>
      {currentItems &&
        currentItems.map((e) => (
          <tr key={e._id}>
            <td className="px-4">
              <Link
                to={
                  e.status === 1
                    ? `/courses/reviewed-team/${e._id}`
                    : 
                    !checkDeadline(e.expire_at) &&
                    `/courses/review-team/${e._id}`
                    
                }>
                <div className="d-flex align-items-center">
                  <div className="d-40 text-white d-flex align-items-center justify-content-center rounded-pill mr-3 bg-plum-plate">
                    <FontAwesomeIcon
                      icon={['fas', 'book']}
                      className="font-size-xxl"
                    />
                  </div>
                  <div>
                    <div className="font-weight-bold">{e.name}</div>
                  </div>
                </div>
              </Link>
            </td>
            <td className="px-4">
              <div className="font-weight-bold">{formatDate(e.expire_at)}</div>
            </td>
            <td className="px-4">
              {e.status === 1 ? 
                <Badge className="m-1" color="success">
                  Attempted
                </Badge>
               : 
                !checkDeadline(e.expire_at) ?
                  <Badge className="m-1" color="warning">
                    Pending
                  </Badge>
                  :
                  <Badge className="m-1" color="danger">
                    Deadline passed
                  </Badge>
              }
            </td>
            <td className="px-4">
              {e.isResultDeclare ? (
                <Badge className="m-1" color="success">
                  Declared
                </Badge>
              ) : (
                <Badge className="m-1" color="warning">
                  Pending
                </Badge>
              )}
            </td>
            <td className="px-4">
            {e.finalMarks ?
            <div className="font-weight-bold">{e.finalMarks}</div>
            :
            <Badge className="m-1" color="warning">
                  Pending
                </Badge>
            }
            </td>
          </tr>
        ))}
    </>
  );
  // Pagination ends here
  // Search list
  const filteredList = formList2.filter((form) => {
    return form.name.toLowerCase().includes(searchString.toLowerCase());
  });
  useEffect(() => {
    if (searchStatus3) {
      setFormList(filteredList);
    }
  }, [searchString]);
  // Search list ends here
  return (
    <>
      <div className="app-inner-content-layout--main bg-white p-0">
        <PerfectScrollbar>
          <div className="card-box mb-5 card">
            <div className="card-header-alt p-4 d-flex flex-column flex-md-row align-items-center justify-content-between">
              <div>
                <h6 className="font-weight-bold font-size-lg mb-1 text-black">
                  Course - {courseKey}
                </h6>
                <p className="text-black-50 mb-0">
                  {formList?.length ? formList.length : 0} Forms Found
                </p>
              </div>
              <div className="d-flex">
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
                    placeholder="Search forms..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* List view of courses  */}
          <div className="divider"></div>
          <div className="card-body pt-3 px-4 pb-4">
            <Table responsive className="table-alternate-spaced mb-0 table">
              <thead className="bg-white font-size-sm text-uppercase">
                <tr>
                  <th>Forms</th>
                  <th>Deadline</th>
                  <th>My Status</th>
                  <th>Result Status</th>
                  <th>Final Marks</th>
                </tr>
              </thead>
              <tbody>{currentData}</tbody>
            </Table>

            <div className="d-flex mt-4 align-items-center justify-content-center flex-wrap">
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

          {/* List view of courses ends here */}
        </PerfectScrollbar>
      </div>

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