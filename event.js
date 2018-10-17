var eventList = [];
var openDatesRecurring = [];
var openDatesUniques = [];
var closeDatesRecurring = [];
var closeDatesUniques = [];

exports.Event = class Event {
    constructor() {

    };

    addEventList(opening, recurring, startDate, endDate) {
        /* this.opening = opening;
        this.recurring = recurring;
        this.startDate = startDate;
        this.endDate = endDate;

        eventList.push(this); */
        if (opening === true) {
            if (recurring === true) {
                openDatesRecurring.push(startDate);
                openDatesRecurring.push(endDate);
            } else {
                openDatesUniques.push(startDate);
                openDatesUniques.push(endDate);
            }
        } else {
            if (recurring === true) {
                closeDatesRecurring.push(startDate);
                closeDatesRecurring.push(endDate);
            } else {
                closeDatesUniques.push(startDate);
                closeDatesUniques.push(endDate);
            }
        }
    }
    returnEventList() {
        return eventList;
    }
    availabilities(fromDate, toDate) {
        var sentence = "We are available ";
        var i = 0;
        openDatesRecurring.forEach(element => {
            console.log("element ===> ", element);
            if(Number.isInteger(i /2)) {
                if (i != 0 && i != openDatesRecurring.length - 1) {
                    sentence += ", "  
                } else if (i == 0) {
                    sentence += "every "; 
                }
                i++;
                console.log("i ==> " + i, "sentence ==> ", sentence);
                sentence += this.recoverDay(element);
            } else {
                
            }
        });
        console.log(sentence);
    }
    recoverDay(date) {
        switch (date.getDay()) {
            case 0:
                return "Monday";
                break;
            case 1:
                return "Tuesday";
                break;
            case 2:
                return "Wednesday";
                break
            case 3:
                return "Thursday";
                break
            case 4:
                return "Friday";
                break
            case 5:
                return "Saturday";
                break
            case 6:
                return "Sunday";
                break
            default:
                break;
        }
    }
};

exports.Event;