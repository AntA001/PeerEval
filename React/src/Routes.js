import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { PulseLoader, ClimbingBoxLoader } from 'react-spinners';
import { connect } from 'react-redux';
// Layout Blueprints

import {
  LeftSidebar,
  MinimalLayout,
  PresentationLayout
} from './layout-blueprints';

// Pages

import PageError404 from './example-pages/PageError404';

const Overview = lazy(() => import('./example-pages/Overview'));const Courses = lazy(() => import('./example-pages/PageProjects'));
const addNewCourse = lazy(()=> import('example-components/PageProjects/AddNewCourse'));
const courseView = lazy(()=> import('example-components/PageProjects/CourseView'));
const teamStudentList = lazy(()=> import('example-components/PageProjects/TeamStudents'));
const addNewTeam = lazy(()=> import('example-components/PageProjects/AddNewTeam'));
const teamList = lazy(()=> import('example-components/PageProjects/TeamList'));
const studentList = lazy(()=> import('example-components/PageProjects/StudentList'));
const formsList = lazy(()=> import('example-components/PageProjects/FormsList'));
const addNewForm = lazy(()=> import('example-components/PageProjects/AddNewForm'));
const ReviewTeam = lazy(()=> import('example-components/PageProjects/ReviewTeam'));
const ReviewedTeam = lazy(()=> import('example-components/PageProjects/ReviewedTeam'));
const ResetPassword = lazy(()=> import('example-components/PageProjects/ResetPassword'));
const Login = lazy(() => import('./example-pages/PageLoginBasic'));
const Register = lazy(() =>
  import('./example-pages/PageRegisterBasic')
);
const Recover = lazy(() => import('./example-pages/PageRecoverBasic'));
const PageProfile = lazy(() => import('./example-pages/PageProfile'));

const Routes = (props) => {
  const location = useLocation();
  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.99
    },
    in: {
      opacity: 1,
      scale: 1
    },
    out: {
      opacity: 0,
      scale: 1.01
    }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
  };

  const SuspenseLoading = () => {
    return (
      <>
        <div className="d-flex align-items-center flex-column vh-100 justify-content-center text-center py-3">
          <div className="d-flex align-items-center flex-column px-4">
          <PulseLoader color={'var(--primary)'} loading={true} />
          </div>
        </div>
      </>
    );
  };
  return (
    <AnimatePresence>
      <Suspense fallback={<SuspenseLoading />}>
        <Switch>
        <Route exact path="/">
          {props.user ? <Redirect to="/courses" /> : <Login />}
        </Route> 

    {props.user?.role==="lecturer" &&
          <Route
            path={[
              '/courses',
              '/add-new-course',
              '/courses/view-course/:course_id',
              '/courses/view-team-students/:team_id',
              '/courses/view-team/:form_id',
              '/courses/view-students/:form_id/:team_id',
              '/courses/add-new-team/:course_id',
              '/courses/forms/:course_id',
              '/courses/add-new-form/:course_id',
              '/courses/review-team/:form_id',
              "/courses/reviewed-team/:form_id",
              '/profile'
            ]}>
            <LeftSidebar>
              <Switch location={location} key={location.pathname}>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  >
                  
                  <Route exact path="/courses" component={Courses} />
                  <Route
                    path="/add-new-course"
                    component={addNewCourse}
                  />
                  <Route exact
                    path="/courses/view-course/:course_id"
                    component={courseView}
                  />
                  <Route exact
                    path="/courses/view-team-students/:team_id"
                    component={teamStudentList}
                  />
                  <Route exact
                    path="/courses/add-new-team/:course_id"
                    component={addNewTeam}
                  />
                  <Route exact
                    path="/courses/view-team/:form_id"
                    component={teamList}
                  />
                  <Route exact
                    path="/courses/view-students/:form_id/:team_id"
                    component={studentList}
                  />
                  <Route exact
                    path="/courses/forms/:course_id"
                    component={formsList}
                  />
                  <Route exact
                    path="/courses/add-new-form/:course_id"
                    component={addNewForm}
                  />
                  <Route exact
                    path="/courses/review-team/:form_id"
                    component={ReviewTeam}
                  />
                  <Route exact
                    path="/courses/reviewed-team/:form_id"
                    component={ReviewedTeam}
                  />
                  <Route path="/profile" component={PageProfile} />
                </motion.div>
              </Switch>
            </LeftSidebar>
          </Route>
      }
      {props.user?.role==="student" &&
          <Route
            path={[
              '/courses',
              '/courses/forms/:course_id',
              '/courses/review-team/:form_id',
              "/courses/reviewed-team/:form_id",
              '/profile'
            ]}>
            <LeftSidebar>
              <Switch location={location} key={location.pathname}>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  >
                  
                  <Route exact path="/courses" component={Courses} />
                  <Route exact
                    path="/courses/forms/:course_id"
                    component={formsList}
                  />
                  <Route exact
                    path="/courses/review-team/:form_id"
                    component={ReviewTeam}
                  />
                  <Route exact
                    path="/courses/reviewed-team/:form_id"
                    component={ReviewedTeam}
                  />
                  <Route path="/profile" component={PageProfile} />
                </motion.div>
              </Switch>
            </LeftSidebar>
          </Route>
    }

          <Route
            path={[
              '/login',
              '/register',
              '/reset-password',
              '/recover-password',
              '/PageError404'
            ]}>
            <MinimalLayout>
              <Switch location={location} key={location.pathname}>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}>
                  
                  <Route
                    path="/login"
                    component={Login}
                  />
                  <Route
                    path="/register"
                    component={Register}
                  />
                  <Route
                    path="/recover-password"
                    component={Recover}
                  />
                  <Route
                    path="/reset-password"
                    component={ResetPassword}
                  />
                  <Route path="/PageError404" component={PageError404} />
                </motion.div>
              </Switch>
            </MinimalLayout>
          </Route>
          <Redirect to="/login" />
          <Route path="" component={PageError404} />
          <Route path="*" component={PageError404} />
          <Route component={PageError404} />
        </Switch>
      </Suspense>
    </AnimatePresence>
  );
};

const mapStateToProps = (state) => ({
  user: state.User.user
});

export default connect(mapStateToProps, null)(Routes);
