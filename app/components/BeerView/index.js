import React from 'react';

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InfiniteScroll from "react-infinite-scroll-component";
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import filter from 'lodash/filter';
import find from 'lodash/find';
import Button from "@material-ui/core/Button";

// import { Grid, Row, Col } from 'react-flexbox-grid';
import { Container, Row, Col } from "react-grid-system";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { CardHeader } from '@material-ui/core';
import SearchBar from '../SearchBar';


const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  cardHeader: { fontWeight: "600" }
});

export default class BeerView extends React.PureComponent {
  state = {
    beerSortedByStyle: [],
    selectedStyle: '',
    filter: '',
    clicked: []
  }


  componentWillReceiveProps(nextProps) {
    nextProps.filter != this.props.filter ?
    this.setState({ filter: nextProps.filter})
      :
      ''
  }

   handleCartAdd = (id,name,ounces) => {
     this.props.itemCount(id, name, ounces);
     this.setState({clicked: [...this.state.clicked, {id: id}]})
   }

    handleBeerByStyle = selectedStyle => {
      selectedStyle != ""
      ?
      this.setState({selectedStyle: selectedStyle, beerSortedByStyle: filter(this.props.beerData,function(beer){ return beer.style == selectedStyle }, [`${this.state.filter}`])})
      :
      this.setState({selectedStyle: null, beerSortedByStyle: []})
    }
    render() {
      const {beerData, filter, beerStyles} = this.props;
      const beerByStyle = groupBy(beerData,"style");

      // const beerDataSorted = filter == 'ASC'
      // ?
      // orderBy(beerData, function(beer){ return beer.abv ? beer.abv : '0.00'}, ['asc'])
      // :
      // orderBy(beerData, function(beer){ return beer.abv ? beer.abv : '0.00'}, ['desc'])
        
      return (
        <InfiniteScroll dataLength={beerData ? beerData.length : 0} hasMore={false // next={fetchData} //This is important field to render the next data
          } loader={"<p>...</p>"} endMessage={""} style={{ padding: "5px" }}>
          <Container fluid>
            <Row style={{ marginTop: "30px" }}>
              <Col lg={6} sm={12} md={6} xs={12}>
                <p
                  style={{
                    fontFamily: "Roboto",
                    color: "#999",
                    fontWeight: "500",
                    marginTop: "15px"
                  }}
                >
                  {this.state.beerSortedByStyle.length
                    ? this.state.beerSortedByStyle.length +
                      " beers found in Style" +
                      this.state.selectedStyle
                    : ""}
                </p>
              </Col>
              <Col lg={6} sm={12} md={6} xs={12}>
                <SearchBar beerByStyle={beerByStyle} getBeerStyle={this.handleBeerByStyle} />
              </Col>
            </Row>
            {this.state.beerSortedByStyle.length ? <Row style={{ marginTop: "30px" }}>
              {this.state.beerSortedByStyle
                .slice(0, 1000)
                .map((beer, index) => (
                  <Col lg={3} md={4} sm={6} xs={12} key={index}>
                    <Card
                      style={{
                        marginBottom: "5px",
                        marginTop: "25px",
                        padding: "5px",
                        fontFamily: "Roboto"
                      }}
                    >
                      <CardHeader
                        title={
                          <div
                            style={{
                              color: "#3493b9",
                              fontSize: "22px"
                            }}
                          >
                            {beer.name ? beer.name : "NA"}
                          </div>
                        }
                        subheader={
                          <div style={{ display: "flex" }}>
                            <div
                              style={{
                                flex: "1",
                                color: "#eb7c1c"
                              }}
                            >
                              <strong>
                                ABV: {beer.abv ? beer.abv : "NA"}
                              </strong>
                            </div>
                            <div
                              style={{
                                flex: "1",
                                textAlign: "right",
                                color: "#eb7c1c"
                              }}
                            >
                              <strong>
                                  Ounces:{" "}
                                {beer.ounces ? beer.ounces : "NA"}
                              </strong>
                            </div>
                          </div>
                        }
                      />
                      <CardContent>
                        <p
                          style={{
                            textAlign: "center",
                            fontSize: "18px",
                            fontWeight: "600",
                            color: "#212121"
                          }}
                        >
                          {beer.style ? beer.style : "NA"}
                        </p>
                        <p style={{ textAlign: "center" }}>
                          IBU: {beer.ibu ? beer.ibu : "0"}
                        </p>
                      </CardContent>
                      <div style={{ textAlign: "center" }}>
                        {find(this.state.clicked, function(item) {
                          return item.id == beer.id;
                        }) ? (
                          <Button
                            style={{
                              backgroundColor: "#999",
                              color: "#000"
                              }}
                              variant="raised"
                              onClick={this.handleCartAdd.bind(
                                this,
                                beer.id
                              )}
                            >
                              Added
                            </Button>
                          ) : (
                            <Button
                              style={{
                                backgroundColor: "#eb7c1c",
                                color: "#fff"
                              }}
                              variant="raised"
                              onClick={this.handleCartAdd.bind(
                                this,
                                beer.id
                              )}
                            >
                            Add To Cart
                          </Button>
                        )}
                      </div>
                    </Card>
                </Col>
              ))}
            </Row> : <Row style={{ marginTop: "30px" }}>
              {beerData
                .slice(0, 1000)
                .map((beer, index) => (
                  <Col lg={3} md={4} sm={6} xs={12} key={index}>
                    <Card
                      style={{
                        marginBottom: "5px",
                        marginTop: "25px",
                        padding: "5px",
                        fontFamily: "Roboto"
                      }}
                    >
                      <CardHeader
                        title={
                          <div
                            style={{
                              color: "#3493b9",
                              fontSize: "22px"
                            }}
                          >
                            {beer.name ? beer.name : "NA"}
                          </div>
                        }
                        subheader={
                          <div style={{ display: "flex" }}>
                            <div
                              style={{
                                flex: "1",
                                color: "#eb7c1c"
                              }}
                            >
                              <strong>
                                ABV: {beer.abv ? beer.abv : "NA"}
                              </strong>
                            </div>
                            <div
                              style={{
                                flex: "1",
                                textAlign: "right",
                                color: "#eb7c1c"
                              }}
                            >
                              <strong>
                                Ounces:{" "}
                                {beer.ounces ? beer.ounces : "NA"}
                              </strong>
                            </div>
                          </div>
                        }
                      />
                      <CardContent>
                        <p
                          style={{
                            textAlign: "center",
                            fontSize: "18px",
                            fontWeight: "600",
                            color: "#212121"
                          }}
                        >
                          {beer.style ? beer.style : "NA"}
                        </p>
                        <p style={{ textAlign: "center" }}>
                          IBU: {beer.ibu ? beer.ibu : "0"}
                        </p>
                      </CardContent>
                      <div style={{ textAlign: "center" }}>
                        {find(this.state.clicked, function(item) {
                          return item.id == beer.id;
                        }) ? (
                          <Button
                            style={{
                              backgroundColor: "#999",
                              color: "#000"
                              }}
                              variant="raised"
                              onClick={this.handleCartAdd.bind(
                                this,
                                beer.id
                              )}
                            >
                                Added
                              </Button>
                             ) : (
                               <Button
                                style={{
                                backgroundColor: "#eb7c1c",
                                color: "#fff"
                              }}
                              variant="raised"
                              onClick={this.handleCartAdd.bind(
                                this,
                                beer.id,
                                beer.name,
                                beer.ounces,
                              )}
                            >
                              Add To Cart
                            </Button>
                          )}
                      </div>
                    </Card>
                  </Col>
                ))}
            </Row>}
          </Container>
        </InfiniteScroll>
      );
    }
}