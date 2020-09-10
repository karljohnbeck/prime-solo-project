import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {withRouter, Link} from 'react-router-dom';

// material ui 
import { InputLabel, MenuItem, Input, withStyles, Grid, Select, Button, Card, TextField } from '@material-ui/core';

const styles = {
  gridContainer: {
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  card: {
    minHeight: '300px',
    maxHeight: '300px',
    minWidth: '300px'
  },
  cardAction: {
    backgroundColor: 'yellow',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  margin: {
    margin: '15px'
  },
};

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class EditSpice extends Component {
  state = {
    heading: 'EditSpice Component',
    EditSpice: {},
    name: this.props.store.EditingSpice.name,
    exp_date: this.props.store.EditingSpice.exp_date,
    categoryList: [],
    list: [],
  };

  

  componentDidMount() {
    let id = this.props.match.params.spice_id
    this.props.dispatch({type: 'STORE_CLICKED_SPICE', payload: id})
    this.setState({
      name: this.props.store.EditingSpice.name,
    exp_date: this.props.store.EditingSpice.exp_date,
    })
  }

  handleChange = event => {
    console.log(event.target.value)
    this.setState({ [event.target.name]: event.target.value });
  };



  render() {
    const { classes } = this.props;

    return (
      <div>
        <h2>{this.props.store.EditingSpice.name}</h2>
        <Grid container spacing={32} className={classes.gridContainer} >
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Grid item xs={5}>
              <Card className={classes.card} >
                <TextField onChange={this.handleChange}
                  className={classes.margin}
                  id="spice-name"
                  label="Spice name"
                  value={this.props.store.EditingSpice.name}
                  
                  inputProps={{
                    name: 'name',
                    id: 'spice-name',
                  }} />
                  <br/>
                <Input type='Date' className={classes.margin}
                  variant="outlined"
                  id="exp-date"
                  inputProps={{
                    name: 'exp_date',
                    id: 'exp-date',
                  }}
                  onChange={this.handleChange} />
                <br />
                {/* Needs to be multi select eventually */}
                <InputLabel  className={classes.margin} htmlFor="category-simple">Categories</InputLabel>
                <Select
                  className={classes.margin}
                  value={this.state.list}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'list',
                    id: 'category-simple',
                  }}
                  multiple>
                  {this.props.store.uniqueCategories.map((item, i) => {
                    return (
                      <MenuItem key={i} value={item.id} >
                        {String(item.name)}
                      </MenuItem>
                    )
                  })}
                </Select>
                <br />
                {/* <Button component={Link} to='/user' className={classes.margin}>Cancel</Button> */}
                <Button onClick={() => console.log(this.state)} className={classes.margin}>Cancel</Button>

                {/* <Button onClick={this.addSpice} className={classes.margin}>Add Spice</Button> */}

              </Card>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  
  }
}

const EditSpiceWithRouter = withRouter(EditSpice)

const editSpiceStyles = withStyles(styles)(EditSpiceWithRouter) 

export default connect(mapStoreToProps)(editSpiceStyles);