//resolvers.js 
const User = require('./model/userSchema');//parent
const resolvers ={
 Query:{
 getUser: async(_,{id})=>{return await User.findById(id);},
 getUsers: async()=>{return await User.find();},
 },
 Mutation:{
 createUser: async (_,{input})=>{
 const {name,email,password}= input;
 try{
 if(!name || !email || !password){
 throw new Error("Please enter all the fields");
 }
 const newUser = new User({name,email,password});
 return await newUser.save();
 }catch(err){ throw Error(`Error Creating User: ${err}
`)}
 },
 changePass:async(_,{id,password})=>{
 
 try{
 
 const usernew= await User.findByIdAndUpdate(id,
{password:password},{new:true});
 if(!usernew){
 throw new Error("User not found");
 }
 console.log(usernew);
 return usernew;
 }catch(err){throw Error(`Error Occured :${err}`)}
 
 },
 },
 User:{
 email:(parent)=> parent.email || '',
 name:(parent)=> parent.name || '',
 password:(parent)=> parent.password || ''
 },
};module.exports=resolvers;//export resolvers