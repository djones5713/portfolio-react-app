
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config({ path: '/Users/destinyjones/Documents/Udemy & Tutorials/WordPress/wordpress-react-portfolio/react-frontend/.env' })

const sendGrid = require('@sendgrid/mail');

const app = express();

app.use(bodyParser.json());

app.use(cors());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.get('/api', ( req, res, next ) => {
    res.send('API Status: Running')
})


app.post('/api/email', (req, res, next) =>{
    sendGrid.setApiKey( process.env.APIKEY )

    const msg = {
        to: process.env.EMAIL,
        from: req.body.email,
        subject: req.body.subject,
        text: req.body.text
    }

    sendGrid.send(msg)
    .then(result => {
        res.status(200).json({
            success: true
        })
    })
    .catch(error => {
        console.log(error)

        res.status(401).json({
            success: false
        })
    })
})


app.listen(4000, () => console.log("Running on Port 4000"));