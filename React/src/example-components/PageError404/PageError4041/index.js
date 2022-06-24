import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col, UncontrolledTooltip, Button } from 'reactstrap';

import illustration1 from '../../../assets/images/illustrations/pack4/404.svg';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
export function LivePreviewExample(props) {
  return (
    <>
      <div className="app-wrapper bg-white">
        <div className="app-main">
          <div className="app-content p-0">
            <div className="app-inner-content-layout--main">
              <div className="flex-grow-1 w-100 d-flex align-items-center">
                <div className="bg-composed-wrapper--content">
                  <div className="hero-wrapper bg-composed-wrapper min-vh-100">
                    <div className="flex-grow-1 w-100 d-flex align-items-center">
                      <Col
                        lg="6"
                        md="9"
                        className="px-4 px-lg-0 mx-auto text-center text-black">
                        <img
                          src={illustration1}
                          className="w-50 mx-auto d-block my-5 img-fluid"
                          alt="..."
                        />

                        <h3 className="font-size-xxl line-height-sm font-weight-light d-block px-3 mb-3 text-black-50">
                          The page you were looking for doesn't exist.
                        </h3>
                        <p>
                          It's on us, we probably moved the content to a
                          different page.
                        </p>
                        {props.user?
                        <Link to="/courses">
                        <Button className="m-2" color="second">
                        Courses page
                        </Button>
                        </Link>
                        :
                        <Link to="/login">
                        <Button className="m-2" color="second">
                        Login page
                        </Button>
                        </Link>
                        }
                      </Col>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.User.user
});

export default connect(mapStateToProps, null)(LivePreviewExample)
