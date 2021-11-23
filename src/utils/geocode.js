const request = require("postman-request");
const geocode = (location,callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?limit=1&access_token=pk.eyJ1Ijoidml2ZWtzYWJiYW5pIiwiYSI6ImNrdjBlc292cjA1dWUyeHA3ZGw1Z3Y4emEifQ.NgFbLOWUAXqo00HRVwTjlg`;
    request({url, json: true},(err,{body})=>{
        if(err){
            callback("Unable to connect to the geocode api!!!",undefined);
        }else if(!body.features.length){
            callback("Unable to find the location, please check the location and try again!!!",undefined);
        }else{
            const data = body.features[0];
            callback(undefined,{location: data.place_name, latitude: data.center[1],longitude: data.center[0]});
        }
    })
}

module.exports = geocode;