const db = require('../models')

exports.home = (req,res) => {
    // console.log(req)
    res.json({
        message: `Welcome to`,
        status_code: 200,
    }).status(200)
}