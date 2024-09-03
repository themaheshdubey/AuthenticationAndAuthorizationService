const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT



// Conditional middleware for JSON body parsing
app.use((req, res, next) => {
    // Apply JSON parsing only for POST, PUT, PATCH
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
        express.json()(req, res, next);
    } else {
        next();
    }
});



// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ApiRoutes = require('./routes/index');
app.use('/api', ApiRoutes);


app.listen(PORT , () => {
    console.log(`server started at PORT ${PORT}`);
})