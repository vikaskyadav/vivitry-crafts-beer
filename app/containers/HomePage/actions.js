/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { 
   FETCH_BEER_DATA_REQUEST,
   FETCH_BEER_DATA_SUCCESS,
   FETCH_BEER_DATA_FAILURE} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */


export function fetchBeerDataRequest() {
  return {
    type: FETCH_BEER_DATA_REQUEST,
  };
}

export function fetchBeerDataSuccess(beerData) {
  return {
    type: FETCH_BEER_DATA_SUCCESS,
    beerData
  };
}
export function fetchBeerDataFailure() {
  return {
    type: FETCH_BEER_DATA_FAILURE,
  };
}
