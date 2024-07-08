const express = require('express')
const router = express.Router()
const {ApolloServer,gql} = require('apollo-server-express');
const typeDefs = require('../Schema');
const resolvers = require('../resolvers');
const server = new ApolloServer({typeDefs,resolvers});
router.get('/',async (req,res)=>{
 try{
 const {data,errors}= await server.executeOperation({
 query:gql`query{ getUsers{id name email password} }`
 });if(errors){
 console.log(errors)
 return res.status(500).send(errors);
 }res.status(201).send(data)
 }catch(err){
 console.log()
 res.status(500).send({message:err})
 }
})

router.post('/', async (req,res)=>{
    //req -> name,email,password
    const {name,email,password}= req.body;
    try{
    const {data,error} = await server.executeOperation({
    query:gql`mutation {
    createUser(input:{name:"${name}",
    email:"${email}",password:"${password}"}){
    name
    email
    }
    }`
    });
    if(error){return res.status(500).send({message:error})}
    res.status(201).send(data)
    }catch(err){
    res.status(500).send({message:err});
    }
   })
   router.put('/changepass/:id', async(req,res)=>{
    const id = req.params.id;
    const {password}= req.body;
    try{
    const {data,error} = await server.executeOperation({
    query:gql`mutation{
    changePass(id:"${id}",password:"${password}"){
    id
    name 
    password
    }
    } `
    });
    if(error){ return res.status(500).send({message:error})};
    res.status(201).send({message:data});
    }catch(err){res.status(500).send({message:err})};
   })
   module.exports =router
   