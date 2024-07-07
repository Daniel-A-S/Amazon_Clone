import React, { useEffect, useState } from 'react'
import Layout from '../../Component/Layout/Layout'
import classes from './ProductDetail.module.css'
import {useParams } from 'react-router-dom'
import axios from 'axios'
import {Producturl} from "../../API/endpoint"
import ProductCard from "../../Component/Product/ProductCard"
import Loader from "../../Component/Loader/Loader"


function ProductDetail () {
  const [Product,setProduct]=useState({})
  const [isLoading, setisLoading]=useState(false)
  const {ProductId}=useParams()

  useEffect(()=>{
    axios.get(`${Producturl}/Products/${ProductId}`)
    .then((res)=>{
      setProduct(res.data)
      setisLoading(false)
    }).catch((err)=>{
      console.log(err);
      setisLoading(false)
    }
    )
  },[])
  
  return (
    <Layout>
      {isLoading?(<Loader/>):(<ProductCard
        product={Product}
        flex={true}
        renderDesc={true}
        renderAdd={true}
      />)
      }
         
    </Layout>
   
  )
}

export default ProductDetail