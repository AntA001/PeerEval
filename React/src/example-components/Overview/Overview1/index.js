import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col, Container, Button } from 'reactstrap';

import { NavLink } from 'react-router-dom';

import particles2 from '../../../assets/images/hero-bg/particles-2.svg';
import hero1 from '../../../assets/images/hero-bg/hero-1.jpg';
import { Award, TrendingUp, Box, Sliders } from 'react-feather';

import OverviewHeader from './OverviewHeader.js';

export default function LivePreviewExample() {
  return (
    <>
      <div className="hero-wrapper bg-composed-wrapper bg-deep-sky">
        <Container>
          <OverviewHeader />
        </Container>
        <div className="hero-wrapper--content">
          <div
            className="bg-composed-wrapper--image opacity-7"
            style={{ backgroundImage: 'url(' + hero1 + ')' }}
          />
          <div className="bg-composed-wrapper--bg bg-second opacity-6" />
          <div className="bg-composed-wrapper--bg bg-primary opacity-6" />
          <div
            className="bg-composed-wrapper--image bg-composed-filter-rm opacity-9"
            style={{ backgroundImage: 'url(' + particles2 + ')' }}
          />
          <div className="bg-composed-wrapper--content">
            <Container className="z-over shadow-container-content-5 text-white text-center pt-5">
              <Col md="11" lg="10" xl="8" className="mx-auto py-3 py-lg-5">
                <h2 className="display-3 font-weight-bold">
                  Bamburgh React Admin Dashboard with Reactstrap PRO
                </h2>
                <p className="font-size-xl py-3 text-white-50">
                  This admin template is a complete frontend solution for
                  easy-building applications or presentation websites. It&#39;s
                  fully responsive and designed by professional UI&#x2F;UX
                  designers and developers.
                </p>
                <div className="py-4 mb-4">
                  <Button
                    tag={NavLink}
                    to="/DashboardCommerce"
                    size="lg"
                    className="btn-pill shadow-second-sm"
                    color="first">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                    </span>
                    <span className="btn-wrapper--label">
                      Browse Dashboards
                    </span>
                  </Button>
                  <Button
                    tag="a"
                    href="https://uifort.com/template/bamburgh-react-admin-dashboard-reactstrap-pro"
                    rel="noopener noreferrer"
                    target="_blank"
                    size="lg"
                    color="link"
                    className="bg-white-10 text-white shadow-second-sm btn-pill ml-3">
                    <span>Product Details</span>
                  </Button>
                </div>
              </Col>
              <Col lg="10" className="mx-auto">
                <div className="p-4 p-xl-5 hover-scale-rounded bg-second rounded-lg modal-content">
                  <Row className="no-gutters">
                    <Col xs="6" md="3" className="p-3">
                      <div className="divider-v bg-white-10 divider-v-md d-none d-lg-block" />

                      <div className="text-center">
                        <div>
                          <TrendingUp className="d-30 text-danger" />
                        </div>
                        <div className="mt-3 line-height-sm">
                          <b className="font-size-xxl pb-2">1000+</b>
                          <span className="text-white-50 font-size-lg d-block">
                            components
                          </span>
                        </div>
                      </div>
                    </Col>
                    <Col xs="6" md="3" className="p-3">
                      <div className="divider-v bg-white-10 divider-v-md d-none d-lg-block" />

                      <div className="text-center">
                        <div>
                          <Box className="d-30 text-warning" />
                        </div>
                        <div className="mt-3 line-height-sm">
                          <b className="font-size-xxl pb-2">5+</b>
                          <span className="text-white-50 font-size-lg d-block">
                            applications
                          </span>
                        </div>
                      </div>
                    </Col>
                    <Col xs="6" md="3" className="p-3">
                      <div className="divider-v bg-white-10 divider-v-md d-none d-lg-block" />
                      <div className="text-center">
                        <div>
                          <Award className="d-30 text-info" />
                        </div>
                        <div className="mt-3 line-height-sm">
                          <b className="font-size-xxl pb-2">100+</b>
                          <span className="text-white-50 font-size-lg d-block">
                            pages
                          </span>
                        </div>
                      </div>
                    </Col>
                    <Col xs="6" md="3" className="p-3">
                      <div className="text-center">
                        <div>
                          <Sliders className="d-30 text-success" />
                        </div>
                        <div className="mt-3 line-height-sm">
                          <b className="font-size-xxl pb-2">100+</b>
                          <span className="text-white-50 font-size-lg d-block">
                            widgets
                          </span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Container>
            <div className="shadow-container-blocks-5 z-below">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path
                  fill="var(--light)"
                  fillOpacity="1"
                  d="M0,32L120,58.7C240,85,480,139,720,138.7C960,139,1200,85,1320,58.7L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
