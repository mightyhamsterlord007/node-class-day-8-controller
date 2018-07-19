const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const UserController = require('./controllers/UserController');

mongoose.connect('mongodb://localhost:27017/user', { useNewUrlParser: true }, function(err) {
    if (err) {
        console.log('Error: ', err);
        return;
    } 
    console.log('MONGODB IS CONNECTED!');
});

const app = express();
const port = 3000;

//its telling the app to look for views folder when is requested
app.set('views', path.join(__dirname, 'views'));
//tell view engine to use ejs
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'));

app.get('/signup', function(req, res) {
    User.find({}, function(err, results) {
        if (err) {
            res.json({
                confirmation: 'Failure',
                message: err
            });
            return;
        }
        res.render('index', {users: results});
        return;
    })
});

app.post('/signup', function(req, res) {
  UserController.createUser(req.body, function(err, result) {
    if (err) {
        res.json({
            confirmation: 'failure',
            message: err
        });
        return;
    }
    res.json({
        confirmation: 'success',
        data: result
    });
    return;
  });
});

app.post('/createanimal', function(req, res) {
    
})

app.get('*', function(req, res) {
    res.send('Page does not exist. Check your url');
});


app.listen(port, function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`Server is now running on PORT ${port}`);
});
