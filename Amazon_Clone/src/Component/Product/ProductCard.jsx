import React,{useContext} from 'react';
import Rating from '@mui/material/Rating';
import CurrencyFormat from '../Currency/Currency';
import classes from './Product.module.css';
import { Link } from 'react-router-dom';
import {DataContext} from '../DataProvider/DataProvider'
import {Type} from "../../Utility/ActionType"


function ProductCard({ product, flex, renderDesc }) {
  const { image, title, id, rating, price, description,renderAdd } = product;
  

  const [state,dispatch]=useContext(DataContext)
  const addtoCart=()=>{
    dispatch({
      type:Type.ADD_TO_BASKET,
      item:{ image, title, id, rating, price, description
      }
    })
    
  }


  return (
    <div className={`${classes.card_container} ${flex ? classes.Product_flexed : ''}`}>
      <Link to={`/Products/${id}`}>
        <img src={image} alt={title} />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{maxWidth:"750px"}}>{description}</div>}
        <div className={classes.rating}>
          <Rating value={rating.rate} precision={0.1} readOnly />
          <small>{rating.count}</small>
        </div>
        <div>
          <CurrencyFormat amount={price} />
        </div>
        {
          renderAdd && <button className={classes.button} onClick={addtoCart}>
          Add to Cart
        </button>
        }
        
      </div>
    </div>
  );
}

export default ProductCard;