const express = require('express')
const app = express()
const path = require('path')
let port = process.env.PORT || 7000


app.listen(port, () => console.log(`app listening on ${port}`));
app.use(express.static(path.join(__dirname, 'uploads')));