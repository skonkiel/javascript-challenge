// from data.js
var tableData = data;

// Convert state and country str to uppercase
tableData.forEach(function(sighting) {
    sighting.state = sighting.state.toUpperCase();
    sighting.country = sighting.country.toUpperCase();
  });

// Convert city and shape data to title case
tableData.forEach(function(sighting) {
    // Adapted from https://www.freecodecamp.org/news/three-ways-to-title-case-a-sentence-in-javascript-676a9175eb27/
    // city
    var str = sighting.city.toLowerCase();
    str = str.split(" ");
    str = str.map(function(word) {
        word = word.charAt(0).toUpperCase() + word.slice(1);
        return word;
    });
    var city = str.join(" ");
    sighting.city = city;

    // shape
    var str = sighting.shape.toLowerCase();
    str = str.split(" ");
    str = str.map(function(word) {
        word = word.charAt(0).toUpperCase() + word.slice(1);
        return word;
    });
    var shape = str.join(" ");
    sighting.shape = shape;
});

// Select the button
var filterBtn = d3.select("#filter-btn");

// Form click handler

filterBtn.on("click", function () {
    // Get the user input
    var datetime = d3.select("#datetime");
    var dateValue = datetime.property("value");

    var dateSet = tableData.filter(sighting => sighting.datetime === dateValue);
    console.log(dateSet);

    // Clear existing html in table
    var table = d3.select("tbody");
    table.html("");

    // Print each result in dateSet to table
    dateSet.forEach((sighting) => {
        var row = table.append("tr");
        Object.entries(sighting).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });
});
/* EXAMPLE SIGHTING DATA
{
    datetime: "1/1/2010",
    city: "benton",
    state: "ar",
    country: "us",
    shape: "circle",
    durationMinutes: "5 mins.",
    comments: "4 bright green circles high in the sky going in circles then one bright green light at my front door."
  }
*/
