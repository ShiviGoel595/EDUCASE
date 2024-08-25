  require('dotenv').config();
  const express = require('express');
  const app = express();
  var mysql = require('mysql');

 // 
 //CREATING MYSQL TABLE
 
  /* 
var con = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE SCHOOLS (name VARCHAR(255), address VARCHAR(255) , longitude FLOAT , LATITUDE FLOAT)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
}); */




  const port = process.env.PORT || 4000; // Using default 3000
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

  //middlewares

app.use(express.json());
app.use(express.static('public')); // to acces img , css ;
  // Templating Engine
//app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
app.use('/', require('./routes/main.js'));

//******************************************************************************* */

  
// DEMO DATA
    const data = [
      {"id":1,
        "name":"hansraj school",
        "address":"delhi",
        "longitude" : 28.7041,
        "latitude":   77.1025,
        
    },
          {"id":2,
        "name":"monfort school",
        "address": "haryana",
        "longitude" : 29.0588,
        "latitude":   76.0856,
        
    },
          {"id":3,
        "name":"shoka school",
        "address":"bihar",
        "longitude" : 25.9644,
        "latitude": 85.2722,
         
    },
          {"id":4,
        "name":"pinnacle school",
        "address":"madhya pradesh",
        "longitude" : 22.9734,
        "latitude":   78.6569,
         
    }
    ]; 

  //***************************************************/ 
  
// To validate all data . 
function validate(req, res, next) {
  console.log("i am inside validate");
  let err; 
  if(!(req.body.name) || !(req.body.address) || !(req.body.address) || !(req.body.address)){
    err = "field required";
    return res.send(err);
  }
  
  function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
   }
 if(isFloat(req.body.longitute)== false){
   err = "Longitude should be a float number ";
   return res.send(err);

 } 

 if(isFloat( req.body.latitude) == false){
 err = "Latitude should be a float number ";
  return res.send(err);
 }
 
  next();
}


    // Create (POST) a new item
  app.post('/addSchool', validate, (req, res) => {
    console.log(req.body);
    const newItem = req.body;
    data.push(newItem);
    console.log(data);
    /*
   Inserting in mysql
  var sql = "INSERT INTO customers (name, address ,longitude, latitude) VALUES (res.body.name, res.body.address,res.body.longitude,res.body.latitude)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
    */
    res.status(201).json(newItem);
  });

  // Read (GET) all items
  app.get('/listSchool', (req, res) => {
    res.json(data);
  });
  
  userLongitude = (28.7080726).toFixed(1);
  UserLatitude = (77.176876).toFixed(1);

  app.post('/postUserLocation', (req, res) => {
     userLongitude = req.body.longtitude.toFixed(1) || (28.7080726).toFixed(1);
     UserLatitude = req.body.latitude.toFixed(1) || (77.176876).toFixed(1) ;
    
  });
    
 

 app.get('/listSchoolSorted', (req, res) => {

  // value of user current location will come from frontend then we can use it in server.
  
  // I have written frontend logic of fetching user's current location . But havent send it to server

  // server side i have used demo value of user longitude and latitude
  // you can also upload userlocation by hitting api /postUserLocation.


    
     data.forEach(element => {
        const lat2 = element.latitude.toFixed(1);
        const lon2 =  element.longitude.toFixed(1);
        console.log(lat2,lon2);
        // Function call
        DistanceBetweenPoints(UserLatitude,userLongitude , lat2, lon2 ,'K');

        // Function Defination
         function DistanceBetweenPoints(lat1, lon1, lat2, lon2, unit) {
         console.log(lat1,lon1,lat2, lon2);
  
	        if ((lat1 == lat2) && (lon1 == lon2)) {
		      return 0;
	         }
	       else {
		      var radlat1 = Math.PI * lat1/180;
		      var radlat2 = Math.PI * lat2/180;
		      var theta = lon1-lon2;
		      var radtheta = Math.PI * theta/180;
		      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		        if (dist > 1) {
			      dist = 1;
		        }
		      dist = Math.acos(dist);
		      dist = dist * 180/Math.PI;
		      dist = dist * 60 * 1.1515;
		      if (unit=="K") { dist = dist * 1.609344 }
		      if (unit=="N") { dist = dist * 0.8684 }
          console.log(element.address , dist);
          element["dist"] = dist // Added distance key value pair to sort on that basis
		      
	       }

         
        }
      
    });

    // last logic of sortion .Used sortion method to sort array on he basis of distance

      var sortedArrr = data.sort((a, b) => {
      a= a.dist;
      b= b.dist;
      console.log(a,b);
      return a-b 
      })
      console.log(sortedArrr);

//sending sorted array in response
res.send(sortedArrr);

 })

  

 