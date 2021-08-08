const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Filip:gn951753@movieapp.ns5nu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
                                                                                                                        .then(() => console.log('DB Connected'))
                                                                                                                        .catch(err => console.error(err));
 
app.get('/', function (req, res) {
  res.send('Hello World')
});
 
app.listen(5000);