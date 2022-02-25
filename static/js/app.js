// Read data from input file: data.js
var tableData = data;

// Manipulating index.html by appending new tags "tr" and "td"
// Then load data to the table
function populateTable(ufoData) {
    var tbody = d3.select("tbody");
    ufoData.forEach((tableRow) => {
        // console.log("this is function ufo", ufoData);
        var row = tbody.append("tr");
        Object.entries(tableRow).forEach(([key, value]) =>{
            var tableCell = row.append("td");
            tableCell.text(value);
        });
    });

};


// Filter data based on user input or search type and search strings
function filterUFO() {
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Remove all "tr" that had been added previously by d3
    d3.select("tbody").selectAll('tr').remove();
    console.log("Filter UFO");

    var selectedData = d3.select("#userInput").property("value");

    // Catch the scenario when user just hit button "Filter Data" with no string to search
    if (!selectedData) {
        console.log("Empty input box ", selectedData);
        var filteredUFOData = tableData;
        alertBox();
    } 
    
    // Filter data based on user input and search engine
    else {
        var dropdownItem = d3.select("#selFilter").node().value;
        console.log("dropdownItem", dropdownItem);

        switch(dropdownItem) {
            case "sdate":
                var filteredUFOData = tableData.filter(ufo => { return (ufo.datetime === selectedData) });
                break;
            case "scity":
                var filteredUFOData = tableData.filter(ufo => { return (ufo.city === selectedData) });
                break;
            case "sstate":
                var filteredUFOData = tableData.filter(ufo => { return (ufo.state === selectedData) });
                break;
            case "scountry":
                var filteredUFOData = tableData.filter(ufo => { return (ufo.country === selectedData) });
                break;
            case "sshape":
                var filteredUFOData = tableData.filter(ufo => { return (ufo.shape === selectedData) });
        }

        console.log("This value to be returned", filteredUFOData);
    }

    // Call alert when the search string is invalid
    if (filteredUFOData=="") {
        console.log("Return empty array", selectedData);
        alertReturnEmptyData();
    }

    // Call function to display the filtered data
    populateTable(filteredUFOData)
}


// Clear user input input and remove all the "tr" that had been appended previously
function clearBoxFilter() {
    searchBox = {};
    d3.selectAll(".form-control")._groups[0].forEach(rowData => {
        if (rowData.value !=0) {
            d3.select("#" + rowData.id).node().value = "";
        }
    })
    tbody = d3.select("tbody").selectAll('tr').remove();
    // console.log("default table data ", tableData)
    populateTable(tableData)

}


// Create alert function to catch the default scenario when no search string had been entered
function alertBox() {
    var lines = '\u2500'.repeat(40);

    alert(lines + "\nWARNING!\n" + "No search information had been entered.\r\n"
        + "The table will be refreshed with default data.\r\n" + lines);
}


// Create alert function to catch invalid search entry that return empty search array
function alertReturnEmptyData() {
    var boxes = '\u25AA'.repeat(50);

    alert(boxes + "\nWARNING\u203C\n" + "Invalid search data had been entered.\r\n"
        + "Please try again.\r\n" + boxes);
}


/* **************************************************************************** */
// Populate data with default values, i.e. all data from the data.js file
populateTable(tableData);

// Call functions that triggered by the click button
d3.select("#filter-btn").on("click", filterUFO)
d3.select("#clear-btn").on("click", clearBoxFilter)
/* **************************************************************************** */

