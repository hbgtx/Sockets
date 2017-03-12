var express=require('express')
var app=express()
var mongoose=require('mongoose')
var bodyParser=require('body-parser');
mongoose.connect('mongodb://hemant:badal.verma.061@ds035563.mlab.com:35563/persons')

var db=mongoose.connection;
var loginSchema=mongoose.Schema({username:String,password:String});
var Login=mongoose.model('Login',loginSchema);

db.once('open',function () {
    console.log("connect to mongo DB")
})
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/login',function (req, res) {
    Login.findOne({username:req.body.username,password:req.body.password},function (error, info) {
        if(info){
            res.send("welcome")
        }
        else{
            res.send("incorrect")
        }
    })
})

app.set('view engine','ejs');
app.post('/register',function (req, res) {
    res.send("Welcome"+req.body.username)
})
app.post('/registeruser',function (req, res) {
    var login=new Login({username:req.body.username,password:req.body.password});
    login.save(function (error, info) {
        res.send(info);
    })
})


app.get('/:profile',function (req,res) {
    res.send("hello "+req.params.profile);
})

app.get('/admin',function (req,res) {
	res.render('admin',{data:'hemant',user:"bansal"});
})

app.get('/',function (req,res) {
    res.send('Welcome to my api');
})

app.get('/hi',function (req, res) {
    res.send("Hi i am writing an api");
})
app.get('/*',function (req, res) {
    res.send("Error 404");
})

app.set('port',(process.env.PORT||8480))

app.listen(app.get('port'),function () {
    console.log('Api running on port')
})