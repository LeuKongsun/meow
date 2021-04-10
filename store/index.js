import { createStore } from "redux";


const initialState = {
    catList: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "DELETE_LIST":
            return state.catList = Object.assign({});

        case "NEW_CAT_LIST":
            return state.catList = Object.assign(action.data);

        default:
            return state
    }
};

const store = createStore(reducer);

export default store;