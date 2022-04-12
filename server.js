const express=require("express");
const app=express();
const bodyparser=require("body-parser");
const path=require("path");
const session=require("express-session");
const router=require("./router.js")
const {v4:uuidv4}=require("uuid");

app.use((req,res,next)=>{
    if(!req.user){
        res.header('cache-control','private,no-cache,no-store,must revalidate')
        res.header('express','-1')
        res.header('paragrm','no-cache')
    }
    next();
})


app.use(session({
    secret :uuidv4(),//initializing the session
    resave:false,
    saveUninitialized:true
}));



app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use('/static',express.static(path.join(__dirname,'public')));

app.get("/",(req,res)=>{

    if(req.session.loggedin){
        res.redirect("/route/home");
    }else{
     
        res.render("index",{title:"Login System",heading:"Login system"});
    }
    

}).listen(8080,()=>{
    console.log("server started");
});

app.use("/route",router);