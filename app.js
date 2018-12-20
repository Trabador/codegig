const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/database');
const config = require('./config/variables');

const app = express();

//database connection
db.authenticate()
    .then(() => { console.log('Database connected') })
    .catch((err) => { console.log(err) });

//Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Set Static
app.use(express.static(path.join(__dirname, 'public')));

//Handle Bars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//Index
app.get('/', (req, res) => {
    res.render('entry', { layout: 'landing' });
});

//Gigs routes
app.use('/gigs', require('./routes/gigs'));

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
});