import React from 'react'
import {categoryInfos} from '../Category/Catagoryfullinfo'
import Categorycard from './Categorycard'
import classes from './Category.module.css'

function Category() {
  return (
    <section className={classes.Category_Container}>
      {
        categoryInfos.map((infos)=>(
          <Categorycard data={infos}/>
        ))
      }
    </section>
  )
}

export default Category
