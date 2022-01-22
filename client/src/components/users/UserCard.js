import React,{useState} from 'react'

import './users.css'
import api from '../../api/api'

import 'reactjs-popup/dist/index.css';

const UserCard=({user})=>{
 const [popUp,setPop]=useState(false);
const deleteHandler=async()=>{
   setPop(!popUp);
   const data=await api.delete(`/users/${user.id}`);
   console.log(data);
   alert(data);
}

    
    return (<>
    <div className='card' style={{opacity:1.1-popUp}}>
   

              <h2> {user.id}</h2>
              <h2> {user.cash}</h2>
              <h2> {user.credit}</h2>
              <h2><button onClick={()=>deleteHandler()}>X</button></h2>

    </div></>)
}
export default UserCard;