import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table, Card, Badge, Button } from 'reactstrap';
import Trend from 'react-trend';
import CountUp from 'react-countup';
import { connect } from 'react-redux';
import { Key } from 'react-feather';
import { Link } from 'react-router-dom';

function LivePreviewExample(props) {
  const { courses } = props
  return (
    <>
      <Card className="card-box mb-5">
        <div className="card-header-alt p-4">
          <h6 className="font-weight-bold font-size-lg mb-1 text-black">
            All Courses
          </h6>
          <p className="text-black-50 mb-0">
            List of courses you have enrolled.
          </p>
        </div>
        <div className="divider" />
        <div className="card-body pt-3 px-4 pb-4">
          <Table className="table-alternate-spaced mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th className="text-left">Status</th>
                <th className="text-left">Tasks</th>
                <th className="text-right">Total Members</th>
                <th className="text-right">Created</th>
              </tr>
            </thead>
            {courses.length > 0 &&
              <tbody>
                {courses.map(_item => <React.Fragment key={_item._id}>
                  <tr>
                    <td>
                      <div>
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold text-black"
                          title="...">
                          {_item.name}
                        </a>
                        <span className="text-black-50 d-block">
                          {_item.description}
                        </span>
                      </div>
                    </td>
                    <td className="text-left">
                      <Badge color={`${_item.is_expired ? 'danger' : 'first'}`}>Overdue</Badge>
                    </td>
                    <td className="text-center">
                      <span className="font-weight-bold">{_item.total_tasks}</span>
                    </td>

                    <td className="text-right">
                      <div className="d-flex align-items-center justify-content-end">
                        <div className="font-weight-bold font-size-lg pr-2">
                          <CountUp
                            start={0}
                            end={_item.total_members}
                            duration={6}
                            deplay={2}
                            separator=""
                            decimals={0}
                            decimal=","
                          />
                        </div>
                        <FontAwesomeIcon
                          icon={['fas', 'arrow-down']}
                          className="font-size-sm opacity-5"
                        />
                      </div>
                    </td>
                    <td className="text-center">
                      <span className="font-weight-bold">{_item.created_at}</span>
                    </td>
                  </tr>
                  <tr className="divider"></tr>
                </React.Fragment>)}
              </tbody>
            }
          </Table>
        </div>
        <div className="card-footer py-3 text-center">
          <Link className='btn btn-smbtn btn-outline-second btn-sm' to="/student/courses">
            View more entries
          </Link>
        </div>
      </Card>
    </>
  );
}


const mapStateToProps = (state) => ({
  courses: state.Courses.courses
});

export default connect(mapStateToProps, null)(LivePreviewExample);
