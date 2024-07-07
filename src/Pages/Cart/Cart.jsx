import React, { useContext } from 'react'
import Layout from '../../Component/Layout/Layout'
import { DataContext } from '../../Component/DataProvider/DataProvider'
import ProductCard from '../../Component/Product/ProductCard'
import CurrencyFormat from '../../Component/Currency/Currency';
import {Link} from "react-router-dom"
import classes from "./Cart.module.css"
import {Type} from '../../Utility/ActionType'
import { FaChevronDown } from "react-icons/fa";
import { IoArrowUpOutline } from "react-icons/io5";



function Cart() {
  const[{basket, user},dispatch]=useContext(DataContext);
  const total=basket.reduce((amount,item)=>{
         return item.price*item.amount=amount
  },0)
const increament=(item)=>{
  dispatch({
    type:Type.ADD_TO_BASKET,
    item
  })
}
const decreament=(id)=>{
  dispatch({
    type:Type.REMOVE_FROM_BASKET,
    id
}



  return (
    <Layout>
         <section className={classes.container}>

         
          <div className={classes.cart_container}>
            <div>
              <h2>Hello</h2>
              <h3>your shopping basket</h3>
              <hr/>
              {
                basket?.length==0?(<p>Opps! No item in your cart</p>):(basket?.map((item,i)=>{
                 return <section className={classes.cart_product}>
                  <ProductCard
                key={i}
                 product ={item}
                 renderDesc={true}
                renderAdd={false}
                 flex={true}
                 />
                 <div className={classes.btn_container}>
                  <button className={classes.btn} onClick={()=>increament(item)}>
                  <IoArrowUpOutline size={30}/>
                  </button>
                  <span>{item.amount}</span>
                  <button className={classes.btn} onClick={()=>deacreament(item.id)}>
                  <FaChevronDown size={30} />
                  </button>
                  
                  </div>
                  </section>
                 
                })
              )
              }

            </div>
{basket?.length!==0&&(
  <div className={classes.subtotal}>
    <div>
      <p>subtotal ({basket?.length} items)</p>
      <CurrencyFormat amount={total}/>
  </div>
  <span>
    <input type="checkbox"/>
    <small>This order contains a gift</small>
    </span>
    <Link to ="/payments">continue to checkout</Link>
  </div>
)}
          </div>
    </Layout>
    </section>
   
  )
}

export default Cart
