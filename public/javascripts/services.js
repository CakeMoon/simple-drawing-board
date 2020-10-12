const Plan = function () {
    var home = {xs: [], ys: []};
    var desk = {xs: [], ys: []};
    var chair = {xs: [], ys: []};
    var camera = {xs: [], ys: []};
    var other = {xs: [], ys: []};
    const CLASS_TABLE = {'boundary': home, 'desk': desk, 'chair': chair, 'camera': camera, 'other': other};
    const COLOR_TABLE = {'boundary': '#ffffff', 'desk': '#d4d4d4', 'chair': '#949494', 'camera': '#2ab4eb', 'other': '#000000'};
    const STROKE = '#000000';
    const WEIGHT_TABLE = {'boundary': 16,'desk': 2, 'chair': 2, 'camera': 0, 'other': 4};

    var that = Object.create(Plan.prototype);

    that.getAllX = function(className) {
        const allX = [...CLASS_TABLE[className]['xs']];
        return allX;
    }

    that.getAllY = function(className) {
        const allY = [...CLASS_TABLE[className]['ys']];
        return allY;
    }

    that.drawPlan = function () {
        Object.keys(CLASS_TABLE).forEach(className => {
            var coordinates = CLASS_TABLE[className];
            console.log(coordinates);
            var xs = coordinates['xs'];
            var ys = coordinates['ys'];

            for (var i=0; i<xs.length;i+=2) {
                fill(COLOR_TABLE[className]);

                if (className === 'boundary') noFill();
                
                if (className === 'other') {
                    noFill();
                    strokeWeight(0.5);
                    line(xs[i],ys[i],xs[i+1],ys[i+1]);
                    line(xs[i],ys[i+1],xs[i+1],ys[i]);
                }

                stroke(STROKE);
                strokeWeight(WEIGHT_TABLE[className]);
                rectMode(CORNERS);
                rect(xs[i],ys[i],xs[i+1],ys[i+1]);
            }
        });
    }

    that.pushCoordinates = function (className, x, y) {
        if (className === 'boundary' && home.xs.length === 2) {
            set_title_text('Can draw only 1 boundary!');
        } else if (className === 'camera' && camera.xs.length === 2) {
            set_title_text('Can draw only 1 camera!');
        } else {
            CLASS_TABLE[className]['xs'].push(x);
            CLASS_TABLE[className]['ys'].push(y);
        }
    }

    that.popCoordinates = function (className) {
        CLASS_TABLE[className]['xs'].pop();
        CLASS_TABLE[className]['ys'].pop();
    }

    that.resetCoordinates = function (className) {
        console.log(CLASS_TABLE);
        CLASS_TABLE[className]['xs'] = [];
        CLASS_TABLE[className]['ys'] = [];
    }

    that.changeCoordinates = function (className, x, y) {
        var newXs = CLASS_TABLE[className]['xs'];
        var newYs = CLASS_TABLE[className]['ys'];
        newXs[newXs.length-1] = x;
        newYs[newYs.length-1] = y;
    }

    return that;
}

const CLASS_LIST = ['boundary', 'desk', 'chair', 'camera', 'other'];

let plan = Plan();

//////////////////////////////////////////////////////////

// Initial stroke color
var title_text = "draw your working space's plan!"
var s_color = '#eb565c';
var line_width;
var canvas_width, canvas_height;
var canvas;
var texts = [];
var github;

var currentClass = "boundary";

var buttons = [];
var reset_button;
var undo_button;
var submit_button;
var user_input;
var drawing = false;

const margin_top = 50;
const margin_bottom = 100;
const margin_left = 450;
const margin_right = 150;

var postFunctions = {'boundary': submitHome, 'desk': submitDesk, 'chair': submitChair, 'camera': submitCamera, 'other': submitOther};

/////////////////////////////////////////////////////////

clear_canvas = () => {
    canvas.clear();
    texts = [];
    noFill();
    stroke(100, 100, 100);
    strokeWeight(1);

    // canvas frame
    rectMode(CORNERS);
    rect(0, 0, canvas_width, canvas_height);
    
    // grid
    stroke(179, 179, 179);
    strokeWeight(0.5);
    textSize(12);
    fill(50);
    var distance = Math.floor(min(canvas_width, canvas_height)/4);
    texts.push(text('/ meter', 30, margin_top-17));
    for (var i = 0; i<max(canvas_width, canvas_height)/distance; i+=1) {
        textSize(24);
        texts.push(text(i, i*distance+10, margin_top-17));
        if (i !== 0) texts.push(text(i, 10, i*distance+34));
        line(0, i*distance, canvas_width, i*distance);
        line(i*distance, 0, i*distance, canvas_height);
    }

}

set_title_text = (new_text) => {
    title_text = new_text.split('_').join(' ');
    text_title.html(title_text);
  };


