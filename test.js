let { calculateNextExecutionTime } = require('./utils');
const moment = require('moment/moment');

const nextExecutionTime = calculateNextExecutionTime(true);
console.log(nextExecutionTime)
console.log(moment().format('YYYY-MM-DD HH:mm:ss'), moment(nextExecutionTime).format('YYYY-MM-DD HH:mm:ss'));
