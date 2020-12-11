import * as types from "./actionTypes";

export const closeSlide = (show) => {
    return {
      type: types.CLOSE_SLIDE,
      show: show
    };
};

export const setArticle = (article) => {
    return {
      type: types.SET_ARTICLE,
      article: article
    };
};