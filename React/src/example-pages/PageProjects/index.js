import React from 'react';
import { connect } from 'react-redux';
import PageProjects1 from '../../example-components/PageProjects/PageProjects1';
export function PageProjects(props) {
  return (
    <>
    {props?.user?.role==="lecturer"?
    <PageProjects1 role="lecturer" />
    :
      <PageProjects1 role="student" />
  }
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.User.user
});

export default connect(mapStateToProps, null)(PageProjects)