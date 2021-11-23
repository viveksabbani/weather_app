const request = require('postman-request');

const forecast = (coords,callback) => {
    const url = `http://api.weatherstack.com/current?access_key=5976c57f7ef3144a784208de00008159&query=${coords.latitude},${coords.longitude}`;
    request({url, json: true},(err,{body})=>{
        if(err){
            callback("Unable to connect to weatherapi!!!",undefined);
        }else if(body.error){
            callback(body.error.info,undefined);
        }else{
            const data = body.current;
            const temperature = data.temperature;
            const rainChance = data.cloudcover<50? "less than 50%": "greater than 50%";
            const location = body.location.name;
            const weatherDescription = data.weather_descriptions[0];
            //Object shorthand notation
            callback(undefined,{weatherDescription ,location ,temperature ,rainChance});
        }
    })
}

module.exports = forecast;