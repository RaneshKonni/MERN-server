const express = require('express');
const mongoose = require('mongoose');
const {ApolloServer,gql} = require('apollo-server-express');
const typeDefs = require('./Schema');
const cors = require('cors'); // Import CORS
const resolvers = require('./resolvers');
const userApiFromRouter = require('./routes/usersRoute')
const app = express();
const port = 3001
const url= 'mongodb+srv://konniranesh03:QFDqUVX2Hqzmy1ET@cluster0.eykf9o0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
// CORS middleware
app.use(cors());
app.use(express.json())//parsing
mongoose.connect(url,{useNewUrlParser:true,
useUnifiedTopology:true}).then(()=>{console.log('DB connected')})
.catch((err)=>{console.log(err)});
const server = new ApolloServer({typeDefs,resolvers});
app.use('/users',userApiFromRouter); //api
async function StartServer(){
 await server.start();
 server.applyMiddleware({app});//run my express code
 app.listen(port,()=>{
 console.log('server live 3001');
 })
}


StartServer();
