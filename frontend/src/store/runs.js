import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';

const RECEIVE_RUNS = "runs/RECEIVE_RUNS";
const RECEIVE_USER_RUNS = "runs/RECEIVE_USER_RUNS";
const RECEIVE_NEW_RUN = "runs/RECEIVE_NEW_RUN";
const RECEIVE_RUN_ERRORS = "runs/RECEIVE_RUN_ERRORS";
const CLEAR_RUN_ERRORS = "runs/CLEAR_RUN_ERRORS";

const receiveRuns = runs => ({
  type: RECEIVE_RUNS,
  runs
});

const receiveUserRuns = runs => ({
  type: RECEIVE_USER_RUNS,
  runs
});

const receiveNewRun = run => ({
  type: RECEIVE_NEW_RUN,
  run
});

const receiveErrors = errors => ({
  type: RECEIVE_RUN_ERRORS,
  errors
});

export const clearRunErrors = errors => ({
    type: CLEAR_RUN_ERRORS,
    errors
});

export const fetchRuns = () => async dispatch => {
    try {
      const res = await jwtFetch ('/api/runs');
      const runs = await res.json();
      dispatch(receiveRuns(runs));
    } catch (err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
        dispatch(receiveErrors(resBody.errors));
      }
    }
  };

  export const fetchUserRuns = id => async dispatch => {
    try {
      const res = await jwtFetch(`/api/runs/user/${id}`);
      const runs = await res.json();
      dispatch(receiveUserRuns(runs));
    } catch(err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
        return dispatch(receiveErrors(resBody.errors));
      }
    }
  };

  export const composeRun = data => async dispatch => {
    try {
      const res = await jwtFetch('/api/runs/', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      const run = await res.json();
      dispatch(receiveNewRun(run));
    } catch(err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
        return dispatch(receiveErrors(resBody.errors));
      }
    }
  };

const nullErrors = null;

export const runErrorsReducer = (state = nullErrors, action) => {
  switch(action.type) {
    case RECEIVE_RUN_ERRORS:
      return action.errors;
    case RECEIVE_NEW_RUN:
    case CLEAR_RUN_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

const runsReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
    switch(action.type) {
      case RECEIVE_RUNS:
        return { ...state, all: action.runs, new: undefined};
      case RECEIVE_USER_RUNS:
        return { ...state, user: action.runs, new: undefined};
      case RECEIVE_NEW_RUN:
        return { ...state, new: action.run};
      case RECEIVE_USER_LOGOUT:
        return { ...state, user: {}, new: undefined }
      default:
        return state;
    }
  };

  export default runsReducer;
