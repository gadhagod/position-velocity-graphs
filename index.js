const addPositionInput = document.getElementById("input_position");
const addTimeInput = document.getElementById("input_time");
const addButton = document.getElementById("add");
const dtTable = document.getElementById("dtTable");
const setTimeUnitButton = document.getElementById("set_time_unit_button");
const setPositionUnitButton = document.getElementById("set_position_unit_button");

const onKeyUp = (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        addButton.click();
    }
}

const graphConfig = {
    type: "line",
    showLine: true,
    data: {
        datasets: [{
            data: [],
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                id: "y",
                ticks: {
                    beginAtZero: true,
                },
                type: "linear",
                display: true
            }],
            xAxes: {
                display: true,
                id: "x",
                type: "linear",
                label: {
                    text: "Hi",
                    display: true
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Value'
                }
            }
        },
        plugins: {
            title: {
                display: true
            }
        }
    }
}

var dtGraphConfig = JSON.parse(JSON.stringify(graphConfig));
dtGraphConfig.options.plugins.title.text = "Position VS Time";
dtGraphConfig.data.datasets[0].label = "Position";
dtGraphConfig.options.scales.yAxes.text = "d";
console.log(dtGraphConfig.options.scales)
var dtGraph = new Chart(document.getElementById("dtChart"), dtGraphConfig);

var vtGraphConfig = JSON.parse(JSON.stringify(graphConfig));
vtGraphConfig.options.plugins.title.text = "Velocity VS Time";
vtGraphConfig.data.datasets.data = {x:0, y:0};
vtGraphConfig.data.datasets[0].label = "Velocity";
dtGraphConfig.options.scales.yAxes.text = "v";
var vtGraph = new Chart(document.getElementById("vtChart"), vtGraphConfig);

var addData = (x, y) => {
    if(!x || !y) {
        return;
    }

    dtGraph.data.datasets[0].data.push({x: x, y: y})
    let tr = document.createElement("tr");
    let timeTd = document.createElement("td");
    timeTd.innerText = x;
    let positionTd = document.createElement("td");
    positionTd.innerText = y;
    tr.appendChild(timeTd);
    tr.appendChild(positionTd);
    dtTable.appendChild(tr);

    let thisPoint = dtGraph.data.datasets[0].data[dtGraph.data.datasets[0].data.length - 1];
    let lastPoint = dtGraph.data.datasets[0].data[dtGraph.data.datasets[0].data.length - 2];
    dtGraph.update();

    if (!lastPoint) {
        return;
    }

    let y1 = (thisPoint.y - lastPoint.y) / (thisPoint.x - lastPoint.y); // TODO: make sure (thisPoint.x - lastPoint.y) is not 0
    let x1 = thisPoint.x;

    let y2 = y1;
    let x2 = lastPoint.x;

    console.log(`(${x2}, ${y2}) (${x1}, ${y1})`)

    vtGraph.data.datasets[0].data.push({x: x2, y: y2});
    vtGraph.data.datasets[0].data.push({x: x1, y: y1});
    vtGraph.update();
};

addButton.addEventListener("click", () => addData(addTimeInput.value, addPositionInput.value))
addPositionInput.addEventListener("keyup", onKeyUp);
addTimeInput.addEventListener("keyup", onKeyUp); 
setTimeUnitButton.addEventListener("click", () => {
    dtGraph.options.scales.xAxes.title.text = "Hi";
    dtGraph.options.scales.xAxes.title.display = true;
    dtGraph.update();
})