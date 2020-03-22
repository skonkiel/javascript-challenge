d3.json("data.json").then((data) => {

// State analysis
var states = data.map(sighting => sighting.state);
states = states.map(state => state.toUpperCase());

var stateCount = {}

// adapted from https://www.w3resource.com/javascript-exercises/javascript-array-exercise-20.php
function countStates(arr) {
    // const object = {};
    const result = [];

    arr.forEach(item => {
      if(!stateCount[item])
      stateCount[item] = 0;
      stateCount[item] += 1;
    })

    return stateCount;
}

countStates(states);

// create the trace
var trace = {
  x: Object.keys(stateCount),
  y: Object.values(stateCount),
  name: "Sightings",
  type: "bar"
};

var data1 = [trace];

var layout = {
  title: "UFO sightings by state (Jan 1 - 13 2010)",
  yaxis: { title: "Number of sightings"}
};

// Plot the chart to a div tag with id "plot"
Plotly.newPlot("plot", data1, layout);

// conversion to Date format
var dates = data.map(sighting => sighting.datetime);
var convertDates = [];
var convertedDates = dates.map(function(date) {
    var parts = date.split('/');
    var mydate = new Date(parts[2], parts[0] - 1, parts[1]);
    return mydate;
});

// sort the dates in array
// adapted from https://flaviocopes.com/how-to-sort-array-by-date-javascript/
const sortedDates = convertedDates.slice().sort((a, b) => a - b)

// convert to readable date string using Date.prototype.toDateString()
var readableDates = convertedDates.map(date => date.toDateString());
console.log(readableDates);

var datesArr = {}

// adapted from https://www.w3resource.com/javascript-exercises/javascript-array-exercise-20.php
function countDates(arr) {
    // const object = {};
    const result = [];

    arr.forEach(item => {
      if(!datesArr[item])
      datesArr[item] = 0;
      datesArr[item] += 1;
    })

    return datesArr;
}

countDates(dates);

// create the trace
var trace2 = {
  x: Object.keys(datesArr),
  y: Object.values(datesArr),
  name: "Date of sighting",
  marker: {
    color: 'rgb(142,124,195)'
  },
  type: "bar"
};

var data2 = [trace2];

var layout2 = {
  title: "UFO sightings by date (Jan 1 - 13 2010)",
  yaxis: { title: "Date of signting"}
};

// Plot the chart to a div tag with id "plot"
Plotly.newPlot("plot2", data2, layout2);

});