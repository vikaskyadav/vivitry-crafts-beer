import React from 'react';

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InfiniteScroll from "react-infinite-scroll-component";
import { sortBy} from 'lodash/sortBy';

// import { Grid, Row, Col } from 'react-flexbox-grid';
import { Container, Row, Col } from "react-grid-system";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { CardHeader } from '@material-ui/core';


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

export default class BeerView extends React.Component{
    render() {
        const {beerData, filter} = this.props;        
        return <InfiniteScroll dataLength={beerData ? beerData.length : 0} // next={fetchData} //This is important field to render the next data
            hasMore={false} loader={"<p>...</p>"} endMessage={""} style={{padding: '5px'}}>
            <Container fluid>
            <Row style={{ marginTop : '30px'}}>
              {beerData
                .slice(0, 1000)
                .map((beer, index) => (
                  <Col
                    lg={3}
                    md={4}
                    sm={6}
                    xs={12}
                  >
                    <Card style={{ marginBottom: '5px',marginTop: '25px', padding: '5px', fontFamily: 'Roboto'}}>
                    <CardHeader title={<div style={{ color: '#3493b9', fontSize: '22px'}}>{beer.name ? beer.name : 'NA'}</div>} subheader={<div style={{ display: 'flex'}}>
                       <div style={{ flex: '1', color: '#eb7c1c'}}>
                          <strong>ABV: {beer.abv ? beer.abv : 'NA'}
                          </strong>
                        </div>
                        <div style={{ flex: '1', textAlign: 'right', color: '#eb7c1c'}}>
                          <strong>Ounces: {beer.ounces ? beer.ounces : 'NA'}
                          </strong>
                        </div>
                      </div>}/>
                    <CardContent>
                      <p style={{ textAlign: 'center', fontSize: '18px', fontWeight: '600', color: '#212121'}}>
                      {beer.style ? beer.style : 'NA' }
                      </p>
                      <p style={{ textAlign: 'center'}}>
                      IBU: {beer.ibu ? beer.ibu : '0' }
                      </p>
                      
                    
                    </CardContent>
                    </Card>
                  </Col>
                ))}
            </Row>
            </Container>
          </InfiniteScroll>;
  }
}