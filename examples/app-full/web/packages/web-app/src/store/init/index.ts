import { Dispatch } from "redux";
import { State } from "store";
import {
  getMeasures,
  getPublishedOrderBookOverviews,
  getProjectRefs,
  getUserRefs,
} from "datahub";
import { refs } from "../refs";

export const initStore = () => {
  //@ts-ignore
  return async (dispatch: Dispatch, getState: () => State) => {
    getMeasures().then((measures) => {
      if (measures) {
        dispatch(refs.actions.setMeasures(measures));
      }
    });
    getProjectRefs().then((projectRefs) => {
      if (projectRefs) {
        dispatch(refs.actions.setProjectRefs(projectRefs));
      }
    });
    getUserRefs().then((userRefs) => {
      if (userRefs) {
        dispatch(refs.actions.setUserRefs(userRefs));
      }
      getPublishedOrderBookOverviews().then((orderBookOverviews) => {
        if (orderBookOverviews) {
          dispatch(refs.actions.setOrderBookOverviews(orderBookOverviews));
        }
      });
    });
  };
};
