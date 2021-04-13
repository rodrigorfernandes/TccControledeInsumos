import { ADD_POST, SET_POSTS } from '../actions/actionTypes';


const initialState = {
    posts:[]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload
            }

        case ADD_POST:
            return {
                ...state, 
                posts: state.posts.concat({
                    ...action.payload
                })
            }
            default:
                return state
    }
}

export default reducer
