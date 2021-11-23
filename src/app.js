let express = require('express');
let path = require('path');
let app = express();
let hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast'); 

hbs.registerPartials(path.join(__dirname,'../views/partials'));
app.set('view engine','hbs');
app.set('views',path.join(__dirname,'../views/templates'));
app.use(express.static(path.join(__dirname,'../public')));
//Routes

// app.get('',(req,res)=>{
//     res.send('This is the Root Route!!!');
// })

// app.get('/help',(req,res)=>{
//     res.send('You have reached help page!!!');
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>You have reached about page!!!</h1>');
// })

app.get('',(req,res)=>{
    res.render('index',{
        title: 'The Weather App',
        createdBy: 'Vivek'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help Page',
        createdBy: 'Vivek'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: "About Page",
        createdBy: 'Vivek'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.location){
        return res.send({
            error: "Location is required!!!"
        })
    }
    let data = {}
    geocode(req.query.location,(err,{location, latitude, longitude}={})=>{
        if(err){
            return res.send({ error: err })
        }else{
            forecast({latitude, longitude},(err,{weatherDescription,location,temperature,rainChance}={})=>{
                if(err){
                    return res.send({ 'error': err })
                }else{
                    data['location'] = location;
                    data['weatherDescription'] = weatherDescription;
                    data['temperature'] = temperature;
                    data['rainChance'] = rainChance;
                    console.log(`${weatherDescription}: Temperature in ${location} is ${temperature} degree Celsius. There is a ${rainChance} chance of rain`)
                    return res.send(data);
                }
            })
        }

    })
    // res.send({
    //     forcast: 'Today\'s weather is cloudy!!!',
    //     location: req.query.location
    // });
})

app.get('/help/*',(req,res)=>{
    res.render('page_not_found',{
        title: 'Page Not Found',
        message: 'Requested Help article not found',
        createdBy: 'Vivek'
    })
})

app.get('*',(req,res)=>{
    res.render('page_not_found',{
        title: '404 Error',
        message: '404 Error. page not found',
        createdBy: 'Vivek.Sabbani'
    })
})

app.listen(3000,()=>{
    console.log("Node server is up and running on port 3000");
})