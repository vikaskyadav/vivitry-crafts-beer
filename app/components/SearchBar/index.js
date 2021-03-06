import React from "react";

import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Divider from "@material-ui/core/Divider";

export default class SearchBar extends React.Component {
        state = {
        style: '',
        name: 'hai',
    };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.getBeerStyle(event.target.value);
  };
  render() {
    const { beerByStyle } = this.props;
    return(
      <div style={{ marginTop: '10px', textAlign: 'right'}}>
        <InputLabel htmlFor="age-simple">Style Filter</InputLabel>
        <Select autowidth value={this.state.style} onChange={this.handleChange} inputProps={{ name: "style", id: "style-simple" }}>
          <MenuItem value={""} style={{ backgroundColor: '#f3f3f3'}}>All Beer Styles</MenuItem>
          <Divider />
          {
            Object.keys(beerByStyle).map((beerStyle,index) =>(
              <MenuItem value={beerStyle} key={index}>{beerStyle}</MenuItem>

            ))
          }  
        </Select>
      </div>
    );
}
}