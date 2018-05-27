/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import ReposList from 'components/ReposList';
import './style.scss';

import BeerView from '../../components/BeerView';
import SearchBar from '../../components/SearchBar';
import Header from '../../components/Header';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
   
    state = {
      selectedFilter : 'ASC',
    };

   componentWillMount() {
    this.props.onMount();
  };

    handleFilter = (value) => {
      this.setState({selectedFilter: value })
    }
  

  render() {
    const { loading, error, repos, beerData, beerStyles} = this.props;
    const reposListProps = {
      loading,
      error,
      repos,
    };
    
    return <div style={{ height: "100vh", width: "100%", padding: "15px" }}>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="A React.js Boilerplate application homepage" />
        </Helmet>
        <Header setFilter={this.handleFilter} />

        <BeerView beerData={beerData ? beerData : []} filter={ this.state.selectedFilter} beerStyles={beerStyles} />
      </div>;
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  repos: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};
