import React, { useState } from 'react';

import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Row,
  Col,
  Collapse,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  Button
} from 'reactstrap';
import { NavLink as NavLinkStrap } from 'reactstrap';
import projectLogo from '../../../assets/images/react.svg';
import { NavLink } from 'react-router-dom';

export default function LivePreviewExample() {
  const [activeTab, setActiveTab] = useState('1');

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const [collapse, setCollapse] = useState(false);
  const toggle = () => setCollapse(!collapse);

  return (
    <>
      <div className="header-nav-wrapper header-nav-wrapper-lg navbar-dark">
        <div className="app-nav-logo">
          <NavLink
            to="/Overview"
            title="Our Courses"
            className="app-nav-logo app-nav-logo--light">
            <div className="app-nav-logo--icon rounded-lg shadow-second-sm bg-secondary border-0">
              <img
                alt="Our Courses"
                src={projectLogo}
              />
            </div>
            <div className="app-nav-logo--text">
              <span>General</span>

              <b>Lecturer</b>
            </div>
          </NavLink>
        </div>
        <div className="header-nav-menu d-none d-lg-block">
          <ul className="d-flex nav nav-neutral-first justify-content-center">
            <li>
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="font-weight-bold rounded-lg text-white px-3">
                Apps
                <span className="opacity-5 dropdown-arrow">
                  <FontAwesomeIcon icon={['fas', 'angle-down']} />
                </span>
              </a>
              <div className="submenu-dropdown submenu-dropdown--xl">
                <Row className="no-gutters">
                  <Col lg="7" className="z-over">
                    <div className="shadow-sm-dark w-100 bg-white p-3 rounded">
                      <div className="px-4 text-uppercase pb-2 text-primary font-weight-bold font-size-sm">
                        Dashboards
                      </div>
                      <Nav
                        pills
                        className="nav-neutral-primary mb-3 nav-pills-rounded flex-column">
                        <NavItem>
                          <NavLinkStrap
                            tag={NavLink}
                            to="/DashboardMonitoring"
                            className="px-4 d-flex align-items-center">
                            <span>Monitoring</span>
                            <FontAwesomeIcon
                              icon={['fas', 'angle-right']}
                              className="opacity-6 ml-auto"
                            />
                          </NavLinkStrap>
                        </NavItem>
                        <NavItem>
                          <NavLinkStrap
                            tag={NavLink}
                            to="/DashboardCommerce"
                            className="px-4 d-flex align-items-center">
                            <span>Commerce</span>
                            <FontAwesomeIcon
                              icon={['fas', 'angle-right']}
                              className="opacity-6 ml-auto"
                            />
                          </NavLinkStrap>
                        </NavItem>
                        <NavItem>
                          <NavLinkStrap
                            tag={NavLink}
                            to="/DashboardAnalytics"
                            className="px-4 d-flex align-items-center">
                            <span>Analytics</span>
                            <FontAwesomeIcon
                              icon={['fas', 'angle-right']}
                              className="opacity-6 ml-auto"
                            />
                          </NavLinkStrap>
                        </NavItem>
                        <NavItem>
                          <NavLinkStrap
                            tag={NavLink}
                            to="/DashboardStatistics"
                            className="px-4 d-flex align-items-center">
                            <span>Statistics</span>
                            <FontAwesomeIcon
                              icon={['fas', 'angle-right']}
                              className="opacity-6 ml-auto"
                            />
                          </NavLinkStrap>
                        </NavItem>
                      </Nav>
                      <div className="px-4 text-uppercase pb-2 text-primary font-weight-bold font-size-sm">
                        Apps Pages
                      </div>
                      <Nav
                        pills
                        className="nav-neutral-primary nav-pills-rounded flex-column">
                        <NavItem>
                          <NavLinkStrap
                            tag={NavLink}
                            to="/PageCalendar"
                            className="px-4 d-flex align-items-center">
                            <span>Calendar</span>
                            <FontAwesomeIcon
                              icon={['fas', 'angle-right']}
                              className="opacity-6 ml-auto"
                            />
                          </NavLinkStrap>
                        </NavItem>
                        <NavItem>
                          <NavLinkStrap
                            tag={NavLink}
                            to="/PageChat"
                            className="px-4 d-flex align-items-center">
                            <span>Chat</span>
                            <FontAwesomeIcon
                              icon={['fas', 'angle-right']}
                              className="opacity-6 ml-auto"
                            />
                          </NavLinkStrap>
                        </NavItem>
                        <NavItem>
                          <NavLinkStrap
                            tag={NavLink}
                            to="/PageFileManager"
                            className="px-4 d-flex align-items-center">
                            <span>File Manager</span>
                            <FontAwesomeIcon
                              icon={['fas', 'angle-right']}
                              className="opacity-6 ml-auto"
                            />
                          </NavLinkStrap>
                        </NavItem>
                        <NavItem>
                          <NavLinkStrap
                            tag={NavLink}
                            to="/courses"
                            className="px-4 d-flex align-items-center">
                            <span>Courses</span>
                            <FontAwesomeIcon
                              icon={['fas', 'angle-right']}
                              className="opacity-6 ml-auto"
                            />
                          </NavLinkStrap>
                        </NavItem>
                        <NavItem>
                          <NavLinkStrap
                            tag={NavLink}
                            to="/profile"
                            className="px-4 d-flex align-items-center">
                            <span>Profile</span>
                            <FontAwesomeIcon
                              icon={['fas', 'angle-right']}
                              className="opacity-6 ml-auto"
                            />
                          </NavLinkStrap>
                        </NavItem>
                      </Nav>
                    </div>
                  </Col>
                  <Col lg="5" className="d-flex align-items-center">
                    <div className="shadow-sm-dark w-100 bg-second p-4 rounded-right">
                      <div className="px-4 text-uppercase pb-2 text-white font-weight-bold font-size-sm">
                        Individual Apps
                      </div>
                      <Nav
                        pills
                        className="nav-transparent nav-pills-rounded flex-column">
                        <NavItem>
                          <NavLinkStrap
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="active px-4 text-white-50 d-flex align-items-center">
                            <span>General</span>
                            <FontAwesomeIcon
                              icon={['fas', 'angle-right']}
                              className="opacity-6 ml-auto"
                            />
                          </NavLinkStrap>
                        </NavItem>
                        <NavItem>
                          <NavLinkStrap
                            href="https://demo.uifort.com/bamburgh-react-crypto-application-reactstrap-pro-demo"
                            target="_blank"
                            className="px-4 d-flex text-white-50 align-items-center">
                            <span>Crypto</span>
                            <FontAwesomeIcon
                              icon={['fas', 'angle-right']}
                              className="opacity-6 ml-auto"
                            />
                          </NavLinkStrap>
                        </NavItem>
                        <NavItem>
                          <NavLinkStrap
                            href="https://demo.uifort.com/bamburgh-react-messenger-application-reactstrap-pro-demo"
                            target="_blank"
                            className="px-4 d-flex text-white-50 align-items-center">
                            <span>Messenger</span>
                            <FontAwesomeIcon
                              icon={['fas', 'angle-right']}
                              className="opacity-6 ml-auto"
                            />
                          </NavLinkStrap>
                        </NavItem>
                        <NavItem>
                          <NavLinkStrap
                            href="https://demo.uifort.com/bamburgh-react-commerce-application-reactstrap-pro-demo"
                            target="_blank"
                            className="px-4 d-flex text-white-50 align-items-center">
                            <span>Commerce</span>
                            <FontAwesomeIcon
                              icon={['fas', 'angle-right']}
                              className="opacity-6 ml-auto"
                            />
                          </NavLinkStrap>
                        </NavItem>
                        <NavItem>
                          <NavLinkStrap
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="disabled px-4 d-flex text-white-50 align-items-center disabled">
                            <span>Learning</span>
                          </NavLinkStrap>
                        </NavItem>
                        <NavItem>
                          <NavLinkStrap
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="px-4 d-flex text-white-50 align-items-center disabled">
                            <span>Monitoring</span>
                          </NavLinkStrap>
                        </NavItem>
                        <NavItem>
                          <NavLinkStrap
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="px-4 d-flex text-white-50 align-items-center disabled">
                            <span>Fleet Manager</span>
                          </NavLinkStrap>
                        </NavItem>
                        <NavItem>
                          <NavLinkStrap
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="px-4 d-flex text-white-50 align-items-center disabled">
                            <span>Banking</span>
                          </NavLinkStrap>
                        </NavItem>
                      </Nav>
                    </div>
                  </Col>
                </Row>
              </div>
            </li>
            <li>
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="font-weight-bold rounded-lg text-white px-3">
                Blocks
                <span className="opacity-5 dropdown-arrow">
                  <FontAwesomeIcon icon={['fas', 'angle-down']} />
                </span>
              </a>
              <div className="submenu-dropdown submenu-dropdown--xxl">
                <Row className="no-gutters">
                  <Col lg="6" className="z-over">
                    <div className="shadow-sm-dark w-100 bg-white p-3 rounded">
                      <div className="px-3 text-uppercase pb-2 text-primary font-weight-bold font-size-sm">
                        Marketing
                      </div>
                      <Row className="no-gutters">
                        <Col lg="6">
                          <Nav
                            pills
                            className="nav-neutral-primary nav-pills-rounded mb-3 flex-column">
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/MarketingCta"
                                className="d-flex align-items-center">
                                <span>Call to Action</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/MarketingFeatureSections"
                                className="d-flex align-items-center">
                                <span>Feature Sections</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/MarketingFooters"
                                className="d-flex align-items-center">
                                <span>Footers</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/MarketingHeaders"
                                className="d-flex align-items-center">
                                <span>Headers</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/MarketingHero"
                                className="d-flex align-items-center">
                                <span>Hero</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                          </Nav>
                        </Col>
                        <Col lg="6">
                          <Nav
                            pills
                            className="nav-neutral-primary nav-pills-rounded flex-column">
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/MarketingIcons"
                                className="d-flex align-items-center">
                                <span>Icon Boxes</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/MarketingPartners"
                                className="d-flex align-items-center">
                                <span>Partners</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/MarketingPricingTables"
                                className="d-flex align-items-center">
                                <span>Pricing Tables</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/MarketingTestimonials"
                                className="d-flex align-items-center">
                                <span>Testimonials</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                          </Nav>
                        </Col>
                      </Row>
                      <div className="px-3 text-uppercase pb-2 text-primary font-weight-bold font-size-sm">
                        Elements
                      </div>
                      <Row className="no-gutters">
                        <Col lg="6">
                          <Nav
                            pills
                            className="nav-neutral-primary nav-pills-rounded mb-3 flex-column">
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/ElementsAvatars"
                                className="d-flex align-items-center">
                                <span>Avatars</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/ElementsBadges"
                                className="d-flex align-items-center">
                                <span>Badges</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/ElementsButtons"
                                className="d-flex align-items-center">
                                <span>Buttons</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/ElementsDropdowns"
                                className="d-flex align-items-center">
                                <span>Dropdowns</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/ElementsIcons"
                                className="d-flex align-items-center">
                                <span>Icons</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/ElementsNavigationMenus"
                                className="d-flex align-items-center">
                                <span>Navigation Menus</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/ElementsPagination"
                                className="d-flex align-items-center">
                                <span>Pagination</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                          </Nav>
                        </Col>
                        <Col lg="6">
                          <Nav
                            pills
                            className="nav-neutral-primary nav-pills-rounded flex-column">
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/ElementsProgressBars"
                                className="d-flex align-items-center">
                                <span>Progress Bars</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/ElementsRatings"
                                className="d-flex align-items-center">
                                <span>Ratings</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/ElementsRibbons"
                                className="d-flex align-items-center">
                                <span>Ribbons</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/ElementsScrollable"
                                className="d-flex align-items-center">
                                <span>Scrollable Boxes</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/ElementsSearchBars"
                                className="d-flex align-items-center">
                                <span>Search Bars</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/ElementsTimelines"
                                className="d-flex align-items-center">
                                <span>Timelines</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/ElementsUtilitiesHelpers"
                                className="d-flex align-items-center">
                                <span>Utilities</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                          </Nav>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <Col lg="6" className="d-flex align-items-center">
                    <div className="shadow-sm-dark w-100 bg-deep-sky p-4 rounded-right">
                      <div className="px-2 text-uppercase pb-2 text-white font-weight-bold font-size-sm">
                        Data Display
                      </div>
                      <Row>
                        <Col lg="6">
                          <Nav
                            pills
                            className="nav-transparent nav-pills-rounded flex-column">
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/BlocksChartsLarge"
                                className="px-2 text-white-50 d-flex align-items-center">
                                <span>Charts Large</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/BlocksChartsSmall"
                                className="px-2 d-flex text-white-50 align-items-center">
                                <span>Charts Small</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/BlocksComposed"
                                className="px-2 d-flex text-white-50 align-items-center">
                                <span>Composed Text</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/BlocksGrids"
                                className="px-2 d-flex text-white-50 align-items-center">
                                <span>Grids</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/BlocksIcons"
                                className="px-2 d-flex text-white-50 align-items-center">
                                <span>Icon Cards</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/BlocksImages"
                                className="px-2 d-flex text-white-50 align-items-center">
                                <span>Image Cards</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/BlocksListsLarge"
                                className="px-2 d-flex text-white-50 align-items-center">
                                <span>Lists Large</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/BlocksListsSmall"
                                className="px-2 d-flex text-white-50 align-items-center">
                                <span>Lists Small</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                          </Nav>
                        </Col>
                        <Col lg="6">
                          <Nav
                            pills
                            className="nav-transparent nav-pills-rounded flex-column">
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/BlocksNavigation"
                                className="px-2 d-flex text-white-50 align-items-center">
                                <span>Navigation</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/BlocksProfilesSmall"
                                className="px-2 d-flex text-white-50 align-items-center">
                                <span>Profile Cards</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/BlocksProgressCircular"
                                className="px-2 d-flex text-white-50 align-items-center">
                                <span>Progress Circular</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/BlocksProgressHorizontal"
                                className="px-2 d-flex text-white-50 align-items-center">
                                <span>Progress Horizontal</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/BlocksSparklinesLarge"
                                className="px-2 d-flex text-white-50 align-items-center">
                                <span>Sparklines Large</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/BlocksSparklinesSmall"
                                className="px-2 d-flex text-white-50 align-items-center">
                                <span>Sparklines Small</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/BlocksStatistics"
                                className="px-2 d-flex text-white-50 align-items-center">
                                <span>Statistics</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                          </Nav>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </div>
            </li>
            <li>
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="font-weight-bold rounded-lg text-white px-3">
                Others
                <span className="opacity-5 dropdown-arrow">
                  <FontAwesomeIcon icon={['fas', 'angle-down']} />
                </span>
              </a>
              <div className="submenu-dropdown submenu-dropdown--xxl">
                <Row className="no-gutters">
                  <Col lg="6" className="z-over">
                    <div className="shadow-sm-dark w-100 bg-white p-3 rounded">
                      <div className="px-3 text-uppercase pb-2 text-primary font-weight-bold font-size-sm">
                        Widgets
                      </div>
                      <Row className="no-gutters">
                        <Col lg="6">
                          <Nav
                            pills
                            className="nav-neutral-primary nav-pills-rounded mb-3 flex-column">
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/WidgetsAccordions"
                                className="d-flex align-items-center">
                                <span>Accordions</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/WidgetsCalendars"
                                className="d-flex align-items-center">
                                <span>Calendars</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/WidgetsCarousels"
                                className="d-flex align-items-center">
                                <span>Carousels</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/WidgetsContextMenus"
                                className="d-flex align-items-center">
                                <span>Context Menus</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/WidgetsCountUp"
                                className="d-flex align-items-center">
                                <span>Count Up</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/WidgetsDragDrop"
                                className="d-flex align-items-center">
                                <span>Drag & Drop</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/WidgetsGuidedTours"
                                className="d-flex align-items-center">
                                <span>Guided Tours</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/WidgetsImageCrop"
                                className="d-flex align-items-center">
                                <span>Image Crop</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                          </Nav>
                        </Col>
                        <Col lg="6">
                          <Nav
                            pills
                            className="nav-neutral-primary nav-pills-rounded flex-column">
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/WidgetsLoadingIndicators"
                                className="d-flex align-items-center">
                                <span>Loading Indicators</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/WidgetsModals"
                                className="d-flex align-items-center">
                                <span>Modal Dialogs</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/WidgetsNotifications"
                                className="d-flex align-items-center">
                                <span>Notifications</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/WidgetsPopovers"
                                className="d-flex align-items-center">
                                <span>Popovers</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/WidgetsTabs"
                                className="d-flex align-items-center">
                                <span>Tabs</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/WidgetsTooltips"
                                className="d-flex align-items-center">
                                <span>Tooltips</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="/WidgetsTreeView"
                                className="d-flex align-items-center">
                                <span>Tree View</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                          </Nav>
                        </Col>
                      </Row>
                      <div className="px-3 text-uppercase pb-2 text-primary font-weight-bold font-size-sm">
                        Charts
                      </div>
                      <Row className="no-gutters">
                        <Col lg="6">
                          <Nav
                            pills
                            className="nav-neutral-primary nav-pills-rounded mb-3 flex-column">
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="ChartsApex"
                                className="d-flex align-items-center">
                                <span>ApexCharts</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="Chartjs"
                                className="d-flex align-items-center">
                                <span>Chart.js</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                          </Nav>
                        </Col>
                        <Col lg="6">
                          <Nav
                            pills
                            className="nav-neutral-primary nav-pills-rounded flex-column">
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="ChartsGauges"
                                className="d-flex align-items-center">
                                <span>Gauges</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                tag={NavLink}
                                to="ChartsSparklines"
                                className="d-flex align-items-center">
                                <span>Sparklines</span>
                                <FontAwesomeIcon
                                  icon={['fas', 'angle-right']}
                                  className="opacity-6 ml-auto"
                                />
                              </NavLinkStrap>
                            </NavItem>
                          </Nav>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <Col lg="6" className="d-flex align-items-center">
                    <div className="shadow-sm-dark w-100 bg-second p-4 rounded-right">
                      <div className="nav-tabs-first tabs-animated tabs-animated-shadow">
                        <Nav tabs justified>
                          <NavItem>
                            <NavLinkStrap
                              className={clsx('mb-0', {
                                active: activeTab === '1'
                              })}
                              onClick={() => {
                                toggleTab('1');
                              }}>
                              <span className="font-weight-bold font-size-sm text-white-50 text-uppercase">
                                Login
                              </span>
                              <div className="divider" />
                            </NavLinkStrap>
                          </NavItem>
                          <NavItem>
                            <NavLinkStrap
                              className={clsx('mb-0', {
                                active: activeTab === '2'
                              })}
                              onClick={() => {
                                toggleTab('2');
                              }}>
                              <span className="font-weight-bold font-size-sm text-white-50 text-uppercase">
                                Register
                              </span>
                              <div className="divider" />
                            </NavLinkStrap>
                          </NavItem>
                          <NavItem>
                            <NavLinkStrap
                              className={clsx('mb-0', {
                                active: activeTab === '3'
                              })}
                              onClick={() => {
                                toggleTab('3');
                              }}>
                              <span className="font-weight-bold font-size-sm text-white-50 text-uppercase">
                                Recover
                              </span>
                              <div className="divider" />
                            </NavLinkStrap>
                          </NavItem>
                        </Nav>
                      </div>
                      <TabContent className="my-3" activeTab={activeTab}>
                        <TabPane tabId="1">
                          <Row>
                            <Col lg="6">
                              <Nav
                                pills
                                className="nav-transparent nav-pills-rounded flex-column">
                                <NavItem>
                                  <NavLinkStrap
                                    tag={NavLink}
                                    to="/login"
                                    className="px-2 text-white-50 d-flex align-items-center">
                                    <span>Login Basic</span>
                                    <FontAwesomeIcon
                                      icon={['fas', 'angle-right']}
                                      className="opacity-6 ml-auto"
                                    />
                                  </NavLinkStrap>
                                </NavItem>
                                <NavItem>
                                  <NavLinkStrap
                                    tag={NavLink}
                                    to="/PageLoginCover"
                                    className="px-2 text-white-50 d-flex align-items-center">
                                    <span>Login Cover</span>
                                    <FontAwesomeIcon
                                      icon={['fas', 'angle-right']}
                                      className="opacity-6 ml-auto"
                                    />
                                  </NavLinkStrap>
                                </NavItem>
                              </Nav>
                            </Col>
                            <Col lg="6">
                              <Nav
                                pills
                                className="nav-transparent nav-pills-rounded flex-column">
                                <NavItem>
                                  <NavLinkStrap
                                    tag={NavLink}
                                    to="/PageLoginIllustration"
                                    className="px-2 text-white-50 d-flex align-items-center">
                                    <span>Login Illustration</span>
                                    <FontAwesomeIcon
                                      icon={['fas', 'angle-right']}
                                      className="opacity-6 ml-auto"
                                    />
                                  </NavLinkStrap>
                                </NavItem>
                                <NavItem>
                                  <NavLinkStrap
                                    tag={NavLink}
                                    to="/PageLoginOverlay"
                                    className="px-2 text-white-50 d-flex align-items-center">
                                    <span>Login Overlay</span>
                                    <FontAwesomeIcon
                                      icon={['fas', 'angle-right']}
                                      className="opacity-6 ml-auto"
                                    />
                                  </NavLinkStrap>
                                </NavItem>
                              </Nav>
                            </Col>
                          </Row>
                        </TabPane>
                        <TabPane tabId="2">
                          <Row>
                            <Col lg="6">
                              <Nav
                                pills
                                className="nav-transparent nav-pills-rounded flex-column">
                                <NavItem>
                                  <NavLinkStrap
                                    tag={NavLink}
                                    to="/register"
                                    className="px-2 text-white-50 d-flex align-items-center">
                                    <span>Register Basic</span>
                                    <FontAwesomeIcon
                                      icon={['fas', 'angle-right']}
                                      className="opacity-6 ml-auto"
                                    />
                                  </NavLinkStrap>
                                </NavItem>
                                <NavItem>
                                  <NavLinkStrap
                                    tag={NavLink}
                                    to="/PageRegisterCover"
                                    className="px-2 text-white-50 d-flex align-items-center">
                                    <span>Register Cover</span>
                                    <FontAwesomeIcon
                                      icon={['fas', 'angle-right']}
                                      className="opacity-6 ml-auto"
                                    />
                                  </NavLinkStrap>
                                </NavItem>
                              </Nav>
                            </Col>
                            <Col lg="6">
                              <Nav
                                pills
                                className="nav-transparent nav-pills-rounded flex-column">
                                <NavItem>
                                  <NavLinkStrap
                                    tag={NavLink}
                                    to="/PageRegisterIllustration"
                                    className="px-2 text-white-50 d-flex align-items-center">
                                    <span>Register Illustration</span>
                                    <FontAwesomeIcon
                                      icon={['fas', 'angle-right']}
                                      className="opacity-6 ml-auto"
                                    />
                                  </NavLinkStrap>
                                </NavItem>
                                <NavItem>
                                  <NavLinkStrap
                                    tag={NavLink}
                                    to="/PageRegisterOverlay"
                                    className="px-2 text-white-50 d-flex align-items-center">
                                    <span>Register Overlay</span>
                                    <FontAwesomeIcon
                                      icon={['fas', 'angle-right']}
                                      className="opacity-6 ml-auto"
                                    />
                                  </NavLinkStrap>
                                </NavItem>
                              </Nav>
                            </Col>
                          </Row>
                        </TabPane>
                        <TabPane tabId="3">
                          <Row>
                            <Col lg="6">
                              <Nav
                                pills
                                className="nav-transparent nav-pills-rounded flex-column">
                                <NavItem>
                                  <NavLinkStrap
                                    tag={NavLink}
                                    to="/recover-password"
                                    className="px-2 text-white-50 d-flex align-items-center">
                                    <span>Recover Basic</span>
                                    <FontAwesomeIcon
                                      icon={['fas', 'angle-right']}
                                      className="opacity-6 ml-auto"
                                    />
                                  </NavLinkStrap>
                                </NavItem>
                                <NavItem>
                                  <NavLinkStrap
                                    tag={NavLink}
                                    to="/PageRecoverCover"
                                    className="px-2 text-white-50 d-flex align-items-center">
                                    <span>Recover Cover</span>
                                    <FontAwesomeIcon
                                      icon={['fas', 'angle-right']}
                                      className="opacity-6 ml-auto"
                                    />
                                  </NavLinkStrap>
                                </NavItem>
                              </Nav>
                            </Col>
                            <Col lg="6">
                              <Nav
                                pills
                                className="nav-transparent nav-pills-rounded flex-column">
                                <NavItem>
                                  <NavLinkStrap
                                    tag={NavLink}
                                    to="/PageRecoverIllustration"
                                    className="px-2 text-white-50 d-flex align-items-center">
                                    <span>Recover Illustration</span>
                                    <FontAwesomeIcon
                                      icon={['fas', 'angle-right']}
                                      className="opacity-6 ml-auto"
                                    />
                                  </NavLinkStrap>
                                </NavItem>
                                <NavItem>
                                  <NavLinkStrap
                                    tag={NavLink}
                                    to="/PageRecoverOverlay"
                                    className="px-2 text-white-50 d-flex align-items-center">
                                    <span>Recover Overlay</span>
                                    <FontAwesomeIcon
                                      icon={['fas', 'angle-right']}
                                      className="opacity-6 ml-auto"
                                    />
                                  </NavLinkStrap>
                                </NavItem>
                              </Nav>
                            </Col>
                          </Row>
                        </TabPane>
                      </TabContent>
                      <div className="bg-white-10 rounded p-3">
                        <Row>
                          <Col lg="6">
                            <Nav
                              pills
                              className="nav-transparent nav-pills-rounded flex-column">
                              <NavItem>
                                <NavLinkStrap
                                  tag={NavLink}
                                  to="/Tables"
                                  className="px-2 d-flex text-white-50 align-items-center">
                                  <span>Tables</span>
                                  <FontAwesomeIcon
                                    icon={['fas', 'angle-right']}
                                    className="opacity-6 ml-auto"
                                  />
                                </NavLinkStrap>
                              </NavItem>
                              <NavItem>
                                <NavLinkStrap
                                  tag={NavLink}
                                  to="/Maps"
                                  className="px-2 d-flex text-white-50 align-items-center">
                                  <span>Maps</span>
                                  <FontAwesomeIcon
                                    icon={['fas', 'angle-right']}
                                    className="opacity-6 ml-auto"
                                  />
                                </NavLinkStrap>
                              </NavItem>
                              <NavItem>
                                <NavLinkStrap
                                  tag={NavLink}
                                  to="/FormsControls"
                                  className="px-2 d-flex text-white-50 align-items-center">
                                  <span>Form Controls</span>
                                  <FontAwesomeIcon
                                    icon={['fas', 'angle-right']}
                                    className="opacity-6 ml-auto"
                                  />
                                </NavLinkStrap>
                              </NavItem>
                              <NavItem>
                                <NavLinkStrap
                                  tag={NavLink}
                                  to="/PageInvoice"
                                  className="px-2 d-flex text-white-50 align-items-center">
                                  <span>Invoice</span>
                                  <FontAwesomeIcon
                                    icon={['fas', 'angle-right']}
                                    className="opacity-6 ml-auto"
                                  />
                                </NavLinkStrap>
                              </NavItem>
                            </Nav>
                          </Col>
                          <Col lg="6">
                            <Nav
                              pills
                              className="nav-transparent nav-pills-rounded flex-column">
                              <NavItem>
                                <NavLinkStrap
                                  tag={NavLink}
                                  to="/PageError404"
                                  className="px-2 d-flex text-white-50 align-items-center">
                                  <span>Error 404 Basic</span>
                                  <FontAwesomeIcon
                                    icon={['fas', 'angle-right']}
                                    className="opacity-6 ml-auto"
                                  />
                                </NavLinkStrap>
                              </NavItem>
                              <NavItem>
                                <NavLinkStrap
                                  tag={NavLink}
                                  to="/PageError500"
                                  className="px-2 d-flex text-white-50 align-items-center">
                                  <span>Error 500 Cover</span>
                                  <FontAwesomeIcon
                                    icon={['fas', 'angle-right']}
                                    className="opacity-6 ml-auto"
                                  />
                                </NavLinkStrap>
                              </NavItem>
                              <NavItem>
                                <NavLinkStrap
                                  tag={NavLink}
                                  to="/PageError505"
                                  className="px-2 d-flex text-white-50 align-items-center">
                                  <span>Error 505</span>
                                  <FontAwesomeIcon
                                    icon={['fas', 'angle-right']}
                                    className="opacity-6 ml-auto"
                                  />
                                </NavLinkStrap>
                              </NavItem>
                              <NavItem>
                                <NavLinkStrap
                                  tag={NavLink}
                                  to="/PageAuthModals"
                                  className="px-2 text-white-50 d-flex align-items-center">
                                  <span>Auth Modals</span>
                                  <FontAwesomeIcon
                                    icon={['fas', 'angle-right']}
                                    className="opacity-6 ml-auto"
                                  />
                                </NavLinkStrap>
                              </NavItem>
                            </Nav>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </li>
            <li>
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="font-weight-bold rounded-lg text-white px-3">
                Forms
                <span className="opacity-5 dropdown-arrow">
                  <FontAwesomeIcon icon={['fas', 'angle-down']} />
                </span>
              </a>
              <div className="submenu-dropdown submenu-dropdown--lg">
                <div className="shadow-sm-dark w-100 bg-white p-3 rounded">
                  <Row className="no-gutters">
                    <Col lg="6">
                      <Nav
                        pills
                        className="nav-neutral-primary nav-pills-rounded mb-3 flex-column">
                        <NavItem>
                          <NavLinkStrap
                            tag={NavLink}
                            to="/FormsClipboard"
                            className="d-flex align-items-center">
                            <span>Clipboard</span>
                          </NavLinkStrap>
                        </NavItem>
                        <NavItem>
                          <NavLinkStrap
                            tag={NavLink}
                            to="/FormsColorpicker"
                            className="d-flex align-items-center">
                            <span>Colorpicker</span>
                          </NavLinkStrap>
                        </NavItem>
                        <NavItem>
                          <NavLinkStrap
                            tag={NavLink}
                            to="/FormsDatepicker"
                            className="d-flex align-items-center">
                            <span>Datepicker</span>
                          </NavLinkStrap>
                        </NavItem>
                        <NavItem>
                          <NavLinkStrap
                            tag={NavLink}
                            to="/FormsDualListbox"
                            className="d-flex align-items-center">
                            <span>Dual Listbox</span>
                          </NavLinkStrap>
                        </NavItem>
                        <NavItem>
                          <NavLinkStrap
                            tag={NavLink}
                            to="/FormsInputMask"
                            className="d-flex align-items-center">
                            <span>Input Mask</span>
                          </NavLinkStrap>
                        </NavItem>
                        <NavItem>
                          <NavLinkStrap
                            tag={NavLink}
                            to="/FormsInputSelect"
                            className="d-flex align-items-center">
                            <span>Input Select</span>
                          </NavLinkStrap>
                        </NavItem>
                        <NavItem>
                          <NavLinkStrap
                            tag={NavLink}
                            to="/FormsSlider"
                            className="d-flex align-items-center">
                            <span>Slider</span>
                          </NavLinkStrap>
                        </NavItem>
                        <NavItem>
                          <NavLinkStrap
                            tag={NavLink}
                            to="/FormsSteppers"
                            className="d-flex align-items-center">
                            <span>Steppers</span>
                          </NavLinkStrap>
                        </NavItem>
                      </Nav>
                    </Col>
                    <Col lg="6">
                      <Nav
                        pills
                        className="nav-neutral-primary nav-pills-rounded flex-column">
                        <NavItem>
                          <NavLinkStrap
                            tag={NavLink}
                            to="/FormsTextareaAutosize"
                            className="d-flex align-items-center">
                            <span>Textarea Autosize</span>
                          </NavLinkStrap>
                        </NavItem>
                        <NavItem>
                          <NavLinkStrap
                            tag={NavLink}
                            to="/FormsTimepicker"
                            className="d-flex align-items-center">
                            <span>Timepicker</span>
                          </NavLinkStrap>
                        </NavItem>
                        <NavItem>
                          <NavLinkStrap
                            tag={NavLink}
                            to="/FormsToggleSwitch"
                            className="d-flex align-items-center">
                            <span>Toggle Switch</span>
                          </NavLinkStrap>
                        </NavItem>
                        <NavItem>
                          <NavLinkStrap
                            tag={NavLink}
                            to="/FormsTypeahead"
                            className="d-flex align-items-center">
                            <span>Typeahead</span>
                          </NavLinkStrap>
                        </NavItem>
                        <NavItem>
                          <NavLinkStrap
                            tag={NavLink}
                            to="/FormsUpload"
                            className="d-flex align-items-center">
                            <span>Upload</span>
                          </NavLinkStrap>
                        </NavItem>
                        <NavItem>
                          <NavLinkStrap
                            tag={NavLink}
                            to="/FormsValidation"
                            className="d-flex align-items-center">
                            <span>Validation</span>
                          </NavLinkStrap>
                        </NavItem>
                        <NavItem>
                          <NavLinkStrap
                            tag={NavLink}
                            to="/FormsWysiwygEditor"
                            className="d-flex align-items-center">
                            <span>WYSIWYG Editors</span>
                          </NavLinkStrap>
                        </NavItem>
                      </Nav>
                    </Col>
                  </Row>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="header-nav-actions flex-grow-0 flex-lg-grow-1">
          <span className="d-none d-lg-block mx-2">
            <Button
              tag="a"
              href="/register"
              target="_blank"
              className="rounded-lg text-nowrap font-size-sm text-uppercase shadow-second-sm"
              color="success">
              Register
            </Button>
          </span>
          <span className="d-none d-lg-block mx-2">
            <Button
              tag="a"
              href="/login"
              rel="noopener noreferrer"
              target="_blank"
              className="rounded-lg text-nowrap font-size-sm text-uppercase shadow-second-sm"
              color="success">
              Login
            </Button>
          </span>
          <span className="d-block d-lg-none">
            <button
              onClick={toggle}
              className={clsx('navbar-toggler hamburger hamburger--elastic', {
                'is-active': collapse
              })}>
              <span className="hamburger-box">
                <span className="hamburger-inner" />
              </span>
            </button>
          </span>
        </div>
        <div className="d-flex d-lg-none">
          <Collapse
            isOpen={collapse}
            className="nav-collapsed-wrapper shadow-lg navbar-collapse">
            <div className="nav-inner-wrapper">
              <Button
                onClick={toggle}
                color="danger"
                className="btn-icon d-40 shadow-sm hover-scale-lg btn-animated-icon-sm nav-toggle-inner-btn p-0">
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon icon={['fas', 'times']} />
                </span>
              </Button>
              <div className="p-3">
                <div className="px-4 text-uppercase py-2 text-primary font-weight-bold font-size-sm">
                  Dashboards
                </div>
                <Nav
                  pills
                  className="nav-neutral-primary mb-3 nav-pills-rounded flex-column">
                  <NavItem>
                    <NavLinkStrap
                      tag={NavLink}
                      to="/DashboardMonitoring"
                      className="px-4 d-flex align-items-center">
                      <span>Monitoring</span>
                      <FontAwesomeIcon
                        icon={['fas', 'angle-right']}
                        className="opacity-6 ml-auto"
                      />
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap
                      tag={NavLink}
                      to="/DashboardCommerce"
                      className="px-4 d-flex align-items-center">
                      <span>Commerce</span>
                      <FontAwesomeIcon
                        icon={['fas', 'angle-right']}
                        className="opacity-6 ml-auto"
                      />
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap
                      tag={NavLink}
                      to="/DashboardAnalytics"
                      className="px-4 d-flex align-items-center">
                      <span>Analytics</span>
                      <FontAwesomeIcon
                        icon={['fas', 'angle-right']}
                        className="opacity-6 ml-auto"
                      />
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap
                      tag={NavLink}
                      to="/DashboardStatistics"
                      className="px-4 d-flex align-items-center">
                      <span>Statistics</span>
                      <FontAwesomeIcon
                        icon={['fas', 'angle-right']}
                        className="opacity-6 ml-auto"
                      />
                    </NavLinkStrap>
                  </NavItem>
                </Nav>
                <div className="px-4 text-uppercase pb-2 text-primary font-weight-bold font-size-sm">
                  Apps Pages
                </div>
                <Nav
                  pills
                  className="nav-neutral-primary nav-pills-rounded flex-column">
                  <NavItem>
                    <NavLinkStrap
                      tag={NavLink}
                      to="/PageCalendar"
                      className="px-4 d-flex align-items-center">
                      <span>Calendar</span>
                      <FontAwesomeIcon
                        icon={['fas', 'angle-right']}
                        className="opacity-6 ml-auto"
                      />
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap
                      tag={NavLink}
                      to="/PageChat"
                      className="px-4 d-flex align-items-center">
                      <span>Chat</span>
                      <FontAwesomeIcon
                        icon={['fas', 'angle-right']}
                        className="opacity-6 ml-auto"
                      />
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap
                      tag={NavLink}
                      to="/PageFileManager"
                      className="px-4 d-flex align-items-center">
                      <span>File Manager</span>
                      <FontAwesomeIcon
                        icon={['fas', 'angle-right']}
                        className="opacity-6 ml-auto"
                      />
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap
                      tag={NavLink}
                      to="/courses"
                      className="px-4 d-flex align-items-center">
                      <span>Courses</span>
                      <FontAwesomeIcon
                        icon={['fas', 'angle-right']}
                        className="opacity-6 ml-auto"
                      />
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap
                      tag={NavLink}
                      to="/profile"
                      className="px-4 d-flex align-items-center">
                      <span>Profile</span>
                      <FontAwesomeIcon
                        icon={['fas', 'angle-right']}
                        className="opacity-6 ml-auto"
                      />
                    </NavLinkStrap>
                  </NavItem>
                </Nav>
              </div>
              <div className="divider" />
              <div className="m-3">
                <div className="bg-primary px-3 py-4 rounded">
                  <div className="px-4 text-uppercase pb-2 text-white font-weight-bold font-size-sm">
                    Individual Apps
                  </div>
                  <Nav
                    pills
                    className="nav-transparent nav-pills-rounded flex-column">
                    <NavItem>
                      <NavLinkStrap
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="active px-4 text-white-50 d-flex align-items-center">
                        <span>General</span>
                        <FontAwesomeIcon
                          icon={['fas', 'angle-right']}
                          className="opacity-6 ml-auto"
                        />
                      </NavLinkStrap>
                    </NavItem>
                    <NavItem>
                      <NavLinkStrap
                        href="https://demo.uifort.com/bamburgh-react-crypto-application-reactstrap-pro-demo"
                        target="_blank"
                        className="px-4 d-flex text-white-50 align-items-center">
                        <span>Crypto</span>
                        <FontAwesomeIcon
                          icon={['fas', 'angle-right']}
                          className="opacity-6 ml-auto"
                        />
                      </NavLinkStrap>
                    </NavItem>
                    <NavItem>
                      <NavLinkStrap
                        href="https://demo.uifort.com/bamburgh-react-messenger-application-reactstrap-pro-demo"
                        target="_blank"
                        className="px-4 d-flex text-white-50 align-items-center">
                        <span>Messenger</span>
                        <FontAwesomeIcon
                          icon={['fas', 'angle-right']}
                          className="opacity-6 ml-auto"
                        />
                      </NavLinkStrap>
                    </NavItem>
                    <NavItem>
                      <NavLinkStrap
                        href="https://demo.uifort.com/bamburgh-react-commerce-application-reactstrap-pro-demo"
                        target="_blank"
                        className="px-4 d-flex text-white-50 align-items-center">
                        <span>Commerce</span>
                        <FontAwesomeIcon
                          icon={['fas', 'angle-right']}
                          className="opacity-6 ml-auto"
                        />
                      </NavLinkStrap>
                    </NavItem>
                    <NavItem>
                      <NavLinkStrap
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="disabled px-4 d-flex text-white-50 align-items-center disabled">
                        <span>Learning</span>
                      </NavLinkStrap>
                    </NavItem>
                    <NavItem>
                      <NavLinkStrap
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="px-4 d-flex text-white-50 align-items-center disabled">
                        <span>Monitoring</span>
                      </NavLinkStrap>
                    </NavItem>
                    <NavItem>
                      <NavLinkStrap
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="px-4 d-flex text-white-50 align-items-center disabled">
                        <span>Fleet Manager</span>
                      </NavLinkStrap>
                    </NavItem>
                    <NavItem>
                      <NavLinkStrap
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="px-4 d-flex text-white-50 align-items-center disabled">
                        <span>Banking</span>
                      </NavLinkStrap>
                    </NavItem>
                  </Nav>
                </div>
              </div>
              <div className="divider" />
              <div className="card-footer bg-secondary text-center p-3">
                <Button
                  tag="a"
                  href="https://uifort.com/template/bamburgh-react-admin-dashboard-reactstrap-pro"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="rounded-lg text-nowrap font-size-sm text-uppercase shadow-second-sm"
                  color="success">
                  Buy Now
                </Button>
              </div>
            </div>
          </Collapse>
        </div>
      </div>
      <div
        className={clsx('collapse-page-trigger', { 'is-active': collapse })}
        onClick={toggle}
      />
    </>
  );
}
