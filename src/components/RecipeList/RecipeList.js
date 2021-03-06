import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {  CardContent, CardMedia, Typography,  withStyles, Grid, Button, Card } from '@material-ui/core';
import {  withRouter } from 'react-router-dom';

const styles = {
  card: {
    marginTop: '10px',
    width: '320px',
    padding: '10px',
    justifyContent: "center"
  },
  img: {
    maxHeight: "300px",
    maxWidth: "300px",
  },
  button: {
    width: '80px',
    height: '60px',
    backgroundColor: "#6e7e85",
    color: 'white',
  },
  titleBar: {
  backgroundColor: '#ffe2b6',
  width: '100%',
  marginTop: '-8px'
  },
  }

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class RecipeList extends Component {
  state = {
    heading: 'RecipeList Component',
    searchQuery: this.props.match.params.search,
    recipeList: this.props.store.recipeReducer,

  };

  // on load, get the recipies from the edamam api matching the url
  componentDidMount() {
    console.log(this.state.searchQuery)
    this.props.dispatch({type: 'FETCH_RECIPE', payload: this.state.searchQuery})
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container spacing={32}
        >
          <Grid
            container
            spacing={16}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <section align="center" justify= "center" className={classes.titleBar}>
            <h2>Recipes containing:
            
                    <br />
              {this.props.match.params.search}</h2>
              </section>
            
            {/* loop over the recipie reducer and display all the cards  */}
            {this.props.store.recipeReducer.map((recipe, i) => {
              if(this.props.store.recipeReducer.length === []) {
                return (<p>This may take a few seconds to load</p>)
              } else {
              console.log(this.state)
              return (
                <Card key={i} className={classes.card}>
                  <CardMedia
                    component="img"
                    alt={recipe.recipe.label}
                    height="300px"
                    width="300px"
                    image={recipe.recipe.image}
                    title={recipe.recipe.label}
                  />
                  <CardContent align="center" justify= "center">
                    <Typography gutterBottom variant="h5" component="h2">
                      {recipe.recipe.label}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h2">

                      {/* on click, link the user to a new tab with those recipes  */}
                      <Button className={classes.button} target="_blank" href={recipe.recipe.url}>Open Recipe</Button>

                    </Typography>
                  </CardContent>
                </Card>
              )
              }
            })}
          </Grid>
        </Grid>
      </div>
    );
  }
}

const withRouterRecipeList = withRouter(RecipeList)

const styleRecipeList = withStyles(styles)(withRouterRecipeList)

export default connect(mapStoreToProps)(styleRecipeList);