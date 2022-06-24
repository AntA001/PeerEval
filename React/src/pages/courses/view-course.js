import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CountUp from 'react-countup';
import { connect } from 'react-redux';
import { setCourses } from '../../reducers/Courses';
import { useLocation, Link, useParams } from "react-router-dom";
import {
    Table, Card, Pagination, PaginationItem, PaginationLink, Row,
    Col, Badge, Button
} from 'reactstrap';

function ViewCourse(props) {
    const { courses } = props
    const { course_id } = useParams();
    const [course, setCourse] = useState([]);
    useEffect(() => {
        const getCourse = courses.filter(course => course._id == course_id);
        if (getCourse) setCourse(getCourse)
    }, [])
    return (
        <>
            <Card className="card-box mb-5">
                <div className="card-header py-3">
                    <div className="card-header--title font-size-lg">{course.length > 0 && course[0].name}</div>
                </div>
                <div className="d-flex justify-content-between px-4 py-3">
                    <div className="d-flex align-items-center">
                        <span>Show</span>
                        <select className="mx-1 form-control form-control-sm" id="" name="">
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                        </select>
                        <span>entries</span>
                    </div>
                    <div className="search-wrapper">
                        <span className="icon-wrapper text-black">
                            <FontAwesomeIcon icon={['fas', 'search']} />
                        </span>
                        <input
                            className="form-control form-control-sm rounded-pill"
                            placeholder="Search terms..."
                            type="search"
                        />
                    </div>
                </div>
                <div className="divider" />
                <div className="table-responsive-md">
                    <Table hover className="text-nowrap mb-0">
                        <thead>
                            <tr>
                                <th className="bg-white text-left">ID</th>
                                <th className="bg-white text-left">Name</th>
                                <th className="bg-white text-center">My Status</th>
                                <th className="bg-white text-center">Result Status</th>
                            </tr>
                        </thead>
                        {courses.length > 0 &&
                            <tbody>
                                {courses.map((_item, index) => <React.Fragment key={_item._id}>
                                    <tr>
                                        <td className="font-weight-bold">#{index + 1}</td>

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
                                            <Badge color={`${_item.is_expired ? 'warning' : 'first'}`}>{_item.is_expired ? 'pending' : 'attempted'}</Badge>
                                        </td>
                                        <td className="text-left">
                                            <Badge color={`${_item.is_expired ? 'danger' : 'first'}`}>{_item.is_expired ? 'declaited' : 'pending'}</Badge>
                                        </td>
                                    </tr>
                                </React.Fragment>)}
                            </tbody>
                        }
                    </Table>
                </div>
                <div className="card-footer py-3 d-flex justify-content-between">
                    <Pagination className="pagination-second">
                        <PaginationItem disabled>
                            <PaginationLink
                                first
                                href="#/"
                                onClick={(e) => e.preventDefault()}>
                                <FontAwesomeIcon icon={['fas', 'angle-double-left']} />
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem disabled>
                            <PaginationLink
                                previous
                                href="#/"
                                onClick={(e) => e.preventDefault()}>
                                <FontAwesomeIcon icon={['fas', 'chevron-left']} />
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem active>
                            <PaginationLink href="#/" onClick={(e) => e.preventDefault()}>
                                1
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#/" onClick={(e) => e.preventDefault()}>
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#/" onClick={(e) => e.preventDefault()}>
                                3
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#/" onClick={(e) => e.preventDefault()}>
                                4
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#/" onClick={(e) => e.preventDefault()}>
                                5
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink
                                next
                                href="#/"
                                onClick={(e) => e.preventDefault()}>
                                <FontAwesomeIcon icon={['fas', 'chevron-right']} />
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink
                                last
                                href="#/"
                                onClick={(e) => e.preventDefault()}>
                                <FontAwesomeIcon icon={['fas', 'angle-double-right']} />
                            </PaginationLink>
                        </PaginationItem>
                    </Pagination>
                    <div className="d-flex align-items-center">
                        <span>Show</span>
                        <select className="mx-1 form-control form-control-sm" id="" name="">
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                        </select>
                        <span>entries</span>
                    </div>
                </div>
            </Card>
        </>
    );
}


const mapStateToProps = (state) => ({
    courses: state.Courses.courses
});
const mapDispatchToProps = (dispatch) => {
    return {
        setCourses: (payload) => dispatch(setCourses(payload)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewCourse);
