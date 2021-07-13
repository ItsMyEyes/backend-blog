const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'free-server2.elanzahost.com',
    port: 587,
    auth: {
        user: 'kiyorade@kiyora-dev.xyz',
        pass: 'airforce407'
    }
});

// send email
transporter.sendMail({
    from: 'no-reply@kiyora-dev.xyz',
    to: 'manusiayangsempurna762@gmail.com',
    subject: 'Test Email Subject',
    html: '<h1>Example HTML Message Body</h1>'
});