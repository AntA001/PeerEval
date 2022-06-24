import React, { useState } from 'react';

import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Row,
  Col,
  Card,
  CardHeader,
  Input,
  Badge,
  ListGroup,
  ListGroupItem,
  Button,
  Progress
} from 'reactstrap';

import avatar4 from '../../../assets/images/avatars/avatar4.jpg';
import avatar5 from '../../../assets/images/avatars/avatar5.jpg';
import avatar6 from '../../../assets/images/avatars/avatar6.jpg';
import avatar7 from '../../../assets/images/avatars/avatar7.jpg';

export default function LivePreviewExample() {
  const [inputBg, setInputBg] = useState(false);
  const toggleInputBg = () => setInputBg(!inputBg);

  return (
    <>
      <Row>
        <Col xl="6" className="d-flex">
          <Card className="card-box mb-5 w-100">
            <CardHeader>
              <div className="card-header--title">
                <small className="d-block text-uppercase mt-1">Status</small>
                <b>Team Performance</b>
              </div>
              <div>
                <Button
                  color="neutral-primary"
                  className="d-30 border-0 p-0 text-left d-flex justify-content-center align-items-center">
                  <FontAwesomeIcon icon={['fas', 'ellipsis-h']} />
                </Button>
              </div>
            </CardHeader>

            <ListGroup flush>
              <ListGroupItem
                tag="a"
                action
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="d-flex bg-white hover-scale-rounded align-items-center py-3">
                <div className="avatar-icon-wrapper avatar-initials d-50 mr-3">
                  <div className="avatar-icon rounded-circle text-white d-50 bg-warning">
                    GA
                  </div>
                </div>
                <div className="flex-fill">
                  <div className="font-weight-bold text-black">
                    Presentation UI
                  </div>
                  <Progress
                    className="progress-xs progress-animated-alt my-2"
                    color="success"
                    value="65"
                  />
                  <div className="d-flex justify-content-between font-size-xs">
                    <div className="text-success">Completed</div>
                    <div className="opacity-5">
                      15<sup>th</sup> Sep
                    </div>
                  </div>
                </div>
              </ListGroupItem>
              <ListGroupItem
                tag="a"
                action
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="d-flex bg-white hover-scale-rounded align-items-center py-3">
                <div className="avatar-icon-wrapper avatar-initials d-50 mr-3">
                  <div className="avatar-icon rounded-circle text-white d-50 bg-first">
                    TH
                  </div>
                </div>
                <div className="flex-fill">
                  <div className="font-weight-bold text-black">
                    Review Comps.
                  </div>
                  <Progress
                    className="progress-xs progress-animated-alt my-2"
                    color="success"
                    value="34"
                  />
                  <div className="d-flex justify-content-between font-size-xs">
                    <div className="text-success">Completed</div>
                    <div className="opacity-5">
                      12<sup>th</sup> Aug
                    </div>
                  </div>
                </div>
              </ListGroupItem>
              <ListGroupItem
                tag="a"
                action
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="d-flex bg-white hover-scale-rounded align-items-center py-3">
                <div className="avatar-icon-wrapper avatar-initials d-50 mr-3">
                  <div className="avatar-icon rounded-circle text-white d-50 bg-danger">
                    EA
                  </div>
                </div>
                <div className="flex-fill">
                  <div className="font-weight-bold text-black">
                    Build React UI
                  </div>
                  <Progress
                    className="progress-xs my-2"
                    color="warning"
                    value="71"
                  />
                  <div className="d-flex justify-content-between font-size-xs">
                    <div className="text-warning">Delayed</div>
                    <div className="opacity-5">
                      22<sup>th</sup> Sep
                    </div>
                  </div>
                </div>
              </ListGroupItem>
              <ListGroupItem
                tag="a"
                action
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="d-flex bg-white hover-scale-rounded align-items-center py-3">
                <div className="avatar-icon-wrapper avatar-initials d-50 mr-3">
                  <div className="avatar-icon rounded-circle text-white d-50 bg-second">
                    HS
                  </div>
                </div>
                <div className="flex-fill">
                  <div className="font-weight-bold text-black">Newsletters</div>
                  <Progress
                    className="progress-xs my-2"
                    color="danger"
                    value="81"
                  />
                  <div className="d-flex justify-content-between font-size-xs">
                    <div className="text-danger">Overdue</div>
                    <div className="opacity-5">
                      16<sup>th</sup> Oct
                    </div>
                  </div>
                </div>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
        <Col xl="6" className="d-flex">
          <Card className="card-box mb-5 w-100">
            <CardHeader>
              <div className="card-header--title">
                <small className="d-block text-uppercase mt-1">Messages</small>
                <b>Messenger Window</b>
              </div>
              <div className="avatar-icon-wrapper avatar-initials shadow-none d-40 mr-0">
                <div className="avatar-icon text-white bg-night-sky d-40 font-size-sm">
                  ET
                </div>
                <Badge
                  color="warning"
                  className="badge-position badge-position--bottom-center badge-circle-inner"
                  title="Badge bottom center">
                  Online
                </Badge>
              </div>
            </CardHeader>
            <div
              className={clsx(
                'd-flex transition-base align-items-center justify-content-between py-2 px-4',
                { 'bg-secondary': !inputBg }
              )}>
              <div>
                <Button
                  size="sm"
                  color="link"
                  className="p-0 btn-transition-none btn-link-danger">
                  <span className="btn-wrapper--label font-size-sm">
                    Delete all
                  </span>
                </Button>
              </div>
              <div className="font-size-sm font-weight-bold">Emma Taylor</div>
            </div>
            <div className="divider" />
            <div
              className={clsx(
                'd-flex align-items-center transition-base px-4 py-1',
                { 'py-3 bg-secondary': inputBg }
              )}>
              <div className="search-wrapper w-100">
                <span className="icon-wrapper text-black">
                  <FontAwesomeIcon icon={['fas', 'search']} />
                </span>
                <Input
                  onFocus={toggleInputBg}
                  onBlur={toggleInputBg}
                  className="border-0 bg-white transition-base"
                  placeholder="Search messages..."
                />
              </div>
            </div>
            <div className="divider" />
            <ListGroup flush>
              <ListGroupItem
                tag="a"
                action
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="d-flex bg-white hover-scale-rounded justify-content-between align-items-center py-3">
                <div className="d-flex align-items-center">
                  <div className="avatar-icon-wrapper d-50 mr-3">
                    <div className="avatar-icon rounded-circle d-50">
                      <img alt="..." src={avatar7} />
                    </div>
                  </div>
                  <div>
                    <div className="font-weight-bold font-size-sm text-black">
                      Siena Handley
                    </div>
                    <div className="d-flex align-items-center font-size-xs">
                      <Badge
                        color="success"
                        className="badge-circle border-white border-1 mr-2">
                        Completed
                      </Badge>
                      <div className="text-success">Online</div>
                    </div>
                  </div>
                </div>
                <div>
                  <Button size="sm" color="neutral-dark" className="px-3">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon icon={['fas', 'plus']} />
                    </span>
                    <span className="btn-wrapper--label">Add</span>
                  </Button>
                </div>
              </ListGroupItem>
              <ListGroupItem
                tag="a"
                action
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="d-flex bg-white hover-scale-rounded justify-content-between align-items-center py-3">
                <div className="d-flex align-items-center">
                  <div className="avatar-icon-wrapper d-50 mr-3">
                    <div className="avatar-icon rounded-circle d-50">
                      <img alt="..." src={avatar6} />
                    </div>
                  </div>
                  <div>
                    <div className="font-weight-bold font-size-sm text-black">
                      Karla Byrne
                    </div>
                    <div className="d-flex align-items-center font-size-xs">
                      <Badge
                        color="success"
                        className="badge-circle border-white border-1 mr-2">
                        Completed
                      </Badge>
                      <div className="text-success">Online</div>
                    </div>
                  </div>
                </div>
                <div>
                  <Button size="sm" color="neutral-dark" className="px-3">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon icon={['fas', 'plus']} />
                    </span>
                    <span className="btn-wrapper--label">Add</span>
                  </Button>
                </div>
              </ListGroupItem>
              <ListGroupItem
                tag="a"
                action
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="d-flex bg-white hover-scale-rounded justify-content-between align-items-center py-3">
                <div className="d-flex align-items-center">
                  <div className="avatar-icon-wrapper d-50 mr-3">
                    <div className="avatar-icon rounded-circle d-50">
                      <img alt="..." src={avatar5} />
                    </div>
                  </div>
                  <div>
                    <div className="font-weight-bold font-size-sm text-black">
                      Eden Hays
                    </div>
                    <div className="d-flex align-items-center font-size-xs">
                      <Badge
                        color="danger"
                        className="badge-circle border-white border-1 mr-2">
                        Completed
                      </Badge>
                      <div className="text-danger">Offline</div>
                    </div>
                  </div>
                </div>
                <div>
                  <Button
                    size="sm"
                    color="neutral-dark"
                    className="px-3 disabled">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon icon={['fas', 'plus']} />
                    </span>
                    <span className="btn-wrapper--label">Add</span>
                  </Button>
                </div>
              </ListGroupItem>
              <ListGroupItem
                tag="a"
                action
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="d-flex bg-white hover-scale-rounded justify-content-between align-items-center py-3">
                <div className="d-flex align-items-center">
                  <div className="avatar-icon-wrapper d-50 mr-3">
                    <div className="avatar-icon rounded-circle d-50">
                      <img alt="..." src={avatar4} />
                    </div>
                  </div>
                  <div>
                    <div className="font-weight-bold font-size-sm text-black">
                      Janine Benton
                    </div>
                    <div className="d-flex align-items-center font-size-xs">
                      <Badge
                        color="warning"
                        className="badge-circle border-white border-1 mr-2">
                        Completed
                      </Badge>
                      <div className="text-warning">In a meeting</div>
                    </div>
                  </div>
                </div>
                <div>
                  <Button size="sm" color="neutral-dark" className="px-3">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon icon={['fas', 'plus']} />
                    </span>
                    <span className="btn-wrapper--label">Add</span>
                  </Button>
                </div>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}
