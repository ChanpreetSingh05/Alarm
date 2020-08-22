var set_time;
var hours;
var min, act_hours, act_min, ampm;

function AddZero(num) {
    return (num >= 0 && num < 10) ? "0" + num : num + "";
}

$(document).ready(function () {
    setInterval(fdate, 1000);
    hours();
    minutes();
    audio = document.getElementById("music");
    var alarmButton = document.getElementById("alarmbutton");
    alarmButton.addEventListener("click", alarm);
});

function check_alarm() {
    var curr_time = act_hours + ":" + act_min + " " + ampm;
    console.log(curr_time);
    console.log(set_time);
    if (set_time == curr_time) {

        audio.play();
        if (confirm("Wake UP! Its Your Alarm")) {
            audio.pause();
            audio.currentTime = 0;
            set_time=undefined;
        } else {
            set_time=undefined;
        }
    } else {

    }

}

function alarm() {

    if (document.getElementById("wakeUpTimeSelector").value.toString().length < 2 || document.getElementById("MinuteSelector").value.toString().length < 2) {
        if (document.getElementById("wakeUpTimeSelector").value.toString().length < 2) {
            hours = "0" + document.getElementById("wakeUpTimeSelector").value;
        } else {
            hours = document.getElementById("wakeUpTimeSelector").value;
        }

        if (document.getElementById("MinuteSelector").value.toString().length < 2) {
            min = "0" + document.getElementById("MinuteSelector").value;
        } else {
            min = document.getElementById("MinuteSelector").value;
        }
        var shw_time = hours + ":" + min + " " + document.getElementById("AMPM").value;
    } else {
        set_time = document.getElementById("wakeUpTimeSelector").value + ":" + document.getElementById("MinuteSelector").value + " " + document.getElementById("AMPM").value;
    }
    set_time = document.getElementById("wakeUpTimeSelector").value + ":" + document.getElementById("MinuteSelector").value + " " + document.getElementById("AMPM").value;
    var label = document.getElementById("alarm_label");
    label.innerHTML = "Alarm set for " + shw_time;
};

function hours() {
    for (var i = 1; i <= 12; i++) {
        var sel = document.getElementById("wakeUpTimeSelector");
        var opt = document.createElement('option');

        if (i.toString().length < 2) {
            // create text node to add to option element (opt)
            opt.appendChild(document.createTextNode("0" + i));
        } else {
            // create text node to add to option element (opt)
            opt.appendChild(document.createTextNode(i));
        }

        // set value property of opt
        opt.value = i;

        // add opt to end of select box (sel)
        sel.appendChild(opt);
    }
}

function minutes() {
    for (var i = 0; i < 60; i++) {
        var sel = document.getElementById("MinuteSelector");
        var opt = document.createElement('option');

        if (i.toString().length < 2) {
            // create text node to add to option element (opt)
            opt.appendChild(document.createTextNode("0" + i));
        } else {
            // create text node to add to option element (opt)
            opt.appendChild(document.createTextNode(i));

        }
        // set value property of opt
        opt.value = i;

        // add opt to end of select box (sel)
        sel.appendChild(opt);
    }
}

function fdate() {
    var now = new Date();
    act_hours = now.getHours() % 12 || 12;
    act_min = now.getMinutes();
    var week = ["MON", "TUES", "WED", "THURS", "FRI", "SAT", "SUN"];
    var strdate = AddZero(now.getFullYear()) + " - " + AddZero(now.getMonth()) + " - " + AddZero(now.getDate());

    var strtime = AddZero(act_hours) + " : " + AddZero(act_min) + " : " + AddZero(now.getSeconds());
    ampm = now.getHours() >= 12 ? "PM" : "AM";

    change_img();

    document.getElementById("date").innerHTML = strdate + "  " + week[now.getDay()];
    document.getElementById("time").innerHTML = strtime + " " + ampm;

    check_alarm();
}

function change_img() {
    var now = new Date();
    if (now.getHours() >= 6 && now.getHours() <= 11) {
        $("body").css({
            "background-image": 'url(./Images/Morning.jpg)'
        });
    } else if (now.getHours() >= 12 && now.getHours() <= 15) {
        $("body").css({
            "background-image": 'url(./Images/afternoon.jpg)'
        });
    } else if (now.getHours() >= 16 && now.getHours() <= 18) {
        $("body").css({
            "background-image": 'url(./Images/evening.jpg)'
        });
    } else {
        $("body").css({
            "background-image": 'url(./Images/night.jpg)'
        });
    }
}
