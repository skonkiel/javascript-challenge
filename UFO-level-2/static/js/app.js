// from data.js
var tableData = data;

// Select the button
var filterBtn = d3.select("#filter-btn");

// Form click handler

filterBtn.on("click", function () {
    // Get the user input
    var datetime = d3.select("#datetime");
    var dateValue = datetime.property("value");

    var city = d3.select("#city");
    var cityValue = city.property("value").toLowerCase();

    var state = d3.select("#state");
    var stateValue = state.property("value").toLowerCase();

    var country = d3.select("#country");
    var countryValue = country.property("value").toLowerCase();

    var shape = d3.select("#shape");
    var shapeValue = shape.property("value").toLowerCase();

    // Create a filter based in user input
    if (!dateValue == "") {
        var filteredSet = tableData.filter(sighting => sighting.datetime === dateValue);
    } 

    if (!cityValue == "" && !dateValue == "") {
        filteredSet = filteredSet.filter(sighting => sighting.city === cityValue);
    } else if (!cityValue == "") {
        var filteredSet = tableData.filter(sighting => sighting.city === cityValue);
    }

    if (!stateValue == "" && ((!cityValue == "" || !dateValue == ""))) {
        var filteredSet = filteredSet.filter(sighting => sighting.state === stateValue);
    } else if (!stateValue == "") {
        var filteredSet = tableData.filter(sighting => sighting.state === stateValue);
    }

    if (!countryValue == "" && ((!cityValue == "" || !dateValue == "" || !stateValue == ""))) {
        var filteredSet = filteredSet.filter(sighting => sighting.country === countryValue);
    } else if (!countryValue == "") {
        var filteredSet = tableData.filter(sighting => sighting.country === countryValue);
    }
    
    if (!shapeValue == "" && ((!cityValue == "" || !dateValue == "" || !stateValue == "" || !countryValue == ""))) {
        var filteredSet = tableData.filter(sighting => sighting.shape === shapeValue);
    } else if (!shapeValue == "") {
        var filteredSet = tableData.filter(sighting => sighting.shape === shapeValue);
    }

    // Clear existing html in table
    var table = d3.select("tbody");
    table.html("");

    // Convert state and country str to uppercase
    filteredSet.forEach(function(sighting) {
        sighting.state = sighting.state.toUpperCase();
        sighting.country = sighting.country.toUpperCase();
    });

    // Convert city and shape data to title case
    filteredSet.forEach(function(sighting) {
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

    // Fix weird characters in description
    filteredSet.forEach(function(sighting) {
        var str = sighting.comments;
        if (str.includes("&#44")) {
            sighting.comments = str.replace("&#44",',');
        }
        if (str.includes("&#33")) {
            sighting.comments = str.replace("&#33",'!');
        }
        if (str.includes("&#39")) {
            sighting.comments = str.replace("&#39",'\'');
        }
    });

    // Print each result in dateSet to table
    filteredSet.forEach((sighting) => {
        var row = table.append("tr");
        Object.entries(sighting).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });
});
