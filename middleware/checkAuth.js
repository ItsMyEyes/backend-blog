const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.checking = async (req, res, next) => {
    if (!req.header('Authorization')) return res.status(404).json({'message': 'Header Authorization not found','code': 404})
    const checking = req.header('Authorization').split(' ');
    if (checking[0] == 'Auth') {
        const token = req.header('Authorization').replace('Auth ', '')
        const verify = await jwt.verify(token, '#MBzh4ma9@dL(92n', (err, user) => {
            if (err) return res.status(403).json({'message': 'Forbiden Users please go away','code': 403})
            return user;// pass the execution off to whatever request the client intended
        })
        if (verify.uid) {
            const user = await db.users.findOne({
                where: {
                    id: verify.uid
                }
            }).then(data => { return (data) ? data.dataValues : '' })
            if (user) req.user = user
            return (user) ? next() : res.status(403).json({'message': 'Forbiden Users please go away','code': 403})
        }
    } else {
       return res.status(403).json({'message': 'Forbiden Users please go away','code': 403})
    }
}