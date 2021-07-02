const db = require('../models')
const moment = require('moment')
const posts = db.posts
const url_seo = require('../helper/seo_url')
const { Op, json } = require('sequelize')
const fs = require('fs')

exports.getPosting = async (req,res) => {
    const getAll = await posts.findAll({
        where: {
            id_post_user : req.user.id
        }
    });
    return res.status(200).json({ message: "Success get all posting", statusCode: 200, data: getAll })
}

exports.all = async (req,res) => {
    const getAll = await posts.findAll({
        raw: true,
        attributes: ["id","title","description","thumbail_url", "date_created", "date_updated", "url_perma", "id_post_user"],
        include: [
            { model: db.users, as: "ownerPosting", attributes: ["username","name","profile_photo"] }
        ]
    });
    return res.status(200).json({ message: "Success get all posting", statusCode: 200, data: getAll })
}

exports.createPostingCategory = async (req,res) => {
    const { post_id, category_id } = req.body
    const arrayCategory = category_id.split(',')
    for (let i = 0; i < arrayCategory.length; i++) {
        const checkingDataCategory = await db.categoryPosts.findOne({ where:{
                [Op.and]: [
                    { categoryId: arrayCategory[i] },
                    { postId: post_id}
                ]
            } 
        })
        const data_category = {
            postId: post_id,
            categoryId: arrayCategory[i]
        }
        if (checkingDataCategory) {
            db.categoryPosts.update(data_category, {
                where: {
                    [Op.and]: [
                        { categoryId: arrayCategory[i] },
                        { postId: post_id}
                    ]
                }
            })
        } else {
            db.categoryPosts.create(data_category)
        }
    }
    return res.status(200).json({ message: "Success add category to posting", statusCode: 200})
}

exports.createPosting = async (req,res) => {
    const { title, url_perma, custom_url, json } = req.body
    const url = (custom_url == 'yes') ? url_perma : title
    req.body.url_perma = url_seo.seo_url(url)
    req.body.date_created = moment().format()
    req.body.date_updated = 'non'
    req.body.id_post_user = req.user.id
    const encodeData = await this.EncodePosting(json)
    const success = await posts.create(req.body)
    db.json_postings.create({
        id_posting: success.id,
        encodeJSON: encodeData
    })
    return res.status(201).json({ message: "Success Posts", statusCode: 201, data: success })
}

exports.EncodePosting = async (JsonData) => {
    const serialize = JSON.stringify(JsonData)
    const base64 = Buffer.from(serialize).toString('base64')
    return base64
}


exports.EncodePosting = async (JsonData) => {
    const serialize = JSON.stringify(JsonData)
    const base64 = Buffer.from(serialize).toString('base64')
    return base64
}

exports.DecodePosting = async (base64) => {
    const base64Decode = Buffer.from(base64, 'base64').toString('utf-8')
    const unserialize = JSON.parse(base64Decode)
    return unserialize
}


exports.detailBlog = async (req,res) => {
    const checkPost = await posts.findOne({
        where: {
            url_perma: req.query.url,
        },
        include: [
            { model: db.categorys, as: "category_postingan", attributes: ["id","title",'url_perma'] },
            { model: db.users, as: "ownerPosting", attributes: ["username","name","profile_photo"] }
        ]
    })

    if (!checkPost) return res.status(404).json({ message: "Nothing Posts in here", statusCode: 404 })
    return res.status(200).json({ message: "Success one posting", statusCode: 200, dataPost: checkPost })
}

exports.detail = async (req,res) => {
    const checkPost = await posts.findOne({
        where: {
            id: req.query.id,
            id_post_user: req.user.id
        },
        include: [
            { model: db.categorys, as: "category_postingan", attributes: ["id","title"] },
        ]
    })

    if (!checkPost) return res.status(404).json({ message: "Nothing Posts in here", statusCode: 404 })

    const getData = await db.json_postings.findOne({
        where: {
            id_posting: req.query.id
        }
    });
    const arrayData = await this.DecodePosting(getData.dataValues.encodeJSON)
    return res.status(200).json({ message: "Success one posting", statusCode: 200, data: arrayData, dataPost: checkPost })
}

exports.editPosting = async (req,res) => {
    const { title, url_perma, custom_url, json } = req.body
    const checkPost = await posts.findOne({
        where: {
            id: req.query.id,
            id_post_user: req.user.id
        }
    })
    if (!checkPost) return res.status(404).json({ message: "Nothing Posts in here", statusCode: 404 })

    const url = (custom_url == 'yes') ? url_perma : title
    req.body.url_perma = url_seo.seo_url(url)
    req.body.date_updated = moment().format()
    req.body.id_post_user = req.user.id
    const data = await posts.update(req.body, {
        where: {
            id: req.query.id,
            id_post_user: req.user.id
        }
    })
    
    const encodeData = await this.EncodePosting(json)

    db.json_postings.update({
        encodeJSON: encodeData
    }, {
        where: {
            id_posting: req.query.id
        }
    })

    return res.status(201).json({ message: "Success edit Posts", statusCode: 201, data: req.query.id  })
}

exports.deletePosting = async (req,res) => {
    const checkPost = posts.findOne({
        where: {
            id: req.query.id,
            id_post_user: req.user.id
        }
    })

    if (!checkPost) return res.status(404).json({ message: "Nothing Posts in here", statusCode: 404 })
    
    posts.destroy({
        where: {
            id: req.query.id,
            id_post_user: req.user.id
        }
    })

    db.json_postings.destroy({
        where: {
            id_posting: req.query.id
        }
    })

    return res.status(201).json({ message: "Success delete Posts", statusCode: 201 })
}

exports.upload = (req,res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let image = req.files.image;
            let type = image.mimetype

            if (type == "image/png" || type == "image/jpg" || type == "image/jpeg") {
                //Use the mv() method to place the file in upload directory (i.e. "uploads")
                const buff = Buffer.from(req.user.id, 'utf-8');
                const base64 = buff.toString('base64');
                var dir = './uploads/'+base64+'/';

                if (!fs.existsSync(dir)){
                    fs.mkdirSync(dir);
                }
                
                image.mv(dir + image.name);

                //send response
                res.json({
                    "success" : 1,
                    "file": {
                        "url" : `http://localhost:8000/${base64}/${image.name}`,
                    }
                }).status(200);   
            } else {
                return res.json({
                    message: 'Only .png, .jpg and .jpeg format allowed!',
                    statusCode: 403
                }).status(403);
            }
        }
    } catch (err) {
        res.status(500).send(err);
    }
}