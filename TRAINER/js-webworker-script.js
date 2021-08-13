var i = 0;

function timedCount() {
    i++;
    postMessage(i);  // postMessage gibt die Information an die Seite, die den Webworker verwendet, zurück
    setTimeout("timedCount()", 500); // missverständliche Funktion - das 500 steht für das Intervall, in dem ausgeführt wird (500ms)
}

timedCount(); 