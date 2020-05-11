exports.capitalize = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

exports.aqiDetails = function(aqi){
    var color = "";
    var text = "";
    if (aqi >= 0 && aqi <= 50) {
        color = "green";
        text = "Good";
    }

    else if (aqi >= 51 && aqi <= 100) {
        color = "yellow";
        text = "Moderate";
    }
    else if (aqi >= 101 && aqi <= 150) {
        color = "orange";
        text = "Unhealthy for sensitive groups";
    }
    else if (aqi >= 151 && aqi <= 200) {
        color = "red";
        text = "Unhealthy";
    }
    else if (aqi >= 201 && aqi <= 300) {
        color = "purple";
        text = "Very Unhealthy";
    }
    else if (aqi >= 301 && aqi <= 500) {
        color = "mehroon";
        text = "Hazardous";
    }

    return [color, text];
};