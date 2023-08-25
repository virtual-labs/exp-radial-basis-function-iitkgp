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

        /* f ((x>= 0 && x <= 225) && (y >= -400 && y <= -200)){
        classes.push(1);
    } else if ((x >= 225 && x <= 450) && (y >= -400 && y <= -200)) {
        classes.push(2);
    } else if ((x >=0 && x <= 225) && (y >= -200 && y <= 0)) {
        classes.push(3);
    } else {
        //alert(isPoint1 +"   "+isPoint2);
        if(is_in_triangle(x,y,225,-200,220,0,450,0)) classes.push(3);
        if(is_in_triangle(x,y,225,-200,450,-200,450,0)) classes.push(2);
    } */
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
    ctx1.fillStyle = "black";
    ctx1.clearRect(0, -200, gcanvas1.width, gcanvas1.height);
    //ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx1.fillRect(0, -transY, 1, gcanvas1.height); //vertical Axis
    ctx1.fillRect(- transX, 0, gcanvas1.width, 1); //Horizantal Axis
    var rowCount = table.rows.length;
    for (var j = rowCount - 1; j >= 1; j--) {
        table.deleteRow(j);
        points.pop();
        dataPointsg.pop();
    }
    tabrowindex = 0;
    i = 0;
    document.getElementById("tpdata").innerHTML = "";
    //console.log(xyz);

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
function checkcenter() {
    //var centers=document.getElementById("centernum").value;

}

function go() {

    var sd = document.getElementById("sd").value;

    //const centerPoint = getRandomPointFromdataset(points);

    //randomcenterpoint.push(randomPoint);
    //console.log('Center Point:', centerPoint);
    //console.log('Updated Data Points Array:', randomcenterpoint);

    console.log('Data Points from table:', points);
    const centerY = 100;
    const variance = 100;

    /* for (let p = 0; p < points.length; p++) {
           const distance = euclideanDistance(points[p].x, points[p].y, centerPoint.x, centerPoint.y);
           console.log('Euclidean Distance:', distance);
          // const phi = Math.exp(-beta * distance);
         //const value= phi * Math.sqrt(distance);
          //const value1 = Math.exp(-(((distance)** 2) / 2*(sd) **2));
         // const value2 = 1 /(math.sqrt(2*3.14*((sd)**2)));
          //const gf =value2 * value1;
          //console.log('gf:', gf);
          //console.log('Value1:',value1);
          //console.log('Value2:', value2);
           dataPointsg.push({ x: p, y: distance});
       } */
    //console.log(dataPointsg); 



    //showgraph();

    // Get the canvas element and its 2d context
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Gaussian basis functions for each data point
    for (const point of points) {
        drawGaussianBasisFunction(point.x, point.y);
    }

    // Function to draw a Gaussian basis function curve
    function drawGaussianBasisFunction(x, y) {
        context.beginPath();
        context.strokeStyle = 'blue';
        context.lineWidth = 2;

        for (let xPos = 0; xPos < canvas.width; xPos++) {
            const distance = Math.sqrt((xPos - x) ** 2 + (centerY - y) ** 2);
            const value = Math.exp(-((distance ** 2) / (2 * variance ** 2)));
            const yPos = centerY - value * 150; // Scale for visualization
            if (xPos === 0) {
                context.moveTo(xPos, yPos);
            } else {
                context.lineTo(xPos, yPos);
            }
        }

        context.stroke();
    }


}

