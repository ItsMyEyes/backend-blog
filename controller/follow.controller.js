const db = require('../models')
const { Op } = require('sequelize')
const follows = db.follows
const users = db.users
const moment = require('moment')
const { follow } = require('../validation/follow.validation')


exports.following = async (req,res) => {
    const { id_follow, who_follow } = req.body
    const checkingFollow = await follows.findOne({
        where: {
            [Op.and]: [
                { id_follow: id_follow },
                { who_follow: who_follow }
            ]
        }
    })

    if (checkingFollow) return res.status(409).json({ message: "followers already exits", statusCode: 409 })
    moment.locale('id')
    req.body.date = moment().format()
    follows.create(req.body)

    return res.status(201).json({ message: "Success follow", statusCode: 201 })
}

exports.unfollow = async (req,res) => {
    const { id_follow, who_follow } = req.body
    follows.destroy({
        where: {
            id_follow: id_follow,
            who_follow: who_follow
        }
    })

    return res.status(200).json({ message: "Success unfollow", statusCode: 200 })
}