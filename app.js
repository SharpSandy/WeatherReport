const express=require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){

    res.sendFile(__dirname+"/index.html");
     
    // res.send("Server Started");
});

app.post("/", function(req,res){
    
    const query=req.body.cityName;
    const apiKey="your api key"; //API Key
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units=metric";
    
    https.get(url,function(response){
        console.log(response.statusCode);
        
        response.on("data",function(data){
            //console.log(data);
            const weatherdata = JSON.parse(data);
            const temp = weatherdata.main.temp;
            const wDescrp = weatherdata.weather[0].description;
            const icon = weatherdata.weather[0].icon;
            
            res.write("<h1>Temperature in "+ query +" is "+ temp +" degree celcius</h1>");
            const imgURL= "https://openweathermap.org/img/wn/"+icon+"@2x.png" ;
            res.write("<img src=" + imgURL + ">");
            res.write("<h3>Weather is currently "+wDescrp+"</h3>");
            res.send();
        });
    });


})





app.listen(3000, function(){
    console.log("Server Running Sucessfully at the port 3000");
})