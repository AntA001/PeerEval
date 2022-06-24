import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Badge,
  UncontrolledTooltip,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu
} from 'reactstrap';

import avatar2 from '../../assets/images/avatars/avatar2.jpg';
import { NavLink } from 'react-router-dom';

const SidebarUserbox = () => {
  return (
    <>
      <div className="app-sidebar--userbox">
        <UncontrolledDropdown className="card-tr-actions">
          <DropdownToggle
            color="link"
            className="p-0 border-0 d-30 text-white-50">
            <FontAwesomeIcon
              icon={['fas', 'ellipsis-h']}
              className="font-size-lg"
            />
          </DropdownToggle>
          <DropdownMenu
            right
            className="text-nowrap dropdown-menu-lg overflow-hidden p-0">
            <div className="align-box-row align-items-center p-3">
              <div className="avatar-icon-wrapper avatar-icon-md">
                <div className="avatar-icon rounded-circle">
                  <img alt="..." src={avatar2} />
                </div>
              </div>
              <div className="pl-2">
                <span className="font-weight-bold d-block">Emma Taylor</span>
                <Badge color="success">Active</Badge>
              </div>
            </div>
            <div className="divider" />
            <div className="d-flex py-3 justify-content-center">
              <div className="d-flex align-items-center">
                <div>
                  <FontAwesomeIcon
                    icon={['far', 'user']}
                    className="font-size-xxl text-success"
                  />
                </div>
                <div className="pl-3 line-height-sm">
                  <b className="font-size-lg">14,596</b>
                  <span className="text-black-50 d-block">reports</span>
                </div>
              </div>
            </div>
            <div className="divider" />
            <div className="d-block rounded-bottom py-3 text-center">
              <Button
                size="sm"
                color="facebook"
                className="d-40 p-0 mx-2"
                id="FacebookTooltip3525342">
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon icon={['fab', 'facebook']} />
                </span>
              </Button>
              <UncontrolledTooltip target="FacebookTooltip3525342">
                Facebook
              </UncontrolledTooltip>
              <Button
                size="sm"
                color="twitter"
                className="d-40 p-0 mx-2"
                id="btnTwitterTooltip254346346">
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon icon={['fab', 'twitter']} />
                </span>
              </Button>
              <UncontrolledTooltip target="btnTwitterTooltip254346346">
                Twitter
              </UncontrolledTooltip>
            </div>
          </DropdownMenu>
        </UncontrolledDropdown>
        <div className="avatar-icon-wrapper avatar-icon-md">
          <Badge color="danger" className="badge-circle">
            Offline
          </Badge>
          <div className="avatar-icon rounded-circle">
            <img alt="..." src={avatar2} />
          </div>
        </div>
        <div className="my-3 userbox-details">
          Emma Taylor
          <small className="d-block text-white-50">
            (emma.taylor@uifort.com)
          </small>
        </div>
        <Button size="sm" tag={NavLink} to="/profile" color="userbox">
          View profile
        </Button>
      </div>
    </>
  );
};

export default SidebarUserbox;
