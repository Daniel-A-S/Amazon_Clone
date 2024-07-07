import React ,{useState,useContext}from 'react'
import classes from './Auth.module.css'
import { Link } from 'react-router-dom'
import {auth} from "../../Utility/firebase "
import {ClipLoader} from 'react-spinners'
import {signInWithEmailAndPassword,createUserWithEmailAndPassword} from "firebase/auth"
import {Datacontext} from '../../Component/DataProvider/DataProvider'

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const[loading,setLoading]=useState({
    signIn:false,
    signUp:false

  })

  const [{user},dispatch]=useContext(Datacontext);



const authHandler=async(e)=>{
      e.preventDefault();
      setLoading({loading,signIn:true})

      if(e.target.name==='SignIn'){
        auth.signInWithEmailAndPassword(email,password).then((userinfo)=>{
          console.log(userinfo);
          dispatch({
            type:'SET_USER',
            user:userinfo.user
          })
          setLoading({loading,signIn:false})
        }).catch((err)=>{
          
          setError(err.message);
        })
}else{
  setLoading({...loading,signup:true})
createUserWithEmailAndPassword(auth,email,password).then((userinfo)=>{
  
  dispatch({
    type:'SET_USER',
    user:userinfo.user,
  });
  setLoading({...loading,signup:false})
}).catch((err)=>{
  setError(err.message);
})
  return (
    <section className={classes.login}>
      
      {/*logo */}

      <Link>
      <image  src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt =""/>

      </Link>
      {/*form */}
<div className={classes.login_container}>
  <h1>Sign-In</h1>
  <form action="">
    <div>
  <label htmlFor='email'>E-mail</label>
  <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id='email' />
</div>
<div>
  <label htmlFor='password'>Password</label>
  <input value={password} onChange={(e)=>setPassword(e.target.value)}type="password" id='password' />
</div>

  <button  type="submit" onClick={authHandler} name="SignIn" className={classes.login_signInButton}>Sign In</button>
{/* agreement*/}
<p>
  By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
</p>
</form>
</div>
{/*sign up */}
<button type="submit" name='signUp' onclick={authHandler}className={classes.login_registerbutton}>Create your Amazon Account</button>
    err&<small style={{paddingTop:"5px",color:"red"}}>
      {error}
    </small>
    
    </section>
  )
}

export default Auth;
