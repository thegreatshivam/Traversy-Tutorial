const fs = require('fs');
const moment = require('moment');

const logger = (req, res, next) => {
    fs.appendFile('./log.txt', `${req.protocol}://${req.get('host')}${req.originalUrl} : ${moment().format()}\n`, (err, data) => {});
    next();
};

module.exports = logger;