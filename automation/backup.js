var CronJob = require('cron').CronJob;
const mysqldump = require('mysqldump')
const moment = require('moment')

var job = new CronJob('0 00 * * *', function() {
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
}, null, true, 'Asia/Jakarta');
job.start();