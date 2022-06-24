import React from 'react';

import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UncontrolledTooltip, Button } from 'reactstrap';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { connect } from 'react-redux';
import { setSidebarToggleMobile } from '../../reducers/ThemeOptions';

import { NavLink } from 'react-router-dom';

import projectLogo from '../../assets/images/react.svg';
import {
  // Settings,
  // CloudDrizzle,
  // Search,
  Grid,
  User,
  // LifeBuoy,
  // Coffee,
  // Bell,
  Plus
} from 'react-feather';

const SidebarCollapsed = (props) => {
  const toggleSidebarMobile = () => {
    setSidebarToggleMobile(!sidebarToggleMobile);
  };

  const {
    sidebarShadow,
    sidebarStyle,
    sidebarToggleMobile,
    setSidebarToggleMobile
  } = props;

  return (
    <>
      <div
        className={clsx(
          'app-sidebar app-sidebar--collapsed app-sidebar--mini',
          sidebarStyle,
          { 'app-sidebar--shadow': sidebarShadow }
        )}>
        <div className="app-sidebar--header">
          <div className="app-sidebar-logo">
            <Link
              to="/courses"
              title="React"
              className="app-sidebar-logo">
              <div className="app-sidebar-logo--icon">
                <img
                  alt="React"
                  src={projectLogo}
                />
              </div>
            </Link>
          </div>
        </div>

        <div className="app-sidebar--content">
          <PerfectScrollbar>
            <ul className="mt-2 sidebar-menu-collapsed">
              {/* <li>
                <NavLink
                  onClick={toggleSidebarMobile}
                  activeClassName="active"
                  to="/PageChat"
                  id="CollapsedSidebarTooltip123">
                  <span>
                    <Settings />
                  </span>
                </NavLink>
                <UncontrolledTooltip
                  popperClassName="tooltip-secondary text-nowrap"
                  placement="right"
                  target="CollapsedSidebarTooltip123"
                  container=".app-sidebar--content"
                  boundariesElement="window">
                  Chat
                </UncontrolledTooltip>
              </li> */}
              {/* <li>
                <NavLink
                  onClick={toggleSidebarMobile}
                  activeClassName="active"
                  to="/PageCalendar"
                  id="CollapsedSidebarTooltip124">
                  <span>
                    <CloudDrizzle />
                  </span>
                </NavLink>
                <UncontrolledTooltip
                  popperClassName="tooltip-secondary text-nowrap"
                  placement="right"
                  target="CollapsedSidebarTooltip124"
                  container=".app-sidebar--content"
                  boundariesElement="window">
                  Calendar
                </UncontrolledTooltip>
              </li> */}
              {/* <li>
                <NavLink
                  onClick={toggleSidebarMobile}
                  activeClassName="active"
                  to="/PageFileManager"
                  id="CollapsedSidebarTooltip125">
                  <span>
                    <Search />
                  </span>
                </NavLink>
                <UncontrolledTooltip
                  popperClassName="tooltip-secondary text-nowrap"
                  placement="right"
                  target="CollapsedSidebarTooltip125"
                  container=".app-sidebar--content"
                  boundariesElement="window">
                  File Manager
                </UncontrolledTooltip>
              </li> */}
              <li>
                <NavLink
                  onClick={toggleSidebarMobile}
                  activeClassName="active"
                  to="/courses"
                  id="CollapsedSidebarTooltip125">
                  <span>
                    <Grid />
                  </span>
                </NavLink>
                <UncontrolledTooltip
                  popperClassName="tooltip-secondary text-nowrap"
                  placement="right"
                  target="CollapsedSidebarTooltip125"
                  container=".app-sidebar--content"
                  boundariesElement="window">
                  Courses
                </UncontrolledTooltip>
              </li>
              <li>
                <NavLink
                  onClick={toggleSidebarMobile}
                  activeClassName="active"
                  to="/add-new-course"
                  id="CollapsedSidebarTooltip126">
                  <span>
                    <Plus />
                  </span>
                </NavLink>
                <UncontrolledTooltip
                  popperClassName="tooltip-secondary text-nowrap"
                  placement="right"
                  target="CollapsedSidebarTooltip126"
                  container=".app-sidebar--content"
                  boundariesElement="window">
                  Add new course
                </UncontrolledTooltip>
              </li>
              <li>
                <NavLink
                  onClick={toggleSidebarMobile}
                  activeClassName="active"
                  to="/profile"
                  id="CollapsedSidebarTooltip127">
                  <span>
                    <User />
                  </span>
                </NavLink>
                <UncontrolledTooltip
                  popperClassName="tooltip-secondary text-nowrap"
                  placement="right"
                  target="CollapsedSidebarTooltip127"
                  container=".app-sidebar--content"
                  boundariesElement="window">
                  Profile
                </UncontrolledTooltip>
              </li>
              {/* <li>
                <NavLink
                  onClick={toggleSidebarMobile}
                  activeClassName="active"
                  to="/DashboardMonitoring"
                  id="CollapsedSidebarTooltip128">
                  <span>
                    <LifeBuoy />
                  </span>
                </NavLink>
                <UncontrolledTooltip
                  popperClassName="tooltip-secondary text-nowrap"
                  placement="right"
                  target="CollapsedSidebarTooltip128"
                  container=".app-sidebar--content"
                  boundariesElement="window">
                  Monitoring Dashboard
                </UncontrolledTooltip>
              </li> */}
              {/* <li>
                <NavLink
                  onClick={toggleSidebarMobile}
                  activeClassName="active"
                  to="/DashboardAnalytics"
                  id="CollapsedSidebarTooltip129">
                  <span>
                    <Coffee />
                  </span>
                </NavLink>
                <UncontrolledTooltip
                  popperClassName="tooltip-secondary text-nowrap"
                  placement="right"
                  target="CollapsedSidebarTooltip129"
                  container=".app-sidebar--content"
                  boundariesElement="window">
                  Analytics Dashboard
                </UncontrolledTooltip>
              </li> */}
              {/* <li>
                <NavLink
                  onClick={toggleSidebarMobile}
                  activeClassName="active"
                  to="/DashboardStatistics"
                  id="CollapsedSidebarTooltip130">
                  <span>
                    <Bell />
                  </span>
                </NavLink>
                <UncontrolledTooltip
                  popperClassName="tooltip-secondary text-nowrap"
                  placement="right"
                  target="CollapsedSidebarTooltip130"
                  container=".app-sidebar--content"
                  boundariesElement="window">
                  Statistics Dashboard
                </UncontrolledTooltip>
              </li> */}
            </ul>
            {/* <div className="text-center mb-2">
              <Button
                tag={Link}
                color="warning"
                className="m-1 p-0 d-inline-block shadow-none text-center font-size-lg d-40 rounded"
                to="/DashboardAnalytics"
                id="CollapsedSidebarTooltip131">
                <FontAwesomeIcon icon={['fas', 'arrow-left']} />
              </Button>
              <UncontrolledTooltip
                popperClassName="tooltip-secondary text-nowrap"
                placement="right"
                target="CollapsedSidebarTooltip131"
                container=".app-sidebar--content"
                boundariesElement="window">
                Back to dashboard
              </UncontrolledTooltip>
            </div> */}
          </PerfectScrollbar>
        </div>
      </div>
      {/* <div
        onClick={toggleSidebarMobile}
        className={clsx('app-sidebar-overlay', {
          'is-active': sidebarToggleMobile
        })}
      /> */}
    </>
  );
};

const mapStateToProps = (state) => ({
  sidebarShadow: state.ThemeOptions.sidebarShadow,
  sidebarStyle: state.ThemeOptions.sidebarStyle,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile
});

const mapDispatchToProps = (dispatch) => ({
  setSidebarToggleMobile: (enable) => dispatch(setSidebarToggleMobile(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarCollapsed);
