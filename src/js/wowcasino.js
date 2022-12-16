/**
 * A-WoW.
 */

$(document).ready(function () {
    fadeOutNavBar();
    lastVisit();
});

function lastVisit() {

    //Set Last Time Visit
    var lastDate = new Date(parseInt(localStorage.getItem('time'))).toString().substr(3,22);;
    document.getElementById("lastVisit").innerHTML = lastDate;

    //Set Current Time Visit
    localStorage.setItem('time', +new Date());
    var setDate = new Date();
    var date = new Date(parseInt(localStorage.getItem('time'))).toString().substr(3,22);
    document.getElementById("currentVisit").innerHTML = date;
}

function fadeOutNavBar() {
    $('.navbar').hover(function () {
        $('.navbar').fadeIn('slow');
    });
}

function logOut() {
    window.location.href = "index.html";
}
