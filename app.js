const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const request = require('request')
const https = require('https')
app.use(bodyParser.urlencoded({
  extended: true
}))
//to read my css and load my image
app.use(express.static('publics'))

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/signup.html")
})

app.post('/', function(req, res) {
  const firstName = req.body.nom
  const lastName = req.body.prenom
  const email = req.body.email

  const data = {
    members: [{
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }

      }

    ]

  }

  const jsonData = JSON.stringify(data);
  const url = "https://us4.api.mailchimp.com/3.0/lists/5ba025c7d9"
  const options = {
    method: "POST",
    auth: "yannick1:1ac1d79dc09e105edfea0ec1cb71b6fd-us4"
  }
  const request = https.request(url, options, function(response) {
    if (response.statusCode == 200) {
      res.sendFile(__dirname + "/success.html")
    } else {
      res.sendFile(__dirname + "/failure.html")

    }
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })

  })

  request.write(jsonData);
  request.end();


})

app.post('/failure', function(req, res) {
  res.redirect('/')
})

app.listen(process.env.PORT || 3000, function() {
  console.log("the server at running on port 3000");
})

// mailchimp apiKey :1ac1d79dc09e105edfea0ec1cb71b6fd-us4
//list id: 5ba025c7d9
