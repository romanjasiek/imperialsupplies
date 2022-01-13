import React from 'react';
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap';
import Rating from './Rating';
import TieFighter2 from '../sound/c80c41f5-824d-41ea-abea-b9245e5ee8e9.mp3';
import ElectricGlitch from '../sound/mixkit-toy-mechanism-2823.mp3';


const Product = ({ product }) => {


    let audio = new Audio(TieFighter2);
    let audio2 = new Audio(ElectricGlitch);

    const start = () => {
      audio.play();
    };

    const electricGlitch = () => {
      audio2.play();
    };


  return (
    <Card className='my-3 p-3 rounded'>
      <Link onClick={start} to={`/product/${product._id}`}>
        <Card.Img
          onMouseEnter={electricGlitch}
          src={product.image}
          variant='top'
          className='img-border'
        />
      </Link>
      <Card.Body>
        <Link
          className='link-danger'
          onClick={start}
          to={`/product/${product._id}`}
        >
          <Card.Title as='div'>
            <h5>
              <strong>{product.name}</strong>
            </h5>
          </Card.Title>
        </Link>
        <Card.Text as='p' className='smalldescription'>
          {product.brand} | {product.category}
        </Card.Text>
        <Card.Text as='p' className='galacticbasic__small'>
          {product.brand} | {product.category}
        </Card.Text>
        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as='h3'>
          <span className='price-color'>{product.price} €</span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
