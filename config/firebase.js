const admin = require('firebase-admin')
const secret = require('./blog.json')
const uuid = require('uuid-v4');

admin.initializeApp({
    credential: admin.credential.cert(secret),
    storageBucket: 'blog-3fde7.appspot.com'
})

module.exports.bucket = admin.storage().bucket()
module.exports.uid = uuid()