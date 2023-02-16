import {
    news,
    getNewsFailed,
} from "../constants";

export const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
        case news:
            return {
                ...state,
                listNews: action.payload,
                total: action.payload.totalResults
            };


        case getNewsFailed:
            return {
                ...state,
                getNewsError: action.payload.message,
            };

        default:
            return state;
    }
}
