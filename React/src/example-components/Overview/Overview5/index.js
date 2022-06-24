import React from 'react';

import { Row, Col, Card, Container, Button } from 'reactstrap';

import { NavLink } from 'react-router-dom';

export default function LivePreviewExample() {
  return (
    <>
      <Container className="py-5 pt-lg-0 z-over" style={{ marginTop: '-50px' }}>
        <Row className="text-center text-second pb-5">
          <Col lg="10" xl="8" className="mx-auto">
            <div className="font-size-sm d-inline-flex bg-neutral-primary text-primary px-4 rounded-lg text-white py-2 text-uppercase">
              Spectacular
            </div>
            <h3 className="display-4 font-weight-bold my-4 text-uppercase">
              Pricing Plans
            </h3>
            <p className="text-black-50 line-height-2 font-size-xl px-3 px-xl-5 mb-0">
              Browse through the live previews to see just how powerful this
              admin template really is!
            </p>
          </Col>
        </Row>
        <Row className="z-over no-gutters pb-lg-5">
          <Col lg="7">
            <Card className="bg-second text-white rounded mb-5 mb-lg-0">
              <div className="text-center rounded-top p-3 p-lg-5">
                <div className="font-weight-bold display-3">The S</div>
                <p className="text-white-50 line-height-2 font-size-xl px-3 px-xl-5 mb-0">
                  Browse through the live previews to see just how powerful this
                  admin template really is!
                </p>
              </div>
              <div className="divider bg-white opacity-2" />
              <div className="p-4 p-lg-5">
                <div className="d-flex align-items-center justify-content-between pb-3">
                  <div className="font-weight-bold font-size-lg">
                    Lifetime license
                  </div>
                  <div className="bg-success text-uppercase font-size-sm font-weight-bold py-2 px-4 rounded-pill">
                    Included
                  </div>
                </div>
                <div className="divider opacity-2" />
                <div className="d-flex align-items-center justify-content-between py-3">
                  <div className="font-weight-bold font-size-lg">
                    Components
                  </div>
                  <div className="bg-success text-uppercase font-size-sm font-weight-bold py-2 px-4 rounded-pill">
                    1000+
                  </div>
                </div>
                <div className="divider opacity-2" />
                <div className="d-flex align-items-center justify-content-between pt-3">
                  <div className="font-weight-bold font-size-lg">
                    Technical Support
                  </div>
                  <div className="bg-warning text-uppercase font-size-sm font-weight-bold py-2 px-4 rounded-pill">
                    12 months
                  </div>
                </div>
              </div>
              <div className="divider bg-white opacity-2" />
              <div className="d-flex bg-white-10 rounded-bottom align-items-center justify-content-between py-4 px-5">
                <div className="display-1 font-weight-bold">
                  <span className="font-size-lg">$</span>
                  <span>69</span>
                  <span className="font-size-xl">/mo</span>
                </div>
                <div>
                  <Button
                    tag={NavLink}
                    to="/BlocksListsSmall"
                    className="rounded-sm font-weight-bold hover-scale-lg px-4"
                    size="lg"
                    color="first">
                    Small List Groups
                  </Button>
                </div>
              </div>
            </Card>
          </Col>
          <Col lg="5" className="d-flex align-items-center">
            <div className="text-white w-100 overflow-hidden pt-3 pt-lg-5 mb-5 mb-lg-0 bg-deep-sky rounded br-lg-left-0">
              <div className="text-center py-3 py-lg-5">
                <div className="font-weight-bold display-4 mb-3">The XL</div>
                <p className="text-white-50 line-height-2 font-size-lg px-3 px-xl-5 mb-0">
                  Browse through the live previews to see just how powerful this
                  admin template really is!
                </p>
              </div>
              <div className="divider bg-white mt-3 mt-lg-5 opacity-2" />
              <div className="d-flex bg-white-10 align-items-center justify-content-between py-4 px-5">
                <div className="display-2 font-weight-bold">
                  <span className="font-size-md">$</span>
                  <span>699</span>
                  <span className="font-size-lg">/mo</span>
                </div>
                <div>
                  <Button
                    tag={NavLink}
                    to="/MarketingPricingTables"
                    className="rounded-sm font-weight-bold hover-scale-lg px-4"
                    size="lg"
                    color="success">
                    Pricing Tables
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
