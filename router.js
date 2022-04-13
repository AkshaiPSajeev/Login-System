var express=require("express");
var router=express.Router();

const credentials={
    email:"admin@gmail.com",
    password:"admin123"
}

router.post("/login",(req,res)=>{
    console.log(req.url);
    if(req.body.email==credentials.email&&req.body.password==credentials.password){
        
        req.session.loggedin=true;
        req.session.user=req.body.email;
        
        res.redirect("/route/home");
        //res.send("login success");
    }else if(req.body.email.length>=1&&req.body.password===""){
       
        res.render("index",{message :"Enter password",email:req.body.email});
    }else if(req.body.email==""&&req.body.password.length>=1){
       
        res.render("index",{message :"Enter email",password:req.body.password});
    }
    else{
        
        res.render("index",{message :"Incorrect username or password"});
        
    }

});

router.get("/home",(req,res)=>{
    if(req.session.user){
       res.render("home",{user:req.session.user});
    }else{
        res.render("index",{message :"Please login to continue"});
    }
});

router.get("/logout",(req,res)=>{
    req.session.destroy((err)=>{
      if(err){
            console.log(err);
        }else{
            //res.redirect("/");
           
        res.render("index",{message :"logout successfull...."});
        }
    });
   
});

module.exports=router;