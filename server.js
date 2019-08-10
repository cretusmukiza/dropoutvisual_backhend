var express=require("express");
var bodyParser=require("body-parser");
var port=process.env.PORT || 5000;
var app=express();
var cors=require('cors');
var db=require('./models');
var path=require('path')
var Users=require('./routes/Users')
db.sequelize.sync({force:true});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors());
app.set( 'port', ( process.env.PORT || 5000 ));
app.use(express.static(path.join(__dirname, 'visual/build')));
app.use('/users',Users);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/visual/build/index.html'));
})
// Start node server

app.listen( app.get( 'port' ), function() {
    console.log( 'Node server is running on port ' + app.get( 'port' ));
});