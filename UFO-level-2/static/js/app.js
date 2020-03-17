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

    // import full, fresh dataset
    // results = {...tableData}; // this doesn't work, not sure why
    results = JSON.parse(JSON.stringify( tableData ));
    // JSON solution found on https://dev.to/rsschouwenaar/how-to-make-a-real-copy-of-a-javascript-array-with-objects-without-a-reference-5md
    
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

    // Print each result in results to table
    results.forEach((sighting) => {
        let row = table.append("tr");
        Object.entries(sighting).forEach(([key, value]) => {
            let cell = row.append("td");
            cell.text(value);
        });
    });
});
