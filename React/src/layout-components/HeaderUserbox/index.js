import React,{useState} from 'react';
import { destroyUser } from "../../reducers/User";
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory, useLocation } from 'react-router';
import {
  Badge,
  ListGroup,
  ListGroupItem,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu
} from 'reactstrap';
import { NavLink as NavLinkStrap } from 'reactstrap';
import user from '../../assets/images/avatars/user.png';

const HeaderUserbox = (props) => {
  const { REACT_APP_API_URL } = process.env;
  const navigate=useHistory();
  const logout = async () => {
    localStorage.clear();
    props.destroyUser();
    navigate.push("/login");
  };
  const toProfile=()=>{
    navigate.push("/profile");
    setDropdownOpen(!dropdownOpen)
  }
  const toCourses=()=>{
    navigate.push("/courses");
    setDropdownOpen(!dropdownOpen)
  }

  const [dropdownOpen, setDropdownOpen]=useState(false);
  const toggleDropDown = () => setDropdownOpen(!dropdownOpen);

  const location=useLocation();

  return (
    <>
      <Dropdown isOpen={dropdownOpen} toggle={toggleDropDown} className="position-relative ml-2">
        <DropdownToggle
          color="link"
          className="p-0 text-left d-flex btn-transition-none align-items-center">
          <div className="d-block p-0 avatar-icon-wrapper">
            <Badge color="success" className="badge-circle p-top-a">
              Online
            </Badge>
            <div className="avatar-icon rounded">
              <img src={props?.user?.pictures===null?user:`${REACT_APP_API_URL}${props?.user?.pictures}`} alt="..." />
            </div>
          </div>
          <div className="d-none d-xl-block pl-2">
            <div className="font-weight-bold">{props?.user?.fullname}</div>
            <span className="text-black-50">{props?.user?.role}</span>
          </div>
          <span className="pl-1 pl-xl-3">
            <FontAwesomeIcon
              icon={['fas', 'angle-down']}
              className="opacity-5"
            />
          </span>
        </DropdownToggle>
        <DropdownMenu right className="dropdown-menu-lg overflow-hidden p-0">
          <ListGroup flush className="text-left bg-transparent">
            <ListGroupItem className="rounded-top">
              <Nav pills className="nav-neutral-primary flex-column">
                <NavItem className="nav-header d-flex text-primary pt-1 pb-2 font-weight-bold align-items-center">
                  <div>My Profile</div>
                </NavItem>
                {location.pathname!=="/courses" ? <NavItem onClick={toCourses}>
                  <NavLinkStrap>
                    My Courses
                  </NavLinkStrap>
                </NavItem>
                :
                <NavLinkStrap style={{color:"#999"}}>
                    My Courses
                  </NavLinkStrap>
                }
                {location.pathname!=="/profile" ?
                <NavItem onClick={toProfile}>
                  <NavLinkStrap>
                    View Profile
                  </NavLinkStrap>
                </NavItem>
                :
                <NavLinkStrap style={{color:"#999"}}>
                    View Profile
                  </NavLinkStrap>
                }
                <NavItem onClick={logout}>
                  <NavLinkStrap>
                    Log out
                  </NavLinkStrap>
                </NavItem>
              </Nav>
            </ListGroupItem>
            </ListGroup>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.User.user
});
const mapDispatchToProps = (dispatch) => {
  return {
    destroyUser: () => dispatch(destroyUser()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HeaderUserbox);
