const express = require('express')
const app = express()
const db = require('./models')  
const cors = require('cors')
let port = process.env.PORT || 8000
const { ValidationError } = require('express-validation')
const fileUpload = require('express-fileupload');
const path = require('path')

// Configuration
app.use(fileUpload({
  createParentPath: true
}));
app.use(express.urlencoded({ limit: "50mb", extended: false }))
app.use(express.json())
var whitelist = ['http://localhost:8080','https://blog.random.my.id']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(cors(corsOptions))

//automation
require('./automation/backup')

app.use('/',require('./router/guest.router'))
app.use('/auth',require('./router/user.router'))
app.use('/follow',require('./router/follow.router'))
app.use('/posting',require('./router/post.router'))
app.use('/category',require('./router/category.router'))
app.use('/scrap',require('./router/scrap.router'))
app.use('/like',require('./router/like.router'))

app.use(function(err, req, res, next) {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json(err)
    }
  
    return res.status(500).json(err)
})

db.sequelize.sync().then(() => {
    app.listen(port, () => console.log(`app listening on ${port}`));
})
