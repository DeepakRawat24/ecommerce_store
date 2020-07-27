import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 250,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function Product(props) {

  const classes = useStyles();

  const {
    product,
    addToCart,
    incrementProductQuantity,
    decrementProductQuantity,
    cartItems
  } = props;
  const { name, price, category, description } = product;

  console.log(props);

  const AddToCartBtn = () => {
    const cartItem = cartItems.filter(item => item.product.id === product.id)[0]

    if (cartItem) {
      return (
        <ButtonGroup size="small">
          <Button onClick={() => incrementProductQuantity(cartItem)}>+</Button>
          <Button disabled={true}>
            <Typography>{cartItem.quantity}</Typography>
          </Button>
          <Button onClick={() => decrementProductQuantity(cartItem)}>-</Button>
        </ButtonGroup>
      )
    }
    else {
      return (
        <IconButton size="small" color="primary" onClick={() => addToCart(product)}>
          + cart
        </IconButton>
      )
    }
  }

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title={name}
      />
      <CardContent>
        <Typography gutterBottom component="h2" variant="h5">
          {name}
        </Typography>
        <Typography variant="body1" color="textPrimary" component="p">
          &#8377; {price}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <AddToCartBtn />
      </CardActions>
    </Card>
  )
}

const mapStateToProps = state => {
  return {
    cartItems: state.cart.cartItems
  }
}

export default connect(mapStateToProps, actions)(Product);