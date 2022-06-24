import React from 'react';

import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Row,
  Col,
  CustomInput,
  Badge,
  ListGroup,
  ListGroupItem,
  UncontrolledTooltip,
  Button
} from 'reactstrap';

import { connect } from 'react-redux';

import { setHeaderDrawerToggle } from '../../reducers/ThemeOptions';

import avatar1 from '../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../assets/images/avatars/avatar2.jpg';
import avatar6 from '../../assets/images/avatars/avatar6.jpg';
import avatar7 from '../../assets/images/avatars/avatar7.jpg';

import {
  CircularProgressbarWithChildren,
  buildStyles
} from 'react-circular-progressbar';
import CountUp from 'react-countup';
import Chart from 'react-apexcharts';
import PerfectScrollbar from 'react-perfect-scrollbar';

const HeaderDrawer = (props) => {
  const chartHeaderDrawerOptions = {
    chart: {
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      }
    },

    stroke: {
      color: '#1bc943',
      curve: 'smooth',
      width: 4
    },
    colors: ['#1bc943'],
    fill: {
      color: '1bc943',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.7,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 0,
        stops: [0, 100]
      }
    },
    xaxis: {
      crosshairs: {
        width: 1
      }
    },
    yaxis: {
      min: 0
    }
  };
  const chartHeaderDrawerData = [
    {
      name: 'Monthly Analytics',
      data: [47, 38, 56, 24, 45, 54, 38, 56, 24, 65]
    }
  ];

  const { headerDrawerToggle, setHeaderDrawerToggle } = props;

  const toogleHeaderDrawer = () => {
    setHeaderDrawerToggle(!headerDrawerToggle);
  };

  return (
    <>
      <div className="app-drawer-wrapper">
        <button
          onClick={toogleHeaderDrawer}
          className={clsx('navbar-toggler hamburger hamburger--elastic', {
            'is-active': headerDrawerToggle
          })}>
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </button>
      </div>

      <div className="app-drawer-content">
        <Button
          onClick={toogleHeaderDrawer}
          className="close-drawer-btn btn btn-sm"
          id="CloseDrawerTooltip">
          <div
            className={clsx('navbar-toggler hamburger hamburger--elastic', {
              'is-active': headerDrawerToggle
            })}>
            <span className="hamburger-box">
              <span className="hamburger-inner" />
            </span>
          </div>
        </Button>
        <UncontrolledTooltip target="CloseDrawerTooltip" placement="left">
          Close drawer
        </UncontrolledTooltip>
        <div className="vh-100 shadow-overflow">
          <PerfectScrollbar>
            <div className="p-4">
              <div className="text-center">
                <div className="font-weight-bold font-size-lg mb-0 text-black">
                  Today's sales target
                </div>
                <p className="text-black-50">
                  Daily statistics regarding your sales targets
                </p>
              </div>
              <div className="rounded p-4 text-white bg-deep-sky">
                <div className="d-flex mb-3 px-0 justify-content-center">
                  <CircularProgressbarWithChildren
                    circleRatio={0.75}
                    styles={buildStyles({
                      textColor: 'var(--white)',
                      pathColor: 'rgba(255,255,255,.95)',
                      trailColor: 'rgba(255,255,255,.1)',
                      rotation: 1 / 2 + 1 / 8
                    })}
                    value={63}
                    strokeWidth={8}
                    className="circular-progress-xl">
                    <span className="font-weight-bold font-size-xl">63%</span>
                  </CircularProgressbarWithChildren>
                </div>
                <Button
                  block={true}
                  size="sm"
                  color="secondary"
                  className="shadow-none text-uppercase font-size-xs font-weight-bold">
                  Generate report
                </Button>
              </div>
            </div>
            <div className="divider" />
            <div className="p-4 text-center">
              <h3 className="mb-0 display-3 mt-1 font-weight-bold">
                $
                <span className="pr-1">
                  <CountUp
                    start={0}
                    end={458.695}
                    duration={4}
                    separator=""
                    delay={3}
                    decimals={3}
                    decimal=","
                    prefix=""
                    suffix=""
                  />
                </span>
              </h3>
              <Chart
                options={chartHeaderDrawerOptions}
                series={chartHeaderDrawerData}
                type="area"
                height={120}
              />
              <Row className="mt-3">
                <Col md="6">
                  <span className="opacity-6 pb-2">Current month</span>
                  <div className="d-flex align-items-center justify-content-center">
                    <span className="font-weight-bold font-size-lg">
                      <small className="opacity-6 pr-1">$</small>
                      46,362
                    </span>
                    <Badge color="neutral-danger" className="ml-2 text-danger">
                      -8%
                    </Badge>
                  </div>
                </Col>
                <Col md="6">
                  <span className="opacity-6 pb-2">Last year</span>
                  <div className="d-flex align-items-center justify-content-center">
                    <span className="font-weight-bold font-size-lg">
                      <small className="opacity-6 pr-1">$</small>
                      34,546
                    </span>
                    <Badge
                      color="neutral-success"
                      className="text-success ml-2">
                      +13%
                    </Badge>
                  </div>
                </Col>
              </Row>
              <div className="pb-2 pt-4 text-center">
                <Button size="sm" outline color="second">
                  <span className="btn-wrapper--label">
                    View complete report
                  </span>
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                  </span>
                </Button>
              </div>
            </div>
            <div className="divider" />
            <div className="p-4">
              <div className="text-center">
                <div className="font-weight-bold font-size-lg mb-0 text-black">
                  Tasks
                </div>
                <p className="text-black-50">Your daily tasks list</p>
              </div>
              <div className="rounded p-3 bg-secondary">
                <div className="task-wrapper">
                  <div className="task-item">
                    <div className="align-box-row">
                      <CustomInput
                        type="checkbox"
                        id="checkboxProjects12"
                        className="align-self-center"
                        label="&nbsp;"
                      />
                      <div>
                        <b>Finish tasks for today</b>
                        <p className="text-black-50 mt-1 mb-0">
                          But I must explain to you how all this mistaken idea.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="task-item">
                    <div className="align-box-row">
                      <CustomInput
                        type="checkbox"
                        id="checkboxProjects13"
                        className="align-self-center"
                        label="&nbsp;"
                      />
                      <div>
                        <b>Blinded by desire</b>
                        <p className="text-black-50 mt-1 mb-0">
                          A wonderful serenity has taken possession.
                        </p>
                        <div className="timeline-list mt-3">
                          <div className="timeline-item timeline-item-icon">
                            <div className="timeline-item--content">
                              <div className="timeline-item--icon-wrapper bg-danger text-white">
                                <FontAwesomeIcon icon={['far', 'gem']} />
                              </div>
                              <h4 className="timeline-item--label mb-2 font-weight-bold">
                                1998
                              </h4>
                              <p>
                                Bill Clinton's presidential scandal makes it
                                online.
                              </p>
                            </div>
                          </div>
                          <div className="timeline-item">
                            <div className="timeline-item--content">
                              <div className="timeline-item--icon" />
                              <h4 className="timeline-item--label mb-2 font-weight-bold">
                                Java exam day
                              </h4>
                              <p>
                                Bill Clinton's presidential scandal makes it
                                online.
                              </p>
                              <div className="avatar-wrapper-overlap mt-2 mb-1">
                                <div className="avatar-icon-wrapper avatar-icon-sm">
                                  <div className="avatar-icon">
                                    <img alt="..." src={avatar1} />
                                  </div>
                                </div>
                                <div className="avatar-icon-wrapper avatar-icon-sm">
                                  <div className="avatar-icon">
                                    <img alt="..." src={avatar7} />
                                  </div>
                                </div>
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
                            <div className="timeline-item--content">
                              <div className="timeline-item--icon" />
                              <h4 className="timeline-item--label mb-2 font-weight-bold">
                                Business investor meeting
                                <Badge
                                  color="neutral-info"
                                  className="text-info ml-2">
                                  New
                                </Badge>
                              </h4>
                              <p>
                                Mosaic, the first graphical browser, is
                                introduced to the average consumer.
                              </p>
                              <div className="mt-3">
                                <Button size="sm" color="primary">
                                  Submit Report
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="task-item">
                    <div className="align-box-row">
                      <CustomInput
                        type="checkbox"
                        id="checkboxProjects14"
                        className="align-self-center"
                        label="&nbsp;"
                      />
                      <div className="w-100">
                        <b>World among the stalks</b>
                        <p className="text-black-50 mt-1">
                          Who formed us in his own image, and the breath.
                        </p>

                        <ListGroup flush>
                          <ListGroupItem className="bg-white d-flex justify-content-between align-items-center p-4">
                            <div className="w-100">
                              <div className="d-flex flex-wrap justify-content-between mb-2">
                                <small className="line-height-xs text-uppercase text-muted">
                                  Nov 12, 11:25am
                                </small>
                                <small className="line-height-xs text-uppercase text-success">
                                  Due in 12 days
                                </small>
                              </div>
                              <h6 className="py-1">
                                <a
                                  href="#/"
                                  className="font-weight-bold"
                                  onClick={(e) => e.preventDefault()}>
                                  #56 - Deploy new website
                                </a>
                              </h6>
                              <p className="mb-3">
                                This is a dummy text acting ...
                              </p>
                              <div className="d-flex justify-content-between align-items-center">
                                <Badge
                                  pill
                                  color="danger"
                                  href="#/"
                                  onClick={(e) => e.preventDefault()}
                                  className="px-3">
                                  Files ready
                                </Badge>
                                <div>
                                  <Button size="sm" color="first">
                                    <span className="btn-wrapper--icon">
                                      <FontAwesomeIcon
                                        icon={['fas', 'plus']}
                                        className="font-size-sm"
                                      />
                                    </span>
                                    <span className="btn-wrapper--label">
                                      Add
                                    </span>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </ListGroupItem>
                          <ListGroupItem className="d-flex justify-content-between align-items-center align-content-center pl-1">
                            <Button
                              tag="a"
                              href="#/"
                              onClick={(e) => e.preventDefault()}
                              size="sm"
                              color="link"
                              id="CommentsTooltip331">
                              <span className="btn-wrapper--icon">
                                <FontAwesomeIcon icon={['far', 'comments']} />
                              </span>
                              <span className="btn-wrapper--label ml-1">
                                653
                              </span>
                            </Button>
                            <UncontrolledTooltip
                              target="CommentsTooltip331"
                              placement="top">
                              There are 653 new comments available!
                            </UncontrolledTooltip>
                            <div>
                              <small className="text-muted mr-1">(21)</small>
                              <FontAwesomeIcon
                                icon={['fas', 'star']}
                                className="text-warning"
                              />
                              <FontAwesomeIcon
                                icon={['fas', 'star']}
                                className="text-warning"
                              />
                              <FontAwesomeIcon
                                icon={['fas', 'star']}
                                className="text-warning"
                              />
                              <FontAwesomeIcon
                                icon={['fas', 'star']}
                                className="text-warning"
                              />
                              <FontAwesomeIcon
                                icon={['fas', 'star']}
                                className="text-warning"
                              />
                            </div>
                          </ListGroupItem>
                        </ListGroup>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="divider" />
            <div className="p-4">
              <div className="text-center">
                <div className="font-weight-bold font-size-lg mb-0 text-black">
                  Latest sales
                </div>
                <p className="text-black-50">Latest reports available</p>
              </div>
              <Row>
                <Col lg="6">
                  <div className="bg-secondary rounded py-2 px-1">
                    <div className="display-3 text-center line-height-sm text-second text-center d-flex align-items-center pt-3 justify-content-center">
                      <FontAwesomeIcon
                        icon={['far', 'dot-circle']}
                        className="font-size-sm text-warning mr-2"
                      />
                      <div>436</div>
                    </div>
                    <div className="text-black-50 text-center opacity-6 pt-3">
                      <b>+65%</b> increase
                    </div>
                  </div>
                </Col>
                <Col lg="6">
                  <div className="bg-secondary rounded py-2 px-1">
                    <div className="display-3 text-center line-height-sm text-second text-center d-flex align-items-center pt-3 justify-content-center">
                      <FontAwesomeIcon
                        icon={['fas', 'arrow-up']}
                        className="font-size-sm text-success mr-2"
                      />
                      <div>843</div>
                    </div>
                    <div className="text-black-50 text-center opacity-6 pt-3">
                      <b>-22%</b> decrease
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </PerfectScrollbar>
        </div>
      </div>

      <div
        onClick={toogleHeaderDrawer}
        className={clsx('app-drawer-overlay', {
          'is-active': headerDrawerToggle
        })}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  headerDrawerToggle: state.ThemeOptions.headerDrawerToggle
});

const mapDispatchToProps = (dispatch) => ({
  setHeaderDrawerToggle: (enable) => dispatch(setHeaderDrawerToggle(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderDrawer);
