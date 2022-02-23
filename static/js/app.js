// from data.js
var tableData = data;

function populateTable(ufoData) {
    var tbody = d3.select("tbody");
    ufoData.forEach((tableRow) => {
        // console.log("this is function ufo", ufo);
        var row = tbody.append("tr");
        Object.entries(tableRow).forEach(([key, value]) =>{
            var tableCell = row.append("td");
            tableCell.text(value);
        });
    });

};


function filterUFO() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
    d3.select("tbody").selectAll('tr').remove();
    // console.log("Filter UFO");

    var selectedData = d3.select("#userInput").property("value");
    if (!selectedData) {
        console.log("Empty input box ", selectedData);
        var filteredUFOData = tableData;
        alertBox();

    } 
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
    populateTable(filteredUFOData)
}


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


function alertBox() {
    var balls = '\u25CD'.repeat(24);

    alert(balls + "\rWARNING!\r\n" + "No search information has been entered.\r\n"
        + "The default data will be displayed.\r\n" + balls);
}

    
/* **************************************************************************** */
populateTable(tableData);

d3.select("#filter-btn").on("click", filterUFO)
d3.select("#clear-btn").on("click", clearBoxFilter)
/* **************************************************************************** */

