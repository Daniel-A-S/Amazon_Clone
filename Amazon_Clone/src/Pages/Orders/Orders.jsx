import React,{useContext,useEffect,useState} from 'react'
import Layout from '../../Component/Layout/Layout'
import { db } from '../../Utility/firebase'
import { DataContext } from '../../Component/DataProvider/DataProvider'
import { useEffect } from 'react'
import productCard from '../../Component/ProductCard/ProductCard'



function Orders() {

  const [{user},dispatch] = useContext(DataContext);
  const[orders,setOrders] = useState([]);

  useEffect(() => {

    if(user){
      db.collection('users')
      .doc(user?.uid) 
      .collection('orders')
      .orderBy('created','desc')
      .onSnapshot(snapshot => {
        setOrders(snapshot.docs.map(doc => ({
          id:doc.id,
          data:doc.data()
        })))
      })
    }else{
setOrders([])
    }
    }
  ,[]);

  return (
    <Layout>
          <section className={classes.container}>
            <div className={classes.orders__container}>
              <h2>Your Orders</h2>
              {/**Order */}
                {
                  orders?.length ==0 && <div style={{padding:"20px"}}>
                    you don't have orders yet
                    </div>
                }
              <div>{
                orders?.map((eachOrder) => {
                  return (
                    <div key={i}>
                      <br />
                      <p>Order ID:{eachOrder?.Id}</p>
                      {
                        eachOrder?.data?.basket.map(order=>{
                          return (<productCard
                          flex={true}
                          key={order.id}
                          />
                          )
                          
                        })
                      }
                      </div>
                  )
                }
                 
                )}
                

              </div>
            </div>
          </section>
    </Layout>
  
  )
}

export default Orders
