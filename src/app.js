const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

const dirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.use(express.static(dirPath))

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Einspanier'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'Andrew Einspanier'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Andrew Einspanier',

    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({error})
    }

    geocode(req.query.address, (error, {location, latitude, longitude} = {}) => {
        if(error) {
            return res.send({error})
        }else{
            forecast(latitude , longitude , (error, data) => {
                if(error){
                    return res.send({error: 'forecast query error'})
                }else{
                    res.send({
                        location: location,
                        forecast: data
                    })
                }
            })
        }
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
                error: 'must provide search term'
            })
    }
    req.query
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Einspanier',
        errorMessage: 'Help page not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Einspanier',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
})