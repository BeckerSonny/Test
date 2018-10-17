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
        allDatesAvailable = this.recoverAvalaibleDatesRecurring(openDatesRecurring, allDatesAvailable, fromDate, toDate);
        //allDatesAvailable = this.recoverAvalaibleDatesUniques(openDatesUniques, allDatesAvailable, fromDate, toDate);
        console.log('array ==> ', allDatesAvailable);
    }

    recoverAvalaibleDatesRecurring(array, arrayValidates, fromDate, toDate) {
        var addDays = 0;
        for(var key in array) {
            if(Number.isInteger(key / 2)) {
                var earlyWhile = array[key];
                var keyTmp = parseInt(key);
                while(earlyWhile <= array[keyTmp + 1]) {
                    var dayOfMonth = array[key].getDate();
                    while(new Date(array[key].setDate(dayOfMonth + addDays)) <= toDate) {
                        /* console.log("Test de relance ====================================== ", new Date(array[key].setDate(dayOfMonth + addDays)));
                        console.log("Key ===> ", key);
                        console.log("array key value => ", array[key]);
                        console.log("toDate key value => ", toDate); */
                        if (array[key] >= fromDate) {
                            console.log("ok");
                            arrayValidates.push(new Date(array[key].setDate(dayOfMonth + addDays)));
                        }
                        addDays += 7;
                    }
                    earlyWhile.setDate(earlyWhile.getDate() + 1);
                }
            }
        }
        return arrayValidates;
    }
    recoverAvalaibleDatesUniques(array, arrayValidates, fromDate, toDate) {
        for(var key in array) {
            if(Number.isInteger(key / 2)) {
                var earlyWhile = array[key];
                while(earlyWhile < array[key + 1]) {
                    if (array[key] >= fromDate && array[key] <= toDate) {
                        arrayValidates.push(array[key]);
                    }
                    i++;
                }
                earlyWhile.setDate(earlyWhile.getDate() + 1);
                }
        }
        return arrayValidates;
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