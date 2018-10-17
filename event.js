var eventList = [];

exports.Event = class Event {
    constructor() {

    };

    addEventList(opening, recurring, startDate, endDate) {
        this.opening = opening;
        this.recurring = recurring;
        this.startDate = startDate;
        this.endDate = endDate;

        eventList.push(this);
    }
    returnEventList() {
        return eventList;
    }
    availabilities(fromDate, toDate) {
        let i = 0;
        eventList.forEach(element => {
            i++;
            console.log("Element n° " + i + " ===> ", element);
        });
    }
};

exports.Event;