import * as types from "./actionTypes";

export const closeSlide = () => {
    return {
      type: types.CLOSE_SLIDE,
    };
};

export const setArticle = (article) => {
    return {
      type: types.SET_ARTICLE,
      article: article
    };
};