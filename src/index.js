const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(PORT , () => {
    console.log(`server started at PORT ${PORT}`);
})