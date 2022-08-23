var panX = 0;
var panY = 0;
var scaleFactor = 1;

function up() {
    if (scaleFactor > 1) {
        panY += 25
        main()
    }
}

function down() {
    if (scaleFactor > 1) {
        panY += -25
        main()
    }
}



function left() {
    if (scaleFactor > 1) {
        panX += 25
        main()
    }
}


function right() {
    if (scaleFactor > 1) {
        panX += -25
        main()
    }
}


function zoomOut() {
    if (scaleFactor > 1) {
        scaleFactor -= .5
        main()
    }
}

function zoomIn() {
    scaleFactor += .5
    main()
}



function reset() {
    panX = 0;
    panY = 0;
    scaleFactor = 1;
    main()
}
