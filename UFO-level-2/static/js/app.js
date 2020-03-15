var tableData = data;
console.log("Print fresh tableData, all lowercase");
console.log(tableData);

// Select the button
var filterBtn = d3.select("#filter-btn");
var resetBtn = d3.select("#reset-btn")

// Reset form and data on page
resetBtn.on("click", function () {
    this.form.reset(); 
    window.location.reload();
});

// Form click handler

filterBtn.on("click", function () {

    // Clear previous input
    var dateValue = "";
    var cityValue = "";
    var stateValue = "";
    var countryValue = "";
    var shapeValue = "";
    var results = "";

    console.log("Print empty results set");
    console.log(results); // print empty results

    // import full, fresh dataset
    results = tableData; // load "fresh" tableData into results set
    console.log("Print fresh tabledata again, till all lowercase");
    console.log(tableData); // print "fresh" tableData
    console.log("Print fresh results data now, all lowercase (inherited from tabledata)");
    console.log(results); // print "fresh" results (same as tableData)
    
    // Get the user input
    var datetimeData = d3.select("#datetime");
    dateValue = datetimeData.property("value");

    var cityData = d3.select("#city");
    cityValue = cityData.property("value").toLowerCase();

    var stateData = d3.select("#state");
    stateValue = stateData.property("value").toLowerCase();

    var countryData = d3.select("#country");
    countryValue = countryData.property("value").toLowerCase();

    var shapeData = d3.select("#shape");
    shapeValue = shapeData.property("value").toLowerCase();

    // Create a filter based in user input
    var filterList = [dateValue, cityValue, stateValue, countryValue, shapeValue];
    var attrList = ["datetime", "city", "state", "country", "shape"];

    for (i = 0; i < filterList.length; i++) {
        if (filterList[i]) {
            att = attrList[i];
            filter = filterList[i];
            results = results.filter(sighting => sighting[att] === filter);
        }
    }
    console.log("Print any user-entered values for filtering, all lowercase");
    console.log(dateValue, cityValue, stateValue, countryValue, shapeValue); // log values passed to filters
    console.log("Print filtered results, should still be all lowercase");
    console.log(results); // log filtered results

    // Clear existing html in table
    var table = d3.select("tbody");
    table.html("");

    // Convert state and country str to uppercase

    function convertUC(convertedData) {
        convertedData.forEach(function(sighting) {
            sighting.state = sighting.state.toUpperCase();
            sighting.country = sighting.country.toUpperCase();
        });
    }
    convertUC(results); // convert state and country fields of filtered results to uppercase
    console.log("Print results with state and country converted to UC");
    console.log(results);

    // Convert city and shape data to title case from filtered results
    results.forEach(function(sighting) {
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

    console.log("Print results with city and shape now converted to title case");

    // Print each result in results to table
    results.forEach((sighting) => {
        let row = table.append("tr");
        Object.entries(sighting).forEach(([key, value]) => {
            let cell = row.append("td");
            cell.text(value);
        });
    });
});
