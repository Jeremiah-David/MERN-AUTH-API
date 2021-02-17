const express = require('express')
const app =express()
const cors = require('cors')

app.use(express.json())

app.use(express.urlencoded({extended: false}))


//allows access from all origins
app.use(cors())

app.listen(process.env.PORT || 8000, ()=> {
    console.log('listening on port 8000')
})