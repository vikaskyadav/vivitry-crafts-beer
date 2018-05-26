/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectUsername = () => createSelector(
  selectHome,
  (homeState) => homeState.get('username')
);

const loadBeerData = () => createSelector(
  selectHome,
  (globalState) => globalState.get('beerData')
);

export {
  selectHome,
  makeSelectUsername,
  loadBeerData,
};
