require('dotenv').config()
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const helmet = require('helmet')

//Public directory path
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()
app.use(helmet())

//Set the view engine and related paths
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Set static directory
app.use(express.static(publicDirectoryPath))

//Routes
app.get('', (req,res) => {
    res.render('index', {
      title: "BDW.dev",
      description: "Full stack developer based in Raleigh, NC"
    })
})

//Set the port and start app listening
const port = process.env.PORT

app.listen(port, () => {
	console.log('Server is listening on ' + port)
})
