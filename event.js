var openDatesRecurring = [];
var openDatesUniques = [];
var closeDatesRecurring = [];
var closeDatesUniques = [];
var allDatesAvailable = [];

exports.Event = class Event {
    constructor() {

    };

    addEventList(opening, recurring, startDate, endDate) {
        if (opening === true) {
            if (recurring === true) {
                openDatesRecurring.push(new Date(startDate), new Date(endDate));
            } else {
                openDatesUniques.push(new Date(startDate), new Date(endDate));
            }
        } else {
            if (recurring === true) {
                closeDatesRecurring.push(new Date(startDate), new Date(endDate));
            } else {
                closeDatesUniques.push(new Date(startDate), new Date(endDate));
            }
        }
    }

    returnEventList() {
        return eventList;
    }

    availabilities(fromDate, toDate) {
        allDatesAvailable = this.recoverAvalaibleDatesRecurring(openDatesRecurring, allDatesAvailable, fromDate, toDate);
        allDatesAvailable = this.recoverAvalaibleDatesUniques(openDatesUniques, allDatesAvailable, fromDate, toDate);
        allDatesAvailable = this.removeInavailableDatesRecuring(closeDatesRecurring, allDatesAvailable, toDate);
        allDatesAvailable = this.removeInavailableDatesUniques(closeDatesUniques, allDatesAvailable);
        this.createSentence(allDatesAvailable);
    }

    recoverAvalaibleDatesRecurring(array, arrayValidates, fromDate, toDate) {
        let addDays = 0;
        for(let key in array) {
            let earlyWhile = array[key];
            let keyTmp = parseInt(key);
            while(earlyWhile <= array[keyTmp + 1]) {
                let dayOfMonth = array[key].getDate();
                    if (new Date(array[key].setDate(dayOfMonth + addDays)) >= fromDate && new Date(array[key].setDate(dayOfMonth + addDays)) <= toDate){
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
        for(let key in array) {
            if(Number.isInteger(key / 2)) {
                let earlyWhile = array[key];
                let keyTmp = parseInt(key);
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
        let addDays = 0;
        for(let key in arrayValidates) {
            if(Number.isInteger(key / 2)) {
                let keyTmp = parseInt(key);
                for(let keyToDelete in array) {
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
                                        new Date(array[keyToDelete].setMinutes(array[keyToDelete].getMinutes() + 60))
                                    );
                                }
                            }
                            addDays += 7;
                        }
                    }
                }
            }
        }
        return arrayValidates;
    }

    removeInavailableDatesUniques(array, arrayValidates) {
        for(let key in arrayValidates) {
            if(Number.isInteger(key / 2)) {
                let keyTmp = parseInt(key);
                for(let keyToDelete in array) {
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
        let sentence = "We are available :";
        for(let key in array) {
            let keyTmp = parseInt(key);
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
                if (array[keyTmp - 1] != undefined &&
                array[keyTmp - 1].getDate() == array[key].getDate() &&
                array[keyTmp - 1].getMonth() == array[key].getMonth()) {
                    sentence += " and" 
                } else {
                    sentence += "\nThe " + array[key].getDate() + "/" + array[key].getMonth() + "/" + array[key].getFullYear();
                }
                sentence  += " from " + array[key].getHours() + ":" + MinutesEarly + " to " + array[keyTmp + 1].getHours() + ":" + MinutesEnd;
                if (array[keyTmp + 2] == undefined) {
                    sentence += ".";
                }
            }
        }
        console.log(sentence);
    }
};

exports.Event;