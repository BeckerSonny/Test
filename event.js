var eventList = [];
var openDatesRecurring = [];
var openDatesUniques = [];
var closeDatesRecurring = [];
var closeDatesUniques = [];
var allDatesAvailable = [];

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
        var i = 0;
        var addDays = 7;
        for(var key in openDatesRecurring) {
            if(Number.isInteger(key / 2)) {
                var earlyWhile = openDatesRecurring[key];
                while(openDatesRecurring[key] < openDatesRecurring[key + 1]) {
                    var dayOfMonth = openDatesRecurring[key].getDate();
                    while(openDatesRecurring[key].setDate(dayOfMonth + addDays) <= toDate) {
                        if (openDatesRecurring[key] >= fromDate && Number.isInteger(i / 2)) {
                            allDatesAvailable.push(openDatesRecurring[key].setDate(dayOfMonth + addDays));
                        }
                        i++;
                        addDays += 7;
                    }
                    earlyWhile.setDate(earlyWhile.getDate() + 1);
                }
            }
        }
        console.log('array ==> ', allDatesAvailable);
    }
            /* console.log("element ===> ", element);
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

            } */
/*             if (Number.isInteger(i /2)) {
                var startDate = false;
                if (element < toDate) {
                    startDate = true;
                }
            } else {
                var endDate = false;
                if (element > fromDate) {
                    endDate = true;
                }
            }
            if (startDate || endDate) {
                console.log(this.DateRendezVous(fromDate, toDate));
            }
            i++;
        });
        console.log(sentence);
    }
        DateRendezVous() {
            
        } */
/*     recoverDay(date) {
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
    } */
};

///récupérer dates dispo
///bouclé sur date début date de fin
///récuper les date qui correspondent
///vérifier heures

exports.Event;