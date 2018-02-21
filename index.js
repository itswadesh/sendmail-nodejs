
var express = require('express');
var bodyParser = require('body-parser');
require('dotenv').config()

var app = express();

app.use(express.static(__dirname + '/client'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Sendmail route
app.post('/sendmail', function(req, res){
    let helper = require('sendgrid').mail;
        let fromEmail = new helper.Email(req.body.from);
        let toEmail = new helper.Email(req.body.to);
        let subject = req.body.subject;
        let content = new helper.Content('text/plain', req.body.text);
        let mail = new helper.Mail(fromEmail, subject, toEmail, content);

        let sg = require('sendgrid')(process.env.SENDGRID_API_KEY || 'YOUR_SENDGRID_API_KEY');
        let request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON()
        });

        sg.API(request, function (error, response) {
            if (error) {
                console.log('Email Error...', response.body);
                res.status(400).send(response.body)
            }else{
            res.status(200).send('Mail sent successfully')
            }
        });
});

// Start server
var port = Number( process.env.PORT || 8080 ), ip = "127.0.0.1";
app.listen(port, function() {
  console.log('Express server listening on http://localhost:%d', port);
});
