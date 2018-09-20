const moment = require('moment');


/**
 * Group.schedule -> to moment
 * @example
 *     group.schedule.find(s =>
 *         moment().isBetween(scheduleToMoment(s, 'startAt'), scheduleToMoment(s, 'endAt')));
 */

const scheduleToMoment = (schedule, startOrEnd) =>
  moment()
    .day(schedule.day)
    .hour(moment(schedule[startOrEnd]).hour())
    .minute(moment(schedule[startOrEnd]).minute());

module.exports = { scheduleToMoment };