import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Link, withRouter } from 'react-router-dom';



import { withStyles, Typography, Button, CardContent, CardActions, Card } from '@material-ui/core';

import Overlay from '../EditSpiceOverlay/EditSpiceOverlay'
import DeleteDialog from '../DeleteDialog/DeleteDialog'

const styles = {
    gridContainer: {
        paddingLeft: '10px',
        paddingRight: '10px',
    },
    card: {
        minHeight: '150px',
        // maxHeight: '200px',
        minWidth: '100px',
        padding: '10px',
        justifyContent: "center"
    },
    cardPlus: {
        minHeight: '200px',
        maxHeight: '200px',
        padding: '10px',
        justifyContent: "center"
    },
    cardAction: {
        display: 'inline-block',
        margin: '3px',
        textAlign: 'center',
    },
    bullet: {
        marginLeft: '5%',
        width: "90%",
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    margin: {
        margin: '15px',
    },
    button: {
        width: '50px',
        height: '40px',
        margin: '0',
        fontSize: '15x'
    },
    top: {
        marginTop: '-10px'
    }
};

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class SpiceList extends Component {
    state = {
        heading: 'Class Component',
        isSpice: true
    };

    toggleState = () => {
        this.setState({
            isSpice: !this.state.isSpice
        })
    }

    // deleteSpice = () => {
    //     swal({
    //         title: "Are you sure?",
    //         text: "Once deleted, you cannot undo.",
    //         icon: "warning",
    //         buttons: true,
    //         dangerMode: true,
    //       })
    //       .then((willDelete) => {
    //         if (willDelete) {
    //             this.props.dispatch({ type: 'DELETE_SPICE', payload: this.props.spice.id })
    //           swal("Your Spice has been removed form your Spice-rack", {
    //             icon: "success",
    //           });
    //         } else {
    //             this.toggleState()
    //           swal("Canceled delete.");
    //         }
    //       });
    // }




    render() {
        const { classes } = this.props;
        const spice_id = this.props.spice.id

        return (
            <div>

                {this.state.isSpice ?
                    <Card align="center" onClick={this.toggleState} className={classes.card}>
                        <CardContent>
                            <Typography className={classes.top} justify="center" variant="h4" component="h1">
                                {this.props.spice.name}
                            </Typography>

                            <br />
                            <Typography justify="center" variant="h6" component="h2">
                                Categories:
                            </Typography>
                            {this.props.store.categoriesList.map((category, i) => {
                                if (this.props.spice.id === category.spice_id) {
                                    return (
                                        <Typography key={i} component="p">
                                           - {category.name}
                                        </Typography>
                                    )
                                }
                            })}
                        </CardContent>
                    </Card>
                    :
                    <Card className={classes.card} >
                        <CardContent>
                            <CardActions className={classes.cardAction}>
                                <Button className={classes.button} component={Link} to='/recipe' variant="outlined" color="primary" >Recipes</Button>
                            </CardActions >
                            <CardActions className={classes.cardAction}>
                                {/* <Button onClick={this.editingSpice} component={Link} to={'/editspice/' + spice_id} size="small">Edit Spice</Button> */}
                                <Overlay toggleState={this.toggleState} spice={this.props.spice} />
                                {/* <Button onClick={() => this.props.history.push('/editspice/' + spice_id)} size="small">Edit Spice</Button> */}
                            </CardActions >
                            <br />
                            <CardActions className={classes.cardAction}>
                                {/* <Button className={classes.button} onClick={this.deleteSpice} variant="outlined" color="primary" >Delete</Button> */}
                                <DeleteDialog toggleState={this.toggleState} spice={this.props.spice}/>

                            </CardActions>
                            <CardActions className={classes.cardAction}>
                                <Button className={classes.button} onClick={this.toggleState} variant="outlined" color="primary" >Cancel</Button>
                            </CardActions>
                        </CardContent>
                    </Card>
                }

            </div>
        );
    }
}

const withRouterSpiceList = withRouter(SpiceList)

const styleSpiceList = withStyles(styles)(withRouterSpiceList)

export default connect(mapStoreToProps)(styleSpiceList);
