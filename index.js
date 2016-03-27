
var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var app = express();

app.use(express.static(__dirname + '/client'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sendmail route
app.post('/sendmail', function(req, res){
    var options = {
        auth: {
            api_key: process.env.SENDGRID_API || 'YOUR_SENDGRID_API_KEY'
        }
    }
    var mailer = nodemailer.createTransport(sgTransport(options));
    mailer.sendMail(req.body, function(error, info){
        if(error){
            res.status('401').json({err: info});
        }else{
            res.status('200').json({success: true});
        }
    });
});

// Start server
var port = 8080, ip = "127.0.0.1";
app.listen(port, ip, function() {
  console.log('Express server listening on http://localhost:%d', port);
});
