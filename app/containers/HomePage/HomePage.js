/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import ReposList from 'components/ReposList';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import './style.scss';

import BeerView from '../../components/BeerView';
import Header from '../../components/Header';
import { Row, Col } from 'react-grid-system';
import { Divider } from '@material-ui/core';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
   
    state = {
      selectedFilter: 'ASC',
      itemCount: 0,
      open: false,
      cartItem: [],
    };

    componentWillMount() {
      this.props.onMount();
    }

    handleFilter = (value) => {
      this.setState({selectedFilter: value })
    }

    handleItemCount = (id, name, ounces) => {
      this.setState({ itemCount: this.state.itemCount + 1,
        cartItem: [...this.state.cartItem, { id, name, ounces }]
      });
    }

    handleOpenPopup = () => {
      this.setState({ open: true });
    }

    handleClose = () => {
      this.setState({open: false });
    }

    render() {
      const {
        loading, error, repos, beerData, beerStyles} = this.props;
      
      const reposListProps = {
        loading,
        error,
        repos,
      };

      return (
        <div style={{ height: "100vh", width: "100%", padding: "15px" }}>
          <Helmet>
            <title>Home Page</title>
            <meta name="description" content="Submission By Vikas" />
          </Helmet>
          <Header setFilter={this.handleFilter} count={this.state.itemCount} openPopup={this.handleOpenPopup} />

          <BeerView beerData={beerData ? beerData : []} filter={this.state.selectedFilter} beerStyles={beerStyles} itemCount={this.handleItemCount} />

          <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="simple-dialog-title">
            <Row>
              <DialogContent>
                <DialogTitle
                  style={{ textAlign: "center", backgroundColor: "#3f51b5", color:"#fff !important"}}
                >
                  Cart Items
                </DialogTitle>
                <Divider />
                {this.state.cartItem.length > 0 ? this.state.cartItem.map(
                  (item, index) => (
                    <Row key={index}>
                      <Col lg={4} md={4} sm={4} xs={4}>
                        <p>{index}</p>
                      </Col>
                      <Col lg={4} md={4} sm={4} xs={4}>
                        <p>{item.name}</p>
                      </Col>
                      <Col lg={4} md={4} sm={4} xs={4}>
                        <p>{item.ounces} Ounce</p>
                      </Col>
                      <Divider />
                    </Row>
                  )
                ) : <DialogContentText style={{ fontWeight: "600", textAlign: "center" }}>
                  OOPS! Empty Cart
                  <br />
                  Start adding Some Beer to Your cart
                </DialogContentText>
                }
              </DialogContent>
            </Row>
          </Dialog>
        </div>
      );
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
