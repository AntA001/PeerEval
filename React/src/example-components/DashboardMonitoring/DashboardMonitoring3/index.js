import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Row,
  Col,
  Card,
  Badge,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu
} from 'reactstrap';
import { NavLink as NavLinkStrap } from 'reactstrap';
import Chart from 'react-apexcharts';
import CountUp from 'react-countup';
export default function LivePreviewExample() {
  const chartDashboardMonitoring3AOptions = {
    chart: {
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    fill: {
      opacity: 0.85,
      colors: ['#f4772e', '#4191ff']
    },
    colors: ['#f4772e', '#4191ff'],
    legend: {
      show: false
    },
    grid: {
      strokeDashArray: '5',
      borderColor: 'rgba(125, 138, 156, 0.3)'
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
  const chartDashboardMonitoring3AData = [
    {
      name: 'Net Profit',
      data: [3.3, 3.1, 4.0, 5.8, 2.1, 3.6, 3.2]
    },
    {
      name: 'Net Loss',
      data: [2.1, 2.1, 2.8, 2.8, 4.3, 2.7, 1.4]
    }
  ];

  return (
    <>
      <Row>
        <Col xl="5">
          <Card className="card-box mb-5 px-4 pt-4 text-center">
            <UncontrolledDropdown className="card-tr-actions">
              <DropdownToggle
                size="sm"
                color="link"
                className="btn-link-dark p-0 text-dark opacity-8">
                <FontAwesomeIcon
                  icon={['fas', 'ellipsis-h']}
                  className="font-size-lg"
                />
              </DropdownToggle>
              <DropdownMenu
                right
                className="dropdown-menu-lg overflow-hidden p-0">
                <Nav pills className=" flex-column p-3">
                  <NavItem>
                    <NavLinkStrap href="#/" onClick={(e) => e.preventDefault()}>
                      <span>My Account</span>
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      active>
                      <span>Profile settings</span>
                      <Badge color="first" className="ml-auto">
                        23
                      </Badge>
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap href="#/" onClick={(e) => e.preventDefault()}>
                      <span>Active tasks</span>
                    </NavLinkStrap>
                  </NavItem>
                </Nav>
              </DropdownMenu>
            </UncontrolledDropdown>
            <div className="card-header-alt">
              <div className="font-weight-bold font-size-lg mb-0 text-black">
                Financial year
              </div>
              <p className="text-black-50">Expenses statistics to date</p>
            </div>
            <div className="divider mb-4 mt-3" />
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
            <div className="divider my-4" />
            <Row>
              <Col xs="6">
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
              <Col xs="6">
                <span className="opacity-6 pb-2">Last year</span>
                <div className="d-flex align-items-center justify-content-center">
                  <span className="font-weight-bold font-size-lg">
                    <small className="opacity-6 pr-1">$</small>
                    34,546
                  </span>
                  <Badge color="neutral-success" className="text-success ml-2">
                    +13%
                  </Badge>
                </div>
              </Col>
            </Row>
            <div className="font-weight-bold font-size-lg mt-4 mb-2 text-black">
              Monthly report
            </div>
            <Chart
              options={chartDashboardMonitoring3AOptions}
              series={chartDashboardMonitoring3AData}
              type="bar"
              height={205}
            />
          </Card>
        </Col>
        <Col xl="7">
          <Row>
            <Col md="6">
              <Card className="card-box mb-5 p-4">
                <div className="font-weight-bold font-size-sm text-uppercase text-second mt-2">
                  Positive Reviews
                </div>
                <div className="my-2">
                  <div className="d-flex py-4 align-items-center">
                    <div className="d-60 rounded border-0 card-icon-wrapper flex-shrink-0 bg-first text-white btn-icon text-center shadow-first mr-3">
                      <FontAwesomeIcon
                        icon={['far', 'comment-dots']}
                        className="display-4"
                      />
                    </div>
                    <div className="display-3 font-weight-bold ml-1">0.16%</div>
                  </div>
                  <div className="text-black-50 font-weight-bold mb-2">
                    <a
                      className="text-first"
                      href="#/"
                      onClick={(e) => e.preventDefault()}>
                      See reviews
                    </a>{' '}
                    that were left by past customers from USA.
                  </div>
                </div>
              </Card>
            </Col>
            <Col md="6">
              <Card className="card-box mb-5 p-4">
                <div className="font-weight-bold font-size-sm text-uppercase text-second mt-2">
                  Bounce Rate
                </div>
                <div className="my-2">
                  <div className="d-flex py-4 align-items-center">
                    <div className="d-60 rounded border-0 card-icon-wrapper flex-shrink-0 bg-warning text-white btn-icon text-center shadow-warning mr-3">
                      <FontAwesomeIcon
                        icon={['fas', 'map-marked-alt']}
                        className="display-4"
                      />
                    </div>
                    <div className="display-3 font-weight-bold ml-1">
                      12.87%
                    </div>
                  </div>
                  <div className="text-black-50 font-weight-bold mb-2">
                    <a
                      className="text-first"
                      href="#/"
                      onClick={(e) => e.preventDefault()}>
                      See visits
                    </a>{' '}
                    that had a higher than expected bounce rate.
                  </div>
                </div>
              </Card>
            </Col>
            <Col md="6">
              <Card className="card-box mb-5 p-4">
                <div className="font-weight-bold font-size-sm text-uppercase text-second mt-2">
                  Active Referrals
                </div>
                <div className="my-2">
                  <div className="d-flex py-4 align-items-center">
                    <div className="d-60 rounded border-0 card-icon-wrapper flex-shrink-0 bg-danger text-white btn-icon text-center shadow-danger mr-3">
                      <FontAwesomeIcon
                        icon={['far', 'envelope']}
                        className="display-4"
                      />
                    </div>
                    <div className="display-3 font-weight-bold ml-1">175</div>
                  </div>
                </div>
                <div className="text-black-50 font-weight-bold mb-2">
                  <a
                    className="text-first"
                    href="#/"
                    onClick={(e) => e.preventDefault()}>
                    See referring
                  </a>{' '}
                  domains that sent most visits last month.
                </div>
              </Card>
            </Col>
            <Col md="6">
              <Card className="card-box mb-5 p-4">
                <div className="font-weight-bold font-size-sm text-uppercase text-second mt-2">
                  Opened Invites
                </div>
                <div className="my-2">
                  <div className="d-flex py-4 align-items-center">
                    <div className="d-60 rounded border-0 card-icon-wrapper flex-shrink-0 bg-success text-white btn-icon text-center shadow-success mr-3">
                      <FontAwesomeIcon
                        icon={['fas', 'tachometer-alt']}
                        className="display-4"
                      />
                    </div>
                    <div className="display-3 font-weight-bold ml-1">
                      64.39%
                    </div>
                  </div>
                </div>
                <div className="text-black-50 font-weight-bold mb-2">
                  <a
                    className="text-first"
                    href="#/"
                    onClick={(e) => e.preventDefault()}>
                    See clients
                  </a>{' '}
                  that accepted your invitation to connect.
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
