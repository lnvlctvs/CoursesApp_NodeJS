const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

const indexRouter  = require('./routes/index')

// Handlebars middleware
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars'); 

app.use(express.static('public'))

app.use('/', indexRouter)

app.listen(5000, () =>{
    console.log('Server is starting at port', 5000)
})