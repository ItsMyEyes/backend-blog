const db = require('../models')
const { Op } = require('sequelize')
const follows = db.follows
const moment = require('moment')


exports.following = async (req,res) => {
    const { who_follow } = req.body
    const checkuser = await db.users.findOne({
        where: {
            id: who_follow
        }
    })
    if (!checkuser) return res.status(409).json({ message: "Hmm.., are you hacker??", statusCode: 409 })

    const checkingFollow = await follows.findOne({
        where: {
            [Op.and]: [
                { id_follow: req.user.id },
                { who_follow: who_follow }
            ]
        }
    })

    if (checkingFollow) return res.status(409).json({ message: "followers already exits", statusCode: 409 })
    moment.locale('id')
    follows.create({
        id_follow: req.user.id,
        who_follow: who_follow,
        date: moment().format()
    })

    return res.status(201).json({ message: "Success follow", statusCode: 201 })
}

exports.unfollow = async (req,res) => {
    const { who_follow } = req.body
    follows.destroy({
        where: {
            id_follow: req.user.id,
            who_follow: who_follow
        }
    })

    return res.status(200).json({ message: "Success unfollow", statusCode: 200 })
}