var ctx1;
var gcanvas1;
var pointSize = 2;
var arr = [];
var quotient1, quotient2;
var tabrowindex = 0;
var xyz = new Array();
var cell;
var table;
var counter = 0;
var x, y;
var count1 = 0;
var coordinates1 = new Array();
var coordinates2 = new Array();
var classes = new Array();
var xCo = new Array();
var yCo = new Array();
var transX, transY;
var temp1, temp2;
var i = 0;
var tabrowindex = 0;
var points = []; //points to draw stoke

var dataPointsg = []; // for chart
var chart;
const randomcenterpoint = []; //randomly selected center point
const pointsrbf = []; // points from the table

$(document).ready(function () {
    $("#mycanvas1").click(function (e) {
        getPosition1(e);
    });
});


function canvas11() {
    gcanvas1 = document.getElementById("mycanvas1"),
        ctx1 = gcanvas1.getContext('2d'),
        transX = gcanvas1.width * 0, //21
        transY = gcanvas1.height * 1; //399
    ctx1.translate(transX, transY);
    ctx1.fillRect(0, -transY, 1, gcanvas1.height); //vertical Axis
    ctx1.fillRect(- transX, 0, gcanvas1.width, 1); //Horizantal Axis
    gcanvas1.onmousemove = function (e) {
        var pos1 = getMousePos1(gcanvas1, e);
        //out.innerHTML = 'X:' + pos1.x + ' Y:' + pos1.y;
    }

    /* chart = new CanvasJS.Chart("ChartContainer", {
        animationEnabled: true,
        title: {
            text: "RBF Prediction",
        },

        data: [{
            type: "spline",
            dataPoints: dataPointsg
        }]
    });

    chart.render();
 */


};
var coordinates = new Array();
function getPosition1(event) {
    var rect = gcanvas1.getBoundingClientRect();
    x = event.clientX - rect.left - transX;
    y = event.clientY - rect.top - transY;
    drawCoordinates(x, y);
    tabled();
}


function getMousePos1(gcanvas1, evt) {
    var rect = gcanvas1.getBoundingClientRect();
    return {
        x: evt.clientX - (rect.left + 0.5) - transX,
        y: evt.clientY - rect.top - transY
    };
}

function drawCoordinates(x, y) {
    xCo.push(x); yCo.push(y);

    points.push({ x, y });
    if (counter < 100) {
        ctx1 = document.getElementById("mycanvas1").getContext("2d");
        ctx1.beginPath();
        ctx1.arc(x, y, pointSize, 0, Math.PI * 2, true);
        ctx1.lineWidth = 1;
        ctx1.strokeStyle = "blue";
        ctx1.fillStyle = "blue";
        ctx1.fill();
        ctx1.stroke();
        document.getElementById("centernum").value = points.length;

       
    }
    //alert(classes);
    temp1 = Math.abs(x);
    temp2 = Math.abs(y);
    quotient1 = parseFloat(temp1 / 49).toPrecision(3); // 11
    quotient2 = parseFloat(temp2 / 52).toPrecision(3); // 3
    var cord = quotient1 + "|" + quotient2;
    xyz.push(cord);
    //alert("cord");
    coordinates1[count1] = quotient1;
    coordinates2[count1] = quotient2;
    count1++;
}



function tabled() {
    table = document.getElementById("mytable");

    arr[0] = tabrowindex + 1;
    arr[1] = quotient1;//x
    arr[2] = quotient2;//y
    //xCo.push(quotient1); yCo.push(quotient2);
    // points.push({ x, y });
    pointsrbf.push({ quotient1, quotient2 });

    if (table.rows.length <= 100) {
        var row = table.insertRow(++tabrowindex); // Row increment
        for (var q = 0; q < 3; q++) {
            cell = row.insertCell(q);
            cell.innerHTML = arr[q];
            document.getElementById("tpdata").innerHTML = "Added training point " + arr[0] + " at ( " + arr[1] + " , " + arr[2] + " )";
        }
    }
}


function reset() {
    location.reload();
    //clearChart();

}

/************************ Function for draw strokes ***************************/
function drawStroke(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}
/**************************** redraw button **********************************/
function redraw() {
    // Draw strokes between points
    ctx1.strokeStyle = 'red';
    for (let i = 0; i < points.length - 1; i++) {
        drawStroke(ctx1, points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
    }
}



function gaussianRBF(x, c, sigma) {
    return Math.exp(-((x - c) ** 2) / (2 * sigma * sigma));
}

function sigmaFrom2DPoints(points) {
    const meanX = points.reduce((s, p) => s + p.x, 0) / points.length;
    const meanY = points.reduce((s, p) => s + p.y, 0) / points.length;

    const distances = points.map(p =>
        Math.sqrt((p.x - meanX) ** 2 + (p.y - meanY) ** 2)
    );

    const meanDist = distances.reduce((a, b) => a + b, 0) / distances.length;

    const variance = distances.reduce((s, d) => s + (d - meanDist) ** 2, 0) / distances.length;

    return Math.sqrt(variance);
}


function go() {

    if (points.length === 0) return;

    // Use defaults if inputs are empty
   // let sigma = parseFloat(document.getElementById("sd").value) || 40;

   let sigma = sigmaFrom2DPoints(points);
document.getElementById("sd").value=(sigma/100).toFixed(2);

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw baseline
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.strokeStyle = "#aaa";
    ctx.stroke();

    // Draw Gaussian RBF for each point
    points.forEach(p => {
        drawGaussian(p.x, sigma);
    });

    function drawGaussian(centerX, sigma) {
        ctx.beginPath();
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 1.5;

        for (let x = 0; x < canvas.width; x++) {
            let phi = gaussianRBF(x, centerX, sigma);
            let y = canvas.height- phi * 80;

            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
    }
}




