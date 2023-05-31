import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import UserInfoOrders from './UserInfoOrders';
import './AccountUserinfo.css';


const AccountUserInfo = (props) => {

    const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null; 

    const id = userInfo && userInfo._id;
  const {commission} = props
    const [userOrders, setUserOrders] = useState([]);


    useEffect(() => {

      const fetchData = async () => {
        try {
        
          const result = await axios.get(`/api/orders/userorders/${id}`);
          console.log(result.data); 
          setUserOrders(result.data)
       
  
        } catch(err) {

          console.log("No se muestran las ordenes del usuario!");
        }
    }
    fetchData();

    }, [id])



  return (
    <>

    <div className='userInfoRow'>
        <p className="balance">Mis ganancias: 
        <span>  ${commission}</span>
        </p>
    </div>
    <div className="userInfoRow">

        <p className="userOrders">Órdenes por entregar a los usuarios</p>

        <div className="account-orders">
            {userOrders.length === 0 ? (<h3 className='info userOrders'>Actualmente no tienes órdenes de entrega!</h3>) : (<UserInfoOrders userOrders={userOrders} />)}
        </div>

    </div>

    </>
  )
}

export default AccountUserInfo
