import React from 'react'
import classes from "./Category.module.css";
import {Link} from "react-router-dom"




function Categorycard({data}) {
  return (
    <div className={classes.Category}>
      <Link to ={`/category/${data.name}`}>
        <span>
            <h2>{data?.title}</h2>
        </span>
        <img src={data?.imgLink} alt=""/>
        <p> shop now</p>
      </Link>
    </div>
  )
}

export default Categorycard
