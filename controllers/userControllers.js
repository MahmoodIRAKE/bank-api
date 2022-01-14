const express = require("express");
const utils=require('../utils/utils')
const usersData=require('../json/data.json');
const { json } = require("body-parser");
const { redirect } = require("express/lib/response");
const app = express();
const path='./json/data.json';

const findUser=(id)=>{
  return usersData.find((user)=>user.id=== +id)
}
const findUserIndex=(id)=>{
  return usersData.findIndex((user)=>user.id=== +id)
}

// active is to define where to update cash or credit
const despositeWithdrawCreditTrnasfer=(id,targetId,amount,num,active)=>{
  let userIndex=findUserIndex(id);
  let targetIndex=findUserIndex(id);
  if(userIndex){
      if(targetId){
        if(!targetIndex){
          return false;
        }
       return transfer(userIndex,targetIndex,amount);
      }
      else{
        if(num===-1&&usersData[userIndex][active]<amount){
           return false;
        }
      usersData[userIndex][active]+=amount*num;
      return true;
      }
  }
  return false;
}



const transfer=(myIndexId,targetIndexId,amount)=>{
   let cash=usersData[myIndexId].cash;
   let credit=usersData[myIndexId].credit;
    if(cash+credit<amount){
      return false;
    }

   if(cash>=amount){
    usersData[myIndexId].cash-amount;
   }
   if(cash<amount){
     amount-=usersData[myIndexId].cash
     usersData[myIndexId].cash=0;
   }
   if(amount>0){
    usersData[myIndexId].credit-amount;
   }
   return true;
}


const getUser = (req, res) => {
  try{
    const{id}=req.params;
    let user=findUser(id)
    if(user){
      res.send(user);
    }
    else{
      res.send("there no such user");
    }
    
    
  }catch(err){
    res.send("404 Error")
  }
};

const addUser = (req, res) => {
  try{
    const{id}=req.body;
    // check if id is exiseted
    if(findUser(id)){
      res.send("this user is already existed");
    }
    else{
      usersData.push(req.body);
      utils.addClient(path,usersData);
    }
    
    
  }catch(err){
    res.send("404 Error")
  }
 

  res.send("ok");
};

const editUser = (req, res) => {

  const {id}=req.params;
  const {targetId,amount,transaction}=req.body;
  console.log(req.body);
  try{
    let check=null;
    if(transaction==='deposite'){
       check=despositeWithdrawCreditTrnasfer(id,null,amount,1,'cash');
    }
    else if(transaction==='withdraw'){
       check=despositeWithdrawCreditTrnasfer(id,null,amount,-1,'cash');
    }
    else if(transaction==='updateCredit'){
     check=despositeWithdrawCreditTrnasfer(id,null,amount,1,'credit');
    }
    else if(transaction==='transfer'){
       check=despositeWithdrawCreditTrnasfer(id,targetId,amount,1,'');
    }

    if(!check&&transaction==='transfer'){
      res.send('you dont have enough moeny')
    }
    if(!check){
      res.send('user does not exist')
    }
    utils.addClient(path,usersData);

  }catch(err){
    res.send('404 Error')
  }
  res.send('data is changed ')
};

const deleteUser = (req, res) => {
  res.send("ok");
};

const getAllUsers = (req, res) => {
  res.send(utils.parserClients(path));
};

module.exports = { getUser, addUser, editUser, deleteUser, getAllUsers };
