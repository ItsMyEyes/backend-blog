const db = require('../models')
const like = db.like
const {Op} = require('sequelize')
const moment = require('moment')

exports.postLike = async (req,res) => {
    const { id_post } = req.body
    const findExist = await like.findOne({
        where: {
            [Op.and]: {
                id_users: req.user.id,
                id_posts: id_post
            } 
        }
    })
    if (findExist) return res.json({ message: 'User cant like same post', code: 403 }).status(403)
    like.create({
        id_users: req.user.id,
        id_posts: id_post,
        date: moment().format()
    })
    return res.json({ message: 'success', code: 201 }).status(201)
}

exports.unlike = async (req,res) => {
    const { id_post } = req.body
    like.destroy({
        where: {
            [Op.and]: {
                id_users: req.user.id,
                id_posts: id_post
            } 
        }
    })
    return res.json({ message: 'success', code: 201 }).status(201)
}