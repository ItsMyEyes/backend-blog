const request = require('request')
const cheerio = require('cheerio')

exports.browser = (req,res) => {
    if (!req.query.url) return res.json({ message: 'Not valid url' }).status(402)
    request(req.query.url, (err, response, html) => {
        if (!html) return res.json({ message: 'Not valid url' }).status(402)
        const $ = cheerio.load(html)
        const tile = ($('meta[property=og:title]').length > 0) ? $('meta[property=og:title]')[0].attribs['content'] : $('title').text()
        const desc = ($('meta[name=description]').length > 0) ? $('meta[name=description]')[0].attribs['content'] : $('meta[property=og:description]')[0].attribs['content']
        const img = $('meta[property=og:image]')[0].attribs['content']
        res.json({
            success: 1,
            meta: {
                title: tile,
                description: desc,
                image: {
                    url: img
                }
            }
        }).status(200)
    })
}