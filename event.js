var eventList = [];

exports.Event = class Event {
    constructor(opening, recurring, startDate, endDate) {
        this.opening = opening;
        this.recurring = recurring;
        this.startDate = startDate;
        this.endDate = endDate;

        eventList.push(this);
    }
    returnEventList() {
        //return eventList;
        return "This is evenList";
    }
    availabilities(fromDate, toDate) {
        console.log('First test ')
    }
};

exports.Event;