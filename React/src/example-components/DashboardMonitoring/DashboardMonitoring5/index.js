import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col, Card, Badge, Button } from 'reactstrap';

import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles
} from 'react-circular-progressbar';
export default function LivePreviewExample() {
  return (
    <>
      <Row>
        <Col xl="4" className="d-flex">
          <Card className="card-box mb-5 w-100 d-flex align-items-center">
            <div className="card-tr-actions">
              <Button color="link" className="btn-link-second p-0 text-muted">
                <FontAwesomeIcon icon={['fas', 'ellipsis-h']} />
              </Button>
            </div>
            <div className="d-flex flex-column flex-grow-1 justify-content-center w-100">
              <div className="card-header-alt d-flex justify-content-center px-4 pt-4 pb-2">
                <h6 className="font-weight-bold font-size-xl mb-1 text-black">
                  Storage status
                </h6>
              </div>
              <div className="mx-auto">
                <CircularProgressbar
                  value={56}
                  text={56 + '%'}
                  strokeWidth={8}
                  className="m-3 circular-progress-xxl circular-progress-primary"
                />
              </div>
              <div className="px-4 pb-4 pt-2">
                <div className="d-flex text-uppercase justify-content-center text-black-50 font-size-xs font-weight-bold mb-4">
                  <div className="d-flex align-items-center">
                    <Badge color="success" className="badge-circle mx-2">
                      available
                    </Badge>
                    <span className="d-20 w-auto">Available</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <Badge color="danger" className="badge-circle mx-2">
                      total
                    </Badge>
                    <span className="d-20 w-auto">Total</span>
                  </div>
                </div>
                <Button
                  color="neutral-dark"
                  className="btn-block font-weight-bold text-uppercase font-size-sm hover-scale-sm">
                  Increase Storage
                </Button>
              </div>
            </div>
          </Card>
        </Col>
        <Col xl="4" className="d-flex">
          <Card className="card-box mb-5 w-100 d-flex align-items-center">
            <div className="d-flex flex-column flex-grow-1 justify-content-center w-100">
              <div className="card-header-alt d-flex justify-content-center px-4 pt-4 pb-2">
                <h6 className="font-weight-bold font-size-xl mb-1 text-black">
                  Active Issues
                </h6>
              </div>
              <div className="mx-auto">
                <CircularProgressbarWithChildren
                  circleRatio={0.75}
                  styles={buildStyles({ rotation: 1 / 2 + 1 / 8 })}
                  value={84}
                  strokeWidth={7}
                  className="m-3 circular-progress-xxl circular-progress-danger">
                  <Badge
                    color="danger"
                    className="p-3 badge-pill h-auto font-weight-normal font-size-lg">
                    453
                  </Badge>
                </CircularProgressbarWithChildren>
              </div>
              <p className="mb-3 text-black-50 text-center">
                These issues require immediate action !
              </p>
              <div className="px-4 pb-4 pt-2">
                <Button
                  color="neutral-dark"
                  className="btn-block font-weight-bold text-uppercase font-size-sm hover-scale-sm">
                  View all Issues
                </Button>
              </div>
            </div>
          </Card>
        </Col>
        <Col xl="4" className="d-flex">
          <Card className="card-box mb-5 w-100 d-flex align-items-center">
            <div className="d-flex flex-column flex-grow-1 justify-content-center w-100">
              <div className="card-header-alt d-flex justify-content-center px-4 pt-4 pb-2">
                <h6 className="font-weight-bold font-size-xl mb-1 text-black">
                  Email Marketing
                </h6>
              </div>
              <div className="mx-auto">
                <CircularProgressbarWithChildren
                  value={78}
                  strokeWidth={6}
                  className="m-3 circular-progress-xl circular-progress-warning">
                  <span className="text-warning font-size-xxl font-weight-normal">
                    78
                  </span>
                </CircularProgressbarWithChildren>
              </div>
              <div className="px-5 mt-2">
                <Row className="text-black-50 font-size-sm">
                  <Col md="6" className="d-flex justify-content-center">
                    <div>
                      <div className="d-flex p-1 align-items-center">
                        <Badge color="success" className="badge-circle mr-2">
                          success
                        </Badge>
                        <span className="d-20 w-auto">successful</span>
                      </div>
                      <div className="d-flex p-1 align-items-center">
                        <Badge color="first" className="badge-circle mr-2">
                          fail
                        </Badge>
                        <span className="d-20 w-auto">failed</span>
                      </div>
                    </div>
                  </Col>
                  <Col md="6" className="d-flex justify-content-center">
                    <div>
                      <div className="d-flex p-1 align-items-center">
                        <Badge color="warning" className="badge-circle mr-2">
                          success
                        </Badge>
                        <span className="d-20 w-auto">opened</span>
                      </div>
                      <div className="d-flex p-1 align-items-center">
                        <Badge color="danger" className="badge-circle mr-2">
                          fail
                        </Badge>
                        <span className="d-20 w-auto">reported</span>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="p-4">
                <Button
                  color="neutral-dark"
                  className="btn-block font-weight-bold text-uppercase font-size-sm hover-scale-sm">
                  Generate Report
                </Button>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
}
