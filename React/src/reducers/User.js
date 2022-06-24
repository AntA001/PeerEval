export const SAVE = 'SAVE';
export const DESTROY = 'DESTROY';

export const saveUser = (payload) => {
    return {
        type: SAVE,
        payload: payload

    };
};

export const destroyUser = () => {
    return {
        type: DESTROY,
    };
};

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem('cuser')), 
  };

const reducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
  
      case SAVE:
        return {
          ...state, user: action.payload,
        };
  
      case DESTROY:
        return {
          ...state, user: null,
        };
  
      default: return state;
    }
  
  };

  export default reducer;