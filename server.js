const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

//Connect to DataBase--------------------------------------------------------------------------------------------------------------
const Db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'root',
      database : 'smart-brain'
    }
});

//Create Express Server--------------------------------------------------------------------------------------------------------------

const app = express();
app.use(bodyParser.json());
app.use(cors());


//----Home--------------------------------------------------------------------------------------------------------------
app.get('/', (req, res) => {res.json('hello');})

//----Sign In--------------------------------------------------------------------------------------------------------------
app.post('/signin', (req,res) => { signin.handlesignin(req, res, Db, bcrypt)} )

//----Regtister--------------------------------------------------------------------------------------------------------------
app.post('/register', (req, res) => { register.handleregister(req, res, Db, bcrypt)} )

//----Profile--------------------------------------------------------------------------------------------------------------
app.get('/profile/:id', (req, res) => { profile.handleprofile(req, res, Db)} )

//----Image'++'--------------------------------------------------------------------------------------------------------------
app.put('/image', (req, res) => {image.handleimage(req, res, Db)} )

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)} )

//Launch server--------------------------------------------------------------------------------------------------------------
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
})
//---------------------------------------------------------------------------------------------------------------------------