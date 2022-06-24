import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Row,
  Col,
  UncontrolledPopover,
  Badge,
  Nav,
  NavItem,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu
} from 'reactstrap';
import { NavLink as NavLinkStrap } from 'reactstrap';

import { Settings, Grid, Users, Layers } from 'react-feather';

const HeaderMenu = () => {
  return (
    <>
      <div className="app-header-menu">
        <span className="position-relative">
          <Button
            size="sm"
            color="neutral-dark"
            id="megaMenuPopover"
            className="mr-3 btn-transition-none">
            Mega menu
          </Button>
          <UncontrolledPopover
            target="megaMenuPopover"
            placement="bottom-start"
            trigger="legacy"
            container=".app-header-menu"
            popperClassName="dropdown-mega-menu-lg"
            className="popover-custom-wrapper popover-max-width">
            <Row className="no-gutters">
              <Col xl="4" md="6" className="p-2">
                <div className="divider-v divider-v-lg" />
                <Nav pills className="nav-neutral-first flex-column p-2">
                  <NavItem className="nav-item pb-2 text-capitalize text-first font-size-lg">
                    <span>Dashboards</span>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="pl-2">
                      <div className="mr-2">
                        <FontAwesomeIcon
                          icon={['fas', 'chevron-right']}
                          className="font-size-xs opacity-3"
                        />
                      </div>
                      <span>Analytics</span>
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="pl-2">
                      <div className="mr-2">
                        <FontAwesomeIcon
                          icon={['fas', 'chevron-right']}
                          className="font-size-xs opacity-3"
                        />
                      </div>
                      <span>Reports Management</span>
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="pl-2">
                      <div className="mr-2">
                        <FontAwesomeIcon
                          icon={['fas', 'chevron-right']}
                          className="font-size-xs opacity-3"
                        />
                      </div>
                      <span>Real Estate</span>
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="pl-2">
                      <div className="mr-2">
                        <FontAwesomeIcon
                          icon={['fas', 'chevron-right']}
                          className="font-size-xs opacity-3"
                        />
                      </div>
                      <span>Server Status</span>
                      <Badge color="first" className="ml-auto">
                        23
                      </Badge>
                    </NavLinkStrap>
                  </NavItem>
                  <li className="dropdown-divider mb-3" />
                  <NavItem className="pt-1">
                    <Button
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      block={true}
                      outline={true}
                      color="first"
                      size="sm">
                      <span className="btn-wrapper--label">Learn more</span>
                    </Button>
                  </NavItem>
                </Nav>
              </Col>
              <Col xl="4" md="6" className="p-2">
                <div className="divider-v divider-v-lg" />
                <Nav pills className="nav-neutral-success flex-column p-2">
                  <NavItem className="pb-2 text-capitalize text-success font-size-lg">
                    <span>Applications</span>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="pl-2">
                      <div className="mr-2">
                        <FontAwesomeIcon
                          icon={['fas', 'chevron-right']}
                          className="font-size-xs opacity-3"
                        />
                      </div>
                      <span>Calendar</span>
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="pl-2">
                      <div className="mr-2">
                        <FontAwesomeIcon
                          icon={['fas', 'chevron-right']}
                          className="font-size-xs opacity-3"
                        />
                      </div>
                      <span>Chat</span>
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="pl-2">
                      <div className="mr-2">
                        <FontAwesomeIcon
                          icon={['fas', 'chevron-right']}
                          className="font-size-xs opacity-3"
                        />
                      </div>
                      <span>Contacts</span>
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="pl-2">
                      <div className="mr-2">
                        <FontAwesomeIcon
                          icon={['fas', 'chevron-right']}
                          className="font-size-xs opacity-3"
                        />
                      </div>
                      <span>File Manager</span>
                    </NavLinkStrap>
                  </NavItem>
                  <li className="dropdown-divider mb-3" />
                  <NavItem className="pt-1">
                    <Button
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      block={true}
                      outline={true}
                      color="success"
                      size="sm">
                      <span className="btn-wrapper--label">Learn more</span>
                    </Button>
                  </NavItem>
                </Nav>
              </Col>
              <Col xl="4" className="d-none d-xl-block p-2">
                <Nav pills className="nav-neutral-danger flex-column p-2">
                  <NavItem className="pb-2 text-capitalize text-danger font-size-lg">
                    <span>Components</span>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="pl-2">
                      <div className="mr-2">
                        <FontAwesomeIcon
                          icon={['fas', 'chevron-right']}
                          className="font-size-xs opacity-3"
                        />
                      </div>
                      <span>Cards examples</span>
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="pl-2">
                      <div className="mr-2">
                        <FontAwesomeIcon
                          icon={['fas', 'chevron-right']}
                          className="font-size-xs opacity-3"
                        />
                      </div>
                      <span>Tables examples</span>
                      <div className="ml-auto badge badge-pill badge-neutral-danger text-danger">
                        New
                      </div>
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="pl-2">
                      <div className="mr-2">
                        <FontAwesomeIcon
                          icon={['fas', 'chevron-right']}
                          className="font-size-xs opacity-3"
                        />
                      </div>
                      <span>Form wizards</span>
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="pl-2">
                      <div className="mr-2">
                        <FontAwesomeIcon
                          icon={['fas', 'chevron-right']}
                          className="font-size-xs opacity-3"
                        />
                      </div>
                      <span>Pricing tables</span>
                    </NavLinkStrap>
                  </NavItem>
                  <li className="dropdown-divider mb-3" />
                  <NavItem className="pt-1">
                    <Button
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      block={true}
                      outline={true}
                      color="danger"
                      className="  btn-sm">
                      <span className="btn-wrapper--label">Learn more</span>
                    </Button>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
          </UncontrolledPopover>
        </span>
        <UncontrolledDropdown tag="span" className="position-relative">
          <DropdownToggle
            color="neutral-dark"
            size="sm"
            className="mr-3 btn-transition-none">
            Dashboards
          </DropdownToggle>
          <DropdownMenu className="overflow-hidden border-0 bg-midnight-bloom p-3 mt-2">
            <div className="dropdown-mega-menu-md">
              <div className="text-center">
                <div className="font-weight-bold font-size-xl mb-1 text-white">
                  Dashboards
                </div>
                <p className="text-white-50 mb-3">
                  There are <b className="text-white">multiple</b> dashboard
                  layouts available!
                </p>
              </div>
              <div className="d-flex flex-wrap">
                <div className="w-50 p-2">
                  <a
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="btn card card-box text-left d-flex justify-content-center p-3 w-100 border-0">
                    <div>
                      <Grid className="h1 d-block my-2 text-success" />
                      <div className="font-weight-bold">Projects</div>
                    </div>
                  </a>
                </div>
                <div className="w-50 p-2">
                  <a
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="btn card card-box text-left d-flex justify-content-center p-3 w-100 border-0">
                    <div>
                      <Users className="h1 d-block my-2 text-danger" />
                      <div className="font-weight-bold">Helpdesk</div>
                    </div>
                  </a>
                </div>
                <div className="w-50 p-2">
                  <a
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="btn card card-box text-left d-flex justify-content-center p-3 w-100 border-0">
                    <div>
                      <Settings className="h1 d-block my-2 text-warning" />
                      <div className="font-weight-bold">CRM UI</div>
                    </div>
                  </a>
                </div>
                <div className="w-50 p-2">
                  <a
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="btn card card-box text-left d-flex justify-content-center p-3 w-100 border-0">
                    <div>
                      <Layers className="h1 d-block my-2 text-first" />
                      <div className="font-weight-bold">Customers</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    </>
  );
};

export default HeaderMenu;
