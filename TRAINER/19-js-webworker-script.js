var i = 0;
// Obwohl var-Variablen als Props zum globalen Objekt hinzugefügt werden,
// ist diese i Variable vom Objekt window nicht verfügbar

function timedCount() {
    i++;
    postMessage(i);  // postMessage gibt die Information an die Seite, die den Webworker verwendet, zurück
    setTimeout("timedCount()", 500); // 500 steht für das Intervall, in dem ausgeführt wird (500ms)
}

timedCount(); 