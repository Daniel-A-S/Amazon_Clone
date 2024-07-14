import React,{useContext,useEffect} from 'react'
import {usenavigate} from 'react-router-dom'
import {DataContext} from '../../Context/DataProvider'




const protectedRoute = ({children,msg,redirect}) => {
    const navigate = useNavigate()
    const [{user},dispatch] = useContext(DataContext)

    useEffect(() => {
        if(!user){
            navigate("/auth",{state:{msg,redirect}});
        }
    },[user]);


  return children
  
  
}



export default protectedRoute;
