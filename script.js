window.addEventListener("DOMContentLoaded", e => {
    lightsEle.leftBlue = document.querySelectorAll(".leftBlue");
    lightsEle.leftWhite = document.querySelectorAll(".leftWhite");
    lightsEle.centreBlue = document.querySelectorAll(".centreBlue");
    lightsEle.rightWhite = document.querySelectorAll(".rightWhite");
    lightsEle.rightBlue = document.querySelectorAll(".rightBlue");

    sirenEle.wail = document.querySelector("#wail-siren");
    sirenEle.yelp = document.querySelector("#yelp-siren");
    sirenEle.hyperyelp = document.querySelector("#hyperyelp-siren");
    sirenAudio.wail = document.querySelector("#wail-audio");
    sirenAudio.yelp = document.querySelector("#yelp-audio");
    sirenAudio.hyperyelp = document.querySelector("#hyperyelp-audio");
    sirenAudio.horn = document.querySelector("#horn-audio");
    sirenAudio.horn2 = document.querySelector("#horn2-audio");

})

var sirenNum = 0;
var sirenEle = {
    "wail": null,
    "yelp": null,
    "hyperyelp": null,
};
var sirenAudio = {
    "wail": null,
    "yelp": null,
    "hyperyelp": null,
    "horn": null,
    "horn2": null
};

var state = {
    "999": false,
    "lights": false,
    "wailSiren": false,
    "yelpSiren": false,
    "hyperSiren": false,
    "sirensLoaded": false
};

var lightsInterval;
var lightsEle = {
    "leftBlue": null,
    "leftWhite": null,
    "centreBlue": null,
    "rightWhite": null,
    "rightBlue": null
};
var lightsIndex = 0;

const lightPattern = [
    {
        "leftBlue": true,
        "leftWhite": false,
        "centreBlue": true,
        "rightWhite": true,
        "rightBlue": false
    }, {
        "leftBlue": false,
        "leftWhite": false,
        "centreBlue": true,
        "rightWhite": true,
        "rightBlue": false
    }, {
        "leftBlue": true,
        "leftWhite": false,
        "centreBlue": true,
        "rightWhite": true,
        "rightBlue": false
    }, {
        "leftBlue": false,
        "leftWhite": false,
        "centreBlue": true,
        "rightWhite": true,
        "rightBlue": false
    }, {
        "leftBlue": false,
        "leftWhite": true,
        "centreBlue": true,
        "rightWhite": false,
        "rightBlue": true
    }, {
        "leftBlue": false,
        "leftWhite": true,
        "centreBlue": true,
        "rightWhite": false,
        "rightBlue": false
    }, {
        "leftBlue": false,
        "leftWhite": true,
        "centreBlue": true,
        "rightWhite": false,
        "rightBlue": true
    }, {
        "leftBlue": false,
        "leftWhite": true,
        "centreBlue": true,
        "rightWhite": false,
        "rightBlue": false
    }
];

function nextLight() {
    let newState = lightPattern[lightsIndex];

    if (newState.leftBlue) {
        lightsEle.leftBlue[0].classList.add("on");
        lightsEle.leftBlue[1].classList.add("on");
    } else {
        lightsEle.leftBlue[0].classList.remove("on");
        lightsEle.leftBlue[1].classList.remove("on");
    }

    if (newState.leftWhite) {
        lightsEle.leftWhite[0].classList.add("on");
    } else {
        lightsEle.leftWhite[0].classList.remove("on");
    }

    if (newState.centreBlue) {
        lightsEle.centreBlue[0].classList.add("on");
    } else {
        lightsEle.centreBlue[0].classList.remove("on");
    }
    
    if (newState.rightWhite) {
        lightsEle.rightWhite[0].classList.add("on");
    } else {
        lightsEle.rightWhite[0].classList.remove("on");
    }

    if (newState.rightBlue) {
        lightsEle.rightBlue[0].classList.add("on");
        lightsEle.rightBlue[1].classList.add("on");
    } else {
        lightsEle.rightBlue[0].classList.remove("on");
        lightsEle.rightBlue[1].classList.remove("on");
    }

    lightsIndex++;

    if (lightsIndex > lightPattern.length - 1) {
        lightsIndex = 0;
    }
}

