import React, { useState } from 'react';

import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Row,
  Col,
  Badge,
  UncontrolledTooltip,
  Nav,
  NavItem,
  Button,
  Modal,
  Label,
  FormGroup,
  Input
} from 'reactstrap';

import {
  AvForm,
  AvField,
  AvGroup,
  AvInput,
  AvFeedback,
  AvRadioGroup,
  AvRadio
} from 'availity-reactstrap-validation';
import { connect } from 'react-redux';

import avatar1 from '../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../assets/images/avatars/avatar2.jpg';
import avatar5 from '../../assets/images/avatars/avatar5.jpg';
import avatar6 from '../../assets/images/avatars/avatar6.jpg';
import avatar7 from '../../assets/images/avatars/avatar7.jpg';

import people3 from '../../assets/images/stock-photos/people-3.jpg';

import { PieChart } from 'react-feather';
import { setCourses } from 'reducers/Courses';
import { toast, ToastContainer } from 'react-toastify';

const PageTitle = (props) => {
  const { REACT_APP_API_URL } = process.env;
  const {
    pageTitleStyle,
    pageTitleBackground,
    pageTitleShadow,
    pageTitleIconBox,
    pageTitleDescription,
    titleHeading,
    titleDescription,
    children,
    courses
  } = props;
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
    // toggleModal()
  }

  // Add course key 
  async function postValues(formData) {
    return fetch(`${REACT_APP_API_URL}api/subscribe/course-by-key/${formData}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    });
  }
  
  const subscribeCourse = async (e) => {
    // setValue("title",getValues("title").trim());
    var {courseKey}=document.forms["subscribeForm"];
    const token = await postValues(courseKey.value)
      .then((data) => data.json())
      .then((res) => {
        if (res.status == false) {
          toast.danger(res.message, {
            position: toast.POSITION.BOTTOM_CENTER
          })
        } else {
          // getCourses();
          toast.success("You have enrolled a new course", {
            position: toast.POSITION.BOTTOM_CENTER
          })
          document.forms["subscribeForm"].reset();
        }
      });
    };
    // Add course key ends here
    
  return (
    <>
      <div
        className={clsx('app-page-title', pageTitleStyle, pageTitleBackground, {
          'app-page-title--shadow': pageTitleShadow
        })}>
        <div>
          <div className="app-page-title--first">
            {pageTitleIconBox && (
              <div className="app-page-title--iconbox d-70">
                <div className="d-70 d-flex align-items-center justify-content-center">
                  <PieChart className="display-2 text-primary" />
                </div>
              </div>
            )}
            <div className="app-page-title--heading">
              <h1>{titleHeading}</h1>
              {pageTitleDescription && (
                <div className="app-page-title--description">
                  {titleDescription}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center">
          {children}

          <Button
            onClick={toggleModal}
            size="sm"
            color="success"
            id="AddEntryTooltip20">
            <span className="btn-wrapper--icon">
              <FontAwesomeIcon
                icon={['fas', 'plus']}
                className="opacity-8 font-size-xs"
              />
            </span>
          </Button>
          <UncontrolledTooltip target="AddEntryTooltip20">
            Join new course
          </UncontrolledTooltip>
        </div>
      </div>
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
                  Marion Devine
                </h4>


                <p className="text-muted mb-4">
                  
                </p>

                <div className="divider my-4" />

                <AvForm onSubmit={subscribeCourse} name="subscribeForm">
                  <div className='text-left'>
                  <AvGroup>
                        <AvInput name="courseKey" id="coursekey" placeholder="Enter the course key" required />
                        <AvFeedback>Course key is required.</AvFeedback>
                      </AvGroup>
                  </div>
                  <div className="divider my-4" />
                  <FormGroup>
                    <Button outline color="first" className="mt-2">
                      Join course
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
};

const mapStateToProps = (state) => ({
  pageTitleStyle: state.ThemeOptions.pageTitleStyle,
  pageTitleBackground: state.ThemeOptions.pageTitleBackground,
  pageTitleShadow: state.ThemeOptions.pageTitleShadow,
  pageTitleIconBox: state.ThemeOptions.pageTitleIconBox,
  pageTitleDescription: state.ThemeOptions.pageTitleDescription,
  courses: state.Courses.courses
});
const mapDispatchToProps = (dispatch) => {
  return {
    setCourses: (payload) => dispatch(setCourses(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PageTitle);
