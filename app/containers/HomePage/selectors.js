/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import filter from 'lodash/filter';
import groupBy from 'lodash/groupBy';

const selectHome = (state) => state.get('home');

const makeSelectUsername = () => createSelector(
  selectHome,
  (homeState) => homeState.get('username')
);

const loadBeerData = () => createSelector(
  selectHome,
  (globalState) => globalState.get('beerData')
);

const loadBeerStyle = () => createSelector(
  selectHome,
  (globalState) => globalState.get('beerData'),
);

export {
  selectHome,
  makeSelectUsername,
  loadBeerData,
  loadBeerStyle,
};
