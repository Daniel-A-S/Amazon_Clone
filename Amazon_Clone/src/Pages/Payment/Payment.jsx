import React, { useContext,useState } from 'react'
import Layout from '../../Component/Layout/Layout'
import classes from './Payment.module.css'
import { DataContext } from '../../Component/DataProvider/DataProvider'
import productCard from '../../Component/ProductCard/ProductCard'
import {useStripe, 
  useElements,
  CardElement

} from '@stripe/react-stripe-js';
import CurrencyFormat from '../../Component/Currency/Currency'
import {axiosInstance} from '../../API/axios'
import { db } from '../../Utility/firebase'
import {useNavigate} from 'react-router-dom'



function Payment() {
  const[{user, basket},dispatch]=useContext(DataContext)
  const totalItem=basket?.reduce((amount,item)=>{
    return item.amount+amount
  },0);
  
  const total=basket?.reduce((amount,item)=>{
    return item.price+item.amount+amount
  },0);


  const [cardError,setCardError]=useState(null)
  const [processing, setproocessing]=useState('false')
  const stripe=useStripe()
  const elements=useElements()
  const navigate=useNavigate()


const handleChange=async(e)=>{
  console.log(e);
  e?.error?.message ? setCardError(e?.error?.message):setCardError(null)
}

setproocessing(true)
const handlePayment=async(e)=>{
  e.preventDefault();
  try {

    const response=await axiosInstance({
      method:"post",
      url:`/payments/create?total=${total*100}`,
    })
     console.log(response.data);
    const clientSecret=response.data?.clientSecret
    const {paymentIntent}=await stripe.confirmCardPayment(clientSecret,{
payment_method:{
  card:elements.getElement(CardElement)
  }
    });

  await db.collection("users").doc(user.uid).collection("orders").doc(paymentIntent.id).set({
    basket:basket,
    amount:paymentIntent.amount,
    created:paymentIntent.created,
  })
// empty the basket

    dispatch({type:Type.EMPTY_BASKET})
    setproocessing(false)
    navigate("/orders",{state:{msg:"you have placed new order"}})
    
  }catch (error) {}
  
  
  //1.backend// || functions ---> contact to the client secret

  
  //2. client side (react side confirmation)
  //3 after the confirmation -->> order firestore database save, clear basket

}

  return (
    <Layout>
      {/* Header */}
         <div className={ classes.payment_header}>
          checkout ({totalItem}) items 
      </div>
      {/* payment method */}
      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}> 
      <h3>Delivery Address</h3>
        </div>
        <div>{user?.email}</div>
        <div>123 React Lane</div>
        <div>Boston, MA</div>
          <hr />
        {/* product */}
        <div className={classes.flex}><h3> Review items and delivery </h3> 
          <div>
            {
              basket?.map((item)=><productCard product={item} flex={true}/>)
            }

          </div>


          <hr />
          </div>
        {/* card form */}
        <div className={classes.flex}>
            <h3>Payment methods</h3>
            <div className={classes.payment_card_container}>
            <div className={classes.payment__details}>
              <form onSubmit={handlePayment}>
                {/*/error*/}
                {cardError && <small style={{color: "red"}}>{cardError}</small>}
                
                {/*/card element*/}
                <CardElement onChange={handleChange}/>
                {/*price*/}
                <div className={classes.payment__price}>
                <span style={{display:"flex",gap:"10px"}}>
                  <p>Total order |</p><CurrencyFormat amount={total} />
                </span>
                </div>
                <div>
                  <button type='submit'>
                  {
                    processing?(
                      <div className={classes.Loading}>
                        <ClipLoader color={"gray"} loading={processing} size={12} />
                        <p>Please Wait ...</p>
                      </div>
                    );"Pay Now"
                  }
                  
                  Pay Now</button>
                </div>
              </form>
              </div>
            </div>
            </div>
        </div>
      </section>

    </Layout>
   
  )
}

export default Payment;