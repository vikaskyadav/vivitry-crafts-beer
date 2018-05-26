/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import {
  CHANGE_USERNAME,
  FETCH_BEER_DATA_REQUEST,
  FETCH_BEER_DATA_SUCCESS,
  FETCH_BEER_DATA_FAILURE
} from "./constants";

// The initial state of the App
const initialState = fromJS({
  username: '',
  beerData: [],
  isLoading: false,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USERNAME:
      // Delete prefixed '@' from the github username
      return state.set("username", action.name.replace(/@/gi, ""));

    case FETCH_BEER_DATA_REQUEST:
      return state.set("isLoading", true);

    case FETCH_BEER_DATA_SUCCESS:
      return state.set("beerData", action.beerData);
    case FETCH_BEER_DATA_FAILURE:
      return state.set("isLoading", false);

    default:
      return state;
  }
}

export default homeReducer;
