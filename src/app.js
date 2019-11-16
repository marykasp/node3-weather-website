const path = require('path'); //core node module
const express = require('express'); //npm package
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')


// create a new application object (express application)
const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and custom views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    //goes off and gets that view page and converts to html
    res.render('index', {
        title: 'Weather App',
        name: 'Mary Kasparian'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mary Kasparian'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: "Mary Kasparian",
        message: 'This is where you can find any information about the app'
    })
})


// get() method that takes a path and handler as arguments- route is matched when path and method align- either send back html or json object as data
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(req.query.address, (error, {
        latitude,
        longitude,
        location
    } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                res.send({
                    error
                })
            } else {
                res.send({
                    location: location,
                    forecast: forecastData,
                    address: req.query.address
                })
            }
        })

    })

})



// 404 error pages
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        name: 'Mary Kasparian',
        errorMsg: 'Help article not found'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mary Kasparian',
        errorMsg: 'page not found'
    })
})



app.listen(3000, () => {
    console.log('Server is up on port 3000')
})


// STEPS: url typed into browser, sends request over to our server, express routing handles and processes the HTTP request made using different methods and handlers(functions). For example it will look at the HTTP method(GET, POST..) and the path and find the route handler that matches both. The route will then trigger that function which will respond with the correct response