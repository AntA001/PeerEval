export const SET_COURSES = 'SET_COURSES';

export const setCourses = (payload) => ({
    type: SET_COURSES,
    payload
});

const INITIAL_STATE = {
    courses: [{
        "name": "test1",
        "description": 'Lorem Ipsum is simply dummy text.',
        "created_at": '21 Dec, 2021',
        "total_tasks": 8,
        "total_members": 54,
        'is_expired': false,
        '_id': '12hjljlll'
    },
    {
        "name": "test2",
        "description": ' Lorem Ipsum is simply dummy text.',
        "created_at": '31 Jan, 2022',
        "total_tasks": 15,
        "total_members": 33,
        'is_expired': false,
        '_id': '12hjlertjlll'
    },
    {
        "name": "test3",
        "description": 'Lorem Ipsum is simply dummy text.',
        "created_at": '1 Jan, 2022',
        "total_tasks": 3,
        "total_members": 34,
        'is_expired': true,
        '_id': '12hjlserdfjlll'
    },
    {
        "name": "test4",
        "description": 'Lorem Ipsum is simply dummy text.',
        "created_at": '3 Feb, 2022',
        "total_tasks": 12,
        "total_members": 5,
        'is_expired': false,
        '_id': '12hsdfjljlll'
    }],
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_COURSES:
            return {
                ...state,
                courses: action.payload
            };
        default:
            break;
    }
    return state;
}

export default reducer;