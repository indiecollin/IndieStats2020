import * as actionTypes from '../actions';

const initialState = {};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.DO_SOMETHING:
            return { ...state, actionRan: true };
        default:
            return state;        
    }
};

export default reducer;