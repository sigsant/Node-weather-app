// const path = require('path')

const express = require('express')
const { sendFile } = require('express/lib/response')
const hbs = require ('hbs')

const geomap = require('./dist/utils/geomap')
const forecast = require('./dist/utils/forecast')


const app = express()
const port = 3000

app.set("view engine", "hbs")
app.set("views", './templates/views')
hbs.registerPartials('./templates/partials')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', {});
})

app.get('/weather', (req, res) => {
    //Error si en la query no esta incluido el parametro 'address'
    if(!req.query.address){
        return res.send({
            error: "There is no address in the query"
        })
    }

    geomap(req.query.address, (error, { latitud, longitud, localizacion } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast( latitud, longitud, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                place: localizacion,
                address: req.query.address
            })
        })
    })

    console.log(req.query)
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: "Página de ayuda",
        msg: "Página de ayuda de la aplicación Weather App"
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMsg: "Article not found"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMsg: "Please check if the URL is correct or contact to the administrator of the domain"
    })
})

app.listen(port, () => {
    console.log(`Se ha iniciado el servidor en http://localhost:${port}`)
})
