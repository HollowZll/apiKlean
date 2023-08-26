const express = require('express');
const kodersRouters = require('./routes/koders.routers')
const practiceRouter = require('./routes/practice.router')
const authRouter = require('./routes/auth.routers')

const app = express();




//Para poder
app.use(express.json());
//Leer JSON
app.use("/auth", authRouter);
app.use('/koders', kodersRouters);
app.use('/practicas', practiceRouter);

app.get('/', (request, response) => {
   response.json({
    message: "Koders Api"
   })
});

module.exports = app;
