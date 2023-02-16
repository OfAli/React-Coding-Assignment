import axios from "axios";
import {
    news,
    getNewsFailed,
    apiKey,
    top,
    everything

} from "../constants";

export const getNews = (limit, page, search, sort) => async (dispatch) => {

    let request
    if (search === "") {
        request = `${top}pageSize=${limit}&page=${page}&apiKey=${apiKey}&country=us`
    } else {
        request = `${everything}pageSize=${limit}&page=${page}&q=${search}&sortBy=${sort}&apiKey=${apiKey}`
    }
    await axios(request).then(function (response) {
            dispatch({
                type: news,
                payload: response.data,
            });
        })
        .catch(function (error) {
            dispatch({
                type: getNewsFailed,
                payload: error.response.data,
            });
        });
};
