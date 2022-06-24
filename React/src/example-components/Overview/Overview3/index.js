import React from 'react';

import { Row, Col, Card, Container, Badge, Button } from 'reactstrap';

import GaugeChart from 'react-gauge-chart';
import { NavLink } from 'react-router-dom';

import crypto from '../../../assets/images/apps/bamburgh-react-crypto-application-reactstrap-pro.jpg';
import messenger from '../../../assets/images/apps/bamburgh-react-messenger-application-reactstrap-pro.jpg';
import commerce from '../../../assets/images/apps/bamburgh-react-commerce-application-reactstrap-pro.jpg';
import general from '../../../assets/images/apps/bamburgh-react-admin-dashboard-reactstrap-pro.jpg';

import hero1 from '../../../assets/images/hero-bg/hero-5.jpg';

import { Bell } from 'react-feather';

export default function LivePreviewExample() {
  return (
    <>
      <div className="hero-wrapper bg-deep-blue bg-composed-wrapper">
        <div className="flex-grow-1 w-100 d-flex align-items-center">
          <div
            className="bg-composed-wrapper--image opacity-5"
            style={{ backgroundImage: 'url(' + hero1 + ')' }}
          />
          <div className="bg-composed-wrapper--bg bg-second opacity-7" />
          <div className="bg-composed-wrapper--content align-self-center p-4 p-xl-5">
            <Container className="pb-5 py-lg-5 text-center">
              <div className="mb-4">
                <div className="badge badge-success mb-3 h-auto py-2 px-4 font-size-xs badge-pill font-weight-normal">
                  Included
                </div>
                <h4 className="font-weight-bold text-white display-3">
                  Individual Applications
                </h4>
                <Col md="11" lg="10" className="mx-auto">
                  <p className="text-white opacity-6 mt-3 mb-5 font-size-xxl">
                    This template comes with included individual applications,
                    making it easy to start with something closer to your
                    project requirements
                  </p>
                </Col>
              </div>
              <Row>
                <Col md="6">
                  <div className="card shadow-sm-dark rounded-lg bg-transparent">
                    <div className="card-img-wrapper">
                      <div className="card-badges card-badges-bottom">
                        <div className="badge badge-pill h-auto py-1 px-3 badge-success shadow-xxl">
                          Active
                        </div>
                      </div>
                      <img
                        src={general}
                        className="rounded-lg img-fluid"
                        alt="..."
                      />
                    </div>
                  </div>
                  <p className="text-white font-weight-bold font-size-xxl pt-3 mb-5">
                    General
                  </p>
                </Col>
                <Col md="6">
                  <a
                    href="https://demo.uifort.com/bamburgh-react-crypto-application-reactstrap-pro-demo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card modal-content card-box-hover-rise rounded-lg bg-transparent">
                    <img
                      src={crypto}
                      className="rounded-lg img-fluid"
                      alt="..."
                    />
                  </a>
                  <p className="text-white font-weight-bold font-size-xxl pt-3 mb-5">
                    Crypto
                  </p>
                </Col>
                <Col md="6">
                  <a
                    href="https://demo.uifort.com/bamburgh-react-messenger-application-reactstrap-pro-demo"
                    className="card modal-content card-box-hover-rise rounded-lg bg-transparent">
                    <img
                      src={messenger}
                      className="rounded-lg img-fluid"
                      alt="..."
                    />
                  </a>
                  <p className="text-white font-weight-bold font-size-xxl pt-3 mb-5">
                    Messenger
                  </p>
                </Col>
                <Col md="6">
                  <a
                    href="https://demo.uifort.com/bamburgh-react-commerce-application-reactstrap-pro-demo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card modal-content card-box-hover-rise rounded-lg bg-transparent">
                    <img
                      src={commerce}
                      className="rounded-lg img-fluid"
                      alt="..."
                    />
                  </a>
                  <p className="text-white font-weight-bold font-size-xxl pt-3 mb-5">
                    Commerce
                  </p>
                </Col>
              </Row>

              <div className="py-4 mb-4">
                <Button
                  tag="a"
                  href="https://uifort.com/template/bamburgh-react-admin-dashboard-reactstrap-pro"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="btn-pill shadow-second-sm"
                  color="first"
                  size="lg">
                  <span>View Product Details</span>
                </Button>
              </div>
            </Container>
          </div>
        </div>
      </div>

      <div className="py-4 feature-box">
        <Container className="py-5">
          <div className="mb-4 text-center">
            <div className="badge badge-neutral-success text-success mb-3 h-auto py-2 px-4 font-size-xs badge-pill font-weight-normal">
              Unlimited Options
            </div>
            <h4 className="font-weight-bold text-second display-3">
              Build anything you want
            </h4>
            <Col md="11" lg="10" className="mx-auto">
              <p className="text-second opacity-6 mt-3 mb-5 font-size-xxl">
                We've got you covered with over 500 custom components ready to
                use
              </p>
            </Col>
          </div>
          <Row className="mt-5">
            <Col xl="4" className="d-flex align-items-center">
              <Row className="w-100 mb-3 mb-xl-0">
                <Col lg="4" xl="12">
                  <div className="feature-box pr-4">
                    <h3 className="font-size-xl font-weight-bold my-3 text-primary">
                      Marketing Sections
                    </h3>
                    <p className="text-black-50 mb-3">
                      These can be used to build presentation websites in the
                      same consistent style like your application.
                    </p>
                  </div>
                </Col>
                <Col lg="4" xl="12">
                  <div className="feature-box pr-4">
                    <h3 className="font-size-xl font-weight-bold my-3 text-primary">
                      Data Display
                    </h3>
                    <p className="text-black-50 mb-3">
                      We've built a plethora of component blocks that can be
                      composed to form new elements or sections.
                    </p>
                  </div>
                </Col>
                <Col lg="4" xl="12">
                  <div className="feature-box pr-4">
                    <h3 className="font-size-xl font-weight-bold my-3 text-primary">
                      UI Widgets
                    </h3>
                    <p className="text-black-50 mb-3">
                      Interaction is important in all apps, this being the
                      reason we've built over 200 examples with the 80+
                      integrated widgets.
                    </p>
                  </div>
                </Col>
                <Col lg="4" xl="12">
                  <div className="feature-box pr-4">
                    <h3 className="font-size-xl font-weight-bold my-3 text-primary">
                      Forms Plugins
                    </h3>
                    <p className="text-black-50 mb-3">
                      Custom upload forms, multiple style sliders, tabs,
                      accordions - you'll get them all with this template.
                    </p>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md="8" xl="5" className="d-flex align-items-center">
              <Card className="bg-second shadow-xxl card-box card-box-hover-rise card-box-hover rounded-lg text-center p-3 p-xl-4 mb-4 mb-md-0 d-block">
                <div className="d-100 object-skew hover-scale-sm icon-blob btn-icon text-first mx-auto">
                  <svg
                    className="blob-wrapper opacity-1"
                    viewBox="0 0 600 600"
                    xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(300,300)">
                      <path
                        d="M169,-144C206.7,-87.5,216.5,-18,196.9,35.7C177.3,89.4,128.3,127.1,75.2,150.7C22,174.2,-35.4,183.5,-79.7,163.1C-124,142.7,-155.1,92.6,-164.1,40.9C-173.1,-10.7,-160.1,-64,-129,-118.9C-98,-173.8,-49,-230.4,8.3,-237.1C65.7,-243.7,131.3,-200.4,169,-144Z"
                        fill="currentColor"
                      />
                    </g>
                  </svg>
                  <div className="blob-icon-wrapper">
                    <Bell />
                  </div>
                </div>
                <h5 className="font-weight-bold font-size-lg text-white mb-2">
                  Gent Data Center
                </h5>
                <p className="mb-4 text-white-50">
                  Browse through the live previews to see just how powerful this
                  admin template really is!
                </p>
                <GaugeChart
                  id="chartsGauges1A"
                  nrOfLevels={24}
                  colors={['rgba(255,0,3,0.6)', 'rgba(255,236,64,0.8)']}
                  arcWidth={0.3}
                  percent={0.82}
                />
                <Button
                  tag={NavLink}
                  to="/DashboardMonitoring"
                  color="first"
                  className="badge-wrapper transition-base rounded-pill py-2 px-4 text-capitalize font-size-sm mt-3 d-inline-flex">
                  <span>View Dashboard</span>
                  <Badge
                    color="warning"
                    className="badge-position badge-position--top-right shadow-none badge-circle"
                    id="NewNotificationsTooltip1">
                    New notifications
                  </Badge>
                </Button>
              </Card>
            </Col>
            <Col md="4" xl="3" className="d-flex align-items-center">
              <div className="py-2 py-xl-4">
                <div className="d-flex align-items-end flex-column">
                  <div className="feature-box">
                    <h3 className="font-size-lg font-weight-bold my-3">
                      <div className="display-4 text-primary font-weight-bold">
                        Gauges, maybe?
                      </div>
                    </h3>
                    <p className="text-black-50 font-size-lg mb-0">
                      This is just one example of what comes packed in this
                      template.
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
