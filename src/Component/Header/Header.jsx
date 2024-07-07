
import React from 'react';
import classes from "./Header.module.css";
import LowerHeader from './LowerHeader';
import {Link} from "react-router-dom"
import { GoLocation } from "react-icons/go"; 
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import {DataContext} from "../DataProvider/DataProvider"
import { useContext } from 'react';


const Header = () => {
  const [{basket},dispatch]=useContext(DataContext)
  const totalitem=basket?.reduce((amount,item)=>{
    return item.amount=amount
  },0)
  return (
    <section className='classes.fixed'>
        <div className={classes.header_container}>
          {/* {logo section} */}
          <div className={classes.logo_container}>
          <Link to="/">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUTjk8ckKC91bHPcpPF6PlFUaAo9u1bD8XI1jTjVSuxA&s" alt="Amazon logo" />
            </Link>
          </div>
          <div className={classes.delivery}>
            <span>
              <GoLocation /> 
            </span>
            <div className='classes.city'>
            <p>Delivering to Boston 02128</p>
            </div>
            <div className='p'>
            
            </div>
          </div>
        {/* {search section} */}
        <div className={classes.search}>
          <select name="" id="">
            <option value="">All</option>
          </select>
          <input type="text"/>
          <BsSearch size={25}/>
        </div>
        {/* {other section} */}
        <div className={classes.order_container}>
            <Link to="" className={classes.language}>
              <img src="https://cdn.britannica.com/33/4833-004-828A9A84/Flag-United-States-of-America.jpg" alt=""/>
                <select name="id">
                <option value="">EN</option>
              </select>
            </Link>
            <Link to=""> 
              <p>Sign In</p>
              <span>Account & Lists </span>
            </Link>
            <Link to="/Orders"> 
            <p>returns</p>
            <span>& Orders</span>
          </Link>
          <Link to="/Cart" className={classes.cart}>
            <BiCart size={35}/>
            <span>{totalitem}</span>
          </Link>
        </div>
            </div>
          <LowerHeader/>   
    </section>
  );
};

export default Header;