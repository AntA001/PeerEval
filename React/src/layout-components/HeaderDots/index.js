import React, { useState } from 'react';

import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  UncontrolledPopover,
  Badge,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  Button,
  Progress
} from 'reactstrap';
import { NavLink as NavLinkStrap } from 'reactstrap';

import avatar1 from '../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../assets/images/avatars/avatar2.jpg';
import avatar6 from '../../assets/images/avatars/avatar6.jpg';
import avatar7 from '../../assets/images/avatars/avatar7.jpg';
import people1 from '../../assets/images/stock-photos/people-1.jpg';
import people3 from '../../assets/images/stock-photos/people-3.jpg';

import { Grid, Users, Bell } from 'react-feather';

import Chart from 'react-apexcharts';
import PerfectScrollbar from 'react-perfect-scrollbar';

const HeaderDots = () => {
  const [activeTab, setActiveTab] = useState('1');
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const chartHeaderDotsOptions = {
    chart: {
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      },
      stacked: true
    },
    dataLabels: {
      enabled: true
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '65%'
      }
    },
    stroke: {
      show: false,
      width: 0,
      colors: ['transparent']
    },
    colors: ['#7a7b97', 'rgba(122, 123, 151, 0.15)'],
    fill: {
      opacity: 1
    },
    legend: {
      show: false
    },
    labels: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
      'Last week',
      'Last month',
      'Last year',
      'Last quarter'
    ],
    xaxis: {
      crosshairs: {
        width: 1
      }
    },
    yaxis: {
      min: 0
    }
  };
  const chartHeaderDotsData = [
    {
      name: 'Net Profit',
      data: [2.3, 3.1, 4.0, 3.8, 5.1, 3.6, 4.0, 3.8, 5.1, 3.6, 3.2]
    },
    {
      name: 'Net Loss',
      data: [2.1, 2.1, 3.0, 2.8, 4.0, 3.8, 5.1, 3.6, 4.1, 2.6, 1.2]
    }
  ];

  return (
    <>
      <div className="d-flex align-items-center popover-header-wrapper">
        <span className="d-inline-block pr-2">
          <Button
            id="alertsPopover"
            color="neutral-success"
            className="bg-neutral-success text-success font-size-lg p-0 d-inline-block shadow-none border-0 text-center d-44 rounded position-relative">
            <span>
              <Badge color="success" className="badge-circle">
                New notifications
              </Badge>
              <Bell />
            </span>
          </Button>
          <UncontrolledPopover
            target="alertsPopover"
            trigger="legacy"
            className="popover-custom-wrapper popover-custom-md"
            placement="auto">
            <div className="bg-composed-wrapper bg-midnight-bloom mx-3 mt-3 border-0 text-center rounded-sm">
              <div className="bg-composed-img-3 bg-composed-wrapper--image" />
              <div className="bg-composed-wrapper--content text-white px-2 py-4">
                <h4 className="font-size-xl font-weight-bold mb-2">
                  Notifications
                </h4>
                <p className="opacity-8 mb-0">
                  You have <b className="text-success">472</b> new messages
                </p>
              </div>
            </div>
            <div className="tabs-animated tabs-animated-shadow tabs-bordered">
              <Nav tabs justified>
                <NavItem>
                  <NavLinkStrap
                    className={clsx({ active: activeTab === '1' })}
                    onClick={() => {
                      toggle('1');
                    }}>
                    <span>Timeline</span>
                  </NavLinkStrap>
                </NavItem>
                <NavItem>
                  <NavLinkStrap
                    className={clsx({ active: activeTab === '2' })}
                    onClick={() => {
                      toggle('2');
                    }}>
                    <span>Tasks</span>
                  </NavLinkStrap>
                </NavItem>
                <NavItem>
                  <NavLinkStrap
                    className={clsx({ active: activeTab === '3' })}
                    onClick={() => {
                      toggle('3');
                    }}>
                    <span>Reports</span>
                  </NavLinkStrap>
                </NavItem>
              </Nav>
            </div>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <div className="scroll-area scroll-area-sm shadow-overflow">
                  <PerfectScrollbar
                    options={{
                      wheelPropagation: false
                    }}>
                    <div className="timeline-list timeline-list-offset timeline-list-offset-dot">
                      <div className="timeline-item">
                        <div className="timeline-item-offset">9:25</div>
                        <div className="timeline-item--content">
                          <div className="timeline-item--icon" />
                          <h4 className="timeline-item--label mb-2 font-weight-bold">
                            1991
                          </h4>
                          <p>
                            The World Wide Web goes live with its first web
                            page.
                          </p>
                        </div>
                      </div>
                      <div className="timeline-item">
                        <div className="timeline-item-offset">9:25</div>
                        <div className="timeline-item--content">
                          <div className="timeline-item--icon" />
                          <h4 className="timeline-item--label mb-2 font-weight-bold">
                            Java exam day
                          </h4>
                          <p>
                            Bill Clinton's presidential scandal makes it online.
                          </p>
                          <div className="avatar-wrapper-overlap mt-2 mb-1">
                            <div className="avatar-icon-wrapper avatar-icon-sm">
                              <div className="avatar-icon">
                                <img alt="..." src={avatar1} />
                              </div>
                            </div>
                            <div className="avatar-icon-wrapper avatar-icon-sm">
                              <div className="avatar-icon">
                                <img alt="..." src={avatar2} />
                              </div>
                            </div>
                            <div className="avatar-icon-wrapper avatar-icon-sm">
                              <div className="avatar-icon">
                                <img alt="..." src={avatar6} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="timeline-item">
                        <div className="timeline-item-offset">9:25</div>
                        <div className="timeline-item--content">
                          <div className="timeline-item--icon" />
                          <h4 className="timeline-item--label mb-2 font-weight-bold">
                            Business investor meeting
                          </h4>
                          <p>
                            Mosaic, the first graphical browser, is introduced
                            to the average consumer.
                          </p>
                          <div className="mt-3">
                            <a href="#/" onClick={(e) => e.preventDefault()}>
                              <img
                                alt="..."
                                className="img-fluid rounded mr-3 shadow-sm"
                                src={people1}
                                width="70"
                              />
                            </a>
                            <a href="#/" onClick={(e) => e.preventDefault()}>
                              <img
                                alt="..."
                                className="img-fluid rounded shadow-sm"
                                src={people3}
                                width="70"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="timeline-item">
                        <div className="timeline-item-offset">9:25</div>
                        <div className="timeline-item--content">
                          <div className="timeline-item--icon" />
                          <h4 className="timeline-item--label mb-2 font-weight-bold">
                            Learning round table gathering
                          </h4>
                          <p>First ever iPod launches.</p>
                          <div className="mt-2">
                            <Button size="sm" color="primary">
                              Submit Report
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="timeline-item">
                        <div className="timeline-item-offset">9:25</div>
                        <div className="timeline-item--content">
                          <div className="timeline-item--icon" />
                          <h4 className="timeline-item--label mb-2 font-weight-bold">
                            2003
                          </h4>
                          <p>
                            MySpace becomes the most popular social network.
                          </p>
                        </div>
                      </div>
                    </div>
                  </PerfectScrollbar>
                </div>
              </TabPane>
              <TabPane tabId="2">
                <div className="scroll-area scroll-area-sm shadow-overflow">
                  <PerfectScrollbar
                    options={{
                      wheelPropagation: false
                    }}>
                    <div className="text-center my-5">
                      <div className="avatar-icon-wrapper rounded-circle m-0">
                        <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-danger text-danger m-0 d-130">
                          <FontAwesomeIcon
                            icon={['fas', 'times']}
                            className="d-flex align-self-center display-3"
                          />
                        </div>
                      </div>
                      <h6 className="font-weight-bold font-size-lg mb-1 mt-4 text-black">
                        Incoming messages
                      </h6>
                      <p className="text-black-50 mb-0">
                        You have pending actions to take care of.
                      </p>
                    </div>
                  </PerfectScrollbar>
                </div>
              </TabPane>
              <TabPane tabId="3">
                <div className="scroll-area scroll-area-sm shadow-overflow">
                  <PerfectScrollbar
                    options={{
                      wheelPropagation: false
                    }}>
                    <div className="text-center my-3">
                      <div
                        className="btn-group btn-group-sm mx-auto"
                        role="group">
                        <Button active outline color="second">
                          Income
                        </Button>
                        <Button outline color="second">
                          Expenses
                        </Button>
                      </div>
                    </div>
                    <div className="text-center text-black font-size-lg pb-1 font-weight-bold">
                      Total Sales
                      <small className="d-block text-black-50">
                        Total performance for selected period
                      </small>
                    </div>
                    <div className="px-2 pb-3 pt-2">
                      <Chart
                        options={chartHeaderDotsOptions}
                        series={chartHeaderDotsData}
                        type="bar"
                        height={176}
                      />
                    </div>
                  </PerfectScrollbar>
                </div>
              </TabPane>
            </TabContent>
            <div className="text-center py-3">
              <Button
                color="primary"
                className="px-4 btn-gradient badge-wrapper bg-midnight-bloom">
                <Badge
                  color="warning"
                  className="badge-position badge-position--top-right badge-circle-inner">
                  New notifications
                </Badge>
                <span className="btn-wrapper--label">Learn more</span>
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                </span>
              </Button>
            </div>
          </UncontrolledPopover>
        </span>
        <span className="d-inline-block pr-2">
          <Button
            id="settingsPopover"
            color="neutral-danger"
            className="bg-neutral-danger text-danger font-size-lg p-0 d-inline-block shadow-none border-0 text-center d-44 rounded position-relative">
            <span>
              <Badge color="danger" className="badge-circle badge-header-alt">
                Online
              </Badge>
              <Grid />
            </span>
          </Button>
          <UncontrolledPopover
            target="settingsPopover"
            trigger="legacy"
            className="popover-custom-wrapper popover-custom-lg"
            placement="auto">
            <ul className="list-group list-group-flush text-left bg-transparent">
              <li className="list-group-item rounded-top">
                <div className="align-box-row">
                  <div className="avatar-icon-wrapper avatar-icon-md">
                    <div className="avatar-icon rounded-circle">
                      <img alt="..." src={avatar7} />
                    </div>
                  </div>
                  <div className="pl-2">
                    <span className="font-weight-bold d-block">
                      Emma Taylor
                    </span>
                    <small className="pb-0 text-black-50 d-block">
                      This is an accountant profile
                    </small>
                  </div>
                </div>
              </li>
              <li className="list-group-item bg-transparent py-2">
                <div className="align-box-row mb-1">
                  <div>
                    <small className="font-weight-bold">
                      Profile completion
                    </small>
                  </div>
                </div>
                <Progress
                  className="progress-bar-rounded progress-bar-sm progress-animated-alt"
                  color="success"
                  value="43">
                  43%
                </Progress>
                <div className="align-box-row progress-bar--label mt-1 text-muted">
                  <small className="text-dark">0</small>
                  <small className="ml-auto">100%</small>
                </div>
              </li>
            </ul>
            <div className="card-footer bg-white p-3 text-center d-block">
              <Button size="sm" color="dark" className="mr-1">
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon icon={['far', 'keyboard']} />
                </span>
                <span className="btn-wrapper--label">Tasks</span>
              </Button>
              <Button
                size="sm"
                outline
                color="danger"
                className="ml-1"
                title="Sign out">
                <FontAwesomeIcon icon={['fas', 'sign-out-alt']} />
              </Button>
            </div>
          </UncontrolledPopover>
        </span>
        <span className="d-inline-block pr-2">
          <Button
            id="dotsMenuPopover"
            color="neutral-first"
            className="bg-neutral-first text-first font-size-lg p-0 d-inline-block shadow-none border-0 text-center d-44 rounded btn-transition-none">
            <span>
              <Users />
            </span>
          </Button>
          <UncontrolledPopover
            target="dotsMenuPopover"
            trigger="legacy"
            popperClassName="popover-second shadow-lg"
            placement="auto"
            className="popover-custom-wrapper popover-custom-lg">
            <div className="px-3 pt-3 pb-2 text-center">
              <div className="m-3 d-inline-block text-center">
                <Button
                  tag="a"
                  color="link"
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="p-0 bg-ripe-malin d-inline-block btn-icon text-center text-white d-50 rounded border-0 mb-2">
                  <FontAwesomeIcon
                    icon={['far', 'gem']}
                    className="font-size-xl"
                  />
                </Button>
                <div className="d-block text-white-50">Tasks</div>
              </div>
              <div className="m-3 d-inline-block text-center">
                <Button
                  tag="a"
                  color="link"
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="p-0 bg-grow-early d-inline-block btn-icon text-center text-white d-50 rounded border-0 mb-2">
                  <FontAwesomeIcon
                    icon={['far', 'building']}
                    className="font-size-xl"
                  />
                </Button>
                <div className="d-block text-white-50">Reports</div>
              </div>
              <div className="m-3 d-inline-block text-center">
                <Button
                  tag="a"
                  color="link"
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="p-0 bg-arielle-smile d-inline-block btn-icon text-center text-white d-50 rounded border-0 mb-2">
                  <FontAwesomeIcon
                    icon={['far', 'chart-bar']}
                    className="font-size-xl"
                  />
                </Button>
                <div className="d-block text-white-50">Stats</div>
              </div>
            </div>
            <div className="divider opacity-2 bg-white mb-1" />
            <div className="text-center">
              <Button
                tag="a"
                href="#/"
                onClick={(e) => e.preventDefault()}
                color="link"
                className="btn-link-light text-white">
                View more items
              </Button>
            </div>
          </UncontrolledPopover>
        </span>
      </div>
    </>
  );
};

export default HeaderDots;
