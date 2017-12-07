'use strict';

var cfg = require('../../config.json');

// get the Euclidean distance between the edges of two shapes
exports.getDistance = function (p1, p2) {
    var xx = p2.x - p1.x;
    var yy = p2.y - p1.y;
    return Math.sqrt(xx*xx + yy*yy);
};

exports.validNick = function(nickname) {
    var regex = /^\w*$/;
    return regex.exec(nickname) !== null;
};

exports.randomInRange = function (from, to) {
    return Math.floor(Math.random() * (to - from)) + from;
};

/* generates a random position within the field of play
   radius - radius of the circular collision of the player
   borderRadius - radius of the playing field
*/
exports.randomPosition = function (radius,borderRadius) {
    var x,y;
    
    do{
        x = exports.randomInRange(-borderRadius/2+radius, borderRadius/2 - radius);
        y = exports.randomInRange(-borderRadius/2+radius, borderRadius/2 - radius);
    }while(x*x + y*y > borderRadius*borderRadius);
    
    return {
        x:x,
        y:y
    };
};

/* generates a random position within the field of play
   points - number of players
   radius - radius of the circular collision of the player
   borderRadius - radius of the playing field
*/
exports.uniformPosition = function(points,radius,borderRadius) {
    var bestCandidate, maxDistance = 0;
    var numberOfCandidates = 10;

    //first point - can be anywhere
    if (points.length === 0) {
        return exports.randomPosition(radius,borderRadius);
    }

    // Generate the candidates
    for (var ci = 0; ci < numberOfCandidates; ++ci) {
        var minDistance = Infinity;
        var candidate = exports.randomPosition(radius,borderRadius);
        candidate.radius = radius;

        for (var pi = 0; pi < points.length; ++pi) {
            var distance = exports.getDistance(candidate, points[pi]);
            if (distance < minDistance) {
                minDistance = distance;
            }
        }

        if (minDistance > maxDistance) {
            bestCandidate = candidate;
            maxDistance = minDistance;
        } else {
            return exports.randomPosition(radius,borderRadius);
        }
    }

    return bestCandidate;
};


/*finds the index of object with certain id*/
exports.findIndex = function(arr, id) {
    var len = arr.length;

    while (len--) {
        if (arr[len].id === id) {
            return len;
        }
    }

    return -1;
};

/*generates a random color in for '#xxxxxx' */
exports.randomColor = function() {
    var color = '#' + ('00000' + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6);
    var c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    var r = (parseInt(c[1], 16) - 32) > 0 ? (parseInt(c[1], 16) - 32) : 0;
    var g = (parseInt(c[2], 16) - 32) > 0 ? (parseInt(c[2], 16) - 32) : 0;
    var b = (parseInt(c[3], 16) - 32) > 0 ? (parseInt(c[3], 16) - 32) : 0;

    return {
        fill: color,
        border: '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
    };
};
