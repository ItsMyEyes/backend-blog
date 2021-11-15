const web = require('./index');
const image = require('./image')
const backup = require('./automation/backup')
// Setting port
let port = process.env.PORT || 8000

// Webserver
web.listen(port, () => console.log(`app listening on ${port}`));

// Image server
image.listen(port+1, () => console.log(`app listening on ${port+1}`));

// Start cronjob automation backup
backup.job.start();