const express = require('express'); // Bring in the express library
const es6Renderer = require('express-es6-template-engine');
const app = express(); // Create a new express app.


// FOR POST 
app.use(express.urlencoded({extended: true }));

const http = require('http');
const querystring = require('querystring');

const hostname = '127.0.0.1';
const port = 3000;

// ES6
app.engine('html', es6Renderer); // introduce them




// Import my model class
const Restaurant = require('./models/restaurants');
const User = require('./models/user');


app.get('/restaurants', async (req, res) => {
    const allRestaurants = await Restaurant.getAll();
    // const restaurantJSON = JSON.stringify(allRestaurants);    
    // res.json will do 2 things:
    // 1. It converts your JavaScript Object or Array to a JSON string
    // 2. It puts the correct Content-Type header on the response
    res.json(allRestaurants);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/users', async (req, res) => {
    const allUsers = await User.getAll();
    res.json(allUsers);
});

app.get('/users/:id', async (req, res) => {
    const theUser = await User.getById(req.params.id);
    res.json(theUser);
});

app.post('/users', async (req, res) => {
    console.log(req.body);
    res.json(req.body);
    res.send(`${req.body} was here.`)
    await User.add(req.body); 
});

app.put('/users/:id', async (req, res) => {
    console.log('{ "message": "you wanna update, doncha?"}');
    await User.update(req.params.id, req.body);
    res.end(`{"id": ${req.params.id}}`);
});

app.delete('/users/:id', async (req, res) => {
    await User.delete(req.params.id);
    res.send("Deleted user " + req.params.id);
});