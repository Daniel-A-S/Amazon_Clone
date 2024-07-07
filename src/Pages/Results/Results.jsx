import React, { useState, useEffect } from 'react'
import Layout from '../../Component/Layout/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Producturl } from '../../API/endpoint'
import Product from '../../Component/Product/Product'
import ProductCard from '../../Component/Product/ProductCard'
import classes from "./Results.module.css"


function Results () {
  const [results,setResults]=useState([]);
  const {categoryName}=useParams();
  useEffect(()=>{
    axios.get (`${Producturl}/Products/category/${categoryName}`)
    .then((res)=>{
      setResults(res.data);
    }).catch(err=>{
      console.log(err);
  });
},[categoryName])
  return (
    <Layout>
      <section>
        <h1 style={{padding:"30px"}}>Results</h1>
        <p sytle ={{padding:"30px"}}>category</p>
        <hr />
        <div className='{classes.products_container}'>
          (results?.map((Product)=>(
            <ProductCard
            key={Product.id}
            renderAdd={true}
            product={Product}
            renderDesc={false}
            />
  )))
        </div>
      </section>
    </Layout>
   
  )
}

export default Results