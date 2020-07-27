import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import { AddShoppingCart } from '@material-ui/icons';

import {
  makeStyles,
  ButtonGroup,
  Button,
  Drawer,
  Box,
  Typography,
  Grid,
  Paper
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  cart_toggler: {
    'border-top-left-radius': '5px',
    'border-bottom-left-radius': '5px',
    'background-color': '#399e7f',
    'cursor': 'pointer'
  },
  paper: {
    padding: theme.spacing(2),
    margin: '10px 0',
  },
  cart_items_container: {
    'height': '130px',
  },
  cart_quantity_inc_dec_button: {
  },
  cart_quantity_text: {
  },
}));

function Cart(props) {

  useEffect(() => {
    props.fetchCart();
  }, []);

  const classes = useStyles();

  console.log(props);

  const {
    toggleCart,
    isCartOpen,
    cartTotal,
    cartItems,
    addToCart,
    removeFromCart,
    incrementProductQuantity,
    decrementProductQuantity
  } = props;

  const anchor = 'right';
  return (
    <React.Fragment key={anchor}>
      <Box
        onClick={toggleCart}
        bgcolor="green"
        color="white"
        p={2}
        position="absolute"
        top="40%"
        right={0}
        zIndex="mobile stepper"
        className={classes.cart_toggler}
      >
        <Box display="flex" justifyContent="center">
          <Box pr={1}>
            <AddShoppingCart />
          </Box>
          <Box>
            {cartItems.length} items
            </Box>
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          <Box px={2} py={1} borderRadius={6} bgcolor="white" color="#399e7f">
            <Typography>
              &#8377; {cartTotal}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Drawer anchor={anchor} open={isCartOpen} onClose={toggleCart}>
        <Box width={400} padding={2}>
          <Box >
            {
              cartItems.map((item, i) => {
                return (
                  <Paper key={`c-item-${i}`} className={classes.paper}>
                    <Grid item xs={12} sm container alignItems="center" spacing={2}>
                      <Grid item xs container alignItems="center" spacing={2} className={classes.cart_items_container}>
                        <Grid item xs>
                          <ButtonGroup orientation="vertical" size="small" className={classes.cart_quantity_inc_dec_button}>
                            <Button onClick={() => incrementProductQuantity(item)}>+</Button>
                            <Button disabled={true}>
                              <Typography className={classes.cart_quantity_text}>{item.quantity}</Typography>
                            </Button>
                            <Button onClick={() => decrementProductQuantity(item)}>-</Button>
                          </ButtonGroup>
                        </Grid>
                        <Grid item>
                          <Typography variant="body2">
                            {item.product.name}
                          </Typography>
                          <Typography>
                            &#8377; {item.product.price}
                          </Typography>
                          <Typography>
                            {item.quantity} X 1 pc(s)
                          </Typography>
                        </Grid>
                        <Grid item xs>
                          <Typography variant="subtitle1">&#8377; {item.product.price * item.quantity}</Typography>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          style={{ cursor: 'pointer' }}
                          onClick={() => removeFromCart(item.product)}
                        >
                          x
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                )
              })
            }
          </Box>
        </Box>
      </Drawer>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    isCartOpen: state.cart.isCartOpen,
    cartTotal: state.cart.cartTotal,
    cartItems: state.cart.cartItems
  }
}

export default connect(
  mapStateToProps,
  actions
)(Cart);