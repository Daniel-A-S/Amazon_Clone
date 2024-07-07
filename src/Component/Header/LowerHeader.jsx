import React from 'react'
import classes from "./Header.module.css";
import {AiOutlineMenu} from "react-icons/ai"


function LowerHeader() {
  return (
    <div className={classes.lower_container}>
      <ul>
        <li>
            <AiOutlineMenu/>
            <p>All</p>
        </li>
        <li>Medical Care</li>
        <li>Groceries</li>
        <li>Best Sellers</li>
        <li>Amazon Basics</li>
        <li>New Releases</li>
        <li>Prime</li>
        <li>Music</li>
        <li>Customer Service</li>
        <li>Today's Deals</li>
        <li>Amazon Home</li>
        <li>Registry</li>
        <li>Books</li>
        <li>Pharmacy</li>
      </ul>
    </div>
  )
}

export default LowerHeader