init = function () {
    console.log(windowWidth)
    console.log(windowHeight)
    canvas_width = max(windowWidth-margin_left-margin_right, 600);
    canvas_height = max(windowHeight-margin_top-margin_bottom, 400);
    canvas = createCanvas(canvas_width, canvas_height);
    canvas.position(margin_left, margin_top)

    reset_button = createButton('reset');
    reset_button.position(margin_right, canvas_height+margin_top-25);
    reset_button.mousePressed(reset);

    buttons.push(reset_button);

    // color(158, 196 ,218, 80)
    undo_button = createButton('undo');
    undo_button.position(margin_right, canvas_height+margin_top-55);
    undo_button.mousePressed(undo);

    buttons.push(undo_button);

    model_sel = createSelect();
    model_sel.position(margin_right, canvas_height+margin_top-85);
    for (var i=0;i<CLASS_LIST.length;i++) {
      model_sel.option(CLASS_LIST[i]);
    }
    model_sel.changed(model_sel_event);
    model_sel.style("font-size", "18px");
    model_sel.style("font-family", "Consolas");
    model_sel.style("color", "#fa461a");
    model_sel.style("background-color", "#ffffff");
    model_sel.style("border", "1px solid #b5b5b5");
    model_sel.style("width", "280px");
    model_sel.style("height", "25px");

    submit_button = createButton('submit');
    submit_button.position(margin_right, margin_top+115);
    submit_button.mousePressed(submit);

    

    buttons.push(submit_button);

    buttons.forEach(button => {
        button.style("font-size", "18px");
        button.style("font-family", "Consolas");
        button.style("color", "#fa461a");
        button.style("background-color", "#ffffff");
        button.style("border", "1px solid #b5b5b5");
        button.style("width", "280px");
        button.style("height", "25px");
    });


    user_input = createInput("Please enter your email...");
    user_input.position(margin_right, margin_top+85);
    user_input.style("font-size", "16px");
    user_input.style("font-family", "Consolas");
    user_input.style("color", "#d1bca7");
    user_input.style("background-color", "#ffffff");
    user_input.style("border", "1px solid #b5b5b5");
    user_input.style("width", "274px");
    user_input.style("height", "22px");
    user_input.input(InputEvent);

    text_title = createP(title_text);
    text_title.position(margin_right, margin_top-19);
    text_title.style("font-family", "Consolas");
    text_title.style("font-size", "20px");
    text_title.style("background-color", "#ffffff");
    text_title.style("color", "#fc7c55"); // ff990a
    text_title.style("border", "1px solid #000000");
    text_title.style("width", "278px");
    text_title.style("display", "inline");
    text_title.style("height", "75px");
    set_title_text(title_text);

}

hover = () => {
    buttons.forEach(button => {
        button.mouseOver(() => {button.style("background-color", "#a8e4ed")});
        button.mouseOut(() => {button.style("background-color", "#ffffff")});
    });
    model_sel.mouseOver(() => {model_sel.style("background-color", "#a8e4ed")});
    model_sel.mouseOut(() => {model_sel.style("background-color", "#ffffff")});
    user_input.mouseOver(() => {user_input.style("border", "2px solid #2c96d4")});
    user_input.mouseOut(() => {user_input.style("border", "1px solid #b5b5b5")});
    text_title.mouseOver(() => {text_title.style("background-color", "#a8e4ed")});
    text_title.mouseOut(() => {text_title.style("background-color", "#ffffff")});

    if (inCanvas()) {
        noFill();
        stroke('#2c96d4');
        strokeWeight(5);
        // canvas frame
        rectMode(CORNERS);
        rect(0, 0, canvas_width, canvas_height);
    }
}

// Setup UI
function setup() {
    init();
    clear_canvas();
    console.log(plan);
}

function draw() {
    frameRate(1);
    clear_canvas();
    hover();
    plan.drawPlan();
}

inCanvas = () => {
    return mouseX > 0 && mouseX < canvas_width && mouseY < canvas_height && mouseY > 0;
}

function mousePressed() {
    if (inCanvas()) {
        if (!drawing) {
            plan.pushCoordinates(currentClass, mouseX, mouseY);
            plan.pushCoordinates(currentClass, mouseX, mouseY);
            drawing = true;
        } 
    }
}

function mouseDragged() {
    if (inCanvas()) {
        if (drawing) {
            plan.changeCoordinates(currentClass, mouseX, mouseY);
        }
    } 
}

function mouseReleased() {
    if (inCanvas()) {
        if (drawing) {
            plan.changeCoordinates(currentClass, mouseX, mouseY);
            drawing = false;
        }
    }
}

undo = () => {
    plan.popCoordinates(currentClass);
    plan.popCoordinates(currentClass);
}

reset = () => {
    plan.resetCoordinates(currentClass);
}

submit = () => {
    CLASS_LIST.forEach(className => {
        const fields = {'user': user_input.value(), 'x': plan.getAllX(className), 'y': plan.getAllY(className)};
        postFunctions[className](fields);
    });
}

model_sel_event = () => {
    currentClass = model_sel.value();
}

InputEvent = () => {
    user_input.style("color", "#fa461a");
}

//////////////////////////////////////////////
function showResponse(axiosResponse) {
    const fullResponse = axiosResponse.response === undefined
      ? axiosResponse
      : axiosResponse.response;
    const abridgedResponse = {
        data: fullResponse.data,
        status: fullResponse.status,
        statusText: fullResponse.statusText,
      };
    set_title_text(abridgedResponse.data.message);
  }

function submitHome(fields) {
    axios.post('/api/homes/', fields)
      .then(showResponse)
      .catch(showResponse);
  }

function submitCamera(fields) {
    axios.post('/api/cameras/', fields)
        .then(showResponse)
        .catch(showResponse);
}

function submitChair(fields) {
    axios.post('/api/chairs/', fields)
        .then(showResponse)
        .catch(showResponse);
}

function submitDesk(fields) {
    axios.post('/api/desks/', fields)
        .then(showResponse)
        .catch(showResponse);
}

function submitOther(fields) {
    axios.post('/api/others/', fields)
        .then(showResponse)
        .catch(showResponse);
}
