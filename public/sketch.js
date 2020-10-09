// Record all shapes
var x = [];
var y = [];
// Initial stroke color
var s_color = '#eb565c';
var line_width;
var screen_width, screen_height;

var reset_button;
var undo_button;
var drawing = false;


// Setup UI
function setup() {
    screen_width = windowWidth-50;
    screen_height = windowHeight-50;
    createCanvas(screen_width, screen_height);
    background(235);

    line_width = 2.0;

    reset_button = createButton('reset');
    reset_button.position(10, screen_height+10);
    reset_button.mousePressed(reset);
    
    undo_button = createButton('undo');
    undo_button.position(65, screen_height+10);
    undo_button.mousePressed(undo);


    stroke(179, 179, 179);
    strokeWeight(1)
    for (var i = 0; i < screen_width; i+=200) {
        line(i, 0, i, screen_height);
        line(0, i, screen_width, i);
    }


}

function draw() {
    stroke(0, 0, 0);
    background(235);
    for (var i=0; i<x.length;i+=2) {
        fill(100, 0);
        rectMode(CORNERS);
        rect(x[i],y[i],x[i+1],y[i+1]);
    }
}

function mousePressed() {
    if (mouseX < screen_width && mouseY < screen_height) {
        if (!drawing) {
            x.push(mouseX);
            y.push(mouseY);
            x.push(mouseX);
            y.push(mouseY);
            drawing = true;
        } 
    }
}

function mouseDragged() {
    if (mouseX < screen_width && mouseY < screen_height) {
        if (drawing) {
            x[x.length-1] = mouseX;
            y[y.length-1] = mouseY;
            // fill(100, 0);
            // rectMode(CORNERS);
            // rect(x[x.length-2],y[y.length-2],x[x.length-1],y[y.length-1]);
        } 
    }
}

function mouseReleased() {
    if (mouseX < screen_width && mouseY < screen_height) {
        if (drawing) {
            x[x.length-1] = mouseX;
            y[y.length-1] = mouseY;
            drawing = false;
        }
    }
}

function undo() {
    x.pop();
    x.pop();
    y.pop();
    y.pop();
    setup();
    stroke(0, 0, 0);
    // for (var i=0; i<x.length;i+=2) {
    //     rect(x[i],y[i],x[i+1],y[i+1]);
    // }
}

function reset() {
    x = [];
    y = [];
    setup();
}