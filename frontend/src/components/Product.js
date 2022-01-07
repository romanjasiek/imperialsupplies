import React from 'react';
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>
      <Card.Body>
        <Link className='link-danger' to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <h5>
              <strong>{product.name}</strong>
            </h5>
          </Card.Title>
        </Link>
        <Card.Text as='p' className='smalldescription'>
          {product.brand} | {product.category}
        </Card.Text>
        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as='h3'>{product.price} €</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
