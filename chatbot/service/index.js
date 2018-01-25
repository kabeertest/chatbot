
// Import required modules
var express = require('express');
var app = express();
app.use(function(req,res,next)
{
	console.log("Adding CORS support inside the intializing Chatbotservice function ");
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers','Content-Type, Authorization');

    // Pass to next layer of middleware
	next();
});


app.get('/',function (req, res)   {
    console.log("called"+req.query.user) ;    
   // res.send('Hello World!') ;
    var apiai = require('apiai');
    
   var app = apiai("d00512b61aad4ddd90ad81b41290413e");
    
   var request = app.textRequest(req.query.user, {
       sessionId: '123456'
   });
    
   request.on('response', function(response) {
       var mine=response.result
     //  console.log(typeof(mine));
       console.log(mine['fulfillment'].speech);
       res.send(mine['fulfillment'].speech) ;
   });
    
   request.on('error', function(error) {
    res.send(mine['fulfillment'].speech) ;
       console.log(error);
   });
    
   request.end();

})

app.listen(3000, () => console.log('Example app listening on port 3000!'))


