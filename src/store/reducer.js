import * as types from "./actions/actionTypes";

const initialState = {
    show: true,
    article: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CLOSE_SLIDE:
            return {
                ...state,
                show: false
            };
        case types.SET_ARTICLE:
            return {
                ...state,
                show: true,
                article: action.article
            };
        default:
            return state
    }
};

export default reducer;