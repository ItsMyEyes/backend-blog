var CronJob = require('cron').CronJob;
const mysqldump = require('mysqldump')
const moment = require('moment')
const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
//client id
const CLIENT_ID = 'CLIENT_ID'
const CLIENT_SECRET = 'CLIENT_SECRET';
const REDIRECT_URI = 'REDIRECT_URI';
const REFRESH_TOKEN = 'REFRESH_TOKEN'
const access_TOKEN = 'access_TOKEN'
const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN, access_token: access_TOKEN });
const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
});

exports.job = new CronJob('0 00 * * *', function() {
    mysqldump({
        connection: {
            host: 'HOST',
            user: 'USER',
            password: 'PASSWORD',
            database: 'DATABASE',
            port: 'PORT',
        },
        dumpToFile: `./backup/backup-${moment().format('MMM-Do-YY')}.sql`,
    });
    console.log('Done Backup to local...')
    const tempat = path.resolve(`./backup/backup-${moment().format('MMM-Do-YY')}.sql`)
    try{
      drive.files.create({
            requestBody: {
                name: `backup-${moment().format('MMM-Do-YY')}.sql`, //file name
                mimeType: 'application/sql',
            },
            media: {
                mimeType: 'application/sql',
                body: fs.createReadStream(tempat),
            },
        });  
        console.log('Done Backup to cloud...')
    }catch (error) {
        console.log(error.message);
    }
}, null, true, 'Asia/Jakarta');