require('dotenv').config()
const express = require('express')
const path = require('path')
const hbs = require('hbs')

//Oublic directory path
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Set static directory
app.use(express.static(publicDirectoryPath))

//Routes
app.get('', (req,res) => {
    res.render('index', {
    })
})

const port = process.env.PORT

console.log(port)

app.listen(port, () => {
	console.log('Server is listening on ' + port)
})
