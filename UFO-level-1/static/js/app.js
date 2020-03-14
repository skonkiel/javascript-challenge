// from data.js
var tableData = data;
console.log(tableData);

// Select the button
var filterBtn = d3.select("#filter-btn");

// Form click handler

filterBtn.on("click", function () {
    // Get the user input
    var inputElement = d3.select("#datetime");
    var inputValue = inputElement.property("value");
    
    // @TODO Add a thing here to verify that date is in right format

    // Create a date filter based in user input
    var dateSet = tableData.filter(sighting => sighting.datetime === inputValue);
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
