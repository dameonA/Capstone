const {isEqual, isAfter, isBefore} = require('date-fns')

module.exports.dateRangeIntersects = function dateRangeIntersects(date1start,date1end,date2start,date2end) {
    return (
         (isAfter(date1start,date2start) && isBefore(date1start,date2end)) ||  // Does date 1 start between date 2 start and end "2 1 1 2" "2 1 2 1"
         (isAfter(date2start,date1start) && isBefore(date2start,date1end)) // Does date 2 start between date 1 start and end "1,2,2,1" "1,2,1,2"
    )
}