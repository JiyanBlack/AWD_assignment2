var mainDom = {
    "timeSpan": document.getElementById("time-span"),
}

function startRun() {
    RunAndSetInterval(setCurrentTime, 1000);
}

function RunAndSetInterval(func, timeInterval) {
    func();
    setInterval(func, timeInterval);
}

function setCurrentTime() {
    var now = new Date();
    mainDom.timeSpan.innerHTML = now.toTimeString();
}

startRun()
