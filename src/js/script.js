'use strict'

var weekDays = {
    1: 'Понедельник',
    2: 'Вторник',
    3: 'Среда',
    4: 'Четверг',
    5: 'Пятница',
    6: 'Суббота',
    0: 'Воскресенье'
}

var monthsOfTheYear={
    0: 'Январь',
    1: 'Февраль',
    2: 'Март',
    3: 'Апрель',
    4: 'Май',
    5: 'Июнь',
    6: 'Июль',
    7: 'Август',
    8: 'Сентябрь',
    9: 'Октябрь',
    10: 'Ноябрь',
    11: 'Декабрь'
}


var thisMonth = 0;

window.onload = function() {
    fillCalendar((new Date()).getMonth());
}

window.showNextMonth = function(){
    let newDate = new Date((new Date()).getYear(), thisMonth + 1, 1);
    document.getElementsByClassName('month-year')['0'].innerHTML = ' ' +  monthsOfTheYear['' + newDate.getMonth()] + ' ' + newDate.getFullYear();
    fillCalendar(thisMonth + 1);
}

window.showPrevMonth = function(){
    let newDate = new Date((new Date()).getYear(), thisMonth - 1, 1);
    document.getElementsByClassName('month-year')['0'].innerHTML =  ' ' +  monthsOfTheYear['' + newDate.getMonth()]+ ' ' + newDate.getFullYear();
    fillCalendar(thisMonth - 1);
}

window.fillCalendar = function(month){
    var calendar = document.createElement('div');
    calendar.classList.add('app-content');
    calendar.setAttribute('id', 'calendar');
    
    let date = new Date();
    thisMonth = month;
    var thisYear = date.getFullYear();
    let thisDay = date.getDate();
    document.getElementsByClassName('month-year')['0'].innerHTML = ' ' +  monthsOfTheYear['' + thisMonth] + ' ' + thisYear;
    var daysCount = 28;
    while(thisMonth == (new Date(thisYear, thisMonth,daysCount)).getMonth()){
        daysCount++;
    }
    
    let anotherMonthsDays = (7 + (new Date(thisYear, thisMonth, 1)).getDay() - 1)% 7;
    daysCount += 7 - daysCount % 7 - anotherMonthsDays + 1;
    for(let i = 1 - anotherMonthsDays; i < daysCount; i++){
        let newElem = createCeil(new Date(thisYear, thisMonth, i), calendar.childElementCount);
        if(i > 0){
            newElem.classList.add('active-ceil');
        }
        calendar.appendChild(newElem);
    }
    let calendarInHtml = document.getElementById('calendar')
    if(calendarInHtml){
        calendarInHtml.parentNode.removeChild(calendarInHtml);
    }
    document.getElementsByClassName('app-container')['0'].appendChild(calendar);
}

window.createCeil = function(day, calendarLength){
    let newElem = document.createElement('div');
    newElem.classList.add('calendar-ceil');
    let text = '';
    if(calendarLength < 7){
        newElem.innerHTML += weekDays['' + day.getDay()] + ', ';
    }
    newElem.innerHTML += '<span>' + day.getDate() + '</span>';
    return newElem;
}