const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const func = require(__dirname + "/myFunc");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/final", function (req, res) {
    var cityEntered = req.body.city;
    var stateEntered = req.body.state;
    var countryEntered = req.body.country;
    var myKey = "5387eaf1-4120-4182-a458-0f1d7c7ed654";

    var options = {
        url: "https://api.airvisual.com/v2/city",
        method: "GET",
        qs: {
            city: cityEntered,
            state: stateEntered,
            country: countryEntered,
            key: myKey
        }
    };

    request(options, function (error, response, body) {
        var content = JSON.parse(body);

        if (content.status == "success") {
            var cityReturned = content.data.city;
            var stateReturned = content.data.state;

            var aqi = content.data.current.pollution.aqius;

            var temp = content.data.current.weather.tp;
            var tempIcon = content.data.current.weather.ic;
            var hum = content.data.current.weather.hu;
            var wind = content.data.current.weather.ws;


            var values = func.aqiDetails(parseInt(aqi));
            var color = values[0];
            var text = values[1];

            res.render("final", {
                myCity: cityReturned, myState: stateReturned, myAqi: aqi, myTemp: temp, myColor: color,
                myText: text, myTempIcon: tempIcon, humidity: hum, windSpeed: wind
            });
        }
        else
            res.sendFile(__dirname + "/failure.html");
    });
});

app.post("/reset", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})


app.listen(process.env.PORT || 3000, function (req, res) {
    console.log("Server running on port 3000");
})


//api key for iqair
//5387eaf1-4120-4182-a458-0f1d7c7ed654

// curl --location --request GET 'api.airvisual.com/v2/city?city=delhi&state=delhi&country=india&key={5387eaf1-4120-4182-a458-0f1d7c7ed654}'
// http://api.airvisual.com/v2/city?city=delhi&state=delhi&country=india&key=5387eaf1-4120-4182-a458-0f1d7c7ed654
