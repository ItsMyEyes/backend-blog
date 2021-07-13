var CronJob = require('cron').CronJob;
const mysqldump = require('mysqldump')
const moment = require('moment')
const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
//client id
const CLIENT_ID = '50840867934-f2133p1oabpmk8nhg5fkhpj5iggco51h.apps.googleusercontent.com'
const CLIENT_SECRET = 'lpPQ_Sez2STgDUB8bUyTJkq1';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04qmEwf9h7t_ZCgYIARAAGAQSNwF-L9IrK65u2zjzD5xRnU0bXwL9ix5iN1CqBa6uG-N-PfVRSnYueLSLVre53bv4PdTY7gBzTe4'
const access_TOKEN = 'ya29.a0ARrdaM8cUdEJx69NvI2FqroFY01W7rwGUP6gAhHpjbu_P2ULSjcbvrYAWLsIof5BUzHllKP0tMe8EGHdBCKoE_3e3ZsPsy4R-jpX8bpkwzba_P85NInsMiyJEZ5zXm1TTvO0WzUDgaISn99-yiNotVY3OjE4'
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

var job = new CronJob('* * * * *', function() {
    mysqldump({
        connection: {
            host: 'localhost',
            user: 'root',
            password: 'jeruk',
            database: 'blog',
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
job.start();