function lightsOn() {
    if (!state.lights) {
    lightLight = document.querySelector("#lights-on");
    lightLight.classList.add("on");

    lightsInterval = setInterval(nextLight, 100);
    state.lights = true;
}
}

function lightsOff() {
    if (state.lights) {
        lightLight = document.querySelector("#lights-on");
        lightLight.classList.remove("on");

        clearInterval(lightsInterval);

        lightsEle.leftBlue[0].classList.remove("on");
        lightsEle.leftBlue[1].classList.remove("on");
        lightsEle.leftWhite[0].classList.remove("on");
        lightsEle.centreBlue[0].classList.remove("on");
        lightsEle.rightWhite[0].classList.remove("on");
        lightsEle.rightBlue[0].classList.remove("on");
        lightsEle.rightBlue[1].classList.remove("on");

        state.lights = false;
    }
}

function toggle999() {
    ele999 = document.querySelector("#ninenine")
    if (state["999"]) {
        state["999"] = false;
        ele999.classList.remove("on");
    } else {
        state["999"] = true;
        ele999.classList.add("on");
    }
}

function loadAllSirens() {
    // sirenAudio.wail.load();
    // sirenAudio.yelp.load();
    // sirenAudio.hyperyelp.load();
}

function stopSiren() {
    sirenAudio.wail.pause();
    sirenAudio.wail.position = 0;
    sirenAudio.yelp.pause();
    sirenAudio.yelp.position = 0;
    sirenAudio.hyperyelp.pause();
    sirenAudio.hyperyelp.position = 0;

    sirenEle.wail.classList.remove("on");
    sirenEle.yelp.classList.remove("on");
    sirenEle.hyperyelp.classList.remove("on");

    state.wailSiren = false;
    state.yelpSiren = false;
    state.hyperyelpSiren = false;
}

function wailSiren() {
    if (!state.wailSiren) {
        loadAllSirens();

        // turn wail on
        sirenAudio.wail.play();
        state.wailSiren = true;
        // turn light on
        sirenEle.wail.classList.add("on");

        // turn others off
        sirenAudio.yelp.pause();
        sirenAudio.yelp.position = 0;
        state.yelpSiren = false;

        sirenAudio.hyperyelp.pause();
        sirenAudio.hyperyelp.position = 0;
        state.hyperyelpSiren = false;
        // turn lights off
        sirenEle.yelp.classList.remove("on");
        sirenEle.hyperyelp.classList.remove("on");
    }
}

function yelpSiren() {
    if (!state.yelpSiren) {
        loadAllSirens();
        
        // turn yelp on
        state.wailSiren = false;
        state.yelpSiren = true;
        state.hyperyelpSiren = false;
        // turn light on
        sirenEle.yelp.classList.add("on");

        // turn others off
        sirenAudio.wail.pause();
        sirenAudio.wail.position = 0;
        sirenAudio.yelp.play();
        sirenAudio.hyperyelp.pause();
        sirenAudio.hyperyelp.position = 0;
        // turn lights off
        sirenEle.wail.classList.remove("on");
        sirenEle.hyperyelp.classList.remove("on");

    }
}

function hyperyelpSiren() {
    if (!state.hyperyelpSiren) {
        loadAllSirens();
        
        // turn hyperyelp on
        sirenAudio.hyperyelp.play();
        state.hyperyelpSiren = true;
        // turn light on
        sirenEle.hyperyelp.classList.add("on");
        
        // turn others off
        sirenAudio.wail.pause();
        sirenAudio.wail.position = 0;
        state.wailSiren = false;

        sirenAudio.yelp.pause();
        sirenAudio.yelp.position = 0;
        state.yelpSiren = false;
        // turn lights off
        sirenEle.wail.classList.remove("on");
        sirenEle.yelp.classList.remove("on");

    }
}

function horn() {
    if (state["999"]) {
        if (!state.lights) {
            lightsOn();
        }

        if (sirenNum == 0) {
            wailSiren();
        } else if (sirenNum == 1) {
            yelpSiren();
        }

        sirenNum++;
        if (sirenNum > 1) {
            sirenNum = 0;
        }
    }
}

function allOff() {
    stopSiren();
    lightsOff();
    sirenNum = 0;
}

function hornSFX() {
    sirenAudio.horn.play()
}
