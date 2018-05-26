import React from 'react';

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Switch from "@material-ui/core/Switch";
import Radio from '@material-ui/core/Radio';

import ContentFilter from './ContentFilter';

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  
  state = {
    selectedValue: 'ASC',
  };

  handleChange = event => {
    this.setState({ selectedValue: event.target.value });
    this.props.setFilter(event.target.value);
  };
  render() {
    return <AppBar>
        <Toolbar>
          <IconButton style={styles.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" style={styles.flex}>
            Vivriti Crafts Beer
          </Typography>
            <p style={{ fontFamily: "Roboto" }}>Filter by Alcholic Content :</p>
             <span>
             ASC
             </span>
            <Radio checked={this.state.selectedValue === "ASC"} onChange={this.handleChange} value="ASC" name="ASC" aria-label="ASC" />
             DESC
            <Radio checked={this.state.selectedValue === "DESC"} onChange={this.handleChange} value="DESC" name="DESC" aria-label="DESC" />
        </Toolbar>
      </AppBar>;
  }
}

export default Header;
