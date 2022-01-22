import React,{useState,useEffect} from 'react'
import api from '../../api/api';
import UserCard from './UserCard';
import './users.css'
const Users=()=>{
const [users,setUser]=useState(null);

useEffect(()=>{
  const getData=async()=>{
    const data=await api.get("/users");
    setUser(data.data);

  }
  getData();
},[])

if(!users) return <>Loading ...</>
    
    return <div>
        <div className='card' style={{backgroundColor:'#9369'}}>
              <h2> ID</h2>
              <h2> CASH</h2>
              <h2> CREDIT</h2>
              <h2> Delete</h2>
       </div>
         {users.map((user)=>{
            return <UserCard user={user} key={user.id}/>
         })}
    </div>
}
export default Users;