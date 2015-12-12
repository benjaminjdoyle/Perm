"use strict";
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let port = process.env.PORT || 3000;
let passport = require('passport');
let mongoose = require('mongoose');
require('./models/user');
//require('./models/prospectiveEmployer');
require('./config/passport');
if(process.env.NODE_ENV === 'test') mongoose.connect('mongodb://localhost/indyproj-test')
else mongoose.connect('mongodb://localhost/indyproj');

app.set('views', './views');
app.engine('.html', require('ejs').renderFile);
app.use(express.static('./public'));
app.use(express.static('./bower_components'));
app.set('view engine', 'html');
app.set('view options', {
	layout: false
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());

let userRoutes = require('./routes/userRoutes');
//let prospectiveEmployerRoutes = require('./routes/prospectiveEmployerRoutes');

app.get('/', function(req, res) {
	res.render('index');
});

app.use('/api/v1/users', userRoutes);
// app.use('/api/v1/prospects', prospectiveEmployerRoutes);

app.use((err, req, res) => {
	if(process.env.NODE_ENV !== 'test') {console.log(err);}
	res.status(500).send(err);
});

module.exports = app.listen(port, () => {
	console.log('Example app listening at http://localhost:' + port);
});
