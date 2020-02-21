const express = require('express');
const layouts = require('express-ejs-layouts');
const methodOverride = require('method-override');

const app = express();
app.set('view engine', 'ejs');
app.use(layouts);
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

//SUM ROUTES HERE
app.get('/', (req, res) => {
    res.render('home');
});

//Import controllers
app.use('/dinos', require('./routes/dinos'));
app.use('/cryptids', require('./routes/cryptids'));



//LISTEN!!
app.listen(3000, () => console.log('👂🏽You are listening to the smooth sounds of port 3000👂🏽'));