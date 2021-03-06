// ---------------------------------------------------------------

var timerUI = 0;

$(document).ready(function() {
    fixLegend();
    applyFilter();
});

// ---------------------------------------------------------------

function queueUIRefresh() {
    if (timerUI != 0) {
	clearTimeout(timerUI);
    }
    timerUI = setTimeout(function() {
	    applyUI();
    }, 10000);
                                                                                                        
}

function applyFilter() {
    logsFilterRefresh();
    applyData();
}

function applyData() {
    logsRefresh();
    applyUI();
}

function applyUI() {
    queueUIRefresh();
    logsRefreshTimestamps();
    drawMap();
}

// ---------------------------------------------------------------

function mapSystemClicked(name) {
    if ($.inArray(name, logsFilterSystems) != -1) {
	logsFilterSystemRemove(name);
	applyFilter();
	return;
    }

    switch (settingsGet('s-map-action-select-filter')) {
	case '0':
	    logsFilterSystemAdd(name);
	    break;
	case '1':
	    logsFilterSystemReplace(name);
	    break;
    }

    switch (settingsGet('s-map-action-select-unknown')) {
	case '0':
	    break;
	case '1':
	    logsFilterUnknownsSet(false);
	    break;
	case '2':
	    logsFilterUnknownsSet(true);
	    break;
    }

    applyFilter();
}

function logsSystemsClicked(names) {
    switch (settingsGet('s-logs-action-select-filter')) {
	case '0':
	    logsFilterSystemsAdd(names);
	    break;
	case '1':
	    logsFilterSystemsReplace(names);
	    break;
    }

    switch (settingsGet('s-logs-action-select-unknown')) {
	case '0':
	    break;
	case '1':
	    logsFilterUnknownsSet(false);
	    break;
	case '2':
	    logsFilterUnknownsSet(true);
	    break;
    }

    applyFilter();
}

// ---------------------------------------------------------------

function timestampToAgo(timestamp) {
    var diff = (new Date().getTime() - timestamp) / 1000 / 60;
    if (diff < 0.5) {
	return 'new';
    }
    return Math.ceil(diff) + 'm';
}

// ---------------------------------------------------------------

function timestampToColor(timestamp) {
    var diff = Math.ceil((new Date().getTime() - timestamp) / 1000 / 60);
    if (diff < 2) {
	return "#ff0000";
    }
    if (diff < 5) {
	return "#ff6d00";
    }
    if (diff < 10) {
	return "#efef00";
    }
    if (diff < 15) {
	return "#b8a62e";
    }
    if (diff < 20) {
	return "#615718";
    }
    return false;
}

function connectionToColor(gate) {
    if (gate == "j") {
	return "#4c4c4c";
    }
    if (gate == "jc") {
	return "#7c0000";
    }
    if (gate == "jr") {
	return "#7c047b";
    }
    if (gate == "jb") {
	return "#0d0d78";
    }

}

function systemToColor() {
    return "#6d6d6d";
}

function nameToColor() {
    return "#aaaaaa";
}

function fixLegend() {
    $("#legend-less2").css('color', timestampToColor(new Date().getTime() - (1000 * 60 * 1)));
    $("#legend-less5").css('color', timestampToColor(new Date().getTime() - (1000 * 60 * 4)));
    $("#legend-less10").css('color', timestampToColor(new Date().getTime() - (1000 * 60 * 9)));
    $("#legend-less15").css('color', timestampToColor(new Date().getTime() - (1000 * 60 * 14)));
    $("#legend-less20").css('color', timestampToColor(new Date().getTime() - (1000 * 60 * 19)));

    $("#legend-j").css('color', connectionToColor('j'));
    $("#legend-jc").css('color', connectionToColor('jc'));
    $("#legend-jr").css('color', connectionToColor('jr'));
    $("#legend-jb").css('color', connectionToColor('jb'));

    $("#legend-system").css('color', systemToColor());
    $("#legend-system-station").css('color', systemToColor());
}

// ---------------------------------------------------------------

function blink(id) {
    h = 400;
    l = 600;
    $('#' + id)
	.animate({opacity: 1}, 400)
	.animate({opacity: 0.2}, 600)
	.animate({opacity: 1}, 400)
	.animate({opacity: 0.2}, 600)
	.animate({opacity: 1}, 400)
	.animate({opacity: 0.2}, 600)
	.animate({opacity: 1}, 400)
	.animate({opacity: 0}, 600);
}

// ---------------------------------------------------------------
