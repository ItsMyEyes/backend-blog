const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.login = async (req,res) => {
    const { emailOrUsername, password } = req.body
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let user = null
    if (re.test(String(emailOrUsername).toLowerCase())) {
        user = await db.users.findOne({
            where: {
                email: emailOrUsername
            }
        })   
    } else {
        user = await db.users.findOne({
            where: {
                username: emailOrUsername
            }
        })
    }

    if (!user) return res.status(403).json({ message: "Email / Username Not Found, check again", statusCode: 403 })
 
    const checkingPassword = await bcrypt.compare(password, user.password)
    
    if (!checkingPassword) return res.status(403).json({ message: "Email / Password is wrong, check again", statusCode: 403 })
    
    let payload = { uid: user.id }
    let accessToken = jwt.sign(payload, '#MBzh4ma9@dL(92n', {expiresIn: '1d'}); 

    return res.status(200).json({ message: 'success login, iam can make you happy', statusCode: 200, user: user, token: accessToken}) 
}

exports.register = async (req,res) => {
    const { email, password, name, profile_photo, username } = req.body
    
    const validationEmail = await db.users.findOne({
        where:{ 
            email: email 
        },
    })

    const validationUsername = await db.users.findOne({
        where:{ 
            username: username 
        },
    })

    if (validationEmail) return res.status(400).json({ message: 'email has been used, please use another email', statusCode: 400 }) 

    if (validationUsername) return res.status(400).json({ message: 'username has been used, please use another username', statusCode: 400 }) 

    const makeUser = await db.users.create({
        'email': email,
        'password': await bcrypt.hash(password, 15),
        'name': name,
        'username': username,
        'profile_photo': profile_photo
    })

    return res.status(201).json({ message: 'user success to make, you can login now!!!', statusCode: 201 })
}

exports.verifyToken = async (req,res) => {
    const header = req.header('Authorization')
    if (!header) return res.status(403).json({'message': 'I think no have header authorization','code': 403})
    const checking = header.split(' ');
    if (checking[0] == 'Auth') {
        const token = req.header('Authorization').replace('Auth ', '')
        const verify = await jwt.verify(token, '#MBzh4ma9@dL(92n', (err, user) => {
            if (err) return res.status(403).json({'message': 'Forbiden Users please go away','code': 403})
            return user;// pass the execution off to whatever request the client intended
        })
        if (verify.uid) {
            const checkingBlaclist = await db.blacklist_token.findOne({
                where: {
                    token: token
                }
            })
            if (checkingBlaclist) return res.status(403).json({'message': 'You are hacked wow :)','code': 403})
            const user = await db.users.findOne({
                where: {
                    id: verify.uid
                }
            }).then(data => { return (data) ? data.dataValues : '' })
            return res.status(200).send(user);
        }
    } else {
       return res.status(403).json({'message': 'Forbiden Users please go away','code': 403})
    }
}

exports.logout = async (req,res) => {
    const header = req.header('Authorization')
    if (!header) return res.status(403).json({'message': 'I think no have header authorization','code': 403})
    const checking = header.split(' ');
    if (checking[0] == 'Auth') {
        const token = req.header('Authorization').replace('Auth ', '')
        const ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
        db.blacklist_token.create({
            token: token,
            ip: ip
        })
    } else {
       return res.status(403).json({'message': 'Forbiden Users please go away','code': 403})
    }
}