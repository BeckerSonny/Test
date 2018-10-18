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
                openDatesRecurring.push(new Date(startDate.setHours(startDate.getHours())), new Date(endDate.setHours(endDate.getHours())));
            } else {
                openDatesUniques.push(new Date(startDate.setHours(startDate.getHours())), new Date(endDate.setHours(endDate.getHours())));
            }
        } else {
            if (recurring === true) {
                closeDatesRecurring.push(new Date(startDate.setHours(startDate.getHours())), new Date(endDate.setHours(endDate.getHours())));
            } else {
                closeDatesUniques.push(new Date(startDate.setHours(startDate.getHours())), new Date(endDate.setHours(endDate.getHours())));
            }
        }
    }

    returnEventList() {
        return eventList;
    }

    availabilities(fromDate, toDate) {
        fromDate = new Date(fromDate.setHours(fromDate.getHours() + 2));
        toDate = new Date(toDate.setHours(toDate.getHours() + 2));
        allDatesAvailable = this.recoverAvalaibleDatesRecurring(openDatesRecurring, allDatesAvailable, fromDate, toDate);
        allDatesAvailable = this.recoverAvalaibleDatesUniques(openDatesUniques, allDatesAvailable, fromDate, toDate);
        // console.log('Validates array before delete => ', allDatesAvailable);
        allDatesAvailable = this.removeInavailableDatesRecuring(closeDatesRecurring, allDatesAvailable, toDate);
        allDatesAvailable = this.removeInavailableDatesUniques(closeDatesUniques, allDatesAvailable);
        // console.log('Validates array after delete => ', allDatesAvailable);
        this.createSentence(allDatesAvailable);
    }

    recoverAvalaibleDatesRecurring(array, arrayValidates, fromDate, toDate) {
        var addDays = 0;
        for(var key in array) {
            var earlyWhile = array[key];
            var keyTmp = parseInt(key);
            while(earlyWhile <= array[keyTmp + 1]) {
                var dayOfMonth = array[key].getDate();
                    if (new Date(array[key].setDate(dayOfMonth + addDays)) >= fromDate && new Date(array[key].setDate(dayOfMonth + addDays)) <= toDate) {
                        arrayValidates.push(
                            new Date(array[key].setDate(dayOfMonth + addDays)),
                            new Date(array[keyTmp + 1].setDate(dayOfMonth + addDays))
                        );
                    }
                    addDays += 7;
                }
                earlyWhile.setDate(earlyWhile.getDate() + 1);
            }
        return arrayValidates;
    }

    recoverAvalaibleDatesUniques(array, arrayValidates, fromDate, toDate) {
        for(var key in array) {
            if(Number.isInteger(key / 2)) {
                var earlyWhile = array[key];
                var keyTmp = parseInt(key);
                while(earlyWhile <= array[keyTmp + 1]) {
                    if (array[key] >= fromDate && array[key] <= toDate) {
                        arrayValidates.push(array[key]);
                    }
                    earlyWhile.setDate(earlyWhile.getDate() + 1);
                }
            } else if (array[key] <= toDate && array[key] >= fromDate) {
                arrayValidates.push(new Date(array[key]));
            }
        }
        return arrayValidates;
    }

    removeInavailableDatesRecuring(array, arrayValidates, toDate) {
        var addDays = 0;
        for(var key in arrayValidates) {
            if(Number.isInteger(key / 2)) {
                var keyTmp = parseInt(key);
                for(var keyToDelete in array) {
                    if (Number.isInteger(keyToDelete / 2)) {
                        while(new Date(array[keyToDelete].setDate(array[keyToDelete].getDate() + addDays)) <= toDate) {
                            let newDate = new Date(array[keyToDelete].setDate(array[keyToDelete].getDate() + addDays));
                            if (arrayValidates[key].getDate() == newDate.getDate() &&
                            arrayValidates[key].getMonth() == newDate.getMonth() &&
                            arrayValidates[key].getYear() == newDate.getYear()) {
                                if (newDate.getHours() >= arrayValidates[key].getHours()) {
                                    let keyToDeleteTmp = parseInt(keyToDelete);
                                    arrayValidates.splice(key + 1, 0,
                                        new Date(newDate.setMinutes(array[keyToDeleteTmp].getMinutes() - 30)),
                                        new Date(array[keyToDelete].setMinutes(array[keyToDelete].getMinutes() + 90))
                                    );
                                }
                            }
                            addDays += 7;
                        }
                    }
                }
            }
        }
        //console.log('End recuring remove ===> ', arrayValidates);
        return arrayValidates;
    }

    removeInavailableDatesUniques(array, arrayValidates) {
        /* console.log('ArrayValidates ==> ', arrayValidates);
        console.log('\n');
        console.log('arrayToDelete ==> ', array); */
        for(var key in arrayValidates) {
            if(Number.isInteger(key / 2)) {
                let keyTmp = parseInt(key);
                for(var keyToDelete in array) {
                    if(Number.isInteger(keyToDelete / 2)) {
                        if (arrayValidates[key].getDate() == array[keyToDelete].getDate() &&
                        arrayValidates[key].getMonth() == array[keyToDelete].getMonth() &&
                        arrayValidates[key].getYear() == array[keyToDelete].getYear()) {
                            if (array[keyToDelete].getHours() >= arrayValidates[key].getHours()) {
                                let keyToDeleteTmp = parseInt(keyToDelete);
                                arrayValidates.splice(
                                    key + 1,
                                    0,
                                    new Date(array[keyToDelete].setMinutes(array[keyToDelete].getMinutes() - 30)),
                                    new Date(array[keyToDelete].setMinutes(array[keyToDelete].getMinutes() + 90))
                                );
                            }
                        }
                    }
                }
            }
        }
        return arrayValidates;
    }

    createSentence(array) {
        var sentence = "We are are available"
        for(var key in array) {
            var keyTmp = parseInt(key);
            let MinutesEarly = array[key].getMinutes();;
            if (MinutesEarly == 0) {
                MinutesEarly += "0";
            }
            if (array[keyTmp + 1] != undefined) {
                var MinutesEnd = array[keyTmp + 1].getMinutes();
                if (MinutesEnd == 0) {
                    MinutesEnd += "0";
                }
            }
            if (Number.isInteger(key / 2)) {
                sentence += " the " + array[key].getDate() + "/" + array[key].getMonth() + "/" + array[key].getFullYear() + " from " + array[key].getHours() + ":" + MinutesEarly + " to " + array[keyTmp + 1].getHours() + ":" + MinutesEnd;
                if (array[keyTmp + 2] != undefined) {
                    sentence += " and";
                } else {
                    sentence += ".";
                }
            }
        }
        console.log(sentence);
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