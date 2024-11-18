let { calculateNextExecutionTime } = require('./utils');
const moment = require('moment/moment');
const path = require("path");

// const nextExecutionTime = calculateNextExecutionTime(true);
// console.log(nextExecutionTime)
// console.log(moment().format('YYYY-MM-DD HH:mm:ss'), moment(nextExecutionTime).format('YYYY-MM-DD HH:mm:ss'));

console.log(path.resolve(__dirname,'./cookies1'))