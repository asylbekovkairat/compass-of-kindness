function getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
}

function getScheduleWeekMonday() {
    let d = new Date();
    let day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    d.setDate(diff);
    return d.toISOString().slice(0, 10);
}
function getScheduleWeekSunday() {
    let d = new Date();
    let day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? 0 : 7); // adjust when day is sunday
    d.setDate(diff);
    return d.toISOString().slice(0, 10);
}

module.exports = {
    getMonday,
    getScheduleWeekMonday,
    getScheduleWeekSunday,
};