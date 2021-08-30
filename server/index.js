const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const path = require("path");


mongoose.connect(config.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true,  useFindAndModify: false })
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
mongoose.set('useCreateIndex', true);

app.use('/api/users', require('./routes/users'));
app.use('/api/favorite', require('./routes/favorite'));
app.use('/api/comment' , require('./routes/comment'));
app.use('/api/like', require('./routes/like'));
app.use('/uploads', express.static('uploads'));

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


const port = process.env.PORT || 5000


app.listen(port, () => {
    console.log('Server running at port ' + port);
});