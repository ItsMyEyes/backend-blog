const db = require('../models')
const moment = require('moment');
const url_seo = require('../helper/seo_url')
const categorys = db.categorys
const owner = db.ownerCategorys
const sequelize = require('sequelize')

async function countData() {
    const countData = await categorys.count({
        include: [
            {
                model: db.users, 
                as: "ownerCategory", 
                attributes: ["username","email","name","profile_photo"],
                where: {
                    id: req.user.id
                }
            }
        ]
    });
    return countData;
}

exports.getCategory = async (req,res) => {
    const getAll = await categorys.findAll({
        include: [
            {
                model: db.users, 
                as: "ownerCategory", 
                attributes: ["username","email","name","profile_photo"],
                where: {
                    id: req.user.id
                }
            },
        ]
    });

    return res.status(200).json({ message: "Success get all category", statusCode: 200, data: getAll, count: countData })
}

exports.all = async (req,res) => {
    const getAll = await categorys.findAll({
        attributes: ["title","url_perma","id"],
        include: [
            {
                model: db.posts, 
                as: "categoryPost", 
            }
        ]
    });
    return res.status(200).json({ message: "Success get all Category", statusCode: 200, data: getAll })
}

exports.createCategory = async (req,res) => {
    const { title, url_perma, custom_url } = req.body
    const checkingExitsCategory = await categorys.findOne({
        where: {
            title: title
        }
    });

    if (checkingExitsCategory) return res.status(400).json({ message: 'category name has been used, please use another category name', statusCode: 400 })

    const url = (custom_url == 'yes') ? url_perma : title
    req.body.url_perma = url_seo.seo_url(url)
    const category = await categorys.create(req.body)
    owner.create({
        userId: req.user.id,
        categoryId: category.dataValues.id
    })

    return res.status(201).json({ message: "Success categorys", statusCode: 201, data: category.dataValues })
}

exports.detail = async (req,res) => {
    const getData = await categorys.findAll({
        where: {
            url_perma: req.query.url
        },
        include: [
            {
                model: db.posts, 
                as: "categoryPost", 
                include: [
                    { model: db.users, as: "ownerPosting", attributes: ["username","name","profile_photo"] }
                ]
            }
        ]
    });
    return res.status(200).json({ message: "Success one Category", statusCode: 200, data: getData })
}

exports.editCategory = async (req,res) => {
    const { title, url_perma, custom_url } = req.body
    const url = (custom_url == 'yes') ? url_perma : title
    req.body.url_perma = url_seo.seo_url(url)
    const permissionPage = await categorys.findOne({
        include: [
            { 
                model: db.users, 
                as: "ownerCategory", 
                attributes: ["username","email","name","profile_photo"],
                where: {
                    id: req.user.id
                }
            }
        ]

    })
    
    if (!permissionPage) return res.status(403).json({ message: "You dont have any permission for this page", statusCode: 403 })

    categorys.update(req.body, {
        where: {
            id: req.query.id
        },
    })

    return res.status(201).json({ message: "Success edit categorys", statusCode: 201 })
}

exports.deleteCategory = async (req,res) => {
    const permissionPage = await categorys.findOne({
        include: [
            { 
                model: db.users, 
                as: "ownerCategory", 
                attributes: ["username","email","name","profile_photo"],
                where: {
                    id: req.user.id
                }
            }
        ]

    })
    
    if (!permissionPage) return res.status(403).json({ message: "You dont have any permission for this page", statusCode: 403 })

    categorys.destroy({
        where: {
            id: req.query.id,
        }
    })

    return res.status(201).json({ message: "Success delete categorys", statusCode: 201 })
